export async function blockFriend(id: number): Promise<boolean> {
  try {
    const res = await fetch(`/block/${id}`, {
      method: "POST",
      credentials: "include"
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Friend block failed:", res.statusText);
      return false;
    }

    console.log("Friend blocked:", data?.code);
    return true;
  } catch (err) {
    console.error("Error blocking friend:", err);
    return false;
  }
}
