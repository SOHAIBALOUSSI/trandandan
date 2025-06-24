import { styles } from "@/styles/styles";

export function HeroCta() {
  return (
    <div className="flex flex-col items-center gap-2">
      <a
        href="signin"
        className={`${styles.primaryButton} animate-myPulse hover:animate-none`}
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
