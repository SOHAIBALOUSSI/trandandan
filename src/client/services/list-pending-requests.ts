export async function listPendingRequests(): Promise<number[]> {
  try {
    const res = await fetch("/friends/requests", {
      credentials: "include",
    });

    if (!res.ok) return [];

    const data = await res.json();
    const requesterIds = data.data.requests.map(
      (r: { requester_id: number }) => r.requester_id
    );
    return requesterIds;
  } catch {
    return [];
  }
}
