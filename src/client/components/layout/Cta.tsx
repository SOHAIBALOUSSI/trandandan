import { styles } from "@/styles/styles";
import { BtnPrimary } from "../common/BtnPrimary";

export function CTA(props: {
  feedbackId?: string;
  btnId?: string;
  btnIcon?: string;
  btnLabel?: string;
}) {
  return (
    <div>
      <div
        id={props.feedbackId}
        className={`${styles.formMessage} hidden`}
        role="alert"
        aria-live="polite"
      ></div>
      <BtnPrimary
        btnId={props.btnId}
        btnIcon={props.btnIcon}
        btnLabel={props.btnLabel}
      />
    </div>
  );
}
