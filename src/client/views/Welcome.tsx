import { Footer } from "@/components/layout/footer";
import { styles } from "@/styles/styles";

function HeroCTA() {
  return (
    <div className={styles.heroCallToAction}>
      <button
        className={`group ${styles.primaryButton} shadow-lg animate-pulse hover:animate-none`}
      >
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

export function Welcome() {
  return (
    <section className={`${styles.pageLayoutLight} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-tr from-pong-secondary/10 to-pong-accent/10 blur-2xl z-[-1]" />
      <div className="flex flex-col gap-16 items-center justify-center min-h-[80vh]">
        <HeroTitle />
        <HeroCTA />
        {/* <img
          src="/assets/pong-mascot.png"
          alt="Ping Pong Mascot"
          className="w-32 md:w-48 mx-auto mb-6 animate-fade-in"
        /> */}
      </div>
      <Footer />
    </section>
  );
}
