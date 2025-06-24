import { styles } from "@/styles/styles";
import { Footer } from "@/components/layout/Footer";
import { CTA } from "@/components/common/Cta";
import { Overlay } from "@/components/layout/Overlay";
import { OtpInput } from "@/components/common/OtpInput";
import { verifyLogin } from "@/services/verify-login";
import { handleOtpInput } from "@/handlers/handle-otp-input";
import { fontSizes } from "@/styles/fontSizes";

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

  const label =
    twofaMode === "email"
      ? "Summon the code from your inbox"
      : "Summon the code from your app";

  return (
    <section className={styles.pageLayoutLight}>
      <Overlay />
      <div className={`${styles.customSectionStyles} animate-fadeInUp`}>
        <h1 className={styles.titleDark}>verify your identity</h1>
        <p className={`${styles.subtitleParagraphDark} my-6`}>{subtitle}</p>

        <div className="flex justify-center mb-6">
          <i className="fa-solid fa-table-tennis-paddle-ball text-pong-accent text-3xl animate-bounce" />
        </div>

        <form id="verify-login-form" className={`${styles.customForm}`}>
          <label
            htmlFor="otp"
            className={`${fontSizes.buttonFontSize} text-pong-primary font-semibold`}
          >
            {label}
          </label>
          <OtpInput id="verify-login-otp" />
          <CTA btnIcon="fa-check-double" btnLabel="verify" />
        </form>
        <p className="w-full border-t border-pong-accent/10 my-6"></p>
        <p className="text-sm text-pong-primary/70">
          trouble receiving your code? contact the front desk.
        </p>
      </div>
      <Footer />
    </section>
  );
}
