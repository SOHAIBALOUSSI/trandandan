import { handleChangePassword } from "@/handlers/handle-change-password";
import { styles } from "@/styles/styles";

export function ChangePassword() {
  setTimeout(() => {
    handleChangePassword();
  }, 0);

  return (
    <div className={styles.settingsLayout}>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Forge a New Passphrase
      </h2>
      <p className="text-base md:text-lg text-white/80 mb-8 leading-relaxed">
        Refresh your secret incantation to guard your club identity. Choose a
        strong phrase — worthy of a champion’s credentials.
      </p>
    </div>
  );
}
