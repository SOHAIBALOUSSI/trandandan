import { InputField } from "../common/InputField";
import { CTA } from "../common/Cta";
import { RemoteLink } from "./RemoteLink";
import { styles } from "@/styles/styles";

export function SignUpForm() {
  return (
    <form
      method="POST"
      id="signup-form"
      className={`${styles.form} ${styles.fadeInSection}`}
    >
      <InputField
        type="text"
        name="username"
        id="username"
        placeholder="enter your username"
        autofocus={true}
      />
      <InputField
        type="email"
        name="email"
        id="email"
        placeholder="enter your email"
      />
      <div>
        <select
          name="gender"
          id="gender"
          required
          className={styles.customSelect}
        >
          <option value="" disabled selected hidden>
            select your title of elegance
          </option>
          <option value="male">gentleman</option>
          <option value="female">lady</option>
        </select>
      </div>

      <InputField
        type="password"
        name="password"
        id="password"
        placeholder="enter your password"
      />
      <InputField
        type="password"
        name="confirm-password"
        id="confirm-password"
        placeholder="confirm your password"
      />
      <CTA
        feedbackId="signup-feedback"
        btnId="signup-btn"
        btnIcon="fa-table-tennis-paddle-ball"
        btnLabel="register your racket"
      />
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
      <RemoteLink />
    </form>
  );
}
