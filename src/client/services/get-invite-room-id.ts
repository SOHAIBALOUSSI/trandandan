export async function getInviteRoomId(userId: string) {
  const res = await fetch("/game/getRoomId", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  const data = await res.json();
  return data.roomData;
}
