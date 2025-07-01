import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";
import { TwoFa } from "@/components/settings/TwoFa";
import { ChangePassword } from "@/components/settings/ChangePassword";
import { ChangeEmail } from "@/components/settings/ChangeEmail";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";
import { getCurrentUser } from "@/utils/user-store";
import { Loader } from "@/components/common/Loader";

export function Security() {
  const user = getCurrentUser();
  if (!user) {
    return (
      <section className={styles.pageLayoutDark}>
        <NavBar />
        <div className="w-full relative">
          <TopBar />
          <Loader />
        </div>
      </section>
    );
  }

  const isNotRemoteUser: boolean = user.gender !== null;

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

          {isNotRemoteUser ? (
            <div className="flex flex-col gap-6">
              <ChangePassword />
              <ChangeEmail />
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-4">
              Remote users cannot change password or email.
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
