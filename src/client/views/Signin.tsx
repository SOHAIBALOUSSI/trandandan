import { styles } from "@/styles/styles";
import { Footer } from "@/components/layout/footer";
import { handleSignIN } from "@/services/handle-signin";
import { InputField } from "@/components/common/input-field";
import { MainHeader } from "@/components/common/main-header";

function Form() {
  const form = (
    <form
      action=""
      method="post"
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
        href="#"
        className="-mt-2 text-pong-accent text-xs lg:text-base font-bold underline hover:text-pong-secondary transition-all duration-300"
        data-link
      >
        lost your paddle?
      </a>
      <div className="mt-2">
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
      <div className="line-divider relative w-full flex items-center justify-center my-6 min-h-[2.5rem]">
        <i className="fa-solid fa-table-tennis-paddle-ball"></i>
      </div>
      <div className="flex flex-col gap-6">
        <button
          type="button"
          id="google-signin-btn"
          className={`group ${styles.primaryButton} shadow-lg hover:animate-none`}
        >
          <i className="fa-solid fa-couch"></i>
          enter with google
        </button>
        <button
          type="button"
          id="ft-signin-btn"
          className={`group ${styles.primaryButton} shadow-lg hover:animate-none`}
        >
          <i className="fa-solid fa-couch"></i>
          enter with 42
        </button>
      </div>
    </form>
  );

  return form;
}

export function Signin() {
  setTimeout(() => {
    handleSignIN();
  }, 0);

  const signinSection = (
    <section className={styles.pageLayoutLight}>
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
