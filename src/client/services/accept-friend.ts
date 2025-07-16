export async function acceptFriend(id: number): Promise<boolean> {
  try {
    const res = await fetch("/friends/accept", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requesterId: id }),
    });

    if (!res.ok) return false;

    return true;
  } catch (err) {
    return false;
  }
}
