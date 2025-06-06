import { handleUpdatePassword } from "@/services/handle-update-password";
import { Footer } from "@/components/layout/Footer";
import { styles } from "@/styles/styles";

export function UpdatePassword() {
  setTimeout(() => {
    handleUpdatePassword();
  }, 0);

  const updatePassword = (
    <section className={styles.pageLayoutLight}>
      <div className="bg-white/95 shadow-2xl rounded-2xl border border-pong-accent/20 max-w-md w-full mx-auto p-8 flex flex-col items-center transition-all duration-300">
        <h1 className="text-3xl font-bold mb-4 text-pong-primary text-center">
          you're almost there, champion.
        </h1>
        <p className="text-pong-dark-secondary mb-6 text-center">
          please set a new password to secure your account.
        </p>
        <form
          id="update-password-form"
          method="POST"
          className="w-full flex flex-col gap-4"
        >
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            id="new-password"
            required
            className="w-full p-3 border-2 border-pong-accent/30 focus:border-pong-accent rounded-lg outline-none transition-all duration-200 bg-pong-secondary/10"
            autoComplete="new-password"
          />
          <input
            type="password"
            name="newPasswordConfirm"
            placeholder="Confirm New Password"
            id="confirm-password"
            required
            className="w-full p-3 border-2 border-pong-accent/30 focus:border-pong-accent rounded-lg outline-none transition-all duration-200 bg-pong-secondary/10"
            autoComplete="confirm-new-password"
          />
          <div
            id="update-password-feedback"
            className={`${styles.formMessage} hidden`}
            role="alert"
            aria-live="polite"
          ></div>
          <button
            type="submit"
            id="update-password-btn"
            className={`group ${styles.primaryButton} shadow-lg hover:animate-none relative flex items-center justify-center`}
            aria-busy="false"
          >
            <span
              id="spinner-update"
              className="hidden absolute left-4 w-4 h-4 border-2 border-white border-t-pong-accent rounded-full animate-spin"
              aria-hidden="true"
            ></span>
            <i
              aria-hidden="true"
              className={`fa-solid fa-lock ${styles.primaryButtonIcon}`}
            ></i>
            <span id="btn-label-update">lock it in</span>
          </button>
        </form>
      </div>
      <Footer />
    </section>
  );

  return updatePassword;
}
