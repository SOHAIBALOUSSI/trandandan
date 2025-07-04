import { fontSizes } from "@/styles/fontSizes";
import { styles } from "@/styles/styles";
import { Activity } from "types/types";

function WinActivity({
  user,
  targetUser,
}: {
  user: string;
  targetUser: string;
}) {
  return (
    <li className={styles.listStyle}>
      <i className="fas fa-trophy text-pong-success mt-1"></i>
      <div>
        <span className="text-pong-dark-secondary font-semibold">{user}</span>{" "}
        <span className="text-pong-dark-primary">won a match against</span>{" "}
        <span className="text-pong-dark-secondary font-semibold">
          {targetUser}
        </span>
      </div>
    </li>
  );
}

function LossActivity({
  user,
  targetUser,
}: {
  user: string;
  targetUser: string;
}) {
  return (
    <li className={styles.listStyle}>
      <i className="fas fa-skull-crossbones text-pong-error mt-1"></i>
      <div>
        <span className="text-pong-dark-secondary font-semibold">{user}</span>{" "}
        <span className="text-pong-dark-primary">lost a match to</span>{" "}
        <span className="text-pong-dark-secondary font-semibold">
          {targetUser}
        </span>
      </div>
    </li>
  );
}

function TournamentActivity({
  user,
  tournament,
}: {
  user: string;
  tournament: string;
}) {
  return (
    <li className={styles.listStyle}>
      <i className="fas fa-medal text-pong-info mt-1"></i>
      <div>
        <span className="text-pong-dark-secondary font-semibold">{user}</span>{" "}
        <span className="text-pong-dark-primary">joined the tournament</span>{" "}
        <span className="text-pong-dark-secondary font-semibold">
          {tournament}
        </span>
      </div>
    </li>
  );
}

function DeleteAccountActivity({
  user,
  message,
}: {
  user: string;
  message: string | undefined;
}) {
  return (
    <li className={styles.listStyle}>
      <i className="fas fa-flag text-pong-warning mt-1"></i>
      <div>
        <span className="text-pong-dark-secondary font-semibold">{user}</span>{" "}
        <span className="text-pong-dark-primary">
          has signed off from the club
        </span>
        {message ? (
          <span className="text-pong-dark-primary/80"> — “{message}”</span>
        ) : (
          <span className="text-pong-dark-primary/80">
            {" "}
            and left without a final word
          </span>
        )}
      </div>
    </li>
  );
}

function renderActivity(activity: Activity) {
  switch (activity.type) {
    case "win":
      return (
        <WinActivity user={activity.user} targetUser={activity.targetUser} />
      );
    case "loss":
      return (
        <LossActivity user={activity.user} targetUser={activity.targetUser} />
      );
    case "tournament":
      return (
        <TournamentActivity
          user={activity.user}
          tournament={activity.tournament}
        />
      );
    case "delete":
      return (
        <DeleteAccountActivity
          user={activity.user}
          message={activity.message}
        />
      );
    default:
      return null;
  }
}

export function RecentActivityFeed() {
  const activities: Activity[] = [
    { type: "win", user: "m3ayzo", targetUser: "tesla" },
    { type: "loss", user: "tesla", targetUser: "m3ayzo" },
    { type: "tournament", user: "adil", tournament: "tournoi lhalawa" },
    {
      type: "delete",
      user: "oussama",
      message: "Thanks for the good times, I'm heading out now",
    },
    { type: "win", user: "dexter", targetUser: "messi" },
    { type: "loss", user: "messi", targetUser: "dexter" },
    { type: "tournament", user: "lamine lamal", tournament: "tournoi ramadan" },
    {
      type: "delete",
      user: "hassan",
    },
  ];

  return (
    <div className="bg-pong-secondary/10 rounded-xl shadow-md p-6 md:p-10 w-full max-w-5xl mx-auto">
      <h2
        className={`text-pong-dark-primary font-bold mb-8 tracking-tight ${fontSizes.smallTitleFontSize}`}
      >
        Recent Activity
      </h2>
      <ul
        className={`space-y-6 ${fontSizes.bodyFontSize} max-h-[340px] overflow-y-auto pr-2`}
      >
        {activities.map(renderActivity)}
      </ul>
    </div>
  );
}
