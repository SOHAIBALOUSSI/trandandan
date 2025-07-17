import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";
import { deleteAccount } from "@/handlers/delete-account";
import { SubmitBtn } from "@/components/common/SubmitBtn";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";
import { fontSizes } from "@/styles/fontSizes";

export function DeleteAccount() {
  setTimeout(() => {
    deleteAccount();
  }, 0);

  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main
          className={`${styles.pageContent} flex flex-col items-center gap-10`}
        >
          <SecondaryHeader
            title="Farewell, Champion"
            subtitle="Every journey has an end—even in the club of legends."
          />

          <div
            className={`${styles.cardOneStyle} items-center gap-8`}
          >
            <p className="text-center text-pong-dark-primary font-medium text-lg md:text-xl max-w-2xl leading-relaxed">
              As you step away from the club, your legacy echoes through the
              halls of the lounge.
            </p>

            <textarea
              name="farewell"
              id="farewell-message"
              placeholder="Write your final words to the club..."
              className="w-full max-w-xl h-32 p-4 rounded-lg text-base md:text-lg font-medium bg-pong-primary/10 text-pong-dark-primary placeholder-pong-secondary/40 shadow-md focus:outline-none focus:ring-2 focus:ring-pong-secondary resize-none"
              autoFocus
            ></textarea>

            {/* Warning Box */}
            <div className="bg-pong-error/10 border border-pong-error/30 rounded-xl p-6 w-full max-w-xl text-center space-y-3 shadow-md">
              <p className="text-pong-error font-bold text-lg md:text-xl">
                ⚠️ This action is permanent.
              </p>
              <p className="text-pong-dark-primary/80 text-sm md:text-base leading-snug">
                Your member profile, match history, and club stats will be
                permanently deleted. There's no turning back.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="submit-btn"
              aria-busy="false"
              className="relative flex items-center justify-center gap-2 bg-pong-error hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl text-md md:text-lg shadow-lg uppercase tracking-wide transition-all duration-300 focus:ring-2 focus:ring-pong-error/50 focus:outline-none"
            >
              <span
                id="spinner"
                className="hidden absolute left-4 w-4 h-4 border-2 border-white border-t-pong-accent rounded-full animate-spin"
                aria-hidden="true"
              ></span>
              <i className="fa-solid fa-trash"></i>
              <span id="btn-label">Leave the Club</span>
            </button>
          </div>
        </main>
      </div>
    </section>
  );
}
