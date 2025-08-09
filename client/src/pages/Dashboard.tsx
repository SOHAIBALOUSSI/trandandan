import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import { Loader } from "@/components/common/Loader";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";
import { dashboardLive } from "@/services/dashboard-service";
import { UserProfile } from "types/types";
import { getWelcomeTitle } from "@/components/home/Hero";
import { getAvatarUrl } from "@/utils/get-avatar-url";

export function Dashboard() {
  const user = getCurrentUser();
  if (!user) {
    return <Loader text="Preparing your club profile..." />;
  }

  setTimeout(() => {
    const table = document.getElementById("dashboard-table");
    if (!table) return;

    dashboardLive((players: UserProfile[]) => {
      table.innerHTML = `
		<tbody className="divide-y divide-pong-dark-highlight/30">
		${players
      .map((p: UserProfile) => {
        const winRate =
          Math.round((p.matches_won / p.matches_played) * 100) || 0;
        const rankIcon =
          p.rank === 1
            ? "🥇"
            : p.rank === 2
            ? "🥈"
            : p.rank === 3
            ? "🥉"
            : p.rank;

        return `
			<tr class="transition duration-200 hover:bg-pong-dark-highlight/20 ${
        user && p.id === user.id
          ? "font-bold bg-pong-dark-highlight/10 ring-1 ring-pong-gold"
          : ""
      }">
				<td class="px-4 py-4 flex items-center gap-3">
                  <img src="${getAvatarUrl(p)}" alt="${p.username}"
                    class="w-10 h-10 rounded-full object-cover border border-pong-accent/40" />
                  <span class="font-semibold normal-case">${getWelcomeTitle(
                    p
                  )} <a href="${
          user.id === p.id ? "/my_profile" : `/members/${p.id}`
        }" data-link class="text-pong-dark-accent font-semibold hover:underline cursor-pointer">${
          p.username
        }</a></span>
                </td>
				<td class="p-4">${rankIcon}</td>
				<td class="p-4">Lv. ${p.level}</td>
				<td class="p-4 w-32">
				<div class="w-full bg-gray-700 rounded-full h-2">
					<div class="bg-green-400 h-2 rounded-full" style="width:${winRate}%;"></div>
				</div>
				<span class="text-xs text-gray-300">${winRate}%</span>
				</td>
				<td class="p-4">${p.matches_played}</td>
			</tr>`;
      })
      .join("")}
		</tbody>
      `;
    });

    const width =
      user.matches_played > 0
        ? user.matches_won > 0
          ? (user.matches_won / user.matches_played) * 100
          : 0
        : 0;

    const progressBar = document.getElementById(
      "progress-bar"
    ) as HTMLDivElement;
    if (progressBar) {
      progressBar.style.width = `${width}%`;
    }
  }, 0);

  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        {/* <TopBar /> */}
        <main className={styles.pageContent}>
          <SecondaryHeader
            title="The Honor Board"
            subtitle="Your Club Dashboard — track progress, stats & rivalries"
          />

          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-6 bg-pong-dark-highlight/10 rounded-md p-6 shadow-lg border border-pong-dark-highlight/30 backdrop-blur-md">
            <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-br from-pong-accent via-pong-dark-accent to-pong-accent shadow-lg">
              <img
                src={user.avatar_url}
                alt={`${user.username}'s avatar`}
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                <h2 className="text-xl md:text-2xl font-bold">
                  {getWelcomeTitle(user)}{" "}
                  <span className="text-pong-dark-accent">{user.username}</span>
                </h2>
                <span className="inline-block text-sm bg-pong-dark-accent/50 text-white px-3 py-1 rounded-full shadow">
                  Level {user.level}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-center">
                <div>
                  <p className="text-xs text-pong-bg-pong-dark-primary/80 uppercase">
                    Total Matches
                  </p>
                  <p className="text-lg font-semibold">{user.matches_played}</p>
                </div>
                <div>
                  <p className="text-xs text-pong-bg-pong-dark-primary/80 uppercase">
                    Victories
                  </p>
                  <p className="text-lg font-semibold text-pong-success">
                    {user.matches_won}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-pong-bg-pong-dark-primary/80 uppercase">
                    Losses
                  </p>
                  <p className="text-lg font-semibold text-pong-error">
                    {user.matches_played - user.matches_won}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-pong-bg-pong-dark-primary/80 uppercase">
                    Win Ratio
                  </p>
                  <p className="text-lg font-semibold text-yellow-400">
                    {user.matches_played > 0
                      ? `${Math.round(
                          (user.matches_won / user.matches_played) * 100
                        )}%`
                      : "0%"}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                  <div
                    id="progress-bar"
                    className={`bg-gradient-to-r from-pong-accent to-pong-dark-accent h-3 rounded-full transition-all duration-500`}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-5xl mx-auto rounded-md shadow-xl bg-pong-dark-bg/80 border border-pong-dark-highlight/30 backdrop-blur-md">
            <div className="px-6 py-4 border-b border-pong-dark-highlight/40 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold text-pong-dark-secondary">
                Honor Board
              </h2>
              <span className="text-sm text-pong-dark-secondary/80">
                Club Rankings
              </span>
            </div>

            <div className="overflow-x-auto overflow-y-auto max-h-[500px] custom-scrollbar">
              <table className="min-w-full text-white text-sm md:text-base">
                <thead className="sticky top-0 z-10 bg-pong-dark-highlight/90 backdrop-blur-lg">
                  <tr>
                    <th className="px-4 py-4 text-left font-semibold text-pong-primary">
                      Player
                    </th>
                    <th className="px-4 py-4 text-left font-semibold text-pong-primary">
                      Rank
                    </th>
                    <th className="px-4 py-4 text-left font-semibold text-pong-primary">
                      Level
                    </th>
                    <th className="px-4 py-4 text-left font-semibold text-pong-primary">
                      Win Rate
                    </th>
                    <th className="px-4 py-4 text-left font-semibold text-pong-primary">
                      Matches
                    </th>
                  </tr>
                </thead>
                <tbody
                  id="dashboard-table"
                  className="divide-y divide-pong-dark-highlight/30"
                >
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-8 text-pong-bg-pong-dark-primary/80"
                    >
                      Loading leaderboard...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.15);
              border-radius: 10px;
              background-clip: padding-box;
              border: 2px solid transparent;
              transition: all 0.3s ease;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.3);
              opacity: 0.8;
            }
          `}</style>
        </main>
      </div>
    </section>
  );
}
