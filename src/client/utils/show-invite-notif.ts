function showInviteNotification(
  senderName: string,
  onAccept: () => void,
  onDecline: () => void
) {
  const existing = document.querySelector(".game-invite-notification");
  if (existing) existing.remove();

  const notif = document.createElement("div");
  notif.className = "game-invite-notification";

  notif.innerHTML = `
    <div class="invite-header">Game Invite</div>
    <div class="invite-body">
      <p><strong>${senderName}</strong> invited you to a match!</p>
      <div class="invite-actions">
        <button id="accept-invite" class="accept-btn">Accept</button>
        <button id="decline-invite" class="decline-btn">Decline</button>
      </div>
    </div>
  `;

  document.body.appendChild(notif);

  const acceptBtn = document.getElementById(
    "accept-invite"
  ) as HTMLButtonElement;
  const declineBtn = document.getElementById(
    "decline-invite"
  ) as HTMLButtonElement;

  acceptBtn.onclick = () => {
    notif.remove();
    onAccept();
  };

  declineBtn.onclick = () => {
    notif.remove();
    onDecline();
  };
}
