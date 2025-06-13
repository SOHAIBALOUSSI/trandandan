import {
  handleResetPassword,
  verifyOtpCode,
} from "@/services/handle-reset-password";
import { Footer } from "@/components/layout/Footer";
import { InputField } from "@/components/common/InputField";
import { styles } from "@/styles/styles";
import { CTA } from "@/components/common/Cta";
import { Overlay } from "@/components/layout/Overlay";

export function ResetPassword() {
  setTimeout(() => {
    handleResetPassword();
    verifyOtpCode();
  }, 0);

  return (
    <section className={styles.pageLayoutLight}>
      <Overlay />
      <div className={styles.customSectionStyles}>
        <h1 className={styles.titleDark}>Reset Your Password</h1>
        <p className={`${styles.subtitleParagraphDark} mb-8`}>
          drop your email — we’ll send you an OTP code to reset your password.
        </p>
        <form
          id="reset-password-form"
          method="POST"
          className={`${styles.form} ${styles.fadeInSection}`}
        >
          <InputField
            type={"email"}
            name={"email"}
            id={"reset-pass-email"}
            placeholder={"enter your email"}
            autofocus={true}
          />
          <CTA
            feedbackId="reset-feedback"
            btnId="reset-password-btn"
            btnIcon="fa-envelope"
            btnLabel="send me the code"
          />
        </form>
        <p className="w-full border-t border-pong-accent/10 my-8"></p>
        <form
          id="otp-form"
          className="hidden flex-col items-center justify-center gap-6 mt-2 bg-transparent shadow-none px-0 py-0"
        >
          <label htmlFor="otp" className="text-pong-primary font-semibold">
            paste the code from your inbox:
          </label>
          <InputField
            type="text"
            name="otp"
            id="otp"
            placeholder="6-digit code"
            autofocus={true}
          />{" "}
          <CTA
            feedbackId="otp-feedback"
            btnId="otp-btn"
            btnIcon="fa-check-double"
            btnLabel="verify code"
          />
        </form>
        <p className="text-sm text-pong-primary/70 text-center mt-8">
          didn't get it? check your spam or promotions tab.
        </p>
      </div>
      <Footer />
    </section>
  );
}
