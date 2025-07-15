import { styles } from "@/styles/styles";

export function RankBadge(props: { rank: number }) {
  if (props.rank <= 500) {
    return (
      <span className={styles.badgeStyle}>
        <i className="fa-solid fa-crown text-yellow-400"></i> Club Champion
      </span>
    );
  } else if (props.rank <= 1500) {
    return (
      <span className={styles.badgeStyle}>
        <i className="fa-solid fa-trophy text-orange-400"></i> Elite Contender
      </span>
    );
  } else if (props.rank <= 2500) {
    return (
      <span className={styles.badgeStyle}>
        <i className="fa-solid fa-medal text-purple-400"></i> Veteran Player
      </span>
    );
  } else {
    return (
      <span className={styles.badgeStyle}>
        <i className="fa-solid fa-user-shield text-pong-secondary"></i>{" "}
        Challenger
      </span>
    );
  }
}
