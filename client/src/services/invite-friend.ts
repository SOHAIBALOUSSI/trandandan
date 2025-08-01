import { displayToast } from "@/utils/display-toast";

export async function inviteFriend(senderId: number, receiverId: number) {
  try {
    const res = await fetch("/game/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderId, receiverId }),
    });
    if (res.ok) {
      displayToast("Challenge issued successfully", "success");
    } else {
      displayToast(
        "Failed to issue the challenge. Try again, warrior!",
        "error"
      );
    }
  } catch {
    displayToast("Connection lost. Challenge could not be sent.", "error");
  }
}
