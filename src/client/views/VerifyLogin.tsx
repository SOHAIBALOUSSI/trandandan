import { Footer } from "@/components/layout/Footer";
import { styles } from "@/styles/styles";
import { InputField } from "@/components/common/InputField";
import { CTA } from "@/components/common/Cta";
import { Overlay } from "@/components/layout/Overlay";
import { verifyLogin } from "@/services/verify-login";

export function VerifyLogin() {
  const twofaMode = sessionStorage.getItem("2faMode");

  setTimeout(() => {
    verifyLogin(twofaMode);
  }, 0);

  return (
    <section className={styles.pageLayoutLight}>
      <Overlay />
      <div className={styles.customSectionStyles}>
        <h1 className={styles.titleDark}>verify your identity</h1>
        <p className={`${styles.subtitleParagraphDark} mb-6`}>
          {twofaMode === "email"
            ? "A verification parchment has been dispatched to your email. Kindly enter the code below to proceed."
            : "Your code awaits in your authenticator ledger. Kindly enter it below to confirm your identity."}
        </p>
        <form
          id="verify-login-form"
          method="POST"
          className={`${styles.form} ${styles.fadeInSection}`}
        >
          <InputField
            type="text"
            name="verificationCode"
            id="verification-code"
            placeholder="Enter your verification code"
            autofocus={true}
          />
          <CTA
            feedbackId="verify-feedback"
            btnId="verify-btn"
            btnIcon="fa-check-double"
            btnLabel="verify"
          />
        </form>
        <p className="text-sm text-pong-primary/70 text-center mt-8">
          Trouble receiving your code? Check your spam scroll or contact the
          front desk.
        </p>
      </div>
      <Footer />
    </section>
  );
}
