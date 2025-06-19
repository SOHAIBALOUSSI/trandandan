import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/common/MainHeader";
import { styles } from "@/styles/styles";
import { deleteAccount } from "@/handlers/handle-delete-account";
import { CTA } from "@/components/common/Cta";

export function DeleteAccount() {
  setTimeout(() => {
    deleteAccount();
  }, 0);

  return (
    <section className={styles.pageLayoutDark} id="blocked-section">
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-4rem)] overflow-y-auto flex flex-col items-center gap-10">
          <MainHeader
            isDark={false}
            title="delete your account"
            titleSpan="with honor"
          />

          <p className="text-pong-dark-primary/80 text-center max-w-lg italic">
            Every paddle leaves a mark. Say a few words before parting ways with
            the club.
          </p>

          <textarea
            name="farewell"
            id="farewell-message"
            placeholder="Leave a final message to your fellow champions..."
            className="w-full max-w-2xl h-28 p-4 rounded-lg text-sm font-medium bg-pong-secondary/10 text-pong-dark-primary placeholder-pong-dark-primary/40 shadow-md focus:outline-none focus:ring-2 focus:ring-pong-accent resize-none"
          ></textarea>

          <div className="bg-pong-error/10 border border-pong-error rounded-lg p-4 max-w-md text-center">
            <p className="text-pong-error font-semibold mb-2 text-base">
              Warning: This action is irreversible.
            </p>
            <p className="text-pong-dark-primary/80 text-sm">
              Your data and match history will be permanently removed.
            </p>
          </div>

          <form id="delete-account-form">
            <CTA btnIcon="fa-trash" btnLabel="checkout & leave the club" />
          </form>
        </main>
      </div>
    </section>
  );
}
