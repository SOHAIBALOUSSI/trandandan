//   // 2FA modal elements
//   const twofaSection = document.getElementById("signin-2fa-section");
//   const twofaInput = document.getElementById("2fa-otp") as HTMLInputElement;
//   const twofaBtn = document.getElementById(
//     "signin-2fa-btn"
//   ) as HTMLButtonElement;
//   const twofaFeedback = document.getElementById("signin-2fa-feedback");

//   // show/hide 2FA modal
//   function show2FAModal(show: boolean) {
//     if (twofaSection) {
//       if (show) {
//         twofaSection.classList.remove("hidden");
//         twofaSection.classList.add("flex");
//         twofaInput && (twofaInput.value = "");
//         twofaFeedback && (twofaFeedback.textContent = "");
//         setTimeout(() => twofaInput?.focus(), 100);
//       } else {
//         twofaSection.classList.add("hidden");
//       }
//     }
//   }

//   // Attach 2FA verify handler (only once)
//   if (twofaBtn && !twofaBtn.dataset.listener) {
//     twofaBtn.addEventListener("click", function (e) {
//       e.preventDefault();
//       const tempToken = twofaBtn.dataset.tempToken;
//       if (!tempToken) return;

//       const code = twofaInput?.value.trim();
//       if (!code || code.length !== 6 || !/^\d{6}$/.test(code)) {
//         if (twofaFeedback)
//           twofaFeedback.textContent = "Please enter a valid 6-digit code.";
//         return;
//       }

//       spinner?.classList.remove("hidden");
//       twofaBtn.setAttribute("disabled", "true");

//       fetch("/2fa/app/verify-login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${tempToken}`,
//         },
//         body: JSON.stringify({ otpCode: code }),
//       })
//         .then((res) =>
//           res.json().then((data) => ({ status: res.status, data }))
//         )
//         .then(({ status, data }) => {
//           if (
//             status === 200 &&
//             data.data?.accessToken &&
//             data.data?.refreshToken
//           ) {
//             localStorage.setItem("accessToken", data.data.accessToken);
//             localStorage.setItem("refreshToken", data.data.refreshToken);

//             if (twofaFeedback) {
//               twofaFeedback.textContent =
//                 "2FA verified! Entering the lounge...";
//               twofaFeedback.className = `${styles.formMessage} text-pong-success`;
//             }

//             setTimeout(() => {
//               show2FAModal(false);
//               history.pushState(null, "", "/salon");
//               window.dispatchEvent(new PopStateEvent("popstate"));
//             }, 1200);
//           } else {
//             if (twofaFeedback)
//               twofaFeedback.textContent =
//                 Errors[data?.code] || "Invalid 2FA code. Try again.";
//           }
//         })
//         .catch(() => {
//           if (twofaFeedback)
//             twofaFeedback.textContent = Errors.INTERNAL_SERVER_ERROR;
//         })
//         .finally(() => {
//           spinner?.classList.add("hidden");
//           twofaBtn.removeAttribute("disabled");
//         });
//     });
//     twofaBtn.dataset.listener = "true";
//   }