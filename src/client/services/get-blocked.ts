export async function getBlockedUsers(): Promise<number[]> {
  try {
    const res = await fetch("/block/list", {
      credentials: "include",
    });

    if (!res.ok) return [];

    const data = await res.json();
    console.log(data);
    const blockedIds = data.data.blockList.map(
      (b: { blocked_id: number }) => b.blocked_id
    );
    return blockedIds;
  } catch (err) {
    console.log(err);
    return [];
  }
}
