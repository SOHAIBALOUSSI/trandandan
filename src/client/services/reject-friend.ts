export async function rejectFriend(id: number): Promise<boolean> {
  try {
    const res = await fetch("/friends/reject", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requesterId: id }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Friend reject failed:", res.statusText);
      return false;
    }

    console.log("Friend rejected:", data?.code);
    return true;
  } catch (err) {
    console.error("Error rejecting friend:", err);
    return false;
  }
}
