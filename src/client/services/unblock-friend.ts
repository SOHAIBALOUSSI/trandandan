import { displayToast } from "@/utils/display-toast";
import { hydrateFriends } from "@/handlers/hydrate-friends";
import { FriendUnblockRes } from "@/utils/response-messages";

export async function unblockFriend(id: number): Promise<void> {
  fetch(`/block/${id}`, {
    method: "DELETE",
    credentials: "include",
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        displayToast(
          FriendUnblockRes[data.code] ||
            "Failed to block friend. Please try again.",
          "error"
        );
      } else {
        displayToast(FriendUnblockRes.BLOCK_SUCCESS, "success");
        await hydrateFriends();
      }
    })
    .catch(() => {
      displayToast(FriendUnblockRes.INTERNAL_SERVER_ERROR, "error");
      return false;
    });
}
