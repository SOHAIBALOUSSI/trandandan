import { fontSizes } from "@/styles/fontSizes";

export function Loading() {
  return (
    <main className="h-[100vh] flex items-center justify-center bg-gradient-to-br from-black via-[#111] to-[#0d0d0d]">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-pong-accent border-t-transparent rounded-full animate-spin"></div>
        <p className={`text-white ${fontSizes.bodyFontSize} font-semibold animate-pulse`}>
          Preparing your club profile...
        </p>
      </div>
    </main>
  );
}
