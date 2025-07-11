export function addFriend(id: number) {
  const addBtn = document.getElementById(
    `add-friend-btn-${id}`
  ) as HTMLButtonElement;
  if (!addBtn) return;

  console.log(addBtn);

  addBtn.addEventListener("click", async (e: Event) => {
    e.preventDefault();

    try {
      const res = await fetch("/profile/request", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addresseeId: id }),
      });

      const data = await res.json();
      if (data.ok) {
        console.log(data);
      } else {
        const msg = "Error sending friend request";
        console.log(msg);
      }
    } catch (err) {
      console.log(err);
    }
  });
}
