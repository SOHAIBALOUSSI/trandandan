import { styles } from "@/styles/styles";

export function OtpInput() {
  const inputStyles = `
	  w-8 h-10 md:w-12 md:h-14 
	  text-sm md:text-xl text-center font-bold
	  border border-pong-secondary/30
	  rounded-xl shadow-sm
	  caret-pong-accent
	  bg-white/70
	  text-pong-primary
	  transition-all duration-300
	  focus:outline-none focus:ring-1 focus:ring-pong-accent focus:border-pong-accent
	`;

  return (
    <div id="inputs" className="flex justify-center gap-3 md:gap-4 w-full">
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
