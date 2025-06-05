import { styles } from "@/styles/styles";
import { Errors } from "@/utils/error-messages";

export function handleSignIN() {
  const signInForm = document.querySelector<HTMLFormElement>("#signin-form");
  const feedback = document.querySelector<HTMLDivElement>("#signin-feedback");
  const submitBtn = document.querySelector<HTMLButtonElement>("#signin-btn");
  const spinner = document.querySelector<HTMLSpanElement>("#spinner-in");
  const btnLabel = document.querySelector<HTMLSpanElement>("#btn-label-in");

  // 2FA modal elements
  const twofaSection = document.getElementById("signin-2fa-section");
  const twofaInput = document.getElementById("2fa-otp") as HTMLInputElement;
  const twofaBtn = document.getElementById(
    "signin-2fa-btn"
  ) as HTMLButtonElement;
  const twofaFeedback = document.getElementById("signin-2fa-feedback");

  if (!signInForm || !feedback || !submitBtn || !spinner || !btnLabel) return;

  // show/hide 2FA modal
  function show2FAModal(show: boolean) {
    if (twofaSection) {
      if (show) {
        twofaSection.classList.remove("hidden");
        twofaSection.classList.add("flex");
        twofaInput && (twofaInput.value = "");
        twofaFeedback && (twofaFeedback.textContent = "");
        setTimeout(() => twofaInput?.focus(), 100);
      } else {
        twofaSection.classList.add("hidden");
      }
    }
  }

  // Attach 2FA verify handler (only once)
  if (twofaBtn && !twofaBtn.dataset.listener) {
    twofaBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const tempToken = twofaBtn.dataset.tempToken;
      if (!tempToken) return;

      const code = twofaInput?.value.trim();
      if (!code || code.length !== 6 || !/^\d{6}$/.test(code)) {
        if (twofaFeedback)
          twofaFeedback.textContent = "Please enter a valid 6-digit code.";
        return;
      }

      spinner?.classList.remove("hidden");
      twofaBtn.setAttribute("disabled", "true");

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

            if (twofaFeedback) {
              twofaFeedback.textContent =
                "2FA verified! Entering the lounge...";
              twofaFeedback.className = `${styles.formMessage} text-pong-success`;
            }

            setTimeout(() => {
              show2FAModal(false);
              history.pushState(null, "", "/salon");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }, 1200);
          } else {
            if (twofaFeedback)
              twofaFeedback.textContent =
                Errors[data?.code] || "Invalid 2FA code. Try again.";
          }
        })
        .catch(() => {
          if (twofaFeedback)
            twofaFeedback.textContent = Errors.INTERNAL_SERVER_ERROR;
        })
        .finally(() => {
          spinner?.classList.add("hidden");
          twofaBtn.removeAttribute("disabled");
        });
    });
    twofaBtn.dataset.listener = "true";
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
    feedback.classList.remove("hidden");
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

      if (response.ok && result.statusCode === 200) {
        setTimeout(() => {
          feedback.textContent = "Welcome back, champ! Entering the lounge...";
          feedback.className = `${styles.formMessage} text-pong-success`;
          feedback.classList.remove("hidden");

          result.data.accessToken &&
            localStorage.setItem("accessToken", result.data.accessToken);
          result.data.refreshToken &&
            localStorage.setItem("refreshToken", result.data.refreshToken);

          setTimeout(() => {
            history.pushState(null, "", "/salon");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1500);
        }, waitTime);
      } else if (result.statusCode === 206) {
        // 2FA Required
        setTimeout(() => {
          feedback.textContent =
            "Two-factor authentication required. Please complete the verification.";
          feedback.className = `${styles.formMessage} text-pong-warning`;
          feedback.classList.remove("hidden");
          show2FAModal(true);
          if (twofaBtn && result.data?.tempToken) {
            twofaBtn.dataset.tempToken = result.data.tempToken;
          }
        }, 0);
      } else {
        setTimeout(() => {
          const errorMsg =
            Errors[result?.code] ||
            "Invalid paddle pass. Check your details and swing again.";
          feedback.textContent = errorMsg;
          feedback.className = `${styles.formMessage} text-pong-error`;
          feedback.classList.remove("hidden");
        }, waitTime);
      }
    } catch (err) {
      feedback.textContent = Errors.INTERNAL_SERVER_ERROR;
      feedback.className = `${styles.formMessage} text-pong-error`;
      feedback.classList.remove("hidden");
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
