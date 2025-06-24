import { styles } from "@/styles/styles";
import { BtnPrimary } from "./BtnPrimary";

export function CTA(props: { btnIcon: string; btnLabel: string }) {
  return (
    <div className="w-full">
      <div
        id="cta-feedback"
        className="text-sm font-semibold min-h-[1.5rem] mb-2 hidden"
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
