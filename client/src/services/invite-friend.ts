import { displayToast } from "@/utils/display-toast";
import { getCurrentUser } from "@/utils/user-store";

export async function inviteFriend(receiverId: number): Promise<Response> {
  try {
    console.log("invite id: ", receiverId);
    const res = await fetch("/game/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ receiverId }),
    });
    if (res.ok) {
      displayToast("Challenge issued successfully", "success");
    } else {
      console.log(res);
      displayToast(
        "Failed to issue the challenge. Try again, warrior!",
        "error"
      );
    }
    return res;
  } catch {
    displayToast("Connection lost. Challenge could not be sent.", "error");
    throw new Error("Connection lost");
  }
}
