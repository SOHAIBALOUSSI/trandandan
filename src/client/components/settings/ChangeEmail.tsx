import { styles } from "@/styles/styles";
import { handleChangeEmail } from "@/handlers/handle-change-email";
import { fontSizes } from "@/styles/fontSizes";

export function ChangeEmail() {
  setTimeout(() => {
    handleChangeEmail();
  }, 0);

  return (
    <div className={styles.settingsLayout}>
      <h2
        className={`flex items-center gap-2 text-white ${fontSizes.smallTitleFontSize}`}
      >
        <span className="text-pong-accent">🛡️</span>
        <span className="font-bold"> Change of Contact Scroll</span>
      </h2>
      <p
        className={`${fontSizes.smallTextFontSize} text-white/80 leading-relaxed`}
      >
        Time to update your registered parchment? Enter your new email below and
        we’ll send a carrier dove with a confirmation scroll.
      </p>

      <a href="change_email" data-link>click here</a>

      <p className="text-pong-warning text-xs md:text-sm italic mt-2">
        Ensure your new email is valid and accessible, as it will be used for
        account recovery and notifications.
      </p>
    </div>
  );
}
