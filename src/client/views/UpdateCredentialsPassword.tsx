import { handleChangePassword } from "@/handlers/change-password";
import { styles } from "@/styles/styles";
import { fontSizes } from "@/styles/fontSizes";
import { NavBar } from "@/components/layout/NavBar";

export function UpdateCredentialsPassword() {
  setTimeout(() => {
    handleChangePassword();
  }, 0);

  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <main className={styles.pageContent}>
        <div className={styles.darkForm}>
          <h2
            className={`${fontSizes.smallTitleFontSize} font-bold text-pong-accent mb-2`}
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
            className="w-full flex flex-col gap-4"
          >
            <input
              type="password"
              name="old-password"
              id="old-password"
              className="w-full bg-pong-dark-bg/80 text-pong-dark-primary placeholder:text-pong-dark-primary/50 px-4 py-3 rounded-xl border-2 border-pong-accent/30 focus:outline-none focus:border-pong-accent focus:ring-2 focus:ring-pong-accent transition-all normal-case placeholder:capitalize"
              placeholder="Current password"
              autoComplete="off"
            />
            <input
              type="password"
              name="new-password"
              id="new-password"
              className="w-full bg-pong-dark-bg/80 text-pong-dark-primary placeholder:text-pong-dark-primary/50 px-4 py-3 rounded-xl border-2 border-pong-accent/30 focus:outline-none focus:border-pong-accent focus:ring-2 focus:ring-pong-accent transition-all normal-case placeholder:capitalize"
              placeholder="New password"
              autoComplete="off"
            />
            <input
              type="password"
              name="confirm-new-password"
              id="confirm-new-password"
              className="w-full bg-pong-dark-bg/80 text-pong-dark-primary placeholder:text-pong-dark-primary/50 px-4 py-3 rounded-xl border-2 border-pong-accent/30 focus:outline-none focus:border-pong-accent focus:ring-2 focus:ring-pong-accent transition-all normal-case placeholder:capitalize"
              placeholder="Confirm new password"
              autoComplete="off"
            />
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
