import { handleChangePassword } from "@/handlers/handle-change-password";

export function ChangePassword() {
  setTimeout(() => {
    handleChangePassword();
  }, 0);

  return <div></div>;
}
