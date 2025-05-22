import { Footer } from "@/components/layout/footer";
import { styles } from "@/styles/styles";

function HeroCTA() {
  return (
    <div className={styles.heroCallToAction}>
      <button className={`group ${styles.primaryButton}`}>
        <i className={`fa-solid fa-ticket ${styles.primaryButtonIcon}`}></i>
        Enter The Club
      </button>
      <p className={styles.heroSubtitle}>
        “Take your first step into the court”
      </p>
    </div>
  );
}

function HeroTitle() {
  return (
    <div className={styles.heroTitleContainer}>
      <h1 className={styles.heroTitle}>Welcome to the bhv ping pong club</h1>
      <h3 className={styles.heroTagline}>
        Play like it’s 1901. Compete like a champion.
      </h3>
    </div>
  );
}

export function Welcome() {
  return (
    <section className={`${styles.pageLayoutLight} ${styles.welcomeContent}`}>
      <div className="absolute inset-0 bg-gradient-to-tr from-pong-secondary/10 to-pong-accent/10 blur-2xl z-[-1]" />
      <HeroCTA />
      <HeroTitle />
      <Footer />
    </section>
  );
}
