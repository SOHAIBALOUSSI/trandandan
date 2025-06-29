import { styles } from "@/styles/styles";
import { displayToast } from "@/utils/display-toast";
import { DeleteAccountRes } from "@/utils/response-messages";

export function deleteAccount() {
  const form = document.getElementById(
    "delete-account-form"
  ) as HTMLFormElement;

  form?.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const submitBtn = document.querySelector<HTMLButtonElement>("#submit-btn");
    const spinner = document.querySelector<HTMLSpanElement>("#spinner");
    const btnLabel = document.querySelector<HTMLSpanElement>("#btn-label");

    if (!submitBtn || !spinner || !btnLabel) return;

    const btnLabelText = btnLabel.textContent;

    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "deleting...";

    const startTime = Date.now();

    try {
      const response = await fetch("/auth/delete", {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, 1200 - elapsed);

      if (response.ok) {
        setTimeout(() => {
          displayToast(DeleteAccountRes.USER_DATA_DELETED, "success");

          setTimeout(() => {
            history.pushState(null, "", "/");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1500);
        }, waitTime);
      } else {
        setTimeout(() => {
          const errorMsg =
            DeleteAccountRes[result?.code] ||
            "Error during delete. Please try again.";
          displayToast(errorMsg, "error");
        }, waitTime);
      }
    } catch (error) {
      displayToast(DeleteAccountRes.INTERNAL_SERVER_ERROR, "error");
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
        spinner.classList.add("hidden");
        btnLabel.textContent = btnLabelText;
      }, 1300);
    }
  });
}
