import { styles } from "@/styles/styles";
import { Footer } from "@/components/layout/footer";
import { handleSignUp } from "@/services/handle-signup";
import { MainHeader } from "@/components/common/main-header";
import { InputField } from "@/components/common/input-field";

function Form() {
  return (
    <form
      action=""
      method="post"
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
      <div id="signup-feedback" className={styles.formMessageError}>
        Bad Request
      </div>
      <button
        type="submit"
        className={`group ${styles.primaryButton} shadow-lg hover:animate-none`}
      >
        <i
          className={`fa-solid fa-table-tennis-paddle-ball ${styles.primaryButtonIcon}`}
        ></i>
        register your racket
      </button>
      <p className="text-xs text-pong-primary/70 mt-2">
        by joining, you swear on honor to compete fairly and uphold the spirit
        of ping pong.
      </p>
      <div className="mt-8">
        <p className="text-sm md:text-md lg:text-lg xl:text-xl font-bold">
          Already hold a racket?{" "}
          <a
            href="signin"
            className="link-a text-pong-accent underline hover:text-pong-secondary transition-all duration-300"
            data-link
          >
            Sign in here.
          </a>
        </p>
      </div>
    </form>
  );
}

export function Signup() {
  setTimeout(() => {
    handleSignUp();
  }, 0);

  return (
    <section className={`${styles.pageLayoutLight} ${styles.signupContent}`}>
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
