export function getRankBadge(rank: number): string {
  if (rank <= 5) {
    return `<span className={styles.badgeStyle}><i className="fa-solid fa-crown text-yellow-400"></i> Club Champion</span>`;
  } else if (rank <= 10) {
    return `<span className={styles.badgeStyle}><i className="fa-solid fa-trophy text-orange-400"></i> Elite Contender</span>`;
  } else if (rank <= 20) {
    return `<span className={styles.badgeStyle}><i className="fa-solid fa-medal text-purple-400"></i> Veteran Player</span>`;
  } else {
    return `<span className={styles.badgeStyle}><i className="fa-solid fa-user-shield text-pong-secondary"></i> Challenger</span>`;
  }
}
