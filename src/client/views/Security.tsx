import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";
import { TwoFa } from "@/components/settings/TwoFa";
import { ChangePassword } from "@/components/settings/ChangePassword";
import { ChangeEmail } from "@/components/settings/ChangeEmail";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";

export function Security() {
  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className={styles.pageContent}>
          <SecondaryHeader
            title="Security & Access"
            subtitle="Manage your credentials and protect your club profile."
          />
          <TwoFa />
          <ChangePassword />
          <ChangeEmail />
        </main>
      </div>
    </section>
  );
}
