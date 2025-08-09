import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MemberCard } from "@/components/profile/MemberCard";
import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import { Loader } from "@/components/common/Loader";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";
import { MatchHistory } from "@/components/profile/MatchHistory";
import { PerformanceMetrics } from "@/components/profile/PerformanceMetrics";
import { QuickLinks } from "@/components/profile/QuickLinks";

export function Profile() {
  const user = getCurrentUser();
  if (!user) {
    return <Loader text="Preparing your club profile..." />;
  }

  return (
    <section className={`${styles.pageLayoutDark} relative`}>
      <NavBar />
      <div className="w-full relative">
        {/* <TopBar /> */}

        <main className={styles.pageContent}>
          <SecondaryHeader
            title="Member Profile"
            subtitle="Your identity, matches & achievements in the BHV Club."
          />

          <div className="w-full md:w-[90%] xl:w-[95%] mx-auto flex flex-col 2xl:flex-row gap-8 xl:gap-12">
            <div className="w-full 2xl:w-1/3 2xl:sticky 2xl:top-24 flex 2xl:self-start flex-col 2xl:flex-col items-center justify-center gap-6">
              <MemberCard user={user} showUpdateOptions={true} />
              <QuickLinks />
            </div>

            <div className="flex-1 flex flex-col gap-8 w-full">
              <PerformanceMetrics user={user} />
              <MatchHistory user={user} />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
