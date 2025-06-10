import { Footer } from "@/components/layout/Footer";
import { styles } from "@/styles/styles";

function HeroTitle() {
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

function HeroCTA() {
  return (
    <div className={styles.heroCallToAction}>
      <a
        href="signin"
        className={`${styles.primaryButton} animate-pulse hover:animate-none`}
        data-link
      >
        <i className={`fa-solid fa-ticket ${styles.primaryButtonIcon}`}></i>
        Enter The Club
      </a>
      <p className={styles.heroSubtitle}>
        “Take your first step into the court”
      </p>
    </div>
  );
}

export function Welcome() {
  return (
    <section className={styles.pageLayoutLight}>
      <div className="absolute inset-0 bg-gradient-to-tr from-pong-secondary/10 to-pong-accent/10 blur-2xl z-[-1]" />
      <div className="flex flex-col items-center justify-center gap-16 min-h-[80vh]">
        <HeroTitle />
        <HeroCTA />
      </div>
      <Footer />
    </section>
  );
}
