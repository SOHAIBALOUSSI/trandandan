import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import MaleAvatar from "@/assets/male.png";
import FemaleAvatar from "@/assets/female.png";
import { UserProfile } from "types/types";

export function Hero(props: { user: UserProfile | null }) {
  const { user } = props;

  return (
    <div className="p-6 md:p-10 shadow-xl shadow-black/30 w-full max-w-5xl mx-auto rounded-2xl backdrop-blur">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={user?.avatar_url}
          alt="Profile Avatar"
          className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-pong-accent shadow-md hover:scale-105 transition-transform duration-300"
          aria-label="User avatar"
        />
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-pong-dark-primary">
            Welcome back,{" "}
            <span className="text-pong-dark-accent">{user?.username}</span>!
          </h2>
          <p className="text-pong-dark-secondary mt-1 text-sm md:text-base">
            Ranked #{user?.rank} in BHV Club • Level {user?.level}
          </p>
          <p className="text-pong-dark-primary/70 italic mt-2 text-xs md:text-sm">
            “Every champion was once a contender who refused to give up.”
          </p>
          <a
            href="/my_profile"
            data-link
            className="inline-block mt-4 px-5 py-2 bg-pong-accent hover:bg-pong-dark-accent text-white rounded-lg shadow-md transition-colors duration-300 text-sm md:text-base"
          >
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}
