import { authFetch } from "@/utils/auth-fetch";

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

    return await profileRes.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
