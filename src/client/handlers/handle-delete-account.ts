import { styles } from "@/styles/styles";
import { DeleteAccountRes } from "@/utils/response-messages";

export function deleteAccount() {
  const form = document.getElementById(
    "delete-account-form"
  ) as HTMLFormElement;

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const feedback = document.querySelector<HTMLDivElement>("#cta-feedback");
    const submitBtn = document.querySelector<HTMLButtonElement>("#cta-btn");
    const spinner = document.querySelector<HTMLSpanElement>("#spinner");
    const btnLabel = document.querySelector<HTMLSpanElement>("#btn-label");

    if (!feedback || !submitBtn || !spinner || !btnLabel) return;

    const btnLabelText = btnLabel.textContent;

    // Reset feedback and button state
    feedback.textContent = "";
    feedback.className = styles.formMessage;
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "deleting...";

    // Start the timer to calculate wait time
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
          feedback.className = `${styles.formMessage} text-pong-success`;
          feedback.textContent = DeleteAccountRes.USER_DATA_DELETED;

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
          feedback.className = `${styles.formMessage} text-pong-error`;
          feedback.textContent = errorMsg;
        }, waitTime);
      }
    } catch (error) {
      feedback.className = `${styles.formMessage} text-pong-error`;
      feedback.textContent = DeleteAccountRes.INTERNAL_SERVER_ERROR;
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
