import { getCurrentUser, setCurrentUser } from "@/utils/user-store";

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

      if (name && name !== user.username) {
        try {
          const profileRes = await fetch(`/profile/${user.id}`, {
            method: "PATCH",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: name }),
          });
          if (profileRes.ok) {
            user.username = name;
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
