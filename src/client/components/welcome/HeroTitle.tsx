import { styles } from "@/styles/styles";

export function HeroTitle() {
  return (
    <div className={styles.heroTitleContainer}>
      <h1 className={styles.heroTitle}>
        Welcome to the{" "}
        <span className="text-pong-accent font-playfair">
          bhv ping pong club
        </span>
      </h1>
      <h3 className={styles.heroTagline}>
        <span className="text-pong-secondary font-semibold">Play</span> like
        it’s 1901.{" "}
        <span className="text-pong-accent font-semibold">Compete</span> like a
        champion.
      </h3>
    </div>
  );
}
