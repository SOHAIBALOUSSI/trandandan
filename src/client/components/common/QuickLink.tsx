export function QuickLink(props: {
  href: string;
  title: string;
  text: string;
}) {
  const { href, title, text } = props;

  const quickLink = (
    <div className="quick-link">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-400 mt-2">{text}</p>
      <button>
        <a
          href={href}
          className="text-pong-accent hover:text-pong-secondary transition-colors duration-300"
          data-link
        >
          {title}
        </a>
      </button>
    </div>
  );

  return quickLink;
}
