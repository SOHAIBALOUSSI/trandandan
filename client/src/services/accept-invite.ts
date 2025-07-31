export async function acceptInvite(
  roomId: string,
  senderId: number,
  receiverId: number
): Promise<void> {
  try {
    const res = await fetch("http://localhost:5000/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, senderId, receiverId }),
    });
    if (!res.ok) {
      console.error("Failed to accept invite");
    }
  } catch (error) {
    console.error("Error accepting invite:", error);
  }
}
