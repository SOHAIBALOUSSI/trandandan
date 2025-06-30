import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MemberCard } from "@/components/profile/MemberCard";
import { RecentMatches } from "@/components/profile/RecentMatches";
import { BadgesAndTrophies } from "@/components/profile/BadgesAndTrophies";
import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import { updateUsername } from "@/services/update-username";
import { displayToast } from "@/utils/display-toast";
import { UpdateUserProfileRes } from "@/utils/response-messages";
import { Loading } from "@/components/common/Loading";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";

export function Profile() {
  const user = getCurrentUser();
  if (!user) {
    return (
      <section className={styles.pageLayoutDark}>
        <NavBar />
        <div className="w-full relative">
          <TopBar />
          <Loading />
        </div>
      </section>
    );
  }

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
                console.log("Update response:", data);
                if (status === 200) {
                  displayToast("Username updated successfully!", "success");
                } else {
                  displayToast(
                    UpdateUserProfileRes[data.code] ||
                      "Failed to update username.",
                    "error"
                  );
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
  }, 0);

  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className="px-6 md:px-20 pt-20 md:pt-24 h-[calc(100vh-2rem)] overflow-y-auto">
          <SecondaryHeader
            title="Member Profile"
            subtitle="Review your identity, matches, and achievements."
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="order-1 flex flex-col items-center space-y-6">
              <MemberCard user={user} />
              <div className="flex flex-row items-center justify-center gap-4">
                <button
                  id="update-username-btn"
                  className={styles.darkSubmitBtn}
                >
                  Edit Username
                </button>
                <button id="update-avatar-btn" className={styles.darkSubmitBtn}>
                  Update Avatar
                </button>
              </div>
            </div>

            <div className="order-2 space-y-6">
              <RecentMatches />
              <BadgesAndTrophies />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
