import { styles } from "@/styles/styles";

export function RemoteLink() {
  const remoteSection = (
    <div>
      <div className="line-divider relative w-full flex items-center justify-center mb-6 min-h-[2.5rem]">
        <i className="fa-solid fa-table-tennis-paddle-ball"></i>
      </div>
      <div className="flex flex-col gap-6">
        <button
          type="button"
          id="google-signin-btn"
          className={styles.primaryButton}
        >
          <i className={`fa-solid fa-couch ${styles.primaryButtonIcon}`}></i>
          enter with google
        </button>
        <button
          type="button"
          id="ft-signin-btn"
          className={styles.primaryButton}
        >
          <i className={`fa-solid fa-couch ${styles.primaryButtonIcon}`}></i>
          enter with 42
        </button>
      </div>
    </div>
  );

  return remoteSection;
}
