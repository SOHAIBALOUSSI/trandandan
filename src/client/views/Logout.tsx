import { handleLogout } from "@/services/handle-logout";

let hasLoggedOut: boolean = false;

export function Logout() {
  if (!hasLoggedOut) {
    hasLoggedOut = true;
    setTimeout(() => {
      handleLogout();
    }, 1300);
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-pong-bg">
      <p className="text-pong-primary text-lg md:text-xl font-semibold mb-4 text-center animate-pulse">
        logging you out — see you at the next match.
      </p>
      <i className="fas fa-spinner fa-spin text-pong-accent text-2xl animate-spin"></i>
    </section>
  );
}	
