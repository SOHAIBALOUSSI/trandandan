export async function getUserHistory(userId: number) : Promise<any[]> {
  try {
    const response = await fetch("http://localhost:5000/user-history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error fetching user history:", data);
      return [];
    }
    return data;
  } catch (error) {
    console.error("Error fetching user history:", error);
    return [];
  }
}
