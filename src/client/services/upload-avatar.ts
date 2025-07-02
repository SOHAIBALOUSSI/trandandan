import { UserProfile } from "types/types";

export function uploadAvatar(props: { user: UserProfile }) {
  const btn = document.getElementById("upload-avatar-btn") as HTMLButtonElement;
  const avatar = document.getElementById("member-avatar") as HTMLImageElement;
  if (!btn || !avatar) return;

  let fileInput = document.getElementById(
    "avatar-file-input"
  ) as HTMLInputElement | null;
  if (!fileInput) {
    fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.id = "avatar-file-input";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);
  }

  btn.addEventListener("click", (e: Event) => {
    e.preventDefault();
    fileInput!.click();
  });

  fileInput.addEventListener("change", async () => {
    const file = fileInput!.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/profile/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data?.data?.avatar_url) {
        const avatarUrl = `/profile/avatar/${data.data.avatar_url}`;
        avatar.src = avatarUrl;
        props.user.avatar_url = avatarUrl;
      } else {
        alert(data?.code || "Failed to upload avatar.");
      }
    } catch (error) {
      alert("Error uploading avatar.");
      console.log(error);
    } finally {
      fileInput!.value = "";
    }
  });
}
