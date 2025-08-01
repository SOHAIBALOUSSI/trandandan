import { UserProfile } from "types/types";
import MaleAvatar from "@/assets/male-avatar.png";
import FemaleAvatar from "@/assets/female-avatar.png";

// Use environment variable or relative URL for HTTPS compatibility
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || window.location.origin;

export function getAvatarUrl(user: UserProfile): string {
  if (!user.avatar_url || user.avatar_url === "") {
    return user.gender === "M" ? MaleAvatar : FemaleAvatar;
  }
  if (user.avatar_url.startsWith("http") || user.avatar_url.startsWith("/")) {
    return user.avatar_url;
  }
  return `${BACKEND_URL}/profile/avatar/${user.avatar_url}`;
}
