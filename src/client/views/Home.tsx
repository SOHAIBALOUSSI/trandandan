import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";

export function Home() {
  const homeSection = (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      {/* <div className="md:ml-[110px] md:w-[calc(100vw-110px)] relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-4rem)] overflow-y-auto"></main>
      </div> */}
    </section>
  );

  return homeSection;
}

function fetchUserData() {}
