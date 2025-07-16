import { fontSizes } from "@/styles/fontSizes";

export function RecentMatches() {
  return (
    <div className="bg-pong-secondary/10 rounded-xl shadow-md p-6 md:p-10 w-full max-w-5xl mx-auto">
      <h2
        className={`text-pong-dark-primary font-bold mb-8 tracking-tight ${fontSizes.smallTitleFontSize}`}
      >
        Recent Matches
      </h2>
      <ul
        className={`space-y-6 ${fontSizes.bodyFontSize} max-h-[340px] overflow-y-auto pr-2`}
      >
        <p className="text-gray-400">No recent matches found.</p>
      </ul>
    </div>
  );
}
