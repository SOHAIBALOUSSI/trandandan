import { styles } from "@/styles/styles";
import { CTA } from "@/components/common/Cta";

export function EditUserInfos() {
  return (
    <div >
      <button id="edit-btn" className={`${styles.btnOneStyles} my-2`}>
        Edit
      </button>
      <form id="edit-form" className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="name"
          className="normal-case placeholder:capitalize p-2 text-pong-dark-primary rounded-md bg-pong-secondary/10 border border-pong-dark-secondary focus:outline-none focus:ring-2 focus:ring-pong-accent transition-all"
        />
        <input
          type="file"
          id="profile-photo"
          name="profile-photo"
          accept="image/*"
          className="p-2 bg-white rounded-md border border-pong-dark-secondary"
        />
        <img
          id="profile-photo-preview"
          src=""
          alt="Profile preview"
          className="w-20 h-20 rounded-full object-cover border-2 border-pong-accent mt-2 hidden"
        />{" "}
        <CTA btnIcon="fa-edit" btnLabel="submit" />
      </form>
    </div>
  );
}
