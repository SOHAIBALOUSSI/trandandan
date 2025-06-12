import { Footer } from "@/components/layout/Footer";
import { styles } from "@/styles/styles";
import { HeroTitle } from "@/components/welcome/HeroTitle";
import { HeroCta } from "@/components/welcome/HeroCta";

export function Welcome() {
  return (
    <section className={styles.pageLayoutLight}>
      <div className="absolute inset-0 bg-gradient-to-tr from-pong-secondary/10 to-pong-accent/10 blur-2xl z-[-1]" />
      <div className="flex flex-col items-center justify-center gap-16 min-h-[80vh]">
        <HeroTitle />
        <HeroCta />
      </div>
      <Footer />
    </section>
  );
}
