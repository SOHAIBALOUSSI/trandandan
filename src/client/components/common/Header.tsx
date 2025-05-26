import { styles } from "@/styles/styles";

export function MainHeader(props: {
  isDark: boolean;
  title: string;
  titleSpan: string;
  subtitle: string;
  subtitleParagraph: string;
}) {
  return (
    <div className="flex flex-col text-center">
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
      <h2 className={styles.subtitleDark}>
        {props.subtitle}
        <span className={styles.subtitleParagraphDark}>
          {props.subtitleParagraph}
        </span>
      </h2>
    </div>
  );
}
