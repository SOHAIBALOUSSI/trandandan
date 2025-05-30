import { styles } from "@/styles/styles";

export function MyBtn(props: {
  label: string;
  className?: string;
  disabled?: boolean;
  id?: string;
}) {
  return (
    <button className={props.className} disabled={props.disabled} id={props.id}>
      {props.label}
    </button>
  );
}
