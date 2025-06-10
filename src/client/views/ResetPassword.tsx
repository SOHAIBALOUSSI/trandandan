import {
  handleResetPassword,
  verifyOtpCode,
} from "@/services/handle-reset-password";
import { Footer } from "@/components/layout/Footer";
import { InputField } from "@/components/common/InputField";
import { styles } from "@/styles/styles";

export function ResetPassword() {
  setTimeout(() => {
    handleResetPassword();
    verifyOtpCode();
  }, 0);

  const resetPassword = (
    <section className={styles.pageLayoutLight}>
      <div className="absolute inset-0 bg-gradient-to-tr from-pong-secondary/10 to-pong-accent/10 blur-2xl z-[-1]" />
      <div
        className={`
          bg-white/95 shadow-2xl rounded-2xl border border-pong-accent/20
          max-w-lg w-full mx-auto p-8 flex flex-col items-center
          transition-all duration-300
        `}
      >
        <h1 className={`${styles.titleDark} mb-2 text-center`}>
          Reset Your Password
        </h1>
        <p className={`${styles.subtitleParagraphDark} text-center mb-6`}>
          drop your email — we’ll send you an OTP code to reset your password.
        </p>
        <form
          id="reset-password-form"
          className={`${styles.form} ${styles.fadeInSection} bg-transparent shadow-none px-0 py-0 mb-2`}
        >
          <InputField
            type={"email"}
            name={"email"}
            id={"email"}
            placeholder={"enter your email"}
            autofocus={true}
          />
          <div
            id="reset-feedback"
            className={`${styles.formMessage} hidden`}
            role="alert"
            aria-live="polite"
          ></div>
          <button
            type="submit"
            id="reset-password-btn"
            aria-busy="false"
            className={`
              group ${styles.primaryButton}
              shadow-lg hover:animate-none relative flex items-center justify-center
              mt-4
            `}
          >
            <span
              id="spinner-reset"
              className="hidden absolute left-4 w-4 h-4 border-2 border-white border-t-pong-accent rounded-full animate-spin"
              aria-hidden="true"
            ></span>
            <i
              aria-hidden="true"
              className={`fa-solid fa-envelope ${styles.primaryButtonIcon}`}
            ></i>
            <span id="btn-label-reset">send me the code</span>
          </button>
        </form>
        <p className="w-full border-t border-pong-accent/10 my-4"></p>
        <form
          id="otp-form"
          className={`
            ${styles.form}
            hidden flex-col items-center justify-center mt-2 bg-transparent shadow-none px-0 py-0
          `}
        >
          <label htmlFor="otp" className="text-pong-primary font-semibold">
            paste the code from your inbox:
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            required
            maxLength={6}
            className={`
              border-2 border-pong-accent focus:border-pong-secondary
              rounded-lg p-3 text-lg text-center tracking-widest
              outline-none transition-all duration-200
              mb-2 w-40 bg-pong-secondary/10
            `}
            placeholder="6-digit code"
            autoComplete="one-time-code"
          />
          <div
            id="otp-feedback"
            className={`${styles.formMessage} hidden`}
            role="alert"
            aria-live="polite"
          ></div>
          <button
            type="submit"
            id="otp-btn"
            aria-busy="false"
            className={`${styles.buttonPrimary} w-40 transition-200`}
          >
            <span
              id="spinner-otp"
              className="hidden absolute left-4 w-4 h-4 border-2 border-white border-t-pong-accent rounded-full animate-spin"
              aria-hidden="true"
            ></span>
            <span id="btn-label-otp">verify code</span>
          </button>
        </form>
        <div
          id="reset-password-feedback"
          className={`
            ${styles.formMessage}
            text-pong-error text-center mt-4 min-h-[1.5rem]
          `}
          role="alert"
          aria-live="polite"
        ></div>
        <div className="flex flex-col items-center justify-center mt-4">
          <p className="text-sm text-pong-primary/70 text-center">
            didn't get it? check your spam or promotions tab.
          </p>
          <p className="text-sm text-pong-primary/70 text-center">
            still stuck? reach out to our support crew.
          </p>
        </div>
      </div>
      <Footer />
    </section>
  );

  return resetPassword;
}
