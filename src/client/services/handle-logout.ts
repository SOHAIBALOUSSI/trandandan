function finishLogout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  history.replaceState(null, "", "/welcome");
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function handleLogout(): void {
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
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.status === 200) {
          finishLogout();
        } else if (res.status === 401) {
          finishLogout();
        } else if (res.status === 500) {
          alert("Server error during logout. Please try again.");
        } else {
          alert(data?.code || "Logout failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Logout error:", err);
        alert("Network error during logout. Please try again.");
      });
  } else {
    finishLogout();
  }
}
