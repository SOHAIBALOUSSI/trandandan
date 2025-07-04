import { fontSizes } from "@/styles/fontSizes";

export function RecentMatches() {
  return (
    <div className="w-full">
      <h2
        className={`text-pong-dark-primary ${fontSizes.smallTitleFontSize} font-semibold mb-2`}
      >
        Recent Matches
      </h2>
      <div
        className={`bg-gray-800 p-4 rounded-lg shadow-md ${fontSizes.bodyFontSize}`}
      >
        <p className="text-gray-400">No recent matches found.</p>
      </div>
    </div>
  );
}
