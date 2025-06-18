import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import MaleAvatar from "@/assets/male.png";
import FemaleAvatar from "@/assets/female.png";

export function Hero() {
  const user = getCurrentUser();

  let avatar;
  const isAvatarSet = user?.gender;
  if (isAvatarSet) {
    avatar = user?.gender === "M" ? MaleAvatar : FemaleAvatar;
  } else {
    avatar = user?.avatarUrl;
  }

  return (
    <div className="p-6 md:p-10 shadow-xl shadow-black/60 max-w-5xl mx-auto mb-10 rounded-xl backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={avatar}
          alt="profile"
          className="w-24 h-24 md:w-28 md:h-28 rounded-full shadow-md hover:scale-105 transition-all duration-300"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-pong-dark-primary">
            Welcome back,{" "}
            <span className="text-pong-dark-accent">{user?.username}</span>!
          </h2>
          <p className="text-pong-dark-secondary mt-1 text-sm md:text-base">
            Ranked #{user?.rank} in BHV Club • Level {user?.level}
          </p>
          <p className="text-pong-dark-primary/70 italic mt-2 text-xs md:text-sm">
            "Every champion was once a contender who refused to give up."
          </p>
        </div>
      </div>
    </div>
  );
}
