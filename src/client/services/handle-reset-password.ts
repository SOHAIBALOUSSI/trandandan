import { styles } from "@/styles/styles";
import { LostPasswordRes } from "@/utils/response-messages";

export function handleResetPassword() {
  const form = document.querySelector<HTMLFormElement>("#reset-password-form");
  const otpForm = document.querySelector<HTMLFormElement>("#otp-form");
  const feedback = document.querySelector<HTMLDivElement>("#reset-feedback");
  const submitBtn = document.querySelector<HTMLButtonElement>(
    "#reset-password-btn"
  );
  const spinner = document.querySelector<HTMLSpanElement>("#spinner-reset");
  const btnLabel = document.querySelector<HTMLSpanElement>("#btn-label-reset");

  if (!form || !otpForm || !feedback || !submitBtn || !spinner || !btnLabel)
    return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const email = emailInput.value.trim();

    feedback.textContent = "";
    feedback.className = styles.formMessage;
    feedback.classList.remove("hidden");
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "Sending Email...";

    const startTime = Date.now();

    try {
      const response = await fetch("/auth/lost-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const result = await response.json();

      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, 1200 - elapsed);

      if (response.ok) {
        // alert("Reset link sent to your email address.");
        setTimeout(() => {
          feedback.textContent =
            "Email was sent. check your mail box for the otp code";
          feedback.className = `${styles.formMessage} text-pong-success`;
          feedback.classList.remove("hidden");
          emailInput.value = "";
          otpForm.classList.remove("hidden");
          otpForm.classList.add("flex");

          result.data.tempToken &&
            localStorage.setItem("tempTokenPassword", result.data.tempToken);
        }, waitTime);
      } else {
        setTimeout(() => {
          const errorMsg =
            LostPasswordRes[result?.code] ||
            "Invalid email. Check your details and swing again.";
          feedback.textContent = errorMsg;
          feedback.className = `${styles.formMessage} text-pong-error`;
          feedback.classList.remove("hidden");
        }, waitTime);
      }
    } catch (error) {
      feedback.textContent = LostPasswordRes.INTERNAL_SERVER_ERROR;
      feedback.className = `${styles.formMessage} text-pong-error`;
      feedback.classList.remove("hidden");
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.setAttribute("aria-busy", "false");
        spinner.classList.add("hidden");
        btnLabel.textContent = "send me the code";
      }, 1300);
    }
  });
}

export function verifyOtpCode() {
  const otpForm = document.querySelector<HTMLFormElement>("#otp-form");
  if (!otpForm) return;

  otpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const otpInput = document.getElementById("otp") as HTMLInputElement;
    const otp = otpInput.value.trim();

    const feedback = document.querySelector<HTMLDivElement>("#otp-feedback");
    const submitBtn = document.querySelector<HTMLButtonElement>("#otp-btn");
    const spinner = document.querySelector<HTMLSpanElement>("#spinner-otp");
    const btnLabel = document.querySelector<HTMLSpanElement>("#btn-label-otp");

    if (!feedback || !submitBtn || !spinner || !btnLabel) return;

    feedback.textContent = "";
    feedback.className = styles.formMessage;
    feedback.classList.remove("hidden");
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "Verifying...";

    const startTime = Date.now();

    try {
      const response = await fetch("/auth/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("tempTokenPassword")}`,
        },
        body: JSON.stringify({ otpCode: otp }),
      });

      const result = await response.json();

      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, 1200 - elapsed);

      if (response.ok) {
        setTimeout(() => {
          feedback.textContent =
            "OTP verified successfully. You can now reset your password.";
          feedback.className = `${styles.formMessage} text-pong-success`;
          feedback.classList.remove("hidden");

          setTimeout(() => {
            history.pushState(null, "", "/password_update");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1500);
        }, waitTime);
      } else {
        setTimeout(() => {
          const errorMsg =
            LostPasswordRes[result?.code] || "Invalid OTP. Please try again.";
          feedback.textContent = errorMsg;
          feedback.className = `${styles.formMessage} text-pong-error`;
          feedback.classList.remove("hidden");
        }, waitTime);
      }
    } catch (error) {
      feedback.textContent = LostPasswordRes.INTERNAL_SERVER_ERROR;
      feedback.className = `${styles.formMessage} text-pong-error`;
      feedback.classList.remove("hidden");
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.setAttribute("aria-busy", "false");
        spinner.classList.add("hidden");
        btnLabel.textContent = "Verify OTP";
      }, 1300);
    }
  });
}
