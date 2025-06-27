import { fontSizes } from "@/styles/fontSizes";
import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";

function Card(props: {
  value: string;
  label: string;
  textColor: string;
  bgColor: string;
}) {
  return (
    <div
      className={`${props.bgColor} ${fontSizes.bodyFontSize} rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-[1.02] transition-transform duration-300`}
    >
      <span className={`${props.textColor} font-bold`}>{props.value}</span>
      <span className={`text-pong-dark-primary mt-1 font-medium`}>
        {props.label}
      </span>
    </div>
  );
}

export function QuickStatsCards() {
  const user = getCurrentUser();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mx-auto">
      <Card
        value={`${user?.solde} F`}
        label="Solde"
        textColor="text-pong-dark-secondary"
        bgColor="bg-pong-dark-highlight/10"
      />
      <Card
        value={`${user?.matchesPlayed || 0}`}
        label="Matches"
        textColor="text-pong-dark-secondary"
        bgColor="bg-pong-dark-highlight/10"
      />
      <Card
        value={`${user?.matchesWon || 0}`}
        label="Wins"
        textColor="text-pong-success"
        bgColor="bg-green-600/20"
      />
      <Card
        value={`${user?.matchesLost || 0}`}
        label="Losses"
        textColor="text-pong-error"
        bgColor="bg-red-600/20"
      />
    </div>
  );
}
