import { styles } from "@/styles/styles";
import { Errors } from "@/utils/error-messages";

export function handleSignIN() {
  const signInForm = document.querySelector<HTMLFormElement>("#signin-form");
  const feedback = document.querySelector<HTMLDivElement>("#signin-feedback");
  const submitBtn = document.querySelector<HTMLButtonElement>("#signin-btn");
  const spinner = document.querySelector<HTMLSpanElement>("#spinner-in");
  const btnLabel = document.querySelector<HTMLSpanElement>("#btn-label-in");

  if (!signInForm || !feedback || !submitBtn || !spinner || !btnLabel) return;

  function show2FAInput(tempToken: string) {
    let twofaSection = document.getElementById("signin-2fa-section");
    if (!twofaSection) {
      twofaSection = document.createElement("div");
      twofaSection.id = "signin-2fa-section";
      twofaSection.className = "flex flex-col items-center gap-2 mt-4 w-full";

      twofaSection.innerHTML = `
        <input
          id="signin-2fa-code"
          type="text"
          maxlength="6"
          pattern="[0-9]{6}"
          placeholder="Enter 2FA code"
          class="input input-bordered w-32 text-center text-lg rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-pong-secondary"
          autocomplete="one-time-code"
        />
        <button
          id="signin-2fa-btn"
          class="bg-pong-secondary hover:bg-pong-secondary/90 text-white px-4 py-2 rounded transition-all w-32"
        >
          Verify 2FA
        </button>
        <div id="signin-2fa-feedback" class="text-pong-error text-sm mt-2"></div>
      `;

      // Append below feedback inside the form
      const targetForm = document.querySelector("#signin-form");
      if (targetForm) {
        targetForm.appendChild(twofaSection);
      }
    } else {
      twofaSection.classList.remove("hidden");
    }

    // Clear input and feedback
    const codeInput = document.getElementById(
      "signin-2fa-code"
    ) as HTMLInputElement;
    const feedback = document.getElementById("signin-2fa-feedback");
    if (codeInput) codeInput.value = "";
    if (feedback) feedback.textContent = "";

    codeInput?.focus();

    const verifyBtn = document.getElementById("signin-2fa-btn");
    if (verifyBtn && !verifyBtn.dataset.listener) {
      verifyBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const code = codeInput?.value.trim();
        if (!code || code.length !== 6 || !/^\d{6}$/.test(code)) {
          if (feedback)
            feedback.textContent = "Please enter a valid 6-digit code.";
          return;
        }

        spinner?.classList.remove("hidden");
        verifyBtn.setAttribute("disabled", "true");

        fetch("/2fa/app/verify-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tempToken}`,
          },
          body: JSON.stringify({ otpCode: code }),
        })
          .then((res) =>
            res.json().then((data) => ({ status: res.status, data }))
          )
          .then(({ status, data }) => {
            if (
              status === 200 &&
              data.data?.accessToken &&
              data.data?.refreshToken
            ) {
              localStorage.setItem("accessToken", data.data.accessToken);
              localStorage.setItem("refreshToken", data.data.refreshToken);

              if (feedback) {
                feedback.textContent = "2FA verified! Entering the lounge...";
                feedback.className = `${styles.formMessage} text-pong-success`;
              }

              setTimeout(() => {
                history.pushState(null, "", "/salon");
                window.dispatchEvent(new PopStateEvent("popstate"));
              }, 1200);
            } else {
              if (feedback)
                feedback.textContent =
                  data.message || "Invalid 2FA code. Try again.";
            }
          })
          .catch(() => {
            if (feedback) feedback.textContent = "Server error. Try again.";
          })
          .finally(() => {
            spinner?.classList.add("hidden");
            verifyBtn.removeAttribute("disabled");
          });
      });
      verifyBtn.dataset.listener = "true";
    }
  }

  signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(signInForm);
    const loginValue = formData.get("login") as string;
    const password = formData.get("password") as string;

    const isEmail: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginValue);
    const payload = isEmail
      ? { email: loginValue.trim(), password }
      : { username: loginValue.trim(), password };

    feedback.textContent = "";
    feedback.className = styles.formMessage;
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "Entering...";

    const startTime = Date.now();

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, 1200 - elapsed);

      if (response.ok) {
        setTimeout(() => {
          feedback.textContent = "Welcome back, champ! Entering the lounge...";
          feedback.className = `${styles.formMessage} text-pong-success`;

          result.data.accessToken &&
            localStorage.setItem("accessToken", result.data.accessToken);
          result.data.refreshToken &&
            localStorage.setItem("refreshToken", result.data.refreshToken);

          setTimeout(() => {
            history.pushState(null, "", "/salon");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1500);
        }, waitTime);
      } else if (response.status === 206) {
        // 2FA Required
        setTimeout(() => {
          feedback.textContent =
            "Two-factor authentication required. Please complete the verification.";
          feedback.className = `${styles.formMessage} text-pong-warning`;
          /*
				logic to handle 2fa
		  */
        }, 0);
      } else {
        setTimeout(() => {
          const errorMsg =
            Errors[result?.code] ||
            "Invalid paddle pass. Check your details and swing again.";
          feedback.textContent = errorMsg;
          feedback.className = `${styles.formMessage} text-pong-error`;
        }, waitTime);
      }
    } catch (err) {
      feedback.textContent = Errors.INTERNAL_SERVER_ERROR;
      feedback.className = `${styles.formMessage} text-pong-error`;
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.setAttribute("aria-busy", "false");
        spinner.classList.add("hidden");
        btnLabel.textContent = "enter the lounge";
      }, 1300);
    }
  });
}
