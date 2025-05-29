import { router } from "@/router/router";

async function refreshToken(): Promise<string | null> {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) return null;

  try {
    const res = await fetch("/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refresh }),
    });

    if (!res.ok) throw new Error("Refresh failed");

    const data = await res.json();
    localStorage.setItem("accessToken", data.data.accessToken);
    if (data.data.refreshToken) {
      localStorage.setItem("refreshToken", data.data.refreshToken);
    }
    return data.data.accessToken;
  } catch (err) {
    console.error("Failed to refresh token", err);
    return null;
  }
}

export async function authFetch(
  url: string,
  options: RequestInit = {},
  retry = true
): Promise<Response> {
  const token = localStorage.getItem("accessToken");

  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401 && retry) {
    const newToken = await refreshToken();

    if (newToken) {
      // Retry request with new token
      const retryHeaders = {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
      };
      return authFetch(url, { ...options, headers: retryHeaders }, false);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      history.replaceState(null, "", "/signin");
      await router();
      throw new Error("Session expired. Please log in again.");
    }
  }

  return res;
}
