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
    const verifySection = document.getElementById(verifySectionId);
    const toggleBtn = document.getElementById(toggleId);
    const primaryBtn = document.getElementById(primaryId);
    const statusLabel = document.getElementById(`${mode}-status`);
    const setPrimaryBtn = document.getElementById(`${mode}-set-primary`);
    const disableBtn = document.getElementById(`${mode}-disable`);

    if (setupBtn && !setupBtn.dataset.listener) {
      setupBtn.addEventListener("click", (e) => {
        e.preventDefault();
        setup2FA(mode);
        verifySection?.classList.remove("hidden");
        setupBtn.classList.add("hidden");
        toggleBtn?.classList.remove("hidden");
      });
      setupBtn.dataset.listener = "true";
    }

    if (toggleBtn && !toggleBtn.dataset.listener) {
      toggleBtn.addEventListener("click", () => {
        verifySection?.classList.remove("hidden");
      });
      toggleBtn.dataset.listener = "true";
    }

    if (setPrimaryBtn && !setPrimaryBtn.dataset.listener) {
      setPrimaryBtn.addEventListener("click", () => {
        primaryBtn?.classList.remove("hidden");
        if (statusLabel) {
          statusLabel.textContent = "Primary";
          statusLabel.className =
            "ml-2 px-2 py-1 text-xs font-bold rounded-full bg-pong-secondary/30 text-pong-secondary";
        }
      });
      setPrimaryBtn.dataset.listener = "true";
    }

    if (disableBtn && !disableBtn.dataset.listener) {
      disableBtn.addEventListener("click", () => {
        verifySection?.classList.add("hidden");
        primaryBtn?.classList.add("hidden");
        toggleBtn?.classList.remove("hidden");
        if (statusLabel) {
          statusLabel.textContent = "Disabled";
          statusLabel.className =
            "ml-2 px-2 py-1 text-xs font-bold rounded-full bg-red-200 text-red-700";
        }
      });
      disableBtn.dataset.listener = "true";
    }
  }, 0);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-pong-secondary/90 shadow-lg rounded-xl px-6 pr-10 py-5 relative">
      {/* Dots menu */}
      <div className="absolute top-0 right-2 group">
        <button className="text-white p-2 hover:text-pong-accent">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
        <div className="hidden group-hover:flex flex-col absolute right-0 mt-2 bg-white text-sm text-pong-primary rounded-md shadow-md z-20">
          <button
            id={`${mode}-set-primary`}
            className="px-4 py-2 hover:bg-pong-secondary/30"
          >
            Set as Primary
          </button>
          <button
            id={`${mode}-disable`}
            className="px-4 py-2 hover:bg-pong-secondary/30"
          >
            Disable
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 text-pong-primary">
        <i className={`fa-solid ${isApp ? "fa-mobile" : "fa-envelope"}`} />
        <span className="font-semibold capitalize tracking-wide text-lg">
          {isApp ? "Authenticator App" : "Email OTP"}
        </span>
        <span
          id={`${mode}-status`}
          className="ml-2 px-2 py-1 text-xs font-bold rounded-full bg-pong-accent/20 text-pong-accent"
        >
          Disabled
        </span>
        <span
          id={`${mode}-is-primary`}
          className="ml-2 px-2 py-1 text-xs font-bold rounded-full bg-pong-primary/20 text-pong-primary"
        >
          Primary
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button className={`${styles.primaryButton} w-28`} id={setupId}>
          Setup
        </button>
        <button className={`${styles.btnOneStyles} hidden`} id={toggleId}>
          Enable
        </button>
        <button className={`${styles.btnOneStyles} hidden`} id={primaryId}>
          Primary
        </button>
      </div>
    </div>
  );
}

export function TwoFa() {
  return (
    <div className="border border-pong-accent/20 rounded-2xl shadow-2xl p-8 m-4 w-full max-w-3xl mx-auto text-center animate-fadeInUp">
      <h2 className="text-2xl font-bold mb-2 text-pong-dark-primary">
        Two-Factor Authentication
      </h2>
      <p className="mb-4 text-pong-dark-primary/80">
        Enhance your account security with two-factor authentication.
      </p>
      <div className="flex flex-col gap-6">
        {TwoFaMode("app")}
        {TwoFaMode("email")}
      </div>
    </div>
  );
}
