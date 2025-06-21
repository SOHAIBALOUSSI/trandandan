import { styles } from "@/styles/styles";

export function MainHeader(props: {
  isDark: boolean;
  title: string;
  titleSpan: string;
  subtitle?: string;
  subtitleParagraph?: string;
}) {
  const { isDark, title, titleSpan, subtitle, subtitleParagraph } = props;
  const titleStyles = isDark ? styles.titleDark : styles.titleLight;
  const subtitleStyles = isDark ? styles.subtitleDark : "hidden";

  return (
    <div className="flex flex-col text-center pt-2 md:pt-0">
      <h1 className={titleStyles}>
        {title}{" "}
        <span className={isDark ? styles.titleSpanDark : styles.titleSpanLight}>
          {titleSpan}
        </span>
      </h1>
      <h2 className={subtitleStyles}>
        {subtitle}
        <span className={styles.subtitleParagraphDark}>
          {subtitleParagraph}
        </span>
      </h2>
    </div>
  );
}
