import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/common/MainHeader";
import { styles } from "@/styles/styles";
import { InputField } from "@/components/common/InputField";
import { setup2FA } from "@/services/setup-2fa";
// import { setupEmail2FA } from "@/services/handle-2fa";
// import { disableApp2FA } from "@/services/handle-2fa";
// import { disableEmail2FA } from "@/services/handle-2fa";
// import { setPrimaryApp2FA } from "@/services/handle-2fa";
// import { setPrimaryEmail2FA } from "@/services/handle-2fa";

function TwofaMode(mode: "app" | "email") {
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

  let isSetup = false;

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
    <div className="flex flex-col gap-2 w-full bg-white/20">
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-between gap-4 bg-gray-900 text-lg m-8 p-6 rounded">
        <span className="text-pong-secondary">{mode}</span>
        <div className="flex items-center gap-4">
          <button className={`${styles.buttonPrimary} w-24`} id={setupId}>
            Setup
          </button>
          <button
            className={`${styles.buttonPrimary} w-24 hidden`}
            id={toggleId}
          >
            Enable
          </button>
          <button
            className={`${styles.buttonPrimary} w-24 hidden`}
            id={primaryId}
          >
            Set as Primary
          </button>
        </div>
      </div>
      <div id={verifySectionId} className="hidden">
        <p
          id={feedbackId}
          className="text-pong-dark-primary text-sm my-2 text-center"
        ></p>
        <div id="2fa-app-qr" className="text-center"></div>
        <input
          id={otpInputId}
          type="text"
          maxLength={6}
          pattern="[0-9]{6}"
          placeholder="Enter 6-digit code"
          className="py-2 px-8 text-center text-gray-800"
          autoComplete="one-time-code"
        />
        <button
          id={verifyBtnId}
          className="p-2 bg-red-600 ml-2 rounded-sm hover:bg-red-700 transition-all duration-300 w-32"
        >
          Verify
        </button>
        <p id={verifyFeedbackId} className="text-pong-error text-sm mt-2"></p>
      </div>
    </div>
  );
}

function TwofaSection() {
  return (
    <div className="bg-gray-800 rounded shadow p-6 m-4 w-full max-w-2xl text-center">
      <h2 className="text-xl font-bold mb-2 text-pong-dark-primary">
        Two-Factor Authentication
      </h2>
      <p className="mb-2 text-gray-400">
        Enhance your account security with two-factor authentication.
      </p>
      {TwofaMode("app")}
      {TwofaMode("email")}
    </div>
  );
}

export function Settings() {
  return (
    <section className={styles.pageLayoutDark} id="settings-section">
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-4rem)] overflow-y-auto flex flex-col items-center gap-8">
          <TwofaSection />
        </main>
      </div>
    </section>
  );
}
