import { fontSizes } from "@/styles/fontSizes";

export function BlockedList() {
  return (
    <ul
      id="muted-list"
      className={`space-y-6 ${fontSizes.bodyFontSize} max-h-[340px] overflow-y-auto pr-2`}
    >
      <li className="text-white text-center">Loading...</li>
    </ul>
  );
}

{
  /* <li class="flex items-center justify-between gap-4 py-2 border-b border-white/10">
  <div class="flex items-center gap-4">
    <img src="/profile/avatar/user123.png" class="w-10 h-10 rounded-full" />
    <span class="text-white font-semibold">Messi</span>
  </div>
  <button class="px-4 py-1.5 text-sm font-semibold rounded-md bg-pong-error hover:bg-red-700 text-white transition">
    Unmute
  </button>
</li>; */
}
