import { fontSizes } from "@/styles/fontSizes";
import { styles } from "@/styles/styles";
import { UserProfile } from "types/types";

export function Hero(props: { user: UserProfile }) {
  const { user } = props;

  return (
    <div className="p-6 md:p-10 shadow-xl shadow-black/30 w-full max-w-5xl mx-auto rounded-2xl backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-br from-pong-accent via-pong-dark-accent to-pong-accent shadow-lg hover:scale-105 transition-transform duration-300">
          <img
            src={user.avatar_url}
            alt="Profile Avatar"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div className="text-center md:text-left flex-1">
          <h2
            className={`${fontSizes.titleFontSize} font-bold text-pong-dark-primary mb-3`}
          >
            Welcome back,{" "}
            <span className="text-pong-dark-accent normal-case">
              {user.username}
            </span>
            !
          </h2>
          <p
            className={`text-pong-dark-secondary ${fontSizes.bodyFontSize} font-semibold mb-3`}
          >
            Ranked #{user.rank} in BHV Club • Level {user.level}
          </p>
          <hr className="my-4 border-pong-accent/20" />
          <p
            className={`text-pong-dark-primary/80 italic ${fontSizes.smallTextFontSize} mb-3`}
          >
            “Every champion was once a contender who refused to give up.”
          </p>
          <a href="my_profile" className={styles.darkPrimaryBtn} data-link>
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}
