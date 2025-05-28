export async function setupApp2FA() {
  try {
    const response = await fetch("/2fa/app/setup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to enable 2FA");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error enabling 2FA:", error);
    throw error;
  }
}

export async function setupEmail2FA() {
  try {
    const response = await fetch("/2fa/email/setup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to enable email 2FA");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error enabling email 2FA:", error);
    throw error;
  }
}
