import { InputField } from "../common/InputField";
import { CTA } from "../common/Cta";
import { RemoteLink } from "./RemoteLink";
import { styles } from "@/styles/styles";
import { fontSizes } from "@/styles/fontSizes";

export function SignInForm() {
  return (
    <form id="signin-form" className={`${styles.form} animate-fadeInUp`}>
      <InputField
        type="text"
        name="login"
        id="login"
        placeholder="member ID or email"
        autofocus={true}
        className={styles.mainInputFieldStyles}
      />
      <InputField
        type="password"
        name="password"
        id="password"
        placeholder="Secret Code"
        className={styles.mainInputFieldStyles}
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
          className="underline hover:text-pong-accent transition"
          data-link
        >
          forgot credentials?
        </a>
      </div>

      <CTA btnIcon="fa-door-open" btnLabel="enter the lounge" />

      <p
        className={`${fontSizes.buttonFontSize} w-full font-medium text-pong-primary/80`}
      >
        not a member yet?{" "}
        <a
          href="signup"
          className="text-pong-accent underline hover:text-pong-secondary transition"
          data-link
        >
          apply for a paddle.
        </a>
      </p>

      <RemoteLink />
    </form>
  );
}
