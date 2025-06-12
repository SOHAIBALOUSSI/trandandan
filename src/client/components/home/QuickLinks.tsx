import { styles } from "@/styles/styles";

function QuickLink(props: { href: string; title: string; text: string }) {
  const { href, title, text } = props;

  return (
    <div className="py-4 px-6 border border-pong-dark-highlight rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:bg-pong-dark-highlight/10 group">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400 mt-2">{text}</p>
      <a
        href={href}
        className="inline-block mt-3 text-pong-accent group-hover:text-pong-secondary transition-colors duration-300"
        data-link
      >
        <i className="fa-solid fa-arrow-right ml-1"></i>
      </a>
    </div>
  );
}

export function QuickLinks() {
  return (
    <div className="flex flex-col gap-6 mt-10 md:mt-16 w-full max-w-3xl mx-auto px-4">
      <QuickLink
        title="Commence a Duel"
        href="/arena/duel"
        text="Let the house bear witness to your skill"
      />
      <QuickLink
        title="The Grand Tourney"
        href="/arena/tourney"
        text="Join the ranks of contenders in the season’s noble competition"
      />
      <QuickLink
        title="Match Archives"
        href="/chamber"
        text="Browse through past encounters and measure your legacy"
      />
      <QuickLink
        title="Hall of Champions"
        href="/chamber"
        text="Behold the names etched in gold — the finest among us"
      />
    </div>
  );
}
