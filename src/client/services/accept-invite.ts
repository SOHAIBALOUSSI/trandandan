export async function acceptInvite(
  roomId: string,
  senderId: string,
  receiverId: string
) {
  const res = await fetch("/http://localhost:5000/accept", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomId, senderId, receiverId }),
  });
  return res.json();
}
