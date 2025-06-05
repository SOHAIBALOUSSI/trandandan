import { handleResetPassword } from "../services/handle-reset-password";
import { Footer } from "../components/layout/Footer";
import { MainHeader } from "../components/common/MainHeader";
import { styles } from "../styles/styles";

export function ResetPassword() {
  setTimeout(() => {
    handleResetPassword();
  }, 0);

  const resetPassword = (
    <section className={`${styles.pageLayoutLight} relative`}>
      <MainHeader
        isDark={true}
        title={"reset your password,"}
        titleSpan={"champion"}
        subtitle={"step into the club"}
        subtitleParagraph={
          "enter your email to receive a link to reset your password."
        }
      />
      <form
        id="reset-password-form"
        className={`${styles.form} flex flex-col items-center justify-center`}
      >
        <label htmlFor="email">Email:</label>
        <input
          placeholder="enter your email"
          type="email"
          id="email"
          name="email"
          required
          className="normal-case border border-pong-secondary rounded-md p-2 w-full"
        />
        <button
          type="submit"
          id="reset-password-btn"
          className={`${styles.buttonPrimary} mt-4`}
        >
          Send Reset Link
        </button>
      </form>
      <form
        id="otp-form"
        className={`${styles.form} hidden flex-col items-center justify-center mt-6`}
      >
        <label htmlFor="otp">Enter OTP code:</label>
        <input
          type="text"
          id="otp"
          name="otp"
          required
          className="border border-pong-secondary rounded-md p-2"
        />
        <button type="submit" className={`${styles.buttonPrimary} mt-4`}>
          Verify Code
        </button>
      </form>
      <div className="flex flex-col items-center justify-center mt-4">
        <p className="text-sm text-pong-primary/70">
          If you don't receive an email, please check your spam folder.
        </p>
        <p className="text-sm text-pong-primary/70">
          If you still have issues, contact support.
        </p>
      </div>
      <Footer />
    </section>
  );
  return resetPassword;
}
