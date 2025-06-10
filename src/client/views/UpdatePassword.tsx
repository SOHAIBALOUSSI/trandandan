import { handleUpdatePassword } from "@/services/handle-update-password";
import { Footer } from "@/components/layout/Footer";
import { styles } from "@/styles/styles";
import { InputField } from "@/components/common/InputField";
import { CTA } from "@/components/layout/Cta";

export function UpdatePassword() {
  setTimeout(() => {
    handleUpdatePassword();
  }, 0);

  return (
    <section className={styles.pageLayoutLight}>
      <div className="absolute inset-0 bg-gradient-to-tr from-pong-secondary/10 to-pong-accent/10 blur-2xl z-[-1]" />
      <div className={styles.resetSectionStyles}>
        <h1 className={styles.titleDark}>you're almost there, champion.</h1>
        <p className={`${styles.subtitleParagraphDark} mb-6`}>
          please set a new password to secure your account.
        </p>
        <form
          id="update-password-form"
          method="POST"
          className={`${styles.form} ${styles.fadeInSection}`}
        >
          <InputField
            type="password"
            name="newPassword"
            id="new-password"
            placeholder="New Password"
            autofocus={true}
          />
          <InputField
            type="password"
            name="newPasswordConfirm"
            id="confirm-password"
            placeholder="Confirm New Password"
          />
          <CTA
            feedbackId="update-password-feedback"
            btnId="update-password-btn"
            btnIcon="fa-lock"
            btnLabel="lock it in"
          />
        </form>
        <p className="text-sm text-pong-primary/70 text-center mt-8">
          some text here.
        </p>
      </div>
      <Footer />
    </section>
  );
}
