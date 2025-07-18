import { InputField } from "../common/InputField";
import { RemoteLink } from "./RemoteLink";
import { styles } from "@/styles/styles";
import { fontSizes } from "@/styles/fontSizes";
import { SubmitBtn } from "../common/SubmitBtn";
import { handleSignUp } from "@/handlers/signup";
import { showPasswordToggle } from "@/utils/show-password";

export function SignUpForm() {
  const passwordId = "password";
  const showPasswordIconId = "signup-show-pass";
  const confirmPasswordId = "confirm-password";
  const showConfirmPasswordIconId = "signup-show-confirm-pass";

  setTimeout(() => {
    showPasswordToggle(showPasswordIconId, passwordId);
    showPasswordToggle(showConfirmPasswordIconId, confirmPasswordId);
    handleSignUp();

    const titleInput = document.getElementById("title") as HTMLInputElement;
    const genderSelect = document.getElementById(
      "gender-options"
    ) as HTMLDivElement | null;
    const male = document.getElementById("gender-male");
    const female = document.getElementById("gender-female");

    if (!titleInput || !genderSelect || !male || !female) return;

    titleInput.addEventListener("click", (e) => {
      e.stopPropagation();
      genderSelect.classList.toggle("hidden");
    });

    male.addEventListener("click", () => {
      titleInput.value = "gentleman";
      genderSelect.classList.add("hidden");
    });
    female.addEventListener("click", () => {
      titleInput.value = "lady";
      genderSelect.classList.add("hidden");
    });
  }, 0);

  return (
    <form id="signup-form" className={styles.mainForm}>
      <InputField
        type="text"
        name="username"
        id="username"
        placeholder="choose your noble name"
        autofocus={true}
      />
      <InputField
        type="text"
        name="email"
        id="email"
        placeholder="your correspondence address"
      />

      <div className="relative w-full text-left">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="select your title of elegance"
          autoComplete="off"
          className={styles.InputFieldOne}
        />
        <div
          id="gender-options"
          className="text-center hidden absolute rounded-xl z-50 top-16 left-0 bg-pong-secondary flex flex-col items-start justify-center gap-2 w-full h-full text-md text-pong-primary/80"
        >
          <p
            id="gender-male"
            className="block hover:bg-pong-primary/50 cursor-pointer w-full"
          >
            gentleman
          </p>
          <p
            id="gender-female"
            className="block hover:bg-pong-primary/50 cursor-pointer w-full"
          >
            lady
          </p>
        </div>
        {/* <select name="gender" id="gender" className={styles.selectField}>
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
        <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-pong-highlight">
          <i className="fa-solid fa-chevron-down text-sm"></i>
        </div> */}
      </div>

      <div className="relative w-full">
        <input
          type="password"
          name="password"
          id={passwordId}
          placeholder="secret code"
          autoComplete="off"
          className={styles.InputFieldOne}
        />
        <i className={styles.showPassIcon} id={showPasswordIconId}></i>
      </div>
      <div className="relative w-full">
        <input
          type="password"
          name="password"
          id={confirmPasswordId}
          placeholder="secret code"
          autoComplete="off"
          className={styles.InputFieldOne}
        />
        <i className={styles.showPassIcon} id={showConfirmPasswordIconId}></i>
      </div>

      <SubmitBtn
        btnIcon="fa-champagne-glasses"
        btnLabel="register your racket"
      />

      <p
        className={`${fontSizes.inputFontSize} w-full font-medium text-pong-primary/80`}
      >
        already a member of the hall?{" "}
        <a href="login" className={styles.customFormLink} data-link>
          enter the lounge.
        </a>
      </p>

      <RemoteLink />

      <p className="text-xs text-center text-pong-primary/70 italic">
        by joining, you swear on honor to compete fairly and uphold the spirit
        of ping pong.
      </p>
    </form>
  );
}
