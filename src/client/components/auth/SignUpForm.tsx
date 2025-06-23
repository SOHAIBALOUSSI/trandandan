import { InputField } from "../common/InputField";
import { CTA } from "../common/Cta";
import { RemoteLink } from "./RemoteLink";
import { styles } from "@/styles/styles";

export function SignUpForm() {
  return (
    <form id="signup-form" className={styles.form}>
      <InputField
        type="text"
        name="username"
        id="username"
        placeholder="choose your noble name"
        autofocus={true}
      />
      <InputField
        type="email"
        name="email"
        id="email"
        placeholder="your correspondence address"
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
      />
      <InputField
        type="password"
        name="confirm-password"
        id="confirm-password"
        placeholder="confirm your secret key"
      />

      <CTA btnIcon="fa-champagne-glasses" btnLabel="register your racket" />

      <p className="text-xs text-center text-pong-primary/70 -mt-2 italic">
        by joining, you swear on honor to compete fairly and uphold the spirit
        of ping pong.
      </p>

      <div className="text-center mt-4">
        <p className="text-sm md:text-base font-semibold">
          already a member of the hall?{" "}
          <a
            href="signin"
            className="text-pong-accent underline hover:text-pong-secondary transition-all duration-300"
            data-link
          >
            enter the lounge.
          </a>
        </p>
      </div>

      <RemoteLink />
    </form>
  );
}
