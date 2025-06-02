import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/common/MainHeader";
import { styles } from "@/styles/styles";
import { MyBtn } from "@/components/common/MyBtn";
import { InputField } from "@/components/common/InputField";
import { setupApp2FA } from "@/services/handle-2fa";
import { setupEmail2FA } from "@/services/handle-2fa";
import { disableApp2FA } from "@/services/handle-2fa";
import { disableEmail2FA } from "@/services/handle-2fa";
import { setPrimaryApp2FA } from "@/services/handle-2fa";
import { setPrimaryEmail2FA } from "@/services/handle-2fa";

function TwofaMode(props: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-4 bg-gray-900 text-white text-lg m-8 p-6 rounded-sm">
      <span className="text-pong-secondary">{props.title}</span>
      <div className="flex items-center gap-4">
        <MyBtn
          label="Enable"
          className={`${styles.buttonPrimary} w-24`}
          id={`${props.title === "App" ? "enable-app" : "enable-email"}`}
        />
        <MyBtn
          label="Disable"
          className={`${styles.buttonPrimary} w-24`}
          id={`${props.title === "App" ? "disable-app" : "disable-email"}`}
        />
        <MyBtn
          label="Primary"
          className={`${styles.buttonPrimary} w-24`}
          id={`${props.title === "App" ? "primary-app" : "primary-email"}`}
        />
      </div>
    </div>
  );
}

function UpdateInfoSection() {
  const section = (
    <div className="bg-gray-800 rounded shadow p-6 m-4 w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4 text-pong-dark-primary">
        Update Info
      </h2>
      <form className="flex flex-col gap-4">
        <InputField
          type="text"
          name="username"
          id="update-username"
          placeholder="new username"
          className="text-white placeholder:text-gray-300"
        />
        <InputField
          type="email"
          name="email"
          id="update-email"
          placeholder="new email"
          className="text-white placeholder:text-gray-300"
        />
        <InputField
          type="password"
          name="password"
          id="update-password"
          placeholder="new password"
          className="text-white placeholder:text-gray-300"
        />
        <MyBtn label="update" className={`${styles.buttonPrimary} w-full`} />
      </form>
    </div>
  );
  return section;
}

function TwofaSection() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-6 m-4 w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4 text-pong-dark-primary">
        Two-Factor Authentication
      </h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        Enhance your account security with two-factor authentication.
      </p>
      <TwofaMode title="App" />
      <TwofaMode title="Email" />
    </div>
  );
}

function BlockedAccountsSection() {
  const section = (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-6 m-4 w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4 text-pong-dark-primary">
        Blocked Accounts
      </h2>
      <ul className="list-disc pl-6">
        {/* later with dynamic blocked users from friend service */}
        <li className="mb-2 flex justify-between items-center">
          <span>l3arbi</span>
          <MyBtn label="Unblock" className={`${styles.buttonPrimary} w-24`} />
        </li>
        <li className="mb-2 flex justify-between items-center">
          <span>sopu</span>
          <MyBtn label="Unblock" className={`${styles.buttonPrimary} w-24`} />
        </li>
      </ul>
    </div>
  );
  return section;
}

function DeleteAccountSection() {
  const section = (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-6 m-4 w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4 text-pong-error">Delete Account</h2>
      <p className="mb-4 text-pong-error">
        This action is irreversible. All your data will be permanently deleted.
      </p>

      <MyBtn
        label="Delete Account"
        className={`${styles.buttonPrimary} w-full bg-pong-error hover:bg-red-700 mt-4`}
      />
    </div>
  );
  return section;
}

export function Settings() {
  setTimeout(() => {
    setupApp2FA();
  }, 0);

  const settingsSection = (
    <section className={styles.pageLayoutDark} id="settings-section">
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-4rem)] overflow-y-auto flex flex-col items-center gap-8">
          <MainHeader isDark={false} title="system" titleSpan="settings" />
          <UpdateInfoSection />
          <TwofaSection />
          <BlockedAccountsSection />
          <DeleteAccountSection />
        </main>
      </div>
    </section>
  );
  return settingsSection;
}
