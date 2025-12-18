import baseUrl from "./config";

export type ApiError = Error & { status?: number; details?: unknown };

export async function apiFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
  timeoutMs = 15000
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const url =
      typeof input === "string" && input.startsWith("/")
        ? `${baseUrl}${input}`
        : input;

    // Get token from cookies and add Authorization header
    const token = getCookie("hg_token");
    const headers = new Headers(init?.headers);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(url, {
      ...init,
      headers,
      signal: controller.signal,
    });
    const text = await res.text();
    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      /* non-json */
    }
    if (!res.ok) {
      const err: ApiError = new Error(
        data?.message || data?.error || `Request failed (${res.status})`
      );
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
  if (err?.status === 400)
    return {
      title: "Invalid data",
      description: err.message || "Please review the form and try again.",
    };
  if (err?.status === 401)
    return {
      title: "Invalid credentials",
      description: err.message || "Username or password is incorrect.",
    };
  if (err?.status === 409)
    return {
      title: "Account exists",
      description:
        err.message || "An account with these details already exists.",
    };
  if (err?.status === 422)
    return {
      title: "Validation error",
      description: err.message || "Please correct the highlighted fields.",
    };
  if (err?.status === 500)
    return {
      title: "Server error",
      description: "Something went wrong on our side. Please try again.",
    };
  return {
    title: "Error",
    description:
      (err as any)?.message || "Something went wrong. Please try again.",
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
  const params = new URLSearchParams({ username: email.trim(), password });
  const data: LoginResponse = await apiFetch(`/api/v1/auths/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
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
    return {
      success: false,
      message: apiError.message || "Registration failed. Please try again.",
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
