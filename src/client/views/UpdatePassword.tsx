import { handleUpdatePassword } from "@/handlers/handle-update-password";
import { Footer } from "@/components/layout/Footer";
import { styles } from "@/styles/styles";
import { InputField } from "@/components/common/InputField";
import { Overlay } from "@/components/layout/Overlay";
import { SubmitBtn } from "@/components/common/SubmitBtn";
import { fontSizes } from "@/styles/fontSizes";

export function UpdatePassword() {
  setTimeout(() => {
    handleUpdatePassword();
  }, 0);

  return (
    <section className={styles.pageLayoutLight}>
      <Overlay />
      <div className={`${styles.customSectionStyles} animate-fadeInUp`}>
        <h1 className={styles.titleDark}>one final serve, champion.</h1>
        <p className={`${styles.subtitleParagraphDark} my-6`}>
          set your new password to secure your spot in the club.
        </p>

        <div className="flex justify-center mb-6">
          <i className="fa-solid fa-table-tennis-paddle-ball text-pong-accent text-3xl animate-bounce" />
        </div>

        <form id="update-password-form" className={styles.customForm}>
          <InputField
            type="password"
            name="newPassword"
            id="new-password"
            placeholder="forge your new key"
            autofocus={true}
          />
          <InputField
            type="password"
            name="newPasswordConfirm"
            id="confirm-new-password"
            placeholder="confirm the forged key"
          />
          <SubmitBtn btnIcon="fa-lock" btnLabel="lock it in" />
        </form>

        <p
          className={`${fontSizes.buttonFontSize} w-full my-6 font-medium text-pong-primary/80`}
        >
          remembered your paddle?{" "}
          <a href="signin" className={styles.customFormLink} data-link>
            return to the club entrance
          </a>
        </p>

        <p className="w-full border-t border-pong-accent/10 my-6"></p>
        <p className="text-xs md:text-sm text-pong-primary/70">
          this is how champions protect their legacy.{" "}
        </p>
      </div>
      <Footer />
    </section>
  );
}
