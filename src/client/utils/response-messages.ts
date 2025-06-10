export const LoginRes: Record<string, string> = {
  INVALID_CREDENTIALS:
    "No matching racket in the locker room. Double-check your grip and try again.",
  USER_ALREADY_LINKED:
    "This racket is already linked to a 42 or Google account. Try signing in with that one.",
  INVALID_PASSWORD:
    "Wrong swing on the paddle pass. Adjust your grip and give it another go.",
  USER_LOGGED_IN: "Welcome back, champ! You’re cleared for the court.",
  TWOFA_REQUIRED:
    "Two-factor authentication required. Let’s finish your warm-up with verification.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

export const RegisterRes: Record<string, string> = {
  UNMATCHED_PASSWORDS:
    "Your passwords don’t match. Steady your stance and re-enter them.",
  PASSWORD_POLICY:
    "Your password needs more training: 8+ characters with upper, lower, number, and a special move.",
  USER_EXISTS: "This racket is already in the club. Try signing in instead.",
  USER_REGISTERED:
    "Welcome to the club, champion! Your racket is ready for the game.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

export const RemoteRes: Record<string, string> = {
  AUTH_CODE_REQUIRED:
    "You need to bring your auth code to the court. Please provide it to continue.",
  USER_LOGGED_IN: "Welcome back, champ! You’re cleared for the court.",
  USER_REGISTERED:
    "Welcome to the club, champion! Your racket is ready for the game.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

export const LostPasswordRes: Record<string, string> = {
  INVALID_EMAIL:
    "We couldn't find a matching racket with that email. Check your input and try again.",
  USER_LINKED:
    "This racket is already linked to a 42 or Google account. Try signing in with that one.",
  CODE_SENT: "A recovery serve has been sent! Check your inbox for the code.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

export const VerifyCodeRes: Record<string, string> = {
  CODE_NOT_SET:
    "Verification code wasn't set properly. Reset your footing and try again.",
  UNAUTHORIZED:
    "You need to log in first. Grab your racket and head to the court.",
  OTP_REQUIRED: "OTP required. Enter the code to complete the match.",
  OTP_INVALID:
    "That code doesn’t match our playbook. Double-check and try again.",
  CODE_VERIFIED: "Code verified. You're all set to join the lounge!",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

export const UpdatePasswordRes: Record<string, string> = {
  USER_LINKED:
    "This racket is already linked to a 42 or Google account. Try signing in with that one.",
  UNMATCHED_PASSWORDS:
    "Your new passwords don’t match. Adjust your swing and re-enter.",
  UNAUTHORIZED:
    "You need to log in first. The court isn’t open to unregistered rackets.",
  USER_LOGGED_IN: "Your password is updated successfully!",
  TWOFA_REQUIRED:
    "Two-factor authentication required. Let’s finish the rally with verification.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

export const Setup2FaRes: Record<string, string> = {
  UNAUTHORIZED: "Unauthorized access. Only logged-in champs can set up 2FA.",
  TWOFA_ALREADY_ENABLED:
    "Two-factor authentication is already active on this racket.",
  SCAN_QR:
    "Scan the QR code with your authenticator app to activate your 2FA defense.",
  CODE_SENT: "A 2FA code has been emailed. Enter it to complete the setup.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

export const Verify2FaRes: Record<string, string> = {
  TWOFA_NOT_SET:
    "Two-factor authentication isn’t set up yet. Prepare your defense first.",
  TWOFA_ALREADY_ENABLED:
    "Two-factor authentication is already active on this racket.",
  TWOFA_NOT_ENABLED: "2FA isn’t active yet. Step onto the setup court first.",
  UNAUTHORIZED: "Unauthorized. Only logged-in champs can verify 2FA.",
  OTP_REQUIRED: "OTP required. Enter your code to proceed.",
  OTP_INVALID: "Invalid OTP. That rally didn’t land — try again.",
  TWOFA_ENABLED:
    "Two-factor authentication successfully enabled. You’ve upgraded your game!",
  USER_LOGGED_IN: "Welcome back, champ! You’re cleared for the court.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};
