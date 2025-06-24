import { styles } from "@/styles/styles";
import { handleChangeEmail } from "@/handlers/handle-change-email";

export function ChangeEmail() {
  setTimeout(() => {
    handleChangeEmail();
  }, 0);

  return <div></div>;
}
