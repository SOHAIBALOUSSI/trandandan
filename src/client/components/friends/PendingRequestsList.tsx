import { fontSizes } from "@/styles/fontSizes";

export function PendingRequestsList() {
  return (
    <ul
      id="pending-requests-list"
      className={`space-y-6 ${fontSizes.bodyFontSize} max-h-[340px] overflow-y-auto pr-2`}
    >
      <li className="text-pong-dark-secondary text-center">Loading...</li>
    </ul>
  );
}
