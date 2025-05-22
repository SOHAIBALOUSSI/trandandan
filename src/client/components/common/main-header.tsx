import { styles } from "@/styles/styles";

export function MainHeader(props: {
  isDark: boolean;
  title: string;
  titleSpan: string;
  subtitle: string;
  subtitleParagraph: string;
}) {
  return (
    <div className="mb-2 flex flex-col items-center text-center">
      <h1 className={props.isDark ? styles.titleDark : styles.titleLight}>
        {props.title}{" "}
        <span
          className={
            props.isDark ? styles.titleSpanDark : styles.titleSpanLight
          }
        >
          {props.titleSpan}
        </span>
      </h1>
      <h2 className={props.isDark ? styles.subtitleDark : styles.subtitleLight}>
        {props.subtitle}
        <span
          className={
            props.isDark
              ? styles.subtitleParagraphDark
              : styles.subtitleParagraphLight
          }
        >
          {props.subtitleParagraph}
        </span>
      </h2>
    </div>
  );
}
