import { styles } from "@/styles/styles";
import { fontSizes } from "@/styles/fontSizes";

export function ChangeEmail() {
  return (
    <div className={styles.cardOneStyle}>
      <h2
        className={`flex items-center gap-2 text-white ${fontSizes.smallTitleFontSize}`}
      >
        <span className="text-pong-accent">📧</span>
        <span className="font-bold">Update Your Contact Address</span>
      </h2>

      <p
        className={`${fontSizes.smallTextFontSize} text-white/80 leading-relaxed`}
      >
        Need to change where we reach you? Update your registered email to
        ensure you stay in the loop for all club matters and security alerts.
      </p>

      <a
        href="change_email"
        data-link
        className="inline-block mt-4 w-fit px-4 py-2 text-sm font-semibold text-white bg-pong-accent rounded-md shadow hover:bg-pong-dark-accent transition"
      >
        Update Email
      </a>

      <p className="text-pong-warning text-xs md:text-sm italic mt-3">
        Make sure your new email is valid — it’s essential for account recovery
        and notifications.
      </p>
    </div>
  );
}
