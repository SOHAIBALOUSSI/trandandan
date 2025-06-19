import { styles } from "@/styles/styles";

function QuickLink(props: {
  href: string;
  title: string;
  text: string;
  icon: string;
}) {
  const { href, title, text, icon } = props;

  return (
    <a
      href={href}
      className="group block bg-pong-dark-highlight/10 backdrop-blur-sm rounded-xl shadow-sm px-6 py-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
      data-link
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-bold text-pong-dark-primary group-hover:text-pong-accent transition-all duration-300">
          {title}
        </h3>
        <i className={`fa-solid ${icon} text-pong-accent text-xl`}></i>
      </div>
      <p className="text-sm text-pong-dark-secondary mt-2">{text}</p>
    </a>
  );
}

export function QuickLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 max-w-5xl mx-auto">
      <QuickLink
        title="Commence a Duel"
        href="/arena"
        text="Let the house bear witness to your skill"
        icon="fa-table-tennis-paddle-ball"
      />
      <QuickLink
        title="The Grand Tourney"
        href="/arena"
        text="Join the season’s noble competition"
        icon="fa-trophy"
      />
      <QuickLink
        title="Match Archives"
        href="/chamber"
        text="Browse past encounters and relive the glory"
        icon="fa-scroll"
      />
      <QuickLink
        title="Hall of Champions"
        href="/chamber"
        text="Witness the legends of the BHV Club"
        icon="fa-crown"
      />
    </div>
  );
}
