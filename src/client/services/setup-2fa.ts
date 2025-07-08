import { Setup2FaRes, Verify2FaSetupRes } from "@/utils/response-messages";
import { displayToast } from "@/utils/display-toast";

export function verify2FASetup(
  otpCode: string,
  mode: "app" | "email",
  onSuccess?: () => void
) {
  fetch(`/2fa/${mode}/verify-setup`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ otpCode: otpCode }),
  })
    .then((response) =>
      response.json().then((data) => ({ status: response.status, data }))
    )
    .then(({ status, data }) => {
      if (status === 200) {
        if (onSuccess) onSuccess();
      } else {
        displayToast(Verify2FaSetupRes[data.code], "error");
      }
    })
    .catch((error) => {
      displayToast(Verify2FaSetupRes.INTERNAL_SERVER_ERROR, "error");
    });
}

export function setup2FA(mode: "app" | "email") {
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

  fetch(`/2fa/${mode}/setup`, {
    method: "POST",
    credentials: "include",
  })
    .then((response) =>
      response.json().then((data) => ({ status: response.status, data }))
    )
    .then(({ status, data }) => {
      if (status === 200) {
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
        displayToast(
          Setup2FaRes[data.code] || "Failed to enable 2FA.",
          "error"
        );
      }
    })
    .catch((error) => {
      displayToast(Setup2FaRes.INTERNAL_SERVER_ERROR, "error");
    });
}
