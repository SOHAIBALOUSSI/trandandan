export function updateUsername(
  userId: number,
  newUsername: string
): Promise<Response> {
  const formData = new FormData();
  formData.append("username", newUsername);

  return fetch(`/profile/${userId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: newUsername }),
  });
}
