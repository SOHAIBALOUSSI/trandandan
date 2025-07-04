export async function listPendingRequests() {
  try {
    const res = await fetch("/profile/requests", {
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to fetch pending requests:", res.statusText);
      return [];
    }

    const data = await res.json();
    return data.data.requests;
  } catch (err) {
    console.log(err);
    return [];
  }
}
