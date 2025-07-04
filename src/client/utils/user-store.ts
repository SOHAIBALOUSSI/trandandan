import { UserProfile } from "types/types";
import MaleAvatar from "@/assets/default-male-avatar.png";
import FemaleAvatar from "@/assets/default-female-avatar.png";

let currentUser: UserProfile | null = null;

export function setCurrentUser(apiResponse: any) {
  if (apiResponse && apiResponse.data && apiResponse.data.profile) {
    currentUser = apiResponse.data.profile;
    if (currentUser && currentUser.avatar_url === "") {
      currentUser.avatar_url = (
        currentUser.gender === "M" ? MaleAvatar : FemaleAvatar
      ) as string;
    }
  }
}

export function getCurrentUser(): UserProfile | null {
  return currentUser;
}

export function clearCurrentUser() {
  currentUser = null;
}
