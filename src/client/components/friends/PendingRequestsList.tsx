import { fontSizes } from "@/styles/fontSizes";

export function PendingRequestsList() {
  return (
    <ul
      id="pending-requests-list"
      className={`space-y-6 ${fontSizes.bodyFontSize} max-h-[340px] overflow-y-auto pr-2`}
    >
      <li className="text-white text-center">Loading...</li>
    </ul>
  );
}
