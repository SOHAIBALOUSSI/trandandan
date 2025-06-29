import { UserProfile } from "types/types";

export function MemberCard(props: { user: UserProfile | null }) {
  const { user } = props;

  const joined = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 bg-gradient-to-br from-[#1a1a1a] via-[#111111] to-[#0d0d0d] rounded-3xl w-full max-w-2xl mx-auto border border-pong-dark-highlight/40 shadow-lg backdrop-blur-xl">
      <h2 className="text-center text-2xl md:text-3xl font-extrabold text-pong-accent tracking-tight">
        BHV Member Card
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">
        <div className="relative">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full p-[3px] bg-gradient-to-br from-pong-accent via-pong-dark-accent to-pong-accent shadow-lg">
            <img
              src={user?.avatar_url}
              alt="Profile avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 flex-1 w-full">
          <div>
            <span className="block uppercase text-pong-secondary tracking-widest mb-1 text-xs md:text-sm">
              Username
            </span>
            <span
              id="member-username"
              className="block font-bold text-pong-dark-primary border-b-2 border-pong-accent/40 pb-1 break-words normal-case text-lg md:text-xl focus:outline-none focus:border-pong-accent focus:bg-pong-accent/10 focus:shadow-lg focus:ring-2 focus:ring-pong-accent focus:px-2 focus:border-none transition-all duration-200"
            >
              {user?.username}
            </span>
          </div>

          <div>
            <span className="block uppercase text-pong-secondary tracking-widest mb-1 text-xs md:text-sm">
              Email
            </span>
            <span className="block font-medium text-pong-dark-primary/80 border-b border-pong-dark-highlight pb-1 break-all text-base normal-case">
              {user?.email}
            </span>
          </div>

          <div>
            <span className="block uppercase text-pong-secondary tracking-widest mb-1 text-xs md:text-sm">
              Joined
            </span>
            <span className="block text-sm md:text-base text-white/70">
              {joined}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <span className="bg-pong-secondary/20 text-pong-secondary px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              Sold: {user?.solde}
            </span>
            <span className="bg-pong-highlight/20 text-pong-highlight px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              Grade: {user?.level}
            </span>
            <span className="bg-yellow-400/20 text-yellow-300 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              Rank: {user?.rank}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
