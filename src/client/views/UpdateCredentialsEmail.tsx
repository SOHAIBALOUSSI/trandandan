import { handleChangeEmail } from "@/handlers/handle-change-email";
import { styles } from "@/styles/styles";

export function UpdateCredentialsEmail() {
  setTimeout(() => {
    handleChangeEmail();
  }, 0);

  return (
    <section className={styles.pageLayoutDark}>
      <main className={styles.pageContent}>
        <div className=" w-full">
          <form id="change-email-form">
            <input
              type="email"
              name="email"
              id="email"
              className="w-full bg-gray-700/80 text-white p-6 normal-case placeholder:capitalize"
              placeholder="enter your new email"
            />
            <button
              type="submit"
              className="bg-pong-accent p-2 rounded-md mt-2"
              id="submit-btn"
            >
              Update
            </button>
          </form>
        </div>
      </main>
    </section>
  );
}
