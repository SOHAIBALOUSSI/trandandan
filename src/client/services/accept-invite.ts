export async function acceptInvite(
  roomId: string,
  senderId: string,
  receiverId: string
) {
  const res = await fetch("/game/accept", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomId, senderId, receiverId }),
  });
  return res.json();
}
