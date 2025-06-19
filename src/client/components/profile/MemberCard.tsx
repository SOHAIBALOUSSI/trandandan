export function MemberCard(props: {
  name: string;
  email: string;
  sold: string;
  grade: string;
  avatar: string;
  rank: string;
}) {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 bg-gradient-to-br from-[#1a1a1a] via-[#111111] to-[#0d0d0d] rounded-3xl w-full max-w-2xl mx-auto border border-pong-dark-highlight/40 shadow-lg backdrop-blur-xl">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-pong-accent text-center mb-2 md:mb-4">
        BHV Member Card
      </h2>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">
        <img
          src={props.avatar}
          alt="Profile avatar"
          className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 shadow-xl object-cover bg-pong-bg"
        />
        <div className="flex flex-col gap-3 flex-1 w-full">
          <div>
            <span className="block text-xs uppercase text-pong-secondary tracking-widest mb-1">
              Name
            </span>
            <span className="block text-lg sm:text-xl font-bold text-pong-dark-primary border-b-2 border-pong-accent/40 pb-1 break-words">
              {props.name}
            </span>
          </div>
          <div>
            <span className="block text-xs uppercase text-pong-secondary tracking-widest mb-1">
              Email
            </span>
            <span className="normal-case block text-sm sm:text-base font-medium text-pong-dark-primary/80 border-b border-pong-dark-highlight pb-1 break-all">
              {props.email}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="bg-pong-secondary/20 text-pong-secondary px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              Sold: {props.sold}
            </span>
            <span className="bg-pong-highlight/20 text-pong-highlight px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              Grade: {props.grade}
            </span>
            <span className="bg-yellow-400/20 text-yellow-300 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              Rank: {props.rank}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
