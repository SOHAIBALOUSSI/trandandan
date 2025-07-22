export async function getInviteRoomId(userId: string) {
  const res = await fetch("http://localhost:5000/getRoomId", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  const data = await res.json();
  return data.roomData;
}
