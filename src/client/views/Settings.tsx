import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/common/MainHeader";
import { styles } from "@/styles/styles";
import { TwoFa } from "@/components/settings/TwoFa";
// import { setupEmail2FA } from "@/services/handle-2fa";
// import { disableApp2FA } from "@/services/handle-2fa";
// import { disableEmail2FA } from "@/services/handle-2fa";
// import { setPrimaryApp2FA } from "@/services/handle-2fa";
// import { setPrimaryEmail2FA } from "@/services/handle-2fa";

export function Settings() {
  return (
    <section className={styles.pageLayoutDark} id="settings-section">
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-4rem)] overflow-y-auto flex flex-col items-center gap-8">
          <MainHeader isDark={false} title="the ledger" titleSpan="room" />
          <TwoFa />
        </main>
      </div>
    </section>
  );
}
