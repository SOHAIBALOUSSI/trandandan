import { handleUpdatePassword } from "@/handlers/handle-update-password";
import { Footer } from "@/components/layout/Footer";
import { styles } from "@/styles/styles";
import { InputField } from "@/components/common/InputField";
import { CTA } from "@/components/common/Cta";
import { Overlay } from "@/components/layout/Overlay";

export function UpdatePassword() {
  setTimeout(() => {
    handleUpdatePassword();
  }, 0);

  return (
    <section className={styles.pageLayoutLight}>
      <Overlay />
      <div className={styles.customSectionStyles}>
        <h1 className={styles.titleDark}>one final serve, champion.</h1>
        <p className={`${styles.subtitleParagraphDark} mb-6`}>
          set your new password to secure your spot in the club.
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
            placeholder="new password"
            autofocus={true}
          />
          <InputField
            type="password"
            name="newPasswordConfirm"
            id="confirm-new-password"
            placeholder="confirm new password"
          />
          <CTA
            btnIcon="fa-lock"
            btnLabel="lock it in"
          />
        </form>
        <p className="text-sm text-pong-primary/70 text-center mt-8">
          this is how champions protect their legacy.{" "}
        </p>
      </div>
      <Footer />
    </section>
  );
}
