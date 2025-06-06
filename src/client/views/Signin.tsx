import { styles } from "@/styles/styles";
import { Footer } from "@/components/layout/Footer";
import { handleSignIN } from "@/services/handle-signin";
import { InputField } from "@/components/common/InputField";
import { MainHeader } from "@/components/common/MainHeader";
import { RemoteSigninLink } from "@/components/layout/RemoteSigninLink";
import { handle42Signin } from "@/services/handle-42-signin";
import { handleGoogleSignin } from "@/services/handle-google-signin";

function TwoFAVerification() {
  return (
    <div
      id="signin-2fa-section"
      className="fixed top-[50%] left-[50%] z-40 transform -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 p-6 bg-gray-200 rounded-md text-pong-primary text-center border border-pong-secondary shadow-lg hidden"
    >
      <p className="text-pong-primary text-lg font-bold">
        Please verify your two-factor authentication.
      </p>
      <InputField
        type="text"
        name="2fa-otp"
        id="2fa-otp"
        placeholder="Enter your OTP"
      />
      <button
        type="button"
        id="signin-2fa-btn"
        className={`${styles.buttonPrimary} w-24`}
      >
        Verify
      </button>
      <p id="signin-2fa-feedback" className="text-pong-error text-sm"></p>
    </div>
  );
}

function Form() {
  const form = (
    <form
      method="POST"
      id="signin-form"
      className={`${styles.form} ${styles.fadeInSection}`}
    >
      <InputField
        type={"text"}
        name={"login"}
        id={"login"}
        placeholder={"username or email"}
      />
      <InputField
        type={"password"}
        name={"password"}
        id={"password"}
        placeholder={"password"}
      />
      <div
        id="signin-feedback"
        className={`${styles.formMessage} hidden`}
        role="alert"
        aria-live="polite"
      ></div>
      <button
        type="submit"
        id="signin-btn"
        className={`group ${styles.primaryButton} shadow-lg hover:animate-none relative flex items-center justify-center`}
        aria-busy="false"
      >
        <span
          id="spinner-in"
          className="hidden absolute left-4 w-4 h-4 border-2 border-white border-t-pong-accent rounded-full animate-spin"
          aria-hidden="true"
        ></span>
        <i
          className={`fa-solid fa-couch ${styles.primaryButtonIcon}`}
          aria-hidden="true"
        ></i>
        <span id="btn-label-in">enter the lounge</span>
      </button>
      <a
        href="password_reset"
        className="-mt-2 text-pong-accent text-xs font-bold underline hover:text-pong-secondary transition-all duration-300"
        data-link
      >
        lost your paddle?
      </a>
      <div>
        <p className="text-sm lg:text-base font-bold">
          new here?{" "}
          <a
            href="signup"
            className="text-pong-accent underline hover:text-pong-secondary transition-all duration-300"
            data-link
          >
            join the club and make history.
          </a>
        </p>
      </div>
      <RemoteSigninLink />
    </form>
  );

  return form;
}

export function Signin() {
  setTimeout(() => {
    handleGoogleSignin();
    handle42Signin();
    handleSignIN();
  }, 0);

  const signinSection = (
    <section className={`${styles.pageLayoutLight} relative`}>
      <TwoFAVerification />
      <MainHeader
        isDark={true}
        title={"welcome back,"}
        titleSpan={"champion"}
        subtitle={"step into the club"}
        subtitleParagraph={"enter your credentials to continue your legacy."}
      />
      <Form />
      <Footer />
    </section>
  );

  return signinSection;
}
