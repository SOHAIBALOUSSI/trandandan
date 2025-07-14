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

          <div className="text-center max-w-2xl space-y-4">
            <p
              className={`text-pong-dark-primary ${fontSizes.bodyFontSize} font-medium`}
            >
              As you step away from the club, your legacy echoes through the
              halls of the lounge.
            </p>
            <p
              className={`text-pong-dark-secondary/80 ${fontSizes.smallTextFontSize}`}
            >
              Leave a parting message, if you wish—something for your fellow
              champions to remember.
            </p>
          </div>

          <textarea
            name="farewell"
            id="farewell-message"
            placeholder="Write your final words to the club..."
            className={`w-full max-w-xl h-32 p-4 rounded-lg ${fontSizes.inputFontSize} font-medium bg-pong-secondary/10 text-pong-dark-primary placeholder-pong-dark-primary/40 shadow-md focus:outline-none focus:ring-2 focus:ring-pong-accent resize-none`}
          ></textarea>

          <div className="bg-pong-error/10 border border-pong-error/40 rounded-lg p-6 w-full max-w-xl text-center space-y-2 shadow-sm">
            <p
              className={`text-pong-error font-bold ${fontSizes.bodyFontSize}`}
            >
              ⚠️ This action is permanent.
            </p>
            <p
              className={`text-pong-dark-primary/80 ${fontSizes.smallTextFontSize}`}
            >
              Your member profile, game records, and club stats will be
              completely removed. There’s no going back.
            </p>
          </div>

          <div className="w-full max-w-xl">
            <SubmitBtn btnIcon="fa-trash" btnLabel="leave the club" />
          </div>
        </main>
      </div>
    </section>
  );
}
