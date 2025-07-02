import { UserProfile } from "types/types";
import { updateUsername } from "@/services/update-username";
import { displayToast } from "@/utils/display-toast";
import { UpdateUserProfileRes } from "@/utils/response-messages";
import { uploadAvatar } from "@/services/upload-avatar";

export function MemberCard(props: { user: UserProfile }) {
  const { user } = props;

  const joined = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  setTimeout(() => {
    const updateBtn = document.getElementById("update-username-btn");
    const usernameEl = document.getElementById("member-username");

    if (updateBtn && usernameEl) {
      updateBtn.addEventListener("click", () => {
        usernameEl.setAttribute("contenteditable", "true");
        usernameEl.focus();

        const save = () => {
          const newUsername = usernameEl.textContent?.trim();

          if (!newUsername) {
            displayToast("Username cannot be empty.", "error");
            usernameEl.removeAttribute("contenteditable");
            usernameEl.textContent = user.username;
            return;
          }

          if (newUsername !== user.username) {
            updateUsername(user.id, newUsername)
              .then((res) =>
                res.json().then((data) => ({ status: res.status, data }))
              )
              .then(({ status, data }) => {
                if (status === 200) {
                  displayToast("Username updated successfully!", "success");
                } else {
                  const msg =
                    UpdateUserProfileRes[data.code] ||
                    "Failed to update username.";
                  displayToast(msg, "error");
                  usernameEl.textContent = user.username;
                }
              })
              .catch(() => {
                displayToast(
                  UpdateUserProfileRes.INTERNAL_SERVER_ERROR,
                  "error"
                );
                usernameEl.textContent = user.username;
              })
              .finally(() => {
                usernameEl.removeAttribute("contenteditable");
              });
          } else {
            displayToast("No changes made.", "warning");
            usernameEl.removeAttribute("contenteditable");
          }
        };

        usernameEl.addEventListener("blur", save, { once: true });

        usernameEl.addEventListener(
          "keydown",
          (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              usernameEl.blur();
            }
          },
          { once: true }
        );
      });
    }

    uploadAvatar({ user });
  }, 0);

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 bg-pong-dark-custom rounded-3xl w-full max-w-2xl mx-auto border border-pong-dark-highlight/30 shadow-lg backdrop-blur-xl">
      <h2 className="text-center text-2xl md:text-3xl font-extrabold text-pong-accent tracking-tight">
        BHV Member Card
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">
        <div className="relative">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full p-[3px] bg-gradient-to-br from-pong-accent via-pong-dark-accent to-pong-accent shadow-lg relative">
            <img
              src={user.avatar_url}
              alt="Profile avatar"
              className="w-full h-full rounded-full object-cover"
              id="member-avatar"
            />
            <button
              id="upload-avatar-btn"
              className="absolute -bottom-1 -right-1 bg-pong-dark-accent hover:bg-pong-accent text-white rounded-full p-2 shadow-md transition-all duration-200 group"
              aria-label="Edit Avatar"
            >
              <i className="fa-solid fa-pen text-xs"></i>
              <span className="absolute text-xs bg-black/80 text-white px-2 py-0.5 rounded left-1/2 -translate-x-1/2 top-full mt-1 opacity-0 group-hover:opacity-100 transition">
                Change Avatar
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 flex-1 w-full">
          <div>
            <span className="block uppercase text-pong-secondary tracking-widest mb-1 text-xs md:text-sm">
              Username
            </span>
            <div className="flex items-center justify-between group border-b-2 border-pong-accent/40 pb-1">
              <span
                id="member-username"
                className="font-bold text-pong-dark-primary break-words normal-case text-lg md:text-xl w-full"
              >
                {user.username}
              </span>
              <button
                id="update-username-btn"
                className="text-pong-dark-primary hover:text-pong-accent p-2 rounded-full transition group"
                aria-label="Edit Username"
              >
                <i className="fa-solid fa-pen text-sm"></i>
                <span className="absolute text-xs bg-black/80 text-white px-2 py-0.5 rounded left-1/2 -translate-x-1/2 top-full mt-1 opacity-0 group-hover:opacity-100 transition">
                  Edit Username
                </span>
              </button>
            </div>
          </div>

          <div>
            <span className="block uppercase text-pong-secondary tracking-widest mb-1 text-xs md:text-sm">
              Email
            </span>
            <span className="block font-medium text-pong-dark-primary/80 border-b border-pong-dark-highlight pb-1 break-all text-lg md:text-xl normal-case">
              {user.email}
            </span>
          </div>

          <div>
            <span className="block uppercase text-pong-secondary tracking-widest mb-1 text-xs md:text-sm">
              Joined
            </span>
            <span className="block text-sm md:text-base text-white/70">
              {joined}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <span className="bg-pong-secondary/20 text-pong-secondary px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              Sold: {user.solde}
            </span>
            <span className="bg-pong-highlight/20 text-pong-highlight px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              Grade: {user.level}
            </span>
            <span className="bg-yellow-400/20 text-yellow-300 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              Rank: {user.rank}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
