import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";

export function Home() {
  const homeSection = (
    <section className="w-full min-h-screen text-pong-dark-primary bg-gradient-to-b from-[#1b1b1b] via-[#141414] to-[#0a0a0a] relative">
      <NavBar />
      <div className="md:ml-[110px] md:w-[calc(100vw-110px)] relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Content here */}
        </main>
      </div>
    </section>
  );

  return homeSection;
}


function fetchUserData() {
	
}