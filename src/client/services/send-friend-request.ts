import { displayToast } from "@/utils/display-toast";
import { FriendRequestRes } from "@/utils/response-messages";

export function sendFriendRequest(id: number) {
  fetch("/friends/request", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ addresseeId: id }),
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        displayToast(
          FriendRequestRes[data?.code] ||
            "Error sending friend request. Please try again.",
          "error"
        );
      } else {
        displayToast(FriendRequestRes.FRIEND_REQUEST_SENT, "success");
      }
    })
    .catch(() => {
      displayToast(FriendRequestRes.INTERNAL_SERVER_ERROR, "error");
    });
}
