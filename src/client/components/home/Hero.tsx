import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import MaleAvatar from "@/assets/male.png";
import FemaleAvatar from "@/assets/female.png";

export function Hero() {
  const user = getCurrentUser();

  return (
    <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between md:items-start text-center w-[90%] max-w-5xl mx-auto mt-6 md:mt-12">
      <div
        id="player-level"
        className="bg-pong-dark-highlight/30 text-white px-8 py-4 rounded-xl shadow-lg w-full md:w-auto transition-transform duration-300 hover:scale-105"
      >
        <p className="text-sm font-medium uppercase tracking-widest text-pong-dark-secondary">
          Grade
        </p>
        <span className="text-lg md:text-xl font-bold">
          {user?.level.toString()}
        </span>
      </div>

      <div
        id="player-sold"
        className="md:order-2 bg-pong-dark-highlight/30 text-white px-8 py-4 rounded-xl shadow-lg w-full md:w-auto transition-transform duration-300 hover:scale-105"
      >
        <p className="text-sm font-medium uppercase tracking-widest text-pong-dark-secondary">
          Sold
        </p>
        <span className="text-lg md:text-xl font-bold">
          {user?.solde.toString()} F
        </span>
      </div>

      <div
        id="hero-welcome"
        className="flex flex-col items-center md:order-1 justify-center gap-3"
      >
        <p className="text-sm text-pong-secondary italic">
          Ranked #4 in BHV Club
        </p>
        <img
          src={user?.gender === "M" ? MaleAvatar : FemaleAvatar}
          alt="profile image"
          className="w-[110px] h-[110px] rounded-full shadow-md mb-2 hover:shadow-xl transition-shadow duration-300"
        />
        <p className="text-base font-medium leading-snug">
          Welcome back,{" "}
          <span className="font-semibold text-pong-secondary">
            {user?.username}
          </span>
          !<br />
          Your paddle is polished. Let’s play.
        </p>
      </div>
    </div>
  );
}
