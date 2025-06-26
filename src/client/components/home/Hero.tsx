import { fontSizes } from "@/styles/fontSizes";
import { UserProfile } from "types/types";

export function Hero(props: { user: UserProfile | null }) {
  const { user } = props;

  return (
    <div className="p-6 md:p-10 shadow-xl shadow-black/30 w-full max-w-5xl mx-auto rounded-2xl backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={user?.avatar_url}
          alt="Profile Avatar"
          className="w-24 h-24 md:w-28 md:h-28 rounded-full shadow-md object-cover mb-4 md:mb-0 hover:scale-105 transition-transform duration-300"
        />
        <div className="text-center md:text-left flex-1">
          <h2
            className={`${fontSizes.titleFontSize} font-bold text-pong-dark-primary mb-2`}
          >
            Welcome back,{" "}
            <span className="text-pong-dark-accent normal-case">
              {user?.username}
            </span>
            !
          </h2>
          <p
            className={`text-pong-dark-secondary ${fontSizes.subtitleFontSize} font-semibold mb-3`}
          >
            Ranked #{user?.rank} in BHV Club • Level {user?.level}
          </p>
          <hr className="my-4 border-pong-accent/20" />
          <p
            className={`text-pong-dark-primary/70 italic ${fontSizes.smallTextFontSize} mb-4`}
          >
            “Every champion was once a contender who refused to give up.”
          </p>
          <a
            href="my_profile"
            className={`inline-block px-6 py-2 bg-pong-accent hover:bg-pong-dark-accent text-white rounded-lg shadow transition-colors duration-200 ${fontSizes.buttonFontSize} font-semibold`}
            data-link
          >
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}
