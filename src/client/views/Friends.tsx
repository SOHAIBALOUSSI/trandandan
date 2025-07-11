import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";
import { hydrateAllMembers } from "@/handlers/hydrate-all-members";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";
import { getCurrentUser } from "@/utils/user-store";
import { hydrateFriends } from "@/handlers/hydrate-friends";
import { Loader } from "@/components/common/Loader";
import { FriendsList } from "@/components/friends/FriendsList";
import { AllMembersList } from "@/components/friends/AllMembersList";

export function Friends() {
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

  setTimeout(() => {
    hydrateFriends();
    hydrateAllMembers(user);
  }, 0);

  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className={styles.pageContent}>
          <SecondaryHeader
            title="Meet the Members"
            subtitle="Welcome to your club's heart — connect with friends, discover new players, and grow your circle."
          />

          <div className="flex flex-col gap-8 w-full max-w-5xl">
            <div className="bg-pong-secondary/10 rounded-xl shadow-md p-6 md:p-10 w-full max-w-5xl mx-auto">
              <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-3 mb-8">
                <span className="inline-block w-1.5 h-8 bg-pong-accent rounded-sm"></span>
                Friends List
              </h2>
              <p className="text-sm text-white/60 mt-[-1rem] mb-6 pl-6">
                Your current club friends
              </p>
              <FriendsList />
            </div>

            <div className="bg-pong-secondary/10 rounded-xl shadow-md p-6 md:p-10 w-full max-w-5xl mx-auto">
              <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-3 mb-8">
                <span className="inline-block w-1.5 h-8 bg-pong-highlight rounded-sm"></span>
                All Members
              </h2>
              <p className="text-sm text-white/60 mt-[-1rem] mb-6 pl-6">
                Browse and connect with other BHC members
              </p>
              <AllMembersList />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
