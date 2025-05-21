export function Logout() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (accessToken && refreshToken) {
    fetch("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ token: refreshToken }),
    }).catch((err) => {
      console.error("Logout error:", err);
    });
  }

  // Clear authentication state
  localStorage.removeItem("auth");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  history.replaceState(null, "", "/welcome");
  window.dispatchEvent(new PopStateEvent("popstate"));

  const section = document.createElement("section");
  return section;
}
