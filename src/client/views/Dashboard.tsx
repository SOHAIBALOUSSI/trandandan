import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import { Loader } from "@/components/common/Loader";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";
import { dashboardLive } from "@/services/dashboard-service";
import { getAvatarUrl } from "@/utils/get-avatar-url";
import { UserProfile } from "types/types";

export function Dashboard() {
  const user = getCurrentUser();

  setTimeout(() => {
    const table = document.getElementById("dashboard-table");
    if (!table) return;

    dashboardLive((players: UserProfile[]) => {
      table.innerHTML = `
        <thead>
          <tr>
			<th class="px-4 py-6">Avatar</th>
			<th class="px-4 py-6">Rank</th>
			<th class="px-4 py-6">Username</th>
			<th class="px-4 py-6">Level</th>
			<th class="px-4 py-6">Win Rate</th>
			<th class="px-4 py-6">Solde</th>
			<th class="px-4 py-6">Matches</th>
          </tr>
        </thead>
		<tbody className="px-4 py-2.5">
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
				<td class="p-4">
				<div class="w-8 h-8 bg-pong-light-bg text-center rounded-full flex items-center justify-center font-bold text-sm">
					<img src="${getAvatarUrl(p)}" alt="${
          p.username
        }'s avatar" class="w-full h-full rounded-full object-cover">
				</div>
				</td>
				<td class="p-4">${rankIcon}</td>
				<td class="p-4">${p.username}</td>
				<td class="p-4">Lv. ${p.level}</td>
				<td class="p-4 w-32">
				<div class="w-full bg-gray-700 rounded-full h-2">
					<div class="bg-green-400 h-2 rounded-full" style="width:${winRate}%;"></div>
				</div>
				<span class="text-xs text-gray-300">${winRate}%</span>
				</td>
				<td class="p-4">${p.solde} F</td>
				<td class="p-4">${p.matches_played}</td>
			</tr>`;
      })
      .join("")}
		</tbody>
      `;
    });
  }, 0);

  if (!user) {
    return <Loader text="Preparing your club profile..." />;
  }

  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className={styles.pageContent}>
          <SecondaryHeader
            title="The Honor Board"
            subtitle="Your Club Dashboard — track progress, stats & rivalries"
          />

          <div className="w-full max-w-5xl flex flex-col bg-pong-dark-highlight/10 rounded-xl p-4 mb-4 shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Welcome, {user.username}</h2>
              <span className="text-sm text-gray-400">Level {user.level}</span>
            </div>
            <div className="text-sm mt-2">
              Wins: {user.matches_won} / Matches: {user.matches_played}
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full mt-1">
              <div
                className="bg-blue-400 h-2 rounded-full"
                style={{
                  width: `${(user.matches_won / user.matches_played) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="w-full max-w-5xl overflow-x-auto rounded-xl shadow-lg bg-pong-dark-bg/80 border border-pong-dark-highlight/30">
            <table
              id="dashboard-table"
              className="min-w-full text-white text-sm md:text-base text-left px-4"
            >
              <thead>
                <tr>
                  <th className="px-4 py-6">Avatar</th>
                  <th className="px-4 py-6">Rank</th>
                  <th className="px-4 py-6">Username</th>
                  <th className="px-4 py-6">Level</th>
                  <th className="px-4 py-6">Win Rate</th>
                  <th className="px-4 py-6">Solde</th>
                  <th className="px-4 py-6">Matches</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="text-center py-8">
                    Loading leaderboard...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </section>
  );
}
