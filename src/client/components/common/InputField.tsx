import { styles } from "@/styles/styles";

export function InputField(props: {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  autofocus?: boolean;
}) {
  return (
    <input
      type={props.type}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      required
      className={`input-field ${styles.inputField}`}
	  autofocus={props.autofocus || false}
	  autoComplete="off"
    />
  );
}
