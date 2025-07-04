import { InputField } from "../common/InputField";
import { SubmitBtn } from "../common/SubmitBtn";
import { RemoteLink } from "./RemoteLink";
import { styles } from "@/styles/styles";
import { fontSizes } from "@/styles/fontSizes";
import { handleSignIn } from "@/handlers/signin";

export function SignInForm() {
  setTimeout(() => {
    handleSignIn();
  }, 0);

  return (
    <form id="signin-form" className={`${styles.mainForm} animate-fadeInUp`}>
      <InputField
        type="text"
        name="login"
        id="login"
        placeholder="member ID or email"
        autofocus={true}
      />
      <InputField
        type="password"
        name="password"
        id="password"
        placeholder="Secret Code"
      />

      <div className="flex justify-between items-center w-full text-sm text-pong-primary/70 mt-[-0.5rem]">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="accent-pong-accent focus:ring-pong-primary"
          />
          keep me signed in
        </label>
        <a
          href="password_reset"
          className="underline underline-offset-1 hover:text-pong-accent hover:underline-offset-2 transition-all duration-300"
          data-link
        >
          forgot credentials?
        </a>
      </div>

      <SubmitBtn btnIcon="fa-door-open" btnLabel="enter the lounge" />

      <p
        className={`${fontSizes.inputFontSize} w-full font-medium text-pong-primary/80`}
      >
        not a member yet?{" "}
        <a href="signup" className={styles.customFormLink} data-link>
          apply for a paddle.
        </a>
      </p>

      <RemoteLink />

      <p className="text-xs text-center text-pong-primary/70 italic">
        by signing in, you return to the arena — ready to rally, rise, and
        respect the code of champions.
      </p>
    </form>
  );
}
