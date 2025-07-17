export async function inviteFriend(senderId: string, receiverId: string) {
  try {
    const res = await fetch("/game/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderId, receiverId }),
    });
    const data = await res.json();
    if (res.ok) {
      return data.message || "invite sent successfully";
    } else {
      throw new Error(data.error || "Failed to send invite");
    }
  } catch (err) {
    return "Error sending invite: " + err;
  }
}
