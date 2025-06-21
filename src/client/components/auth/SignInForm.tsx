import { InputField } from "../common/InputField";
import { CTA } from "../common/Cta";
import { RemoteLink } from "./RemoteLink";
import { styles } from "@/styles/styles";

export function SignInForm() {
  return (
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
      <CTA
        btnIcon="fa-couch"
        btnLabel="enter the lounge"
      />
      <a
        href="password_reset"
        className="text-sm lg:text-base -mt-2 text-pong-accent underline hover:text-pong-secondary transition-all duration-300"
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
      <RemoteLink />
    </form>
  );
}
