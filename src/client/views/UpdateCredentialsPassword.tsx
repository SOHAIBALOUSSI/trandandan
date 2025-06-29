import { handleChangePassword } from "@/handlers/handle-change-password";
import { styles } from "@/styles/styles";

export function UpdateCredentialsPassword() {
  setTimeout(() => {
    handleChangePassword();
  }, 0);

  return (
    <section className={styles.pageLayoutDark}>
      <main className={styles.pageContent}>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-full max-w-md bg-pong-dark-custom/80 border border-pong-accent/30 rounded-2xl shadow-lg px-8 py-10 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-pong-accent mb-2">
              Update Your Password
            </h2>
            <p className="text-pong-secondary/80 text-sm mb-6 text-center">
              For your security, please enter your current password and choose a
              new one. Make sure your new password is strong and unique.
            </p>
            <form id="change-password-form" className="w-full flex flex-col gap-4">
              <input
                type="password"
                name="old-password"
                id="old-password"
                className="w-full bg-gray-700/80 text-white p-4 rounded-md border-2 border-pong-accent/30 focus:outline-none focus:border-pong-accent focus:ring-2 focus:ring-pong-accent transition-all normal-case placeholder:capitalize"
                placeholder="Current password"
                autoComplete="off"
              />
              <input
                type="password"
                name="new-password"
                id="new-password"
                className="w-full bg-gray-700/80 text-white p-4 rounded-md border-2 border-pong-accent/30 focus:outline-none focus:border-pong-accent focus:ring-2 focus:ring-pong-accent transition-all normal-case placeholder:capitalize"
                placeholder="New password"
                autoComplete="off"
              />
              <input
                type="password"
                name="confirm-new-password"
                id="confirm-new-password"
                className="w-full bg-gray-700/80 text-white p-4 rounded-md border-2 border-pong-accent/30 focus:outline-none focus:border-pong-accent focus:ring-2 focus:ring-pong-accent transition-all normal-case placeholder:capitalize"
                placeholder="Confirm new password"
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-pong-accent hover:bg-pong-dark-accent text-white font-semibold p-3 rounded-md mt-2 shadow transition-all"
                id="submit-btn"
              >
                <i className="fa-solid fa-key mr-2"></i>
                Update Password
              </button>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}
