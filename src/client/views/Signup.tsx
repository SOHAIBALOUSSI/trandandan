import { styles } from "@/styles/styles";
import { Footer } from "@/components/layout/Footer";
import { handleSignUp } from "@/services/handle-signup";
import { MainHeader } from "@/components/common/MainHeader";
import { InputField } from "@/components/common/InputField";
import { RemoteSigninLink } from "@/components/layout/RemoteSigninLink";
import { handle42Signin } from "@/services/handle-42-signin";
import { handleGoogleSignin } from "@/services/handle-google-signin";

function Form() {
  return (
    <form
      method="POST"
      id="signup-form"
      className={`${styles.form} ${styles.fadeInSection}`}
    >
      <InputField
        type={"text"}
        name={"username"}
        id={"username"}
        placeholder={"enter your username"}
        autofocus={true}
      />
      <InputField
        type={"email"}
        name={"email"}
        id={"email"}
        placeholder={"enter your email"}
      />
      <div className="flex flex-col gap-2 w-full">
        <div
          className="capitalize w-full px-4 py-3      
		  text-sm lg:text-base font-semibold
   		 bg-pong-secondary/10
   		   rounded-md
   		   transition-all duration-300
   		   flex gap-8 md:gap-12 items-center
    	"
        >
          <label className="flex items-center gap-3 text-pong-primary cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="male"
              className="accent-pong-accent w-4 h-4"
              required
            />
            <span>Male</span>
          </label>
          <label className="flex items-center gap-3 text-pong-primary cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="female"
              className="accent-pong-accent w-4 h-4"
            />
            <span>Female</span>
          </label>
        </div>
      </div>

      <InputField
        type={"password"}
        name={"password"}
        id={"password"}
        placeholder={"enter your password"}
      />
      <InputField
        type={"password"}
        name={"confirm-password"}
        id={"confirm-password"}
        placeholder={"confirm your password"}
      />
      <div
        id="signup-feedback"
        className={`${styles.formMessage} hidden`}
        role="alert"
        aria-live="polite"
      ></div>
      <button
        type="submit"
        id="signup-btn"
        className={`group ${styles.primaryButton} shadow-lg hover:animate-none relative flex items-center justify-center`}
        aria-busy="false"
      >
        <span
          id="spinner"
          className="hidden absolute left-4 w-4 h-4 border-2 border-white border-t-pong-accent rounded-full animate-spin"
          aria-hidden="true"
        ></span>
        <i
          className={`fa-solid fa-table-tennis-paddle-ball ${styles.primaryButtonIcon}`}
          aria-hidden="true"
        ></i>
        <span id="btn-label">register your racket</span>
      </button>
      <p className="text-xs text-pong-primary/70 -mt-2">
        by joining, you swear on honor to compete fairly and uphold the spirit
        of ping pong.
      </p>
      <div>
        <p className="text-sm md:text-base font-bold">
          Already hold a racket?{" "}
          <a
            href="signin"
            className="text-pong-accent underline hover:text-pong-secondary transition-all duration-300"
            data-link
          >
            Sign in here.
          </a>
        </p>
      </div>
      <RemoteSigninLink />
    </form>
  );
}

export function Signup() {
  setTimeout(() => {
    handleSignUp();
    handleGoogleSignin();
    handle42Signin();
  }, 0);

  return (
    <section className={styles.pageLayoutLight}>
      <MainHeader
        isDark={true}
        title={"Join"}
        titleSpan={"The Club"}
        subtitle={"become a member"}
        subtitleParagraph={"sign your name into club history"}
      />
      <Form />
      <Footer />
    </section>
  );
}
