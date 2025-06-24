import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/common/MainHeader";
import { styles } from "@/styles/styles";
import { TwoFa } from "@/components/settings/TwoFa";
import { CTA } from "@/components/common/Cta";
import { handleChangePassword } from "@/handlers/handle-change-password";

export function Security() {
  setTimeout(() => {
    handleChangePassword();
  }, 0);

  return (
    <section className={styles.pageLayoutDark} id="settings-section">
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-4rem)] overflow-y-auto flex flex-col items-center gap-8">
          <TwoFa />
          <div>
            <h2 className="text-xl text-pong-dark-primary mb-4">
              change password
            </h2>
            <form id="change-password-form" className="flex flex-col gap-4">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="New Password"
                className="p-2 text-pong-dark-primary rounded-md bg-pong-secondary/10 border border-pong-dark-secondary focus:outline-none focus:ring-2 focus:ring-pong-accent transition-all"
                required
              />
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="Confirm New Password"
                className="p-2 text-pong-dark-primary rounded-md bg-pong-secondary/10 border border-pong-dark-secondary focus:outline-none focus:ring-2 focus:ring-pong-accent transition-all"
                required
              />
              <CTA btnIcon="fa-lock" btnLabel="Change Password" />
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
