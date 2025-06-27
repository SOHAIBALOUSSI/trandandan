import { styles } from "@/styles/styles";

export function OtpInput(props: { id: string }) {
  const inputStyles = `
  	w-10 h-12 md:w-14 md:h-16
  	text-lg md:text-2xl text-center font-bold tracking-widest
  	border border-pong-secondary/30
  	rounded-2xl shadow-md
  	caret-pong-accent
  	bg-white/60 backdrop-blur
  	text-pong-primary placeholder:text-pong-primary/30
  	transition-all duration-300 ease-out focus:scale-105
  	focus:outline-none focus:ring-2 focus:ring-pong-accent/70 focus:border-pong-accent
  	focus:shadow-lg
  `;

  return (
    <div id={props.id} className="flex justify-center gap-3 md:gap-4 w-full">
      {[...Array(6)].map((i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className={inputStyles}
        />
      ))}
    </div>
  );
}
