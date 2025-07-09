export async function getAllUsers() {
  try {
    const res = await fetch("/profile/all", {
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Failed to fetch users:", errorData);
      return [];
    }

    const data = await res.json();
    return data.data.profiles;
  } catch (err) {
    console.error("Error fetching all users:", err);
    return [];
  }
}
