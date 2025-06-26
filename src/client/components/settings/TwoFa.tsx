import { styles } from "@/styles/styles";
import { setup2FA, verify2FASetup } from "@/services/setup-2fa";
import { setPrimaryMethod } from "@/services/set-primary-method";
import { enable2FA } from "@/services/enable-2fa";
import { disable2FA } from "@/services/disable-2fa";
import { check2FA } from "@/services/check-2fa";

type TwoFAMethod = { type: "app" | "email"; enabled: 1 | 0; is_primary: 1 | 0 };

function update2FAUI(methods: TwoFAMethod[]) {
  ["app", "email"].forEach((type) => {
    const setupBtn = document.getElementById(`${type}-setup-btn`);
    const toggleEnableBtn = document.getElementById(`${type}-toggle-enable`);
    const setPrimaryBtn = document.getElementById(`${type}-set-primary`);
    const statusLabel = document.getElementById(`${type}-status-label`);
    const primaryLabel = document.getElementById(`${type}-primary-label`);
    const method = methods.find((m) => m.type === type);

    if (
      !setupBtn ||
      !toggleEnableBtn ||
      !setPrimaryBtn ||
      !statusLabel ||
      !primaryLabel
    )
      return;

    if (!method) {
      // Method not set up at all: show only Setup
      setupBtn.classList.remove("hidden");
      toggleEnableBtn.classList.add("hidden");
      setPrimaryBtn.classList.add("hidden");
      statusLabel.classList.add("hidden");
      primaryLabel.classList.add("hidden");
      return;
    }

    // Method exists: show Enable/Disable and Set as Primary
    setupBtn.classList.add("hidden");
    toggleEnableBtn.classList.remove("hidden");
    setPrimaryBtn.classList.remove("hidden");
    statusLabel.classList.remove("hidden");

    if (method.enabled) {
      statusLabel.textContent = "Enabled";
      statusLabel.className =
        "ml-2 px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700";
      toggleEnableBtn.textContent = "Disable";
      if (method.is_primary) {
        primaryLabel.classList.remove("hidden");
        primaryLabel.textContent = "Primary";
        primaryLabel.className =
          "ml-2 px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700";
      } else {
        primaryLabel.classList.add("hidden");
      }
    } else {
      statusLabel.textContent = "Disabled";
      statusLabel.className =
        "ml-2 px-2 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700";
      toggleEnableBtn.textContent = "Enable";
      primaryLabel.classList.add("hidden");
    }
  });
}

function attach2FAListeners(type: "app" | "email") {
  const isApp = type === "app";
  const setupBtn = document.getElementById(
    `${type}-setup-btn`
  ) as HTMLButtonElement;
  const verifySection = document.getElementById(`${type}-verify-section`);
  const otpInput = document.getElementById(`${type}-otp`) as HTMLInputElement;
  const verifyBtn = document.getElementById(
    `${type}-verify-btn`
  ) as HTMLButtonElement;
  const setPrimaryBtn = document.getElementById(
    `${type}-set-primary`
  ) as HTMLButtonElement;
  const toggleEnableBtn = document.getElementById(
    `${type}-toggle-enable`
  ) as HTMLButtonElement;
  const qrImg = isApp
    ? (document.getElementById("app-qr") as HTMLImageElement)
    : null;

  if (setupBtn && !setupBtn.dataset.listener) {
    setupBtn.addEventListener("click", () => {
      setup2FA(type);
      verifySection?.classList.remove("hidden");
      setupBtn.classList.add("hidden");
      if (isApp && qrImg) qrImg.classList.remove("hidden");
    });
    setupBtn.dataset.listener = "true";
  }

  if (verifyBtn && !verifyBtn.dataset.listener) {
    verifyBtn.addEventListener("click", () => {
      if (!otpInput.value) return;
      verify2FASetup(otpInput.value, type, () => {
        verifySection?.classList.add("hidden");
        if (isApp && qrImg) qrImg.classList.add("hidden");
      });
    });
    verifyBtn.dataset.listener = "true";
  }

  if (setPrimaryBtn && !setPrimaryBtn.dataset.listener) {
    setPrimaryBtn.addEventListener("click", async () => {
      await setPrimaryMethod(type, () => {
        check2FA().then(update2FAUI);
      });
    });
    setPrimaryBtn.dataset.listener = "true";
  }

  if (toggleEnableBtn && !toggleEnableBtn.dataset.listener) {
    toggleEnableBtn.addEventListener("click", async () => {
      if (toggleEnableBtn.textContent === "Disable") {
        await disable2FA(type, () => check2FA().then(update2FAUI));
      } else {
        await enable2FA(type, () => check2FA().then(update2FAUI));
      }
    });
    toggleEnableBtn.dataset.listener = "true";
  }
}

function TwoFaMode(type: "app" | "email") {
  const isApp = type === "app";
  setTimeout(() => attach2FAListeners(type), 0);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 border border-pong-accent/30 rounded-xl px-6 py-5 relative bg-white/10">
        <div className="flex items-center gap-3 text-white">
          <i className={`fa-solid ${isApp ? "fa-mobile" : "fa-envelope"}`} />
          <span className="font-semibold capitalize tracking-wide">
            {isApp ? "Authenticator App" : "Email OTP"}
          </span>
          <span
            id={`${type}-status-label`}
            className="ml-2 px-2 py-1 text-xs font-bold rounded-full bg-gray-200 text-gray-700 hidden"
          ></span>
          <span
            id={`${type}-primary-label`}
            className="ml-2 px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700 hidden"
          ></span>
        </div>
        <div className="flex gap-2">
          <button
            id={`${type}-setup-btn`}
            className="bg-pong-accent text-white px-4 py-2 rounded-md shadow"
          >
            Setup
          </button>
          <button
            id={`${type}-toggle-enable`}
            className="bg-pong-secondary text-white px-4 py-2 rounded-md shadow hidden"
          >
            Enable
          </button>
          <button
            id={`${type}-set-primary`}
            className="bg-pong-accent/80 text-white px-4 py-2 rounded-md shadow hidden"
          >
            Set as Primary
          </button>
        </div>
      </div>
      <div id={`${type}-verify-section`} className="hidden w-full mt-4">
        {isApp && (
          <img
            id="app-qr"
            alt="QR Code"
            className="hidden mx-auto mb-4 w-40 h-40 rounded-lg shadow"
          />
        )}
        <input
          id={`${type}-otp`}
          type="text"
          maxLength={6}
          className="w-full p-3 border rounded-md text-black placeholder:text-black/60 font-bold bg-white/80"
          placeholder="Enter 6-digit code"
        />
        <button
          id={`${type}-verify-btn`}
          className="mt-2 w-full bg-pong-accent text-white py-2 rounded-md"
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export function TwoFa() {
  setTimeout(() => {
    check2FA().then((methods) => {
      update2FAUI(methods);
      attach2FAListeners("app");
      attach2FAListeners("email");
    });
  }, 0);

  return (
    <div className={styles.settingsLayout}>
      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
        Secure Your Club Access
      </h2>
      <p className="text-base md:text-lg text-white/80 mb-8 leading-relaxed">
        Add a second layer of protection to your profile with two-factor
        authentication.
      </p>
      <div className="flex flex-col gap-8">
        {TwoFaMode("app")}
        {TwoFaMode("email")}
      </div>
    </div>
  );
}
