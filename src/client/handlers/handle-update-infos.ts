import { getCurrentUser, setCurrentUser } from "@/utils/user-store";

export function handleUpdateInfos() {
  const editBtn = document.getElementById("edit-btn");

  editBtn?.addEventListener("click", () => {
    const editForm = document.getElementById("edit-form") as HTMLFormElement;
    editForm?.classList.toggle("hidden");
    editForm?.classList.toggle("flex");
    editBtn.textContent = editForm?.classList.contains("hidden")
      ? "Edit"
      : "Cancel";

    const newForm = editForm.cloneNode(true) as HTMLFormElement;
    editForm.parentNode?.replaceChild(newForm, editForm);

    const fileInput = newForm.querySelector<HTMLInputElement>("#profile-photo");
    const previewImg = newForm.querySelector<HTMLImageElement>(
      "#profile-photo-preview"
    );
    if (!fileInput || !previewImg) return;
    fileInput?.addEventListener("change", () => {
      const file = fileInput.files?.[0];
      if (file) {
        previewImg.src = URL.createObjectURL(file);
        previewImg.classList.remove("hidden");
      } else {
        previewImg.src = "";
        previewImg.classList.add("hidden");
      }
    });

    newForm.addEventListener("submit", async (e: Event) => {
      e.preventDefault();

      const user = getCurrentUser();
      if (!user) return;

      const nameInput = newForm.querySelector<HTMLInputElement>("#name");
      const newName = nameInput?.value.trim();
      const file = fileInput?.files?.[0];

      const formData = new FormData();
      let hasChange = false;

      if (newName && newName !== user.username) {
        formData.append("username", newName);
        hasChange = true;
      }
      if (file) {
        formData.append("avatar", file);
        hasChange = true;
      }

      if (!hasChange) {
        alert("No changes to update.");
        return;
      }

      try {
        const profileRes = await fetch(`/profile/user/${user.id}`, {
          method: "PATCH",
          credentials: "include",
          body: formData,
        });
        console.log(profileRes.status, profileRes.statusText);
        if (profileRes.ok) {
          const updated = await profileRes.json();
          setCurrentUser({ ...user, ...updated.data?.profile });
        } else {
          alert("Failed to update profile.");
          return;
        }
      } catch {
        alert("Network error while updating profile.");
        return;
      }

      history.pushState({}, "", "/my_profile");
      window.dispatchEvent(new PopStateEvent("popstate"));

      newForm.classList.add("hidden");
      newForm.classList.remove("flex");
      editBtn.textContent = "Edit";
    });
  });
}
