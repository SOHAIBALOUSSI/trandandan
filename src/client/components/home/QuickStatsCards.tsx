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
      className={`${props.bgColor} backdrop-blur-sm rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-[1.02] transition-transform duration-300`}
    >
      <span className={`${props.textColor} text-2xl font-extrabold`}>
        {props.value}
      </span>
      <span className="text-pong-dark-primary/90 text-sm mt-1 font-medium">
        {props.label}
      </span>
    </div>
  );
}

export function QuickStatsCards() {
  const user = getCurrentUser();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mx-auto px-6">
      <Card
        value={`${user?.solde} F`}
        label="Matches"
        textColor="text-pong-dark-secondary"
        bgColor="bg-pong-dark-highlight/10"
      />
      <Card
        value="12"
        label="Solde"
        textColor="text-pong-dark-secondary"
        bgColor="bg-pong-dark-highlight/10"
      />
      <Card
        value="8"
        label="Wins"
        textColor="text-pong-success"
        bgColor="bg-green-600/20"
      />
      <Card
        value="4"
        label="Losses"
        textColor="text-pong-error"
        bgColor="bg-red-600/20"
      />
    </div>
  );
}
