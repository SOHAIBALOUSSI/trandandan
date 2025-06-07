import { styles } from "@/styles/styles";

export function CTA(props: {
  feedbackId?: string;
  btnId?: string;
  btnIcon?: string;
  btnLabel?: string;
}) {
  const { feedbackId, btnId, btnIcon, btnLabel } = props;
  const grp = (
    <div>
      <div
        id={feedbackId}
        className={`${styles.formMessage} hidden`}
        role="alert"
        aria-live="polite"
      ></div>
      <button
        type="submit"
        id={btnId}
        className={`group ${styles.primaryButton} shadow-lg hover:animate-none relative flex items-center justify-center`}
        aria-busy="false"
      >
        <span
          id="spinner"
          className="hidden absolute left-4 w-4 h-4 border-2 border-white border-t-pong-accent rounded-full animate-spin"
          aria-hidden="true"
        ></span>
        <i
          className={`fa-solid ${btnIcon} ${styles.primaryButtonIcon}`}
          aria-hidden="true"
        ></i>
        <span id="btn-label">{btnLabel}</span>
      </button>
    </div>
  );

  return grp;
}
