import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";
import { loadFriendsList } from "@/services/get-all-users";

export function Friends() {
  setTimeout(() => {
    loadFriendsList();
  }, 0);

  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">Friends List</h1>
            <div className="bg-gray-800/80 p-6 rounded-lg shadow-lg">
              <ul id="friends-list" className="space-y-4"></ul>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
