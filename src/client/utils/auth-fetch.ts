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
    throw new Error("Token refresh failed: Unauthorized");
  } else {
    throw new Error("Token refresh failed");
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

  console.log(res.statusText);

  if (res.status === 401 && retry) {
    const refreshSuccess = await refreshToken();

    if (refreshSuccess) {
      return authFetch(url, options, false);
    } else {
      history.replaceState(null, "", "/signin");
      await router();
      throw new Error("Session expired. Please log in again.");
    }
  }

  return res;
}
