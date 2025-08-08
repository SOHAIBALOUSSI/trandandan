import { getCurrentUser } from "@/utils/user-store";

export async function acceptInvite(roomId: string, senderId?: number, receiverId?: number): Promise<void> {
  try {
    const currentUser = getCurrentUser();
    const res = await fetch("/game/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
	  credentials: "include",
      body: JSON.stringify({ 
        roomId, 
        senderId: senderId || currentUser?.id, 
        receiverId: receiverId || currentUser?.id 
      }),
    });
    if (!res.ok) {
      console.error("Failed to accept invite");
    }
  } catch (error) {
    console.error("Error accepting invite:", error);
  }
}
