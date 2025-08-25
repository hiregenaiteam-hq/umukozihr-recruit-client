import baseUrl from "./config"

export type ApiError = Error & { status?: number; details?: unknown }

export async function apiFetch(input: RequestInfo | URL, init?: RequestInit, timeoutMs = 15000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const url = typeof input === "string" && input.startsWith("/") ? `${baseUrl}${input}` : input
    const res = await fetch(url, { ...init, signal: controller.signal })
    const text = await res.text()
    let data: any = null
    try { data = text ? JSON.parse(text) : null } catch { /* non-json */ }
    if (!res.ok) {
      const err: ApiError = new Error(data?.message || data?.error || `Request failed (${res.status})`)
      err.status = res.status
      err.details = data
      throw err
    }
    return data
  } catch (e: any) {
    if (e?.name === "AbortError") {
      const err: ApiError = new Error("Network timeout. Please check your connection and try again.")
      err.status = 0
      throw err
    }
    throw e
  } finally {
    clearTimeout(id)
  }
}

export function normalizeError(e: unknown): { title: string; description: string } {
  const err = e as ApiError
  if (err?.status === 400) return { title: "Invalid data", description: err.message || "Please review the form and try again." }
  if (err?.status === 401) return { title: "Invalid credentials", description: err.message || "Username or password is incorrect." }
  if (err?.status === 409) return { title: "Account exists", description: err.message || "An account with these details already exists." }
  if (err?.status === 422) return { title: "Validation error", description: err.message || "Please correct the highlighted fields." }
  if (err?.status === 500) return { title: "Server error", description: "Something went wrong on our side. Please try again." }
  return { title: "Error", description: (err as any)?.message || "Something went wrong. Please try again." }
}

export function parseValidationDetails(err: ApiError | unknown) {
  const out: Record<string, string> = {}
  try {
    const details = (err as ApiError).details as any
    const arr = details?.detail
    if (Array.isArray(arr)) {
      arr.forEach((d: any) => {
        const loc = d?.loc
        let key = "form"
        if (Array.isArray(loc) && loc.length > 0) key = loc[loc.length - 1]
        else if (typeof d?.loc === "string") key = d.loc
        const msg = d?.msg || d?.error || JSON.stringify(d?.ctx || "")
        out[key] = msg
      })
    }
  } catch { /* ignore */ }
  return out
}

export type LoginResponse = { token?: string; access_token?: string; accessToken?: string }

export async function loginAndGetToken(email: string, password: string): Promise<string> {
  const params = new URLSearchParams({ username: email.trim(), password })
  const data: LoginResponse = await apiFetch(`/auths/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  })
  const token = data?.token || data?.access_token || data?.accessToken
  if (!token) {
    const err: ApiError = new Error("No token returned from server")
    err.status = 500
    throw err
  }
  return token
}

export function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}
