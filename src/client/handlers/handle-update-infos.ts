import { getCurrentUser, setCurrentUser } from "@/utils/user-store";
import { authFetch } from "@/services/auth-fetch";
import { router } from "@/router/router";

export function handleUpdateInfos() {
  const editBtn = document.getElementById("edit-btn");

  editBtn?.addEventListener("click", () => {
    const editForm = document.getElementById("edit-form") as HTMLFormElement;
    editForm?.classList.toggle("hidden");
    editForm?.classList.toggle("flex");
    if (editForm?.classList.contains("hidden")) {
      editBtn.textContent = "Edit";
    } else {
      editBtn.textContent = "Cancel";
    }

    const newForm = editForm.cloneNode(true) as HTMLFormElement;
    editForm.parentNode?.replaceChild(newForm, editForm);

    newForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nameInput = newForm.querySelector<HTMLInputElement>("#name");

      if (!nameInput) return;

      const name = nameInput.value.trim();
      const user = getCurrentUser();
      if (!user) return;

      let usernameUpdated = false;

      if (name && name !== user.username) {
        try {
          const res = await authFetch("/auth/me");
          if (!res.ok) return null;

          const result = await res.json();
          const id = result.data?.id;
          if (!id) return null;

          const profileRes = await fetch(`/profile/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: name }),
          });
          if (profileRes.ok) {
            user.username = name;
            usernameUpdated = true;
          } else {
            alert("Failed to update username.");
            return;
          }
        } catch {
          alert("Network error while updating username.");
          return;
        }
      }

      setCurrentUser(user);

      history.pushState({}, "", "/my_profile");
      window.dispatchEvent(new PopStateEvent("popstate"));

      newForm.classList.add("hidden");
      newForm.classList.remove("flex");
      editBtn.textContent = "Edit";
    });
  });
}
