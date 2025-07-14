import { hydrateFriends } from "@/handlers/hydrate-friends";
import { displayToast } from "@/utils/display-toast";
import { FriendRemoveRes } from "@/utils/response-messages";

export async function removeFriend(memberId: number): Promise<void> {
  fetch(`/friends/${memberId}`, {
    method: "DELETE",
    credentials: "include",
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        displayToast(
          FriendRemoveRes[data.code] ||
            "Failed to remove friend. Please try again.",
          "error"
        );
      } else {
        displayToast(FriendRemoveRes.FRIEND_REMOVED, "success");
        await hydrateFriends();
      }
    })
    .catch(() => {
      displayToast(FriendRemoveRes.INTERNAL_SERVER_ERROR, "error");
    });
}
