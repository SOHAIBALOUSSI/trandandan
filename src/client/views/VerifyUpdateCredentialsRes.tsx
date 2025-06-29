import { styles } from "@/styles/styles";
import { handleVerifyCredentials } from "@/handlers/handle-verify-update-credentials";

export function VerifyUpdateCredentials() {
  const twofaMode = sessionStorage.getItem("2faModeUpdate");

  setTimeout(() => {
    handleVerifyCredentials();
  }, 0);

  const isAppMode = twofaMode === "app";
  const instructionText = isAppMode
    ? "Open your 2FA app and enter the 6-digit code to confirm your update."
    : "Enter the one-time code we just sent to your email to verify the change.";

  const resendNote = isAppMode
    ? "Having trouble? Make sure your app is synced and try again."
    : "Didn’t receive the code?";

  return (
    <section className={styles.pageLayoutDark}>
      <main className={styles.pageContent}>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-full max-w-md bg-pong-dark-custom/80 border border-pong-accent/30 rounded-2xl shadow-lg px-8 py-10 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-pong-accent mb-2">
              Confirm Changes
            </h2>
            <p className="text-pong-secondary/80 text-sm mb-6 text-center">
              {instructionText}
            </p>

            <form id="verify-otp-form" className="w-full flex flex-col gap-4">
              <input
                type="text"
                name="otp"
                id="otp"
                inputMode="numeric"
                maxLength={6}
                className="w-full text-center tracking-widest text-xl bg-gray-700/80 text-white p-4 rounded-md border-2 border-pong-accent/30 focus:outline-none focus:border-pong-accent focus:ring-2 focus:ring-pong-accent transition-all placeholder:tracking-normal"
                placeholder="Enter 6-digit code"
                autoComplete="off"
              />

              <button
                type="submit"
                className="bg-pong-accent hover:bg-pong-dark-accent text-white font-semibold p-3 rounded-md mt-2 shadow transition-all"
                id="submit-btn"
              >
                <i className="fa-solid fa-key mr-2"></i>
                Verify & Continue
              </button>
            </form>

            <p className="text-white/60 text-sm mt-4 text-center">
              {resendNote}{" "}
              {!isAppMode && (
                <a
                  href="#"
                  className="text-pong-accent underline hover:text-pong-dark-accent transition"
                  data-link
                >
                  Resend
                </a>
              )}
            </p>
          </div>
        </div>
      </main>
    </section>
  );
}
