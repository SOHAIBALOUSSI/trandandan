// Response messages for various authentication service actions
export const LoginRes: Record<string, string> = {
  INVALID_CREDENTIALS:
    "No matching racket in the locker room. Double-check your grip and try again.",
  USER_ALREADY_LINKED:
    "This racket is already linked to a 42 or Google account. Try signing in with that one.",
  INVALID_PASSWORD:
    "Wrong swing on the paddle pass. Adjust your grip and give it another go.",
  FST_ERR_VALIDATION:
    "Your credentials need a bit more polish. Check your input and try again.",
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
  USER_REGISTERED: "Welcome aboard! Sign in to unlock your club experience.",
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
    "You need to verify your identity first. The court isn’t open to unregistered rackets.",
  OTP_REQUIRED: "OTP required. Enter the code to complete the match.",
  OTP_INVALID:
    "That code doesn’t match our playbook. Double-check and try again.",
  CODE_VERIFIED:
    "OTP verified successfully. Redirecting you to update your password...",
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
  TWOFA_ALREADY_PENDING:
    "You're already mid-setup. Complete your 2FA to secure the club.",
  SCAN_QR:
    "Scan the QR code with your authenticator app to activate your 2FA defense.",
  CODE_SENT: "A 2FA code has been emailed. Enter it to complete the setup.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

export const Verify2FaSetupRes: Record<string, string> = {
  TWOFA_NOT_SET:
    "Two-factor authentication isn’t set up yet. Prepare your defense first.",
  TWOFA_ALREADY_ENABLED:
    "Two-factor authentication is already active on this racket.",
  UNAUTHORIZED: "Unauthorized. Only logged-in champs can verify 2FA.",
  OTP_REQUIRED: "OTP required. Enter your code to proceed.",
  OTP_INVALID: "Invalid OTP. That rally didn’t land — try again.",
  TWOFA_ENABLED:
    "Two-factor authentication successfully enabled. You’ve upgraded your game!",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

export const Verify2FaLoginRes: Record<string, string> = {
  TWOFA_NOT_SET:
    "Two-factor authentication isn’t set up yet. Prepare your defense first.",
  TWOFA_NOT_ENABLED: "2FA isn’t active yet. Step onto the setup court first.",
  UNAUTHORIZED: "Unauthorized. Only logged-in champs can verify 2FA.",
  OTP_REQUIRED: "OTP required. Enter your code to proceed.",
  OTP_INVALID: "Invalid OTP. That rally didn’t land — try again.",
  USER_LOGGED_IN: "Welcome back, champ! You’re cleared for the court.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

export const Disable2FaRes: Record<string, string> = {
  UNAUTHORIZED: "Access denied. You must be logged in to disable 2FA.",
  METHODS_NOT_ENABLED:
    "No 2FA methods are active. You’ll need to set one up before disabling.",
  METHOD_DISABLED: "This 2FA method is now disabled. You can play without it.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

export const Enable2FaRes: Record<string, string> = {
  UNAUTHORIZED: "Access denied. Log in to enable two-factor authentication.",
  METHODS_NOT_ENABLED:
    "No available 2FA methods found. Please set one up first to enable it.",
  METHOD_ENABLED: "You're all set — this two-factor method is now active.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

export const Primary2FaMethodRes: Record<string, string> = {
  UNAUTHORIZED:
    "Hold up! You must be logged in to manage your primary 2FA method.",
  METHODS_NOT_ENABLED:
    "You don’t have any 2FA methods set up. Get one going first.",
  PRIMARY_METHOD_UPDATED:
    "All set! Your primary 2FA method has been successfully updated.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

export const DeleteAccountRes: Record<string, string> = {
  UNAUTHORIZED: "Unauthorized. Only logged-in champs can delete their account.",
  USER_DATA_DELETED: "Your account has been successfully deleted.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

export const UpdateCredentialsRes: Record<string, string> = {
  PASSWORDS_REQUIRED:
    "Both old and new passwords are required. Please provide them.",
  INVALID_PASSWORD:
    "Your old password is incorrect. Check your grip and try again.",
  UNMATCHED_PASSWORDS:
    "Your new passwords don’t match. Adjust your swing and re-enter.",
  PASSWORD_POLICY:
    "Your password needs more training: 8+ characters with upper, lower, number, and a special move.",
  EMAIL_EXISTS:
    "This email is already linked to another account. Please use a different email.",
  UNAUTHORIZED:
    "Unauthorized. You need to be logged in to update your credentials.",
  CREDENTIALS_UPDATED: "Your credentials have been successfully updated.",
  TWOFA_REQUIRED:
    "Two-factor authentication required. Let’s finish your warm-up with verification.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

export const VerifyUpdateCredentialsRes: Record<string, string> = {
  NO_PENDING_CREDENTIALS:
    "No pending credentials to update. Please check your request.",
  TWOFA_NOT_SET:
    "Two-factor authentication is not set up. Please set it up before updating credentials.",
  TWOFA_NOT_ENABLED:
    "Two-factor authentication is not enabled. Please enable it before updating credentials.",
  EMAIL_EXISTS:
    "This email is already linked to another account. Please use a different email.",
  UNAUTHORIZED:
    "Unauthorized. You need to be logged in to update your credentials.",
  OTP_REQUIRED:
    "OTP required. Please enter the code sent to your authenticator app or email.",
  OTP_INVALID: "Invalid OTP. Please check the code and try again.",
  CREDENTIALS_UPDATED: "Your credentials have been successfully updated.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

// Response messages for various user profile service actions
export const UpdateUserProfileRes: Record<string, string> = {
  UNAUTHORIZED: "Unauthorized. Only logged-in champs can update their profile.",
  PROFILE_NOT_FOUND: "Profile not found. Please check your request.",
  USERNAME_EXISTS: "This username is already taken. Please choose another one.",
  MISSING_FIELDS: "All fields are required. Please fill them in.",
  ZERO_CHANGES: "No changes detected. Please modify at least one field.",
  PROFILE_UPDATED: "Your profile has been successfully updated.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

export const UploadAvatarRes: Record<string, string> = {
  FILE_REQUIRED: "An avatar file is required. Please upload an image.",
  AVATAR_UPLOADED: "Your avatar has been successfully uploaded.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};

export const GetUserAvatarRes: Record<string, string> = {
  FILE_NAME_REQUIRED: "A file name is required to retrieve the avatar.",
  FILE_NOT_FOUND: "Avatar not found. Please check the file name.",
  AVATAR_UPLOADED: "Your avatar has been successfully retrieved.",
  INTERNAL_SERVER_ERROR:
    "The club’s lights are out at the moment. Try again shortly.",
};
