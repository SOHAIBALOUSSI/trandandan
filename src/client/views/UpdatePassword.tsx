import { handleUpdatePassword } from "@/services/handle-update-password";

export function UpdatePassword() {
  setTimeout(() => {
    handleUpdatePassword();
  }, 0);
  const updatePassword = (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4 text-pong-primary">
        Update Password
      </h1>
      <form method="POST" className="w-full max-w-sm space-y-4">
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-pong-accent text-white p-2 rounded hover:bg-pong-secondary transition-colors duration-300"
        >
          Update Password
        </button>
      </form>
    </div>
  );

  return updatePassword;
}
