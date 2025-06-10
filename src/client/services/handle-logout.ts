import { clearCurrentUser } from "@/utils/user-store";

function finishLogout() {
  clearCurrentUser();

  history.replaceState(null, "", "/welcome");
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function handleLogout(): void {
  fetch("/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      const data = await res.json().catch(() => ({}));
      if (res.status === 200 || res.status === 401) {
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
}
