import { Footer } from "@/components/layout/Footer";
import { styles } from "@/styles/styles";
import { CTA } from "@/components/common/Cta";
import { Overlay } from "@/components/layout/Overlay";
import { OtpInput } from "@/components/common/OtpInput";
import { verifyLogin } from "@/services/verify-login";
import { handleOtpInput } from "@/handlers/handle-otp-input";

export function VerifyLogin() {
  const twofaMode = sessionStorage.getItem("2faMode");

  setTimeout(() => {
    handleOtpInput("verify-login-otp");
    verifyLogin(twofaMode);
  }, 0);

  const subtitle =
    twofaMode === "email"
      ? "A verification parchment has been dispatched to your email. Kindly enter the code below to proceed."
      : "Your code awaits in your authenticator ledger. Kindly enter it below to confirm your identity.";

  return (
    <section className={styles.pageLayoutLight}>
      <Overlay />
      <div className={styles.customSectionStyles}>
        <h1 className={styles.titleDark}>verify your identity</h1>
        <p className={`${styles.subtitleParagraphDark} mb-6`}>{subtitle}</p>
        <form
          id="verify-login-form"
          method="POST"
          className={`${styles.form} ${styles.fadeInSection}`}
        >
          <OtpInput id="verify-login-otp" />
          <CTA btnIcon="fa-check-double" btnLabel="verify" />
        </form>
        <p className="text-sm text-pong-primary/70 text-center mt-8">
          trouble receiving your code? contact the front desk.
        </p>
      </div>
      <Footer />
    </section>
  );
}
