import { router } from "@/router/router";

async function refreshToken() {
  const res = await fetch("/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (res.status === 200) {
    const data = await res.json();
    return data.accessToken;
  } else if (res.status === 401) {
    return false;
  } else {
    console.error("Token refresh failed with status:", res.status);
    return false;
  }
}

export async function authFetch(
  url: string,
  options: RequestInit = {},
  retry = true
): Promise<Response> {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (res.status === 401 && retry) {
    const refreshSuccess = await refreshToken();

    if (refreshSuccess) {
      return authFetch(url, options, false);
    } else {
      return res;
    }
  }

  return res;
}
