import { styles } from "@/styles/styles";

export function MainHeader(props: {
  isDark: boolean;
  title: string;
  titleSpan: string;
  subtitle?: string;
  subtitleParagraph?: string;
}) {
  const { title, titleSpan, subtitle, subtitleParagraph } = props;
  const titleStyles = props.isDark ? styles.titleDark : styles.titleLight;
  const subtitleStyles = props.isDark ? styles.subtitleDark : "hidden";

  const header = (
    <div className="flex flex-col text-center">
      <h1 className={titleStyles}>
        {title}{" "}
        <span
          className={
            props.isDark ? styles.titleSpanDark : styles.titleSpanLight
          }
        >
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
  return header;
}
