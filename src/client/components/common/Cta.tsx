import { styles } from "@/styles/styles";
import { BtnPrimary } from "./BtnPrimary";

export function CTA(props: { btnIcon: string; btnLabel: string }) {
  return (
    <div>
      <div
        id="cta-feedback"
        className={`${styles.formMessage} hidden`}
        role="alert"
        aria-live="polite"
      ></div>
      <BtnPrimary
        btnId="cta-btn"
        btnIcon={props.btnIcon}
        btnLabel={props.btnLabel}
      />
    </div>
  );
}
