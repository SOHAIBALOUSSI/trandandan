import { handleChangeEmail } from "@/handlers/handle-change-email";
import { styles } from "@/styles/styles";

export function UpdateCredentialsEmail() {
  setTimeout(() => {
    handleChangeEmail();
  }, 0);

  return (
    <section className={styles.pageLayoutDark}>
      <main className={styles.pageContent}>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-full max-w-md bg-pong-dark-custom/80 border border-pong-accent/30 rounded-2xl shadow-lg px-8 py-10 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-pong-accent mb-2">
              Update Email
            </h2>
            <p className="text-pong-secondary/80 text-sm mb-6 text-center">
              Enter your new email address below. You’ll receive a confirmation
              email if required.
            </p>
            <form id="change-email-form" className="w-full flex flex-col gap-4">
              <input
                type="text"
                name="email"
                id="email"
                className="w-full bg-gray-700/80 text-white p-4 rounded-md border-2 border-pong-accent/30 focus:outline-none focus:border-pong-accent focus:ring-2 focus:ring-pong-accent transition-all normal-case placeholder:capitalize"
                placeholder="Enter your new email"
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-pong-accent hover:bg-pong-dark-accent text-white font-semibold p-3 rounded-md mt-2 shadow transition-all"
                id="submit-btn"
              >
                <i className="fa-solid fa-envelope-circle-check mr-2"></i>
                Update Email
              </button>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}
