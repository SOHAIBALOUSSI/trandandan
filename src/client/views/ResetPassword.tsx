import { handleResetPassword } from "@/services/handle-reset-password";
import { verifyOtpCode } from "@/services/verify-otp-code";
import { handleOtpInput } from "@/services/verify-otp-code";
import { Footer } from "@/components/layout/Footer";
import { InputField } from "@/components/common/InputField";
import { styles } from "@/styles/styles";
import { CTA } from "@/components/common/Cta";
import { Overlay } from "@/components/layout/Overlay";
import { OtpInput } from "@/components/common/OtpInput";

export function ResetPassword() {
  setTimeout(() => {
    handleResetPassword();
    handleOtpInput();
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
        <form id="otp-form" className={`${styles.form} hidden`}>
          <label htmlFor="otp" className="text-pong-primary font-semibold">
            paste the code from your inbox
          </label>
          <OtpInput id="reset-pass-otp" />
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
