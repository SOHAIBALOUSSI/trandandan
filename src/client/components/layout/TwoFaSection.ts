// import {
//   setupApp2FA,
//   setupEmail2FA,
//   disableApp2FA,
//   disableEmail2FA,
//   setPrimaryApp2FA,
//   setPrimaryEmail2FA,
// } from "@/services/handle-2fa";

// export function renderTwofaSection() {
//   const section = document.createElement("div");
//   section.className =
//     "bg-white dark:bg-gray-800 rounded shadow p-6 m-4 w-full max-w-2xl";
//   section.innerHTML = `
//     <h2 class="text-xl font-bold mb-4 text-pong-primary">Two-Factor Authentication</h2>
//     <p class="mb-4 text-gray-600 dark:text-gray-300">
//       Enhance your account security with two-factor authentication.
//     </p>
//     <div class="flex items-center justify-between gap-4 bg-gray-900 text-white text-lg m-8 p-6 rounded-sm">
//       <span class="text-pong-secondary">App</span>
//       <div class="flex items-center gap-4">
//         <button id="2fa-app-enable" class="w-24 btn-primary">Enable</button>
//         <button id="2fa-app-disable" class="w-24 btn-primary">Disable</button>
//         <button id="2fa-app-primary" class="w-24 btn-primary">Primary</button>
//       </div>
//     </div>
//     <div id="2fa-app-feedback" class="text-pong-error text-sm my-2"></div>
//     <div id="2fa-app-qr"></div>
//     <div class="flex items-center justify-between gap-4 bg-gray-900 text-white text-lg m-8 p-6 rounded-sm">
//       <span class="text-pong-secondary">Email</span>
//       <div class="flex items-center gap-4">
//         <button id="2fa-email-enable" class="w-24 btn-primary">Enable</button>
//         <button id="2fa-email-disable" class="w-24 btn-primary">Disable</button>
//         <button id="2fa-email-primary" class="w-24 btn-primary">Primary</button>
//       </div>
//     </div>
//     <div id="2fa-email-feedback" class="text-pong-error text-sm my-2"></div>
//   `;

//   // Attach event listeners for App 2FA
//   section.querySelector("#2fa-app-enable")?.addEventListener("click", (e) => {
//     e.preventDefault();
//     setupApp2FA();
//   });
//   section.querySelector("#2fa-app-disable")?.addEventListener("click", (e) => {
//     e.preventDefault();
//     disableApp2FA();
//   });
//   section.querySelector("#2fa-app-primary")?.addEventListener("click", (e) => {
//     e.preventDefault();
//     setPrimaryApp2FA();
//   });

//   // Attach event listeners for Email 2FA
//   section.querySelector("#2fa-email-enable")?.addEventListener("click", (e) => {
//     e.preventDefault();
//     setupEmail2FA();
//   });
//   section
//     .querySelector("#2fa-email-disable")
//     ?.addEventListener("click", (e) => {
//       e.preventDefault();
//       disableEmail2FA();
//     });
//   section
//     .querySelector("#2fa-email-primary")
//     ?.addEventListener("click", (e) => {
//       e.preventDefault();
//       setPrimaryEmail2FA();
//     });

//   return section;
// }
