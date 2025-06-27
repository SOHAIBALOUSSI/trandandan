import { styles } from "@/styles/styles";
import { handleChangeEmail } from "@/handlers/handle-change-email";

export function ChangeEmail() {
  setTimeout(() => {
    handleChangeEmail();
  }, 0);

  return (
    <div className={styles.settingsLayout}>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Change of Contact Scroll
      </h2>
      <p className="text-base md:text-lg text-white/80 mb-8 leading-relaxed">
        Time to update your registered parchment? Enter your new email below and
        we’ll send a carrier dove with a confirmation scroll.
      </p>
    </div>
  );
}
