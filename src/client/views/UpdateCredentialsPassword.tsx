import { handleChangePassword } from "@/handlers/change-password";
import { styles } from "@/styles/styles";
import { fontSizes } from "@/styles/fontSizes";
import { NavBar } from "@/components/layout/NavBar";
import { showPasswordToggle } from "@/utils/show-password";

export function UpdateCredentialsPassword() {
  const currentPasswordId = "old-password";
  const newPasswordId = "new-password";
  const confirmNewPasswordId = "confirm-new-password";
  const showPasswordIconId = "show-password-icon";
  const showNewPasswordIconId = "show-new-password-icon";
  const showConfirmPasswordIconId = "show-confirm-password-icon";

  setTimeout(() => {
    showPasswordToggle(showPasswordIconId, currentPasswordId);
    showPasswordToggle(showNewPasswordIconId, newPasswordId);
    showPasswordToggle(showConfirmPasswordIconId, confirmNewPasswordId);
    handleChangePassword();
  }, 0);

  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <main className={styles.pageContent}>
        <div className={styles.darkForm}>
          <h2
            className={`${fontSizes.titleFontSize} text-center font-bold text-pong-accent mb-4`}
          >
            Update Your Password
          </h2>
          <p
            className={`${fontSizes.smallTextFontSize} text-pong-secondary/80 text-center mb-6`}
          >
            For your security, please enter your current password and choose a
            new one. Make sure your new password is strong and unique.
          </p>

          <form
            id="change-password-form"
            className="w-full flex flex-col gap-6"
          >
            <div className="relative w-ful">
              <input
                type="password"
                name="old-password"
                id={currentPasswordId}
                className="w-full bg-pong-dark-bg/80 text-pong-dark-primary placeholder:text-pong-dark-primary/50 px-4 py-3 rounded-xl border-2 border-pong-accent/30 focus:outline-none focus:border-pong-accent focus:ring-2 focus:ring-pong-accent transition-all normal-case placeholder:capitalize pr-12"
                placeholder="Current password"
                autoComplete="off"
              />
              <i
                className="show-pass text-sm fa-solid fa-eye fa-eye-slash absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer text-pong-dark-primary/60 hover:text-pong-dark-accent transition"
                id={showPasswordIconId}
              ></i>
            </div>
            <div className="relative w-full">
              <input
                type="password"
                name="new-password"
                id={newPasswordId}
                className="w-full bg-pong-dark-bg/80 text-pong-dark-primary placeholder:text-pong-dark-primary/50 px-4 py-3 rounded-xl border-2 border-pong-accent/30 focus:outline-none focus:border-pong-accent focus:ring-2 focus:ring-pong-accent transition-all normal-case placeholder:capitalize pr-12"
                placeholder="New password"
                autoComplete="off"
              />
              <i
                className="show-pass text-sm fa-solid fa-eye fa-eye-slash absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer text-pong-dark-primary/60 hover:text-pong-dark-accent transition"
                id={showNewPasswordIconId}
              ></i>
            </div>
            <div className="relative w-full">
              <input
                type="password"
                name="confirm-new-password"
                id={confirmNewPasswordId}
                className="w-full bg-pong-dark-bg/80 text-pong-dark-primary placeholder:text-pong-dark-primary/50 px-4 py-3 rounded-xl border-2 border-pong-accent/30 focus:outline-none focus:border-pong-accent focus:ring-2 focus:ring-pong-accent transition-all normal-case placeholder:capitalize pr-12"
                placeholder="Confirm new password"
                autoComplete="off"
              />
              <i
                className="show-pass text-sm fa-solid fa-eye fa-eye-slash absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer text-pong-dark-primary/60 hover:text-pong-dark-accent transition"
                id={showConfirmPasswordIconId}
              ></i>
            </div>
            <button
              type="submit"
              className={styles.darkSubmitBtn}
              id="submit-btn"
            >
              <i className="fa-solid fa-key mr-2"></i>
              Update Password
            </button>
          </form>
        </div>
      </main>
    </section>
  );
}
