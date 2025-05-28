import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/common/MainHeader";
import { styles } from "@/styles/styles";

function TwofaMode(props: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white text-lg m-8 p-12 cursor-pointer">
      <button className="">{props.title}</button>
    </div>
  );
}

export function Settings() {
  const settingsSection = (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="md:ml-[110px] md:w-[calc(100vw-110px)] relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-4rem)] overflow-y-auto">
          <MainHeader isDark={false} title="system" titleSpan="settings" />
          <div className="flex flex-col items-center justify-center h-full">
            <TwofaMode title="Enable 2FA" />
            <TwofaMode title="Disable 2FA" />
          </div>
        </main>
      </div>
    </section>
  );
  return settingsSection;
}
