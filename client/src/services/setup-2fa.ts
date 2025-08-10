import { Setup2FaRes } from "@/utils/response-messages";
import { displayToast } from "@/utils/display-toast";
import { verify2FASetup } from "@/services/verify-2fa-setup";

export async function setup2FA(mode: "app" | "email") {
  const isAppMode = mode === "app";
  const verifySectionId = `${mode}-verify-section`;
  const otpInputId = `${mode}-otp`;
  const verifyBtnId = `${mode}-verify-btn`;
  const qrImgId = "app-qr";

  const setupBtn = document.getElementById(
    `${mode}-setup-btn`
  ) as HTMLButtonElement;
  const setPrimaryBtn = document.getElementById(
    `${mode}-set-primary`
  ) as HTMLButtonElement;
  const toggleEnableBtn = document.getElementById(
    `${mode}-toggle-enable`
  ) as HTMLButtonElement;
  const statusLabel = document.getElementById(
    `${mode}-status-label`
  ) as HTMLElement;
  const primaryLabel = document.getElementById(
    `${mode}-primary-label`
  ) as HTMLElement;

  const verifySection = document.getElementById(verifySectionId) as HTMLElement;
  const otpInput = document.getElementById(otpInputId) as HTMLInputElement;
  const verifyBtn = document.getElementById(verifyBtnId) as HTMLButtonElement;
  const qrImg = document.getElementById(qrImgId) as HTMLImageElement;

  if (!verifySection || !otpInput || !verifyBtn) return;

  try {
    const response = await fetch(`/2fa/${mode}/setup`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (
      response.status === 200 ||
      (response.status === 400 && data.code === "TWOFA_ALREADY_PENDING")
    ) {
      verifySection.classList.remove("hidden");
      if (isAppMode && qrImg && data.data?.qrCode) {
        qrImg.src = data.data.qrCode;
        qrImg.classList.remove("hidden");
      }

      verifyBtn.replaceWith(verifyBtn.cloneNode(true));
      const newVerifyBtn = document.getElementById(
        verifyBtnId
      ) as HTMLButtonElement;
      newVerifyBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (!otpInput.value) {
          displayToast("Please enter the 6-digit code.", "error");
		  otpInput.focus();
          return;
        }
        if (otpInput.value.length !== 6) {
          displayToast("Please enter a valid 6-digit code.", "error");
          otpInput.focus();
          return;
        }
        if (!/^\d{6}$/.test(otpInput.value)) {
          displayToast("The code must contain only digits.", "error");
          otpInput.focus();
          return;
        }
        verify2FASetup(otpInput.value, mode, () => {
          verifySection.classList.add("hidden");
          displayToast("2FA setup successful!", "success");
          setupBtn.classList.add("hidden");
          setPrimaryBtn.classList.remove("hidden");
          toggleEnableBtn.classList.remove("hidden");
          toggleEnableBtn.textContent = "Disable";
          statusLabel.textContent = "Enabled";
          statusLabel.className =
            "ml-2 px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700";
          primaryLabel.textContent = "Primary";
          primaryLabel.className =
            "ml-2 px-2 py-1 text-xs font-bold rounded-full bg-blue-200 text-blue-700";
          setPrimaryBtn.setAttribute("disable", "true");
        });
      });
    } else {
      verifySection.classList.add("hidden");
      displayToast(Setup2FaRes[data.code] || "Failed to enable 2FA.", "error");
    }
  } catch {
    verifySection.classList.add("hidden");
    displayToast(Setup2FaRes.INTERNAL_SERVER_ERROR, "error");
  }
}
