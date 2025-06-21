import { styles } from "@/styles/styles";

export function InputField(props: {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  autofocus?: boolean;
  className?: string;
}) {
  return (
    <div className="text-left">
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        required
        className={`${styles.inputField} ${props.className}`}
        autofocus={props.autofocus || false}
        autoComplete="off"
      />
    </div>
  );
}
