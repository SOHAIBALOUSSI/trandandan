import { fontSizes } from "@/styles/fontSizes";

export function AllMembersList() {
  return (
    <ul
      id="all-members-list"
      className={`space-y-6 ${fontSizes.bodyFontSize} max-h-[340px] overflow-y-auto pr-3 md:pr-6`}
    >
      <li className="text-pong-dark-secondary text-center">Loading...</li>
    </ul>
  );
}
