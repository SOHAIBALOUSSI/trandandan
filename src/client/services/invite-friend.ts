export async function inviteFriend(senderId: string, receiverId: string) {
  try {
    const res = await fetch("http://localhost:5000/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderId, receiverId }),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      return data.message || "invite sent successfully";
    } else {
      throw new Error(data.error || "Failed to send invite");
    }
  } catch (err) {
    return "Error sending invite: " + err;
  }
}
