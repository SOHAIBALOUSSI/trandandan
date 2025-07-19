export async function acceptInvite(
  roomId: string,
  senderId: number,
  receiverId: number
) {
  const res = await fetch("http://localhost:5000/accept", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomId, senderId, receiverId }),
  });
  return res.json();
}
