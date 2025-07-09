import { handleChangeEmail } from "@/handlers/change-email";
import { styles } from "@/styles/styles";
import { NavBar } from "@/components/layout/NavBar";
import { fontSizes } from "@/styles/fontSizes";

export function UpdateCredentialsEmail() {
  setTimeout(() => {
    handleChangeEmail();
  }, 0);

  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <main className={styles.pageContent}>
        <div className={styles.darkForm}>
          <h2
            className={`${fontSizes.smallTitleFontSize} font-bold text-pong-accent mb-2`}
          >
            Update Email
          </h2>
          <p
            className={`${fontSizes.smallTextFontSize} text-pong-secondary/80 text-center mb-6`}
          >
            Enter your new email address below. You’ll receive a confirmation
            email if required.
          </p>

          <form id="change-email-form" className="w-full flex flex-col gap-4">
            <input
              type="text"
              name="email"
              id="email"
              className="w-full bg-pong-dark-bg/80 text-pong-dark-primary placeholder:text-pong-dark-primary/50 px-4 py-3 rounded-xl border-2 border-pong-accent/30 focus:outline-none focus:border-pong-accent focus:ring-2 focus:ring-pong-accent transition-all normal-case placeholder:capitalize"
              placeholder="Enter your new email"
              autoComplete="off"
            />
            <button
              type="submit"
              className={styles.darkSubmitBtn}
              id="submit-btn"
            >
              <i className="fa-solid fa-envelope-circle-check mr-2"></i>
              Update Email
            </button>
          </form>
        </div>
      </main>
    </section>
  );
}
