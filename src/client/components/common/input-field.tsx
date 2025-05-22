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
      className={`${styles.inputField} input-field`}
	  autofocus={props.autofocus || false}
    />
  );
}
