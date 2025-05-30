export function setupApp2FA() {
  const enableBtn = document.querySelector("#enable-app") as HTMLButtonElement;
  console.log("Enable App 2FA button:", enableBtn);
  if (!enableBtn) return;

  const accessToken = localStorage.getItem("accessToken");
  console.log("Access Token:", accessToken);

  enableBtn.addEventListener("click", async () => {
	console.log("Enabling app 2FA...");
    try {
      const response = await fetch("/2fa/app/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
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
  });
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

export async function disableApp2FA() {
  try {
  } catch (error) {}
}

export async function disableEmail2FA() {
  try {
  } catch (error) {}
}

export async function setPrimaryApp2FA() {
  try {
  } catch (error) {}
}

export async function setPrimaryEmail2FA() {
  try {
  } catch (error) {}
}
