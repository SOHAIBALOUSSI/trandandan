import { handleChangePassword } from "@/handlers/handle-change-password";
import { styles } from "@/styles/styles";
import { fontSizes } from "@/styles/fontSizes";

export function ChangePassword() {
  setTimeout(() => {
    handleChangePassword();
  }, 0);

  return (
    <div className={styles.settingsLayout}>
      <h2
        className={`flex items-center gap-2 text-white ${fontSizes.smallTitleFontSize}`}
      >
        <span className="text-pong-accent">🛡️</span>
        <span className="font-bold">Forge a New Passphrase</span>
      </h2>
      <p
        className={`${fontSizes.smallTextFontSize} text-white/80 leading-relaxed`}
      >
        Refresh your secret incantation to guard your club identity. Choose a
        strong phrase — worthy of a champion’s credentials.
      </p>

      <a href="change_password" data-link>click here</a>

      <p className="text-pong-warning text-xs md:text-sm italic mt-2">
        Use a mix of letters, numbers, and symbols for maximum protection.
      </p>
    </div>
  );
}
