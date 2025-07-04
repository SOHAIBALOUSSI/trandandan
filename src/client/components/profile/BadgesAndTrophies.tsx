import { fontSizes } from "@/styles/fontSizes";

export function BadgesAndTrophies() {
  return (
    <div className="w-full">
      <h2
        className={`text-pong-dark-primary ${fontSizes.smallTitleFontSize} font-semibold mb-2`}
      >
        Badges & Trophies
      </h2>
      <div
        className={`bg-gray-800 p-4 rounded-lg shadow-md ${fontSizes.bodyFontSize}`}
      >
        <p className="text-gray-400">No badges or trophies found.</p>
      </div>
    </div>
  );
}
