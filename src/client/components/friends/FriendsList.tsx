import { fontSizes } from "@/styles/fontSizes";

export function FriendsList() {
  return (
    <ul
      id="friends-list"
      className={`space-y-6 ${fontSizes.bodyFontSize} max-h-[340px] overflow-y-auto pr-2`}
    >
      <li className="text-pong-dark-secondary text-center">Loading...</li>
    </ul>
  );
}
