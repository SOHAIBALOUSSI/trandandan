export async function unblockFriend(id: number): Promise<boolean> {
  try {
    const res = await fetch(`/block/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blockedId: id }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Friend unblock failed:", res.statusText);
      return false;
    }

    console.log("Friend unblocked:", data?.code);
    return true;
  } catch (err) {
    console.error("Error unblocking friend:", err);
    return false;
  }
}
