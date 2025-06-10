import { styles } from "@/styles/styles";

export function BtnPrimary(props: {
  btnId: string;
  btnIcon: string;
  btnLabel: string;
}) {
  return (
    <button
      type="submit"
      id={props.btnId}
      className={styles.primaryButton}
      aria-busy="false"
    >
      <span
        id="spinner"
        className="hidden absolute left-4 w-4 h-4 border-2 border-white border-t-pong-accent rounded-full animate-spin"
        aria-hidden="true"
      ></span>
      <i
        className={`fa-solid ${props.btnIcon} ${styles.primaryButtonIcon}`}
        aria-hidden="true"
      ></i>
      <span id="btn-label">{props.btnLabel}</span>
    </button>
  );
}
