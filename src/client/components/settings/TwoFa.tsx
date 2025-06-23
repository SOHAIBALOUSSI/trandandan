import { styles } from "@/styles/styles";
import { setup2FA } from "@/services/setup-2fa";

function TwoFaMode(mode: "app" | "email") {
  const isApp = mode === "app";
  const setupId = isApp ? "setup-app" : "setup-email";
  const toggleId = isApp ? "toggle-app" : "toggle-email";
  const primaryId = isApp ? "primary-app" : "primary-email";
  const verifySectionId = isApp
    ? "2fa-app-verify-section"
    : "2fa-email-verify-section";
  const feedbackId = isApp ? "2fa-app-feedback" : "2fa-email-feedback";
  const otpInputId = isApp ? "2fa-app-otp" : "2fa-email-otp";
  const verifyBtnId = isApp ? "2fa-app-verify-btn" : "2fa-email-verify-btn";
  const verifyFeedbackId = isApp
    ? "2fa-app-verify-feedback"
    : "2fa-email-verify-feedback";

  setTimeout(() => {
    const setupBtn = document.getElementById(setupId) as HTMLButtonElement;
    const verifySection = document.getElementById(
      verifySectionId
    ) as HTMLDivElement;
    const toggleBtn = document.getElementById(toggleId) as HTMLButtonElement;

    if (setupBtn && !setupBtn.dataset.listener) {
      setupBtn.addEventListener("click", (e) => {
        e.preventDefault();
        setup2FA(isApp ? "app" : "email");

        if (verifySection) verifySection.classList.remove("hidden");

        setupBtn.classList.add("hidden");
        if (toggleBtn) toggleBtn.classList.remove("hidden");

        const primaryBtn = document.getElementById(
          primaryId
        ) as HTMLButtonElement;
        if (primaryBtn) primaryBtn.classList.remove("hidden");
      });
      setupBtn.dataset.listener = "true";
    }
  }, 0);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-pong-secondary/90 border border-pong-accent/30 shadow-lg rounded-xl px-6 py-5">
        <span className="text-pong-accent font-semibold capitalize tracking-wide text-lg">
          {mode === "app" ? "Authenticator App" : "Email OTP"}
        </span>
        <div className="flex items-center gap-4">
          <button className={`${styles.primaryButton} w-28`} id={setupId}>
            Setup
          </button>
          <button
            className={`${styles.btnOneStyles} hidden`}
            id={toggleId}
          >
            Enable
          </button>
          <button
            className={`${styles.btnOneStyles} hidden`}
            id={primaryId}
          >
            Primary
          </button>
        </div>
      </div>
      <div
        id={verifySectionId}
        className="hidden flex-col items-center bg-white/95 border border-pong-accent/20 rounded-xl shadow-md px-6 py-5 mt-2"
      >
        <p
          id={feedbackId}
          className="text-pong-dark-primary text-sm my-2 text-center"
        ></p>
        <div id="2fa-app-qr" className="text-center mb-2"></div>
        <input
          id={otpInputId}
          type="text"
          maxLength={6}
          pattern="[0-9]{6}"
          placeholder="Enter 6-digit code"
          className="py-3 px-8 text-center text-lg border-2 border-pong-accent rounded-lg focus:border-pong-secondary outline-none transition-all duration-200 bg-pong-secondary/10 tracking-widest mb-2"
          autoComplete="one-time-code"
        />
        <button
          id={verifyBtnId}
          className="w-32 py-2 mt-1 bg-pong-accent text-white rounded-lg font-semibold hover:bg-pong-secondary transition-all duration-300 shadow"
        >
          Verify
        </button>
        <p id={verifyFeedbackId} className="text-pong-error text-sm mt-2"></p>
      </div>
    </div>
  );
}

export function TwoFa() {
  return (
    <div className="bg-white/95 border border-pong-accent/20 rounded-2xl shadow-2xl p-8 m-4 w-full max-w-3xl mx-auto text-center animate-fadeInUp">
      <h2 className="text-2xl font-bold mb-2 text-pong-dark-primary">
        Two-Factor Authentication
      </h2>
      <p className="mb-4 text-pong-primary/80">
        Enhance your account security with two-factor authentication.
      </p>
      <div className="flex flex-col gap-6">
        {TwoFaMode("app")}
        {TwoFaMode("email")}
      </div>
    </div>
  );
}
