export async function acceptFriend(id: number): Promise<boolean> {
  try {
    const res = await fetch("/friends/accept", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requesterId: id }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Friend accept failed:", res.statusText);
      return false;
    }

    console.log("Friend accepted:", data?.code);
    return true;
  } catch (err) {
    console.error("Error accepting friend:", err);
    return false;
  }
}
