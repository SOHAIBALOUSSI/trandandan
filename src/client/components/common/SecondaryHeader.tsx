import { fontSizes } from "@/styles/fontSizes";

export function SecondaryHeader(props: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-10">
      <h1
        className={`${fontSizes.titleFontSize} font-bold text-white tracking-tight mb-4`}
      >
        {props.title}
      </h1>
      <p className={`text-white/70 mt-2 ${fontSizes.subtitleFontSize}`}>
        {props.subtitle}
      </p>
      <div className="mx-auto mt-3 w-16 h-1 bg-pong-dark-accent rounded-full" />
    </div>
  );
}
