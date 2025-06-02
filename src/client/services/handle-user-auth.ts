import { authFetch } from "@/utils/auth-fetch";
import { setCurrentUser } from "@/utils/user-store";

// Function to get user profile from the server
export async function getUserProfile() {
  try {
    const res = await authFetch("/auth/me");

    if (!res.ok) throw new Error("Failed to fetch user");
    const json = await res.json();

    const id = json.data?.id;
    if (!id) throw new Error("User ID not found");

    const profileRes = await authFetch(`/profile/${id}`);
    if (!profileRes.ok) throw new Error("Failed to fetch profile");

    const profile = await profileRes.json();
    setCurrentUser(profile); // Save profile globally

    return profile;
  } catch (err) {
    console.error(err);
    return null;
  }
}
