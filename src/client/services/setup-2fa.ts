function verify2FASetup(otpCode: string, mode: "app" | "email") {
  const isAppMode: boolean = mode === "app";
  const feedback = document.getElementById(
    isAppMode ? "2fa-app-verify-feedback" : "2fa-email-verify-feedback"
  );

  if (feedback) feedback.textContent = "";

  fetch(`/2fa/${mode}/verify-setup`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ otpCode }),
  })
    .then((response) =>
      response.json().then((data) => ({ status: response.status, data }))
    )
    .then(({ status, data }) => {
      if (status === 200) {
        if (feedback) feedback.textContent = "2FA enabled successfully!";
      } else if (status === 400 && data.message === "TWOFA_ALREADY_ENABLED") {
        if (feedback) feedback.textContent = "2FA is already enabled.";
      } else if (status === 400 && data.message === "TWOFA_NOT_SET") {
        if (feedback) feedback.textContent = "2FA is not set up.";
      } else if (status === 401 && data.message === "UNAUTHORIZED") {
        if (feedback)
          feedback.textContent = "Unauthorized. Please log in again.";
      } else if (status === 401 && data.message === " OTP_REQUIRED") {
        if (feedback)
          feedback.textContent = "OTP is required. Please enter the code.";
      } else if (status === 401 && data.message === "OTP_INVALID") {
        if (feedback) feedback.textContent = "Invalid OTP. Please try again.";
      } else {
        if (feedback)
          feedback.textContent = data.message || "Failed to verify 2FA.";
      }
    })
    .catch((error) => {
      if (feedback)
        feedback.textContent = "Error verifying 2FA. Please try again.";
      console.error("2FA verify error:", error);
    });
}

export function setup2FA(mode: "app" | "email") {
  const isAppMode: boolean = mode === "app";
  const verifySectionId: string = isAppMode
    ? "2fa-app-verify-section"
    : "2fa-email-verify-section";
  const feedbackId: string = isAppMode
    ? "2fa-app-feedback"
    : "2fa-email-feedback";
  const otpInputId: string = isAppMode ? "2fa-app-otp" : "2fa-email-otp";
  const verifyBtnId: string = isAppMode
    ? "2fa-app-verify-btn"
    : "2fa-email-verify-btn";

  const verifySection = document.getElementById(verifySectionId);
  const feedback = document.getElementById(feedbackId);
  const qrDiv = document.getElementById("2fa-app-qr");
  const otpInput = document.getElementById(otpInputId) as HTMLInputElement;
  const verifyBtn = document.getElementById(verifyBtnId) as HTMLButtonElement;

  // Reset the feedback and QR code display
  if (feedback) feedback.textContent = "";
  if (qrDiv) qrDiv.innerHTML = "";

  fetch(`/2fa/${mode}/setup`, {
    method: "POST",
    credentials: "include",
  })
    .then((response) =>
      response.json().then((data) => ({ status: response.status, data }))
    )
    .then(({ status, data }) => {
      if (status === 200 && data.data?.qrCode) {
        if (qrDiv) {
          qrDiv.innerHTML = `<img src="${data.data.qrCode}" alt="QR Code" class="mx-auto my-4" />`;
          // Show the verify section
          verifySection?.classList.remove("hidden");
          if (verifyBtn && !verifyBtn.dataset.listener) {
            verifyBtn.addEventListener("click", function (e) {
              e.preventDefault();
              if (!otpInput || !otpInput.value) {
                if (feedback)
                  feedback.textContent = "Please enter the 6-digit code.";
                return;
              }
              verify2FASetup(otpInput.value, mode);
            });
            verifyBtn.dataset.listener = "true";
          }
        }
        if (feedback)
          feedback.textContent =
            "Scan the QR code with your authenticator app.";
      } else if (status === 200 && !data.data?.qrCode) {
        // verify setup for email mode
        verifySection?.classList.remove("hidden");
        if (verifyBtn && !verifyBtn.dataset.listener) {
          verifyBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (!otpInput || !otpInput.value) {
              if (feedback)
                feedback.textContent = "Please enter the 6-digit code.";
              return;
            }
            verify2FASetup(otpInput.value, mode);
          });
          verifyBtn.dataset.listener = "true";
        }
      } else if (status === 400) {
        if (feedback) feedback.textContent = "2FA is already enabled.";
      } else if (status === 401) {
        if (feedback)
          feedback.textContent = "Unauthorized. Please log in again.";
      } else {
        if (feedback)
          feedback.textContent = data.message || "Failed to enable 2FA.";
      }
    })
    .catch((error) => {
      if (feedback)
        feedback.textContent = "Error enabling 2FA. Please try again.";
      console.error("2FA setup error:", error);
    });
}
