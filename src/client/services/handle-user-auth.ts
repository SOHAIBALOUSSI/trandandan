export async function getUserProfile() {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const res = await fetch("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch user");
    const json = await res.json();

    const id = json.data?.id;
    if (!id) throw new Error("User ID not found");

    console.log("id: " + id);

    const profileRes = await fetch(`/profile/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!profileRes.ok) throw new Error("Failed to fetch profile");

    return await profileRes.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
