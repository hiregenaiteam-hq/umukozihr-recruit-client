import baseUrl from "./config";

export type ApiError = Error & { status?: number; details?: unknown };

// Token refresh state to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

/**
 * Decode JWT token payload (without verification)
 */
function decodeJwtPayload(token: string): { exp?: number; sub?: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
}

/**
 * Check if token is expired or about to expire (within 60 seconds)
 */
function isTokenExpired(token: string, bufferSeconds = 60): boolean {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return true;
  const expiresAt = payload.exp * 1000; // Convert to milliseconds
  const now = Date.now();
  return now >= (expiresAt - bufferSeconds * 1000);
}

/**
 * Attempt to refresh the access token using refresh token
 */
async function tryRefreshToken(): Promise<string | null> {
  const refreshToken = getCookie("refresh_token");
  if (!refreshToken) {
    console.log("No refresh token available");
    return null;
  }

  try {
    const response = await fetch(`${baseUrl}/api/v1/auths/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      console.log("Token refresh failed:", response.status);
      return null;
    }

    const data = await response.json();
    const newToken = data?.access_token || data?.token;
    
    if (newToken) {
      // Update all token cookies
      setCookie("hg_token", newToken, 7);
      setCookie("access_token", newToken, 7);
      if (data.refresh_token) {
        setCookie("refresh_token", data.refresh_token, 7);
      }
      console.log("Token refreshed successfully");
      return newToken;
    }
    return null;
  } catch (error) {
    console.error("Token refresh error:", error);
    return null;
  }
}

/**
 * Ensure we have a valid token, refreshing if needed
 * Uses a singleton pattern to prevent multiple simultaneous refresh attempts
 */
export async function ensureValidToken(): Promise<string | null> {
  const currentToken = getCookie("hg_token");
  
  if (!currentToken) {
    return null;
  }

  // Check if token is still valid (with 60 second buffer)
  if (!isTokenExpired(currentToken, 60)) {
    return currentToken;
  }

  // Token is expired or about to expire, need to refresh
  console.log("Token expired or expiring soon, attempting refresh...");

  // If already refreshing, wait for that promise
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  // Start refresh
  isRefreshing = true;
  refreshPromise = tryRefreshToken().finally(() => {
    isRefreshing = false;
    refreshPromise = null;
  });

  return refreshPromise;
}

/**
 * Clear all auth cookies and redirect to login
 */
export function clearAuthAndRedirect(redirectPath = "/auth") {
  document.cookie = "hg_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  localStorage.removeItem("user_data");
  
  // Only redirect if in browser and not already on auth page
  if (typeof window !== "undefined" && !window.location.pathname.startsWith("/auth")) {
    window.location.href = `${redirectPath}?next=${encodeURIComponent(window.location.pathname)}`;
  }
}

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry configuration
 */
interface RetryConfig {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffMultiplier?: number;
  retryableStatuses?: number[];
}

const DEFAULT_RETRY_CONFIG: Required<RetryConfig> = {
  maxRetries: 3,
  initialDelayMs: 1000,
  maxDelayMs: 10000,
  backoffMultiplier: 2,
  retryableStatuses: [408, 429, 500, 502, 503, 504] // Network/server errors
};

/**
 * Check if error is retryable
 */
function isRetryableError(error: unknown, status?: number): boolean {
  // Network errors (timeout, connection refused, etc.)
  if (error instanceof Error) {
    if (error.name === 'AbortError') return true; // Timeout
    if (error.message.includes('fetch') || error.message.includes('network')) return true;
  }
  
  // HTTP status codes that are retryable
  if (status && DEFAULT_RETRY_CONFIG.retryableStatuses.includes(status)) {
    return true;
  }
  
  return false;
}

/**
 * Execute fetch with exponential backoff retry logic
 */
async function fetchWithRetry(
  url: RequestInfo | URL,
  init: RequestInit,
  signal: AbortSignal,
  config: RetryConfig = {}
): Promise<Response> {
  const retryConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
  let lastError: unknown;
  
  for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
    try {
      const response = await fetch(url, { ...init, signal });
      
      // If successful or non-retryable error, return immediately
      if (response.ok || !isRetryableError(null, response.status)) {
        return response;
      }
      
      // Store error for potential retry
      lastError = new Error(`HTTP ${response.status}`);
      
      // If this was the last attempt, return the error response
      if (attempt === retryConfig.maxRetries) {
        return response;
      }
      
      // Calculate exponential backoff delay
      const delay = Math.min(
        retryConfig.initialDelayMs * Math.pow(retryConfig.backoffMultiplier, attempt),
        retryConfig.maxDelayMs
      );
      
      console.log(`Request failed with status ${response.status}, retrying in ${delay}ms (attempt ${attempt + 1}/${retryConfig.maxRetries})...`);
      await sleep(delay);
      
    } catch (error) {
      lastError = error;
      
      // If not retryable or last attempt, throw
      if (!isRetryableError(error) || attempt === retryConfig.maxRetries) {
        throw error;
      }
      
      // Calculate exponential backoff delay
      const delay = Math.min(
        retryConfig.initialDelayMs * Math.pow(retryConfig.backoffMultiplier, attempt),
        retryConfig.maxDelayMs
      );
      
      console.log(`Network error, retrying in ${delay}ms (attempt ${attempt + 1}/${retryConfig.maxRetries})...`, error);
      await sleep(delay);
    }
  }
  
  throw lastError || new Error('Max retries exceeded');
}

export async function apiFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
  timeoutMs = 15000,
  skipTokenRefresh = false,
  retryConfig?: RetryConfig
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const url =
      typeof input === "string" && input.startsWith("/")
        ? `${baseUrl}${input}`
        : input;

    // Ensure we have a valid token before making the request
    let token = getCookie("hg_token");
    if (token && !skipTokenRefresh) {
      const validToken = await ensureValidToken();
      if (validToken) {
        token = validToken;
      } else if (isTokenExpired(token, 0)) {
        // Token is completely expired and refresh failed
        clearAuthAndRedirect();
        const err: ApiError = new Error("Your session has expired. Please sign in again.");
        err.status = 401;
        throw err;
      }
    }
    
    const headers = new Headers(init?.headers);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    // Use retry logic for network resilience
    const res = await fetchWithRetry(url, {
      ...init,
      headers,
    }, controller.signal, retryConfig);
    
    const text = await res.text();
    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      /* non-json */
    }
    
    if (!res.ok) {
      // Handle 401 - try token refresh and retry once
      if (res.status === 401 && !skipTokenRefresh) {
        console.log("Got 401, attempting token refresh...");
        const newToken = await tryRefreshToken();
        if (newToken) {
          // Retry the request with new token
          clearTimeout(id);
          return apiFetch(input, init, timeoutMs, true); // Skip refresh on retry
        } else {
          // Refresh failed, redirect to login
          clearAuthAndRedirect();
          const err: ApiError = new Error("Your session has expired. Please sign in again.");
          err.status = 401;
          throw err;
        }
      }
      
      // Extract error message from various backend response formats
      let errorMessage = `Request failed (${res.status})`;
      if (data) {
        if (typeof data.detail === 'string') {
          errorMessage = data.detail;
        } else if (Array.isArray(data.detail) && data.detail.length > 0) {
          // Handle validation errors array
          const firstError = data.detail[0];
          errorMessage = firstError?.msg || firstError?.message || JSON.stringify(firstError);
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          errorMessage = data.error;
        }
      }
      const err: ApiError = new Error(errorMessage);
      err.status = res.status;
      err.details = data;
      throw err;
    }
    return data;
  } catch (e: any) {
    if (e?.name === "AbortError") {
      const err: ApiError = new Error(
        "Network timeout. Please check your connection and try again."
      );
      err.status = 0;
      throw err;
    }
    throw e;
  } finally {
    clearTimeout(id);
  }
}

export function normalizeError(e: unknown): {
  title: string;
  description: string;
} {
  const err = e as ApiError;
  
  // Extract the actual error message from the error or its details
  const extractMessage = (): string => {
    // First check if error has a meaningful message (not just "Request failed")
    if (err?.message && !err.message.startsWith('Request failed')) {
      return err.message;
    }
    // Try to extract from details
    const details = err?.details as any;
    if (details) {
      if (typeof details.detail === 'string') return details.detail;
      if (Array.isArray(details.detail) && details.detail.length > 0) {
        const first = details.detail[0];
        return first?.msg || first?.message || JSON.stringify(first);
      }
      if (details.message) return details.message;
      if (details.error) return details.error;
    }
    return err?.message || "Something went wrong. Please try again.";
  };

  const message = extractMessage();

  if (err?.status === 400)
    return {
      title: "Invalid data",
      description: message,
    };
  if (err?.status === 401)
    return {
      title: "Invalid credentials",
      description: message,
    };
  if (err?.status === 409)
    return {
      title: "Account exists",
      description: message,
    };
  if (err?.status === 422)
    return {
      title: "Validation error",
      description: message,
    };
  if (err?.status === 500)
    return {
      title: "Server error",
      description: "Something went wrong on our side. Please try again.",
    };
  return {
    title: "Error",
    description: message,
  };
}

export function parseValidationDetails(err: ApiError | unknown) {
  const out: Record<string, string> = {};
  try {
    const details = (err as ApiError).details as any;
    const arr = details?.detail;
    if (Array.isArray(arr)) {
      arr.forEach((d: any) => {
        const loc = d?.loc;
        let key = "form";
        if (Array.isArray(loc) && loc.length > 0) key = loc[loc.length - 1];
        else if (typeof d?.loc === "string") key = d.loc;
        const msg = d?.msg || d?.error || JSON.stringify(d?.ctx || "");
        out[key] = msg;
      });
    }
  } catch {
    /* ignore */
  }
  return out;
}

export type LoginResponse = {
  id?: string;
  email?: string;
  username?: string;
  full_name?: string;
  company?: string;
  job_title?: string;
  is_active?: boolean;
  is_verified?: boolean;
  is_premium?: boolean;
  subscription_tier?: string;
  monthly_search_limit?: number;
  monthly_searches_used?: number;
  created_at?: string;
  token?: string;
  access_token?: string;
  accessToken?: string;
  refresh_token?: string;
  session_id?: string;
  token_type?: string;
};

export async function loginAndGetToken(
  email: string,
  password: string
): Promise<LoginResponse> {
  // OAuth2 password grant - form-urlencoded with username field
  const params = new URLSearchParams({
    grant_type: "password",
    username: email.trim(),
    password,
  });
  // IMPORTANT: Skip token refresh for login - user isn't authenticated yet!
  const data: LoginResponse = await apiFetch(
    `/api/v1/auths/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    },
    15000,
    true // skipTokenRefresh = true for login endpoint
  );
  const token = data?.token || data?.access_token || data?.accessToken;
  if (!token) {
    const err: ApiError = new Error("No token returned from server");
    err.status = 500;
    throw err;
  }
  return data;
}

export function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export type RegisterUserData = {
  full_name: string;
  email: string;
  username: string;
  password: string;
  company?: string;
  job_title?: string;
  department?: string;
  phone?: string;
};

export type RegisterUserResponse = {
  success: boolean;
  message?: string;
  user?: {
    id: string | number;
    email: string;
    username: string;
    full_name: string;
    company?: string;
    job_title?: string;
    department?: string;
    phone?: string;
    is_active?: boolean;
    is_verified?: boolean;
    created_at?: string;
  };
};

export async function registerUser(
  data: RegisterUserData
): Promise<RegisterUserResponse> {
  try {
    const response = await apiFetch("/api/v1/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return {
      success: true,
      message: "Account created successfully",
      user: response,
    };
  } catch (error) {
    const apiError = error as ApiError;
    // Extract the best error message
    let errorMessage = "Registration failed. Please try again.";
    
    // Check for detail in the error details
    const details = apiError.details as any;
    if (details) {
      if (typeof details.detail === 'string') {
        errorMessage = details.detail;
      } else if (Array.isArray(details.detail) && details.detail.length > 0) {
        const firstError = details.detail[0];
        errorMessage = firstError?.msg || firstError?.message || errorMessage;
      }
    } else if (apiError.message && !apiError.message.startsWith('Request failed')) {
      errorMessage = apiError.message;
    }
    
    return {
      success: false,
      message: errorMessage,
    };
  }
}

// Chat API functions
export type ChatMessage = {
  message: string;
  session_id?: string | null;
  temperature?: number;
  candidate_context?: {
    id?: number;
    name?: string;
    data?: any;
  };
};

export type ChatResponse = {
  message?: string;
  response?: string;
  answer?: string;
  session_id?: string;
  timestamp?: string;
  status?: string;
};

export async function sendChatMessage(
  data: ChatMessage
): Promise<ChatResponse> {
  // Use fetch directly for local API routes to avoid baseUrl prepending
  const token = getCookie("hg_token");
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch("/api/chat", {
    method: "POST",
    headers,
    body: JSON.stringify({
      message: data.message,
      session_id: data.session_id,
      temperature: data.temperature,
      candidate_context: data.candidate_context,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorData: any = null;
    try {
      errorData = errorText ? JSON.parse(errorText) : null;
    } catch {
      /* non-json */
    }
    const err: ApiError = new Error(
      errorData?.message ||
        errorData?.error ||
        `Request failed (${response.status})`
    );
    err.status = response.status;
    err.details = errorData;
    throw err;
  }

  return await response.json();
}

export type ChatHistoryResponse = {
  messages: Array<{
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: string;
    session_id: string;
  }>;
  total: number;
  has_more: boolean;
};

export async function getChatHistory(
  sessionId?: string,
  limit = 50,
  offset = 0
): Promise<ChatHistoryResponse> {
  const params = new URLSearchParams();
  if (sessionId) params.append("session_id", sessionId);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  return await apiFetch(`/api/v1/chat/chat/history?${params.toString()}`);
}

export type ChatSession = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  message_count: number;
  last_message?: string;
};

export async function getChatSessions(
  limit = 20,
  offset = 0
): Promise<ChatSession[]> {
  const params = new URLSearchParams();
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  return await apiFetch(`/api/v1/chat/chat/sessions?${params.toString()}`);
}

export async function clearChatSession(sessionId: string): Promise<void> {
  const params = new URLSearchParams();
  params.append("session_id", sessionId);

  await apiFetch(`/api/v1/chat/chat/clear-session?${params.toString()}`, {
    method: "POST",
  });
}

export type SearchAnalysisResponse = {
  analysis_type: string;
  time_range: string;
  insights: string[];
  patterns: string[];
  recommendations: string[];
  generated_at: string;
};

export async function analyzeSearchHistory(
  analysisType: "patterns" | "insights" | "recommendations",
  timeRange = "30d"
): Promise<SearchAnalysisResponse> {
  const params = new URLSearchParams();
  params.append("analysis_type", analysisType);
  params.append("time_range", timeRange);

  return await apiFetch(`/api/v1/chat/chat/analyze-search?${params.toString()}`, {
    method: "POST",
  });
}

export type ChatAgentStatus = {
  name: string;
  status: "healthy" | "degraded" | "unhealthy" | "offline";
  last_activity: string;
  total_requests: number;
  successful_requests: number;
  failed_requests: number;
  average_response_time: number;
  current_load: number;
  max_concurrent_requests: number;
  version: string;
};

export async function getChatAgentStatus(): Promise<ChatAgentStatus> {
  return await apiFetch("/api/v1/chat/chat/status");
}

export type ChatTool = {
  name: string;
  description: string;
  parameters: any;
  enabled: boolean;
};

export async function getAvailableChatTools(): Promise<ChatTool[]> {
  return await apiFetch("/api/v1/chat/chat/tools");
}

// ===========================================
// SUBSCRIPTION & PLAN TYPES
// ===========================================

export type SubscriptionPlan = {
  name: string;
  price: number;
  currency: string;
  monthly_searches: number;
  features: string[];
};

export type SubscriptionPlansResponse = {
  plans: {
    basic: SubscriptionPlan;
    pro: SubscriptionPlan;
    business: SubscriptionPlan;
  };
};

export type SubscriptionStatus = "active" | "cancelled" | "expired" | "past_due" | "pending";

export type UserSubscription = {
  id: string;
  user_id: string;
  tier: "basic" | "pro" | "business";
  status: SubscriptionStatus;
  paystack_subscription_code?: string;
  paystack_customer_code?: string;
  monthly_search_limit: number;
  current_period_start?: string;
  current_period_end?: string;
  paid_until?: string;
  created_at: string;
  updated_at?: string;
};

export type UserProfile = {
  id: string;
  email: string;
  username?: string | null;
  full_name?: string | null;
  company?: string | null;
  job_title?: string | null;
  department?: string | null;
  phone?: string | null;
  is_active: boolean;
  is_verified: boolean;
  is_premium: boolean;
  subscription_tier: string;
  monthly_search_limit: number;
  monthly_searches_used: number;
  created_at: string;
  is_admin?: boolean;
  admin_role?: string | null;
};

export type PaystackSubscribeResponse = {
  authorization_url: string;
  access_code: string;
  reference: string;
};

// ===========================================
// SUBSCRIPTION API FUNCTIONS
// ===========================================

/**
 * Get all available subscription plans from backend
 */
export async function getSubscriptionPlans(): Promise<SubscriptionPlansResponse> {
  return await apiFetch("/api/v1/subscriptions/plans");
}

/**
 * Get current user's subscription
 */
export async function getMySubscription(): Promise<UserSubscription | null> {
  try {
    return await apiFetch("/api/v1/subscriptions/me");
  } catch (error) {
    const apiError = error as ApiError;
    // 404 means no subscription exists
    if (apiError.status === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * Get current user's profile (includes subscription info)
 */
export async function getCurrentUser(): Promise<UserProfile> {
  return await apiFetch("/api/v1/auths/me");
}

/**
 * Update user profile
 */
export async function updateUserProfile(data: Partial<{
  username: string;
  full_name: string;
  company: string;
  job_title: string;
  department: string;
}>): Promise<UserProfile> {
  return await apiFetch("/api/v1/auths/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

/**
 * Initiate Paystack subscription for a tier
 * Returns URL to redirect user to Paystack checkout
 */
export async function initiatePaystackSubscription(
  tier: "pro" | "business"
): Promise<PaystackSubscribeResponse> {
  return await apiFetch(`/api/v1/subscriptions/paystack/subscribe/${tier}`, {
    method: "POST",
  });
}

/**
 * Get Paystack customer portal link to manage subscription
 */
export async function getPaystackManageLink(): Promise<{ url: string }> {
  return await apiFetch("/api/v1/subscriptions/paystack/manage-link");
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(subscriptionId: string): Promise<{ success: boolean; message: string }> {
  return await apiFetch(`/api/v1/subscriptions/${subscriptionId}/cancel`, {
    method: "POST",
  });
}

/**
 * Get user's subscription history
 */
export async function getSubscriptionHistory(): Promise<UserSubscription[]> {
  return await apiFetch("/api/v1/subscriptions/me/history");
}

/**
 * Refresh token
 */
export async function refreshAccessToken(refreshToken: string): Promise<LoginResponse> {
  return await apiFetch("/api/v1/auths/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
}

/**
 * Logout user
 */
export async function logoutUser(): Promise<void> {
  try {
    await apiFetch("/api/v1/auths/logout", { method: "POST" });
  } finally {
    // Clear cookies regardless of API response
    document.cookie = "hg_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user_data");
  }
}

/**
 * Get user's search usage stats
 */
export async function getUserSearchStats(): Promise<{
  total_searches: number;
  monthly_searches: number;
  searches_this_week: number;
  last_search_date: string | null;
  average_searches_per_month: number;
}> {
  return await apiFetch("/api/v1/search/search/stats/total");
}

// ===========================================
// PASSWORD RESET API FUNCTIONS
// ===========================================

/**
 * Request password reset - sends OTP to user's email
 */
export async function requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
  try {
    await apiFetch(
      "/api/v1/users/reset-password-request",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      },
      15000,
      true // Skip token refresh - user isn't logged in
    );
    return { success: true, message: "Password reset code sent to your email." };
  } catch (error) {
    const apiError = error as ApiError;
    const details = apiError.details as any;
    const message = details?.detail || details?.message || apiError.message || "Failed to send reset code.";
    return { success: false, message };
  }
}

/**
 * Verify password reset OTP and set new password
 */
export async function verifyPasswordReset(data: {
  email: string;
  otp: string;
  new_password: string;
  confirm_password: string;
  current_password?: string; // Optional - empty for forgot password flow
}): Promise<{ success: boolean; message: string }> {
  try {
    await apiFetch(
      "/api/v1/users/reset-password-verify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email.trim(),
          otp: data.otp.trim(),
          current_password: data.current_password || "", // Empty for forgot password
          new_password: data.new_password,
          confirm_password: data.confirm_password,
        }),
      },
      15000,
      true // Skip token refresh - user isn't logged in
    );
    return { success: true, message: "Password reset successfully. You can now sign in." };
  } catch (error) {
    const apiError = error as ApiError;
    const details = apiError.details as any;
    const message = details?.detail || details?.message || apiError.message || "Failed to reset password.";
    return { success: false, message };
  }
}

// ===========================================
// COMPANY PROFILE API FUNCTIONS
// ===========================================

export interface CompanyProfileResponse {
  company_name: string;
  tagline?: string;
  industry: string;
  headquarters: string;
  stage: "pre-seed" | "seed" | "series_a" | "series_b" | "series_c" | "growth" | "public";
  team_size: number;
  funding_raised: number;
  monthly_revenue: number;
  is_profitable: boolean;
  compensation_philosophy: "market_rate" | "below_market_equity" | "equity_only";
  remote_policy: "remote_first" | "hybrid" | "office_only";
  mission: string;
  bio: string;
  unique_selling_points: string[];
  growth_potential: string;
  attractiveness_score: number;
  risk_level: "high" | "medium" | "low";
}

/**
 * Get current user's company profile
 */
export async function getCompanyProfile(): Promise<CompanyProfileResponse | null> {
  try {
    const response = await apiFetch("/api/v1/users/company-profile");
    return response?.profile || response || null;
  } catch (error) {
    const apiError = error as ApiError;
    if (apiError.status === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * Update company profile
 */
export async function updateCompanyProfile(data: Partial<CompanyProfileResponse>): Promise<{
  message: string;
  profile: CompanyProfileResponse;
  attractiveness_score: number;
  risk_level: string;
}> {
  return await apiFetch("/api/v1/users/company-profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

/**
 * Calculate attractiveness score breakdown (client-side calculation matching backend)
 */
export function calculateAttractivenessBreakdown(profile: CompanyProfileResponse | null): {
  total: number;
  breakdown: Array<{ label: string; value: number; earned: boolean; tip?: string }>;
} {
  if (!profile) {
    return {
      total: 0,
      breakdown: [
        { label: "Base Score", value: 30, earned: false, tip: "Complete your company profile" },
        { label: "Series Funding", value: 20, earned: false, tip: "Update your funding stage" },
        { label: "Notable Investors", value: 15, earned: false, tip: "Add your investors" },
        { label: "Revenue Traction", value: 15, earned: false, tip: "Add monthly revenue > $100k" },
        { label: "Remote First", value: 10, earned: false, tip: "Set remote-first policy" },
        { label: "Profitable", value: 10, earned: false, tip: "Mark as profitable" },
        { label: "Detailed Bio", value: 5, earned: false, tip: "Add 500+ character bio" },
      ]
    };
  }

  const breakdown: Array<{ label: string; value: number; earned: boolean; tip?: string }> = [];
  let total = 30; // Base score
  breakdown.push({ label: "Base Score", value: 30, earned: true });

  // Stage bonus
  if (["series_a", "series_b", "series_c"].includes(profile.stage)) {
    total += 20;
    breakdown.push({ label: "Series Funding", value: 20, earned: true });
  } else if (profile.stage === "seed") {
    total += 10;
    breakdown.push({ label: "Seed Stage", value: 10, earned: true, tip: "Series funding = +20" });
  } else if (profile.stage === "growth") {
    total += 25;
    breakdown.push({ label: "Growth Stage", value: 25, earned: true });
  } else if (profile.stage === "public") {
    total += 30;
    breakdown.push({ label: "Public Company", value: 30, earned: true });
  } else {
    breakdown.push({ label: "Stage Bonus", value: 0, earned: false, tip: "Seed = +10, Series = +20" });
  }

  // Revenue bonus
  if (profile.monthly_revenue && profile.monthly_revenue > 100000) {
    total += 15;
    breakdown.push({ label: "Revenue Traction", value: 15, earned: true });
  } else {
    breakdown.push({ label: "Revenue Traction", value: 0, earned: false, tip: "> $100k MRR = +15" });
  }

  // Remote bonus
  if (profile.remote_policy === "remote_first") {
    total += 10;
    breakdown.push({ label: "Remote First", value: 10, earned: true });
  } else {
    breakdown.push({ label: "Remote Policy", value: 0, earned: false, tip: "Remote-first = +10" });
  }

  // Profitability bonus
  if (profile.is_profitable) {
    total += 10;
    breakdown.push({ label: "Profitable", value: 10, earned: true });
  } else {
    breakdown.push({ label: "Profitability", value: 0, earned: false, tip: "Profitable = +10" });
  }

  // Bio bonus
  if (profile.bio && profile.bio.length > 500) {
    total += 5;
    breakdown.push({ label: "Detailed Bio", value: 5, earned: true });
  } else {
    breakdown.push({ label: "Bio Detail", value: 0, earned: false, tip: "500+ chars = +5" });
  }

  return { total: Math.min(100, total), breakdown };
}
