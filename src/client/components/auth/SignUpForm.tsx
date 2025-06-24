import { InputField } from "../common/InputField";
import { CTA } from "../common/Cta";
import { RemoteLink } from "./RemoteLink";
import { styles } from "@/styles/styles";
import { fontSizes } from "@/styles/fontSizes";

export function SignUpForm() {
  return (
    <form id="signup-form" className={`${styles.form} animate-fadeInUp`}>
      <InputField
        type="text"
        name="username"
        id="username"
        placeholder="choose your noble name"
        autofocus={true}
        className={styles.mainInputFieldStyles}
      />
      <InputField
        type="email"
        name="email"
        id="email"
        placeholder="your correspondence address"
        className={styles.mainInputFieldStyles}
      />
      <div className="relative w-full text-left">
        <select
          name="gender"
          id="gender"
          required
          className={styles.customSelect}
        >
          <option value="" disabled selected hidden>
            select your title of elegance
          </option>
          <option value="male" className="bg-pong-secondary/10">
            gentleman
          </option>
          <option value="female" className="bg-pong-secondary/10">
            lady
          </option>
        </select>
        <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-pong-primary/60">
          <i className="fa-solid fa-chevron-down text-sm"></i>
        </div>
      </div>
      <InputField
        type="password"
        name="password"
        id="password"
        placeholder="forge your secret key"
        className={styles.mainInputFieldStyles}
      />
      <InputField
        type="password"
        name="confirm-password"
        id="confirm-password"
        placeholder="confirm your secret key"
        className={styles.mainInputFieldStyles}
      />

      <CTA btnIcon="fa-champagne-glasses" btnLabel="register your racket" />

      <p className="text-xs text-center text-pong-primary/70 -mt-2 italic">
        by joining, you swear on honor to compete fairly and uphold the spirit
        of ping pong.
      </p>

      <p
        className={`${fontSizes.buttonFontSize} w-full font-medium text-pong-primary/80`}
      >
        already a member of the hall?{" "}
        <a href="signin" className={styles.customFormLink} data-link>
          enter the lounge.
        </a>
      </p>

      <RemoteLink />
    </form>
  );
}
