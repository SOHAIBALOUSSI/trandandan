export const styles = {
  // === Start Page Layout styles ===
  pageLayoutLight: `
  	relative overflow-hidden
  	w-full min-h-screen 
	text-center
	flex flex-col items-center justify-between gap-8
	px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 
	py-8 lg:py-12 xl:py-16 
	text-pong-primary
	bg-gradient-to-b from-[#fdfdfc] via-[#faf8f5] to-[#f8f6f2] 
  `,
  pageLayoutDark: `
  	w-full min-h-screen
  	text-pong-dark-primary
  	bg-gradient-to-b from-[#1b1b1b] via-[#141414] to-[#0a0a0a]
  	relative
  `,
  // === End Page Layout styles ===

  // === Start Hero styles ===
  heroTitleContainer: `
  	w-full max-w-screen-xl 
	animate-fade-in
  `,
  heroTitle: `
	leading-tight
	text-[clamp(2.2rem,6vw,4.5rem)]
	md:text-[clamp(3rem,8vw,7rem)]
	xl:text-[clamp(4rem,10vw,9.25rem)]
	md:leading-[1.1]
	transition duration-300 hover:text-pong-secondary
  `,
  heroTagline: `
  	mt-4 font-normal
  	text-[clamp(1rem,2.5vw,1.5rem)]
  	xl:text-[clamp(1.25rem,3vw,2.25rem)]
  	text-pong-primary/80
  	after:content-['...']
  `,
  heroCallToAction: `
  	flex flex-col items-center gap-2 
	animate-fade-in
  `,
  heroSubtitle: `
    mt-2 text-pong-secondary
    md:text-[clamp(1rem,2vw,1.375rem)]
  `,
  // === End Hero styles ===

  // === Start Primary Button styles ===
  primaryButton: `
    group
    flex items-center justify-center gap-2
    w-full md:w-[320px] mx-auto px-6 py-4 md:px-8 md:py-5
    text-sm lg:text-base font-semibold text-white
    bg-pong-accent hover:bg-pong-secondary
    rounded-md
	capitalize
    cursor-pointer transform active:scale-[0.97]
    transition-all duration-300
	hover:shadow-lg
	relative
    focus:outline-none focus:ring-2 focus:ring-pong-primary focus:ring-offset-2
  `,
  primaryButtonIcon: `
    transition-transform duration-300
    group-hover:-translate-x-1
  `,
  // === End Primary Button styles ===

  // === Start Input Field styles ===
  inputField: `
  	capitalize
  	input-field
	normal-case
	w-full px-4 py-3
	text-sm lg:text-base font-semibold
	bg-pong-secondary/10
	rounded-md
	caret-inherit
	placeholder:text-pong-primary/50 placeholder:capitalize
	transition-all duration-300
	focus:outline-none focus:ring-2 focus:ring-pong-primary focus:ring-offset-2
	focus:bg-pong-secondary/20
  `,
  // === End Input Field styles ===

  // === Start Form styles ===
  form: `
	max-w-md w-full mx-auto	
	bg-white/90 shadow-xl rounded-2xl
	backdrop-blur
	flex flex-col text-center align-center justify-center gap-6
	px-6 py-10
  `,
  formMessage: `
  	text-center text-sm font-semibold min-h-[1.5rem]
  	transition-opacity duration-300 ease-in-out
  `,
  // === End Form styles ===

  // === Start Main Header styles ===
  titleDark: `
  	capitalize
    mb-8
	text-pong-primary 
	text-2xl md:text-3xl lg:text-4xl xl:text-5xl
  `,
  titleLight: `
  	capitalize
  	mb-8 
	text-pong-dark-primary
	text-2xl md:text-3xl lg:text-4xl xl:text-5xl
  `,
  titleSpanDark: `
  	font-playfair
	text-pong-accent
	relative
	before:absolute before:w-full before:h-[3px] 
	before:bg-pong-accent before:rounded-md 
	before:bottom-[4px] before:left-0 
	before:scale-x-0 before:transition-transform before:duration-300 
	hover:before:scale-x-100
  `,
  titleSpanLight: `
  	font-playfair 
	text-pong-dark-accent
	relative
	before:absolute before:w-full before:h-[2px] 
	before:bg-pong-dark-accent before:rounded-md 
	before:bottom-0 before:left-0 
	before:scale-x-0 before:transition-transform before:duration-300 
	hover:before:scale-x-100
  `,
  subtitleDark: `
  	flex flex-col font-semibold 
	text-lg md:text-xl lg:text-2xl xl:text-3xl
  `,
  subtitleParagraphDark: `
  	text-pong-primary/80 
	font-normal 
	text-sm md:text-base lg:text-lg xl:text-xl
  `,
  // === End Main Header styles ===

  // === Start Animation styles ===
  fadeInSection: `
  	opacity-0 
	animate-fade-in
  `,
  blurInText: `
  	opacity-0 
	animate-blur-in
  `,
  // === End Animation styles ===

  // === Start Top Bar styles ===
  navBarStyle: `
    fixed top-0 left-0 right-0 z-40 
	h-16 bg-transparent backdrop-blur-md border-b border-pong-dark-accent/30 
	px-4
	flex items-center justify-center gap-8 
	shadow-md
  `,
  searchBarStyle: `
  	input-field-dark
	bg-pong-dark-primary/10 text-white placeholder:text-pong-dark-primary/70
	px-4 py-2 rounded-lg outline-none  
	focus:ring-2 focus:ring-pong-dark-accent 
	w-full max-w-md
	placeholder:text-xs placeholder:lg:text-base
	text-sm lg:text-base
	normal-case 
	ml-14 md:ml-0
  `,
  // === End Top Bar styles ===

  // === Start Reset password section styles ===
  resetSectionStyles: `
    bg-white/95 shadow-2xl rounded-2xl border border-pong-accent/20
    max-w-lg w-full mx-auto p-8 flex flex-col items-center
  `,
  // === End Reset password section styles ===

  // === Start Button Primary styles ===
  btnOneStyles: `
	flex items-center justify-center 
	px-6 py-4 
	text-sm lg:text-base 
	font-semibold text-white 
	bg-pong-dark-accent hover:bg-pong-dark-secondary 
	rounded-md capitalize 
	cursor-pointer 
	transform active:scale-[0.97] 
	transition-all duration-300 hover:shadow-lg 
	focus:outline-none focus:ring-2 focus:ring-pong-primary focus:ring-offset-2 
  `,
  // === End Button Primary styles ===

  //   Start Button Secondary styles  //
  //   End Button Secondary styles  //
};
