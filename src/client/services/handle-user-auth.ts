export async function getUserProfile() {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const res = await fetch("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch user");
    const data = await res.json();

    console.log(data.id);
    console.log(data.username);
    console.log(data.email);

    const profileRes = await fetch(`/profile/${data.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!profileRes.ok) throw new Error("Failed to fetch profile");

    return await profileRes.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
