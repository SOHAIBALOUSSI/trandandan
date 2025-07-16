import { displayToast } from "@/utils/display-toast";
import { hydrateFriends } from "@/handlers/hydrate-friends";
import { FriendUnblockRes } from "@/utils/response-messages";

export async function unblockFriend(id: number): Promise<boolean> {
  try {
    const res = await fetch(`/block/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      displayToast(
        FriendUnblockRes[data.code] ||
          "Failed to unblock friend. Please try again.",
        "error"
      );
      return false;
    }
    displayToast(FriendUnblockRes.UNBLOCK_SUCCESS, "success");
    return true;
  } catch (error) {
    displayToast(FriendUnblockRes.INTERNAL_SERVER_ERROR, "error");
    return false;
  }
}
