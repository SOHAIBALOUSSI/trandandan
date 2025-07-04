async function refreshToken() {
  const res = await fetch("/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  return res.status === 200;
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
    const refreshed = await refreshToken();

    if (refreshed) {
      return authFetch(url, options, false);
    } else {
      return res;
    }
  }

  return res;
}
