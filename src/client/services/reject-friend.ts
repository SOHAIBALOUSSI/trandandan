export async function rejectFriend(id: number): Promise<boolean> {
  try {
    const res = await fetch("/friends/reject", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requesterId: id }),
    });

    if (!res.ok) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}
