export const styles = {
  //    Start Primary Button styles
  primaryButton: `
    flex items-center justify-center gap-2
    w-full mx-auto px-6 py-4
    text-sm font-semibold text-white
    bg-pong-accent hover:bg-pong-secondary
    rounded-md capitalize
    cursor-pointer transform active:scale-[0.97]
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-pong-primary focus:ring-offset-2
    md:w-[320px] md:text-base md:px-8 md:py-5
    lg:text-lg xl:text-xl
  `,
  primaryButtonIcon: `
    transition-transform duration-300
    group-hover:-translate-x-1
  `,
  //    End Primary Button styles

  //    Start Input Field styles
  inputField: `
	normal-case
	w-full px-4 py-3
	text-sm font-semibold text-pong-primary
	bg-pong-secondary/10
	rounded-md
	placeholder:text-pong-primary/50 placeholder:capitalize
	transition-all duration-300
	focus:outline-none focus:ring-2 focus:ring-pong-primary focus:ring-offset-2
	focus:bg-pong-secondary/20
	disabled:bg-pong-secondary/5
	disabled:text-pong-primary/30
	disabled:placeholder:text-pong-primary/30
	disabled:cursor-not-allowed
	disabled:transition-none
	disabled:focus:ring-0
	disabled:focus:bg-pong-secondary/5
	disabled:focus:ring-offset-0
	disabled:focus:outline-none
	disabled:cursor-not-allowed
	disabled:transition-none
	`,
  //    End Input Field styles

  //    Start Form styles
  form: `
	max-w-md w-full mx-auto	
	bg-white/90 shadow-xl rounded-2xl
	backdrop-blur
	flex flex-col text-center align-center justify-center gap-6
	px-6 py-10
	transition-all duration-300
	peer
	peer-focus-within:bg-white/90
	peer-focus-within:shadow-2xl
	peer-focus-within:backdrop-blur
	peer-focus-within:shadow-pong-primary/50
	peer-focus-within:shadow-2xl
	peer-focus-within:rounded-2xl
	peer-focus-within:backdrop-blur
	peer-focus-within:transition-all
	peer-focus-within:duration-300
	peer-focus-within:transform
	peer-focus-within:scale-105
	peer-focus-within:translate-x-0
	`,
  formMessageError: `
  	mb-2
	text-pong-error
	text-sm md:text-md lg:text-lg xl:text-xl
	font-semibold
	`,
  //    End Form styles

  //   Start Animation styles
  fadeInSection: "opacity-0 animate-fade-in",
  blurInText: "opacity-0 animate-blur-in",
  //   End Animation styles

  heroCallToAction: "flex flex-col items-center gap-2 animate-fade-in",
  heroSubtitle: `
    mt-3 text-base text-pong-primary
    md:text-[clamp(1rem,2vw,1.375rem)]
    animate-blur-in
	italic text-pong-secondary
  `,
  heroTitleContainer: "w-full max-w-screen-xl text-center animate-fade-in",
  heroTitle: `
    uppercase leading-tight
    text-[2.3rem]
    md:text-[clamp(2.5rem,6vw,6rem)]
    xl:text-[9.25rem]
    md:leading-[1.2]
    transition duration-300 hover:text-pong-secondary
  `,
  heroTagline: `
    mt-4 font-normal text-base
    md:text-[clamp(1rem,2vw,1.5rem)]
    xl:text-[2rem]
    text-pong-primary/80
  `,

  //   Start Page Layout styles
  pageLayoutLight:
    "w-full min-h-screen bg-gradient-to-b from-[#fdfdfc] via-[#faf8f5] to-[#f8f6f2] text-pong-primary px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8 lg:py-12 xl:py-16 flex flex-col items-center justify-between min-h-screen w-full gap-10",
  pageLayoutDark:
    "w-full min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#0d0d0d] to-[#000000] text-pong-primary px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8 lg:py-12 xl:py-16",
  //   End Page Layout styles

  //    Start Title Section styles
  titleDark:
    "mb-8 text-pong-primary text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
  titleLight:
    "mb-8 text-pong-dark-primary text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
  titleSpanDark: "font-playfair text-pong-accent",
  titleSpanLight: "font-playfair text-pong-dark-accent",
  subtitleDark:
    "flex flex-col align-center text-pong-primary font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl",
  subtitleLight:
    "flex flex-col align-center text-pong-dark-primary font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl",
  subtitleParagraphDark:
    "font-lora text-pong-primary/80 font-normal text-sm md:text-md lg:text-lg xl:text-xl",
  subtitleParagraphLight:
    "font-lora text-pong-dark-primary/80 font-normal text-sm md:text-md lg:text-lg xl:text-xl",
  //    End Title Section styles

};
