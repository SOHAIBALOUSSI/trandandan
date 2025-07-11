import { UserProfile } from "types/types";
import MaleAvatar from "@/assets/male.png";
import FemaleAvatar from "@/assets/female.png";

const BACKEND_URL = "http://localhost:3001";

let currentUser: UserProfile | null = null;

export function setCurrentUser(apiResponse: any) {
  if (apiResponse && apiResponse.data && apiResponse.data.profile) {
    currentUser = apiResponse.data.profile;
    if (currentUser) {
      if (!currentUser.avatar_url || currentUser.avatar_url === "") {
        currentUser.avatar_url = (
          currentUser.gender === "M" ? MaleAvatar : FemaleAvatar
        ) as string;
      } else if (
        !currentUser.avatar_url.startsWith("http") &&
        !currentUser.avatar_url.startsWith("/")
      ) {
        currentUser.avatar_url = `${BACKEND_URL}/profile/avatar/${currentUser.avatar_url}`;
      }
    }
  }
}

export function getCurrentUser(): UserProfile | null {
  return currentUser;
}

export function clearCurrentUser() {
  currentUser = null;
}
