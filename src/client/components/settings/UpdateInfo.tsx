import { styles } from "@/styles/styles";
import { InputField } from "@/components/common/InputField";

export function UpdateInfo() {
  return (
    <div className="bg-gray-800 rounded shadow p-6 m-4 w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4 text-pong-primary">Update Info</h2>
      <form className="flex flex-col gap-4">
        <InputField
          type="text"
          name="username"
          id="update-username"
          placeholder="new username"
        />
        <InputField
          type="email"
          name="email"
          id="update-email"
          placeholder="new email"
        />
        <InputField
          type="password"
          name="password"
          id="update-password"
          placeholder="new password"
        />
        {/* <BtnPrimary label="update" /> */}
      </form>
    </div>
  );
}
