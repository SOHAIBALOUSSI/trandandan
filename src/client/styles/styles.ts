import { fontSizes } from "./fontSizes";

export const styles = {
  // === Start Section Layout styles ===
  pageLayoutLight: `
  	relative overflow-hidden
  	w-full min-h-screen
	text-center
	flex flex-col items-center justify-between gap-8
	px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12
	py-6 md:py-10
	text-pong-primary
  `,
  pageLayoutDark: `
  	w-full min-h-screen
  	text-pong-dark-primary
  	bg-gradient-to-b from-[#1b1b1b] via-[#141414] to-[#0a0a0a]
  	relative
  `,
  customSectionStyles: `
  	bg-pong-secondary/5 shadow-[0_8px_30px_rgba(0,0,0,0.15)]
  	rounded-3xl border border-pong-accent/30
  	backdrop-blur-md
  	max-w-xl w-full mx-auto 
  	px-8 py-10 md:py-14
  `,
  pageContent: `
	px-6 md:px-16 pt-20 md:pt-24 pb-8 md:pb-12 
	h-[calc(100vh-2rem)] 
	overflow-y-auto
	flex flex-col items-center gap-6
  `,
  // === End Section Layout styles ===

  // === Start Hero styles ===
  heroTitle: `
	leading-tight
	text-[clamp(2.2rem,6vw,4.5rem)]
	md:text-[clamp(3rem,8vw,7rem)]
	xl:text-[clamp(4rem,10vw,9.25rem)]
	md:leading-[1.1]
	hover:text-pong-secondary
	transition duration-300
  `,
  heroTagline: `
  	mt-4 font-normal
  	text-[clamp(1rem,2.5vw,1.5rem)]
  	xl:text-[clamp(1.25rem,3vw,2.25rem)]
  	text-pong-primary/80
  	after:content-['...']
	font-bold
  `,
  heroSubtitle: `
    mt-2 text-pong-secondary
    md:text-[clamp(1rem,2vw,1.375rem)]
  `,
  heroMascot: `
	w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24
	absolute top-8 right-8 lg:top-10 lg:right-10
	animate-myFloat
  `,
  // === End Hero styles ===

  // === Start Buttons styles ===
  lightPrimaryBtn: `
    group 
	relative 
	w-full md:w-[320px] mx-auto
    px-6 py-4 md:px-8 md:py-5
    flex items-center justify-center gap-2
	${fontSizes.buttonFontSize}
	font-bold capitalize tracking-wider
    text-white bg-pong-accent hover:bg-pong-secondary
    rounded-xl shadow-md hover:shadow-lg
    transition-all duration-300 
	transform active:scale-[0.97]
    focus:outline-none focus:ring-2 
	focus:ring-pong-accent focus:ring-offset-2
  `,
  lightPrimaryBtnIcon: `
	transition-transform duration-300 
	group-hover:-translate-x-1
  `,
  darkPrimaryBtn: `
    inline-block
    ${fontSizes.buttonFontSize}
    font-semibold
    capitalize
    px-6 py-2
    rounded-lg
    bg-pong-accent
    text-white
    transition-all duration-300
    hover:bg-pong-dark-accent
    focus:outline-none
    focus:ring-2 focus:ring-pong-accent/50
    active:scale-[0.98]
	text-center
  `,
  darkSubmitBtn: `
	px-6 py-3
	${fontSizes.buttonFontSize}
	font-semibold
	text-white
	bg-pong-accent
	rounded-xl
	shadow-md
	hover:bg-pong-dark-accent
	hover:shadow-pong-accent/40
	focus:outline-none
	focus:ring-2
	focus:ring-pong-primary/60
	focus:ring-offset-2
	focus:ring-offset-pong-dark
	active:scale-[0.97]
	transition-all duration-300 ease-in-out
	disabled:opacity-50 disabled:cursor-not-allowed
  `,
  // === End Buttons styles ===

  // === Start Input Field styles ===
  InputFieldOne: `
  	normal-case placeholder:capitalize
	input-field
	w-full px-5 py-3.5
	${fontSizes.inputFontSize} 
	font-semibold tracking-wide
	bg-pong-secondary/10
	rounded-xl shadow-inner
	border border-pong-primary/10 focus:border-pong-accent
	placeholder:text-pong-primary/50
	focus:outline-none 
	focus:ring-2 focus:ring-pong-accent focus:ring-offset-2
	focus:bg-white/40
	transition-all duration-300
	backdrop-blur-md
  `,
  inputFieldDark: `
 	w-full text-center tracking-widest font-semibold text-pong-dark-bg 
    bg-gradient-to-br from-white/80 to-white/60 placeholder:text-pong-dark-bg/40 
    rounded-xl border border-pong-accent/30 shadow-inner 
    focus:outline-none focus:ring-2 focus:ring-pong-accent focus:border-transparent 
    transition-all duration-200 ease-in-out px-4 py-3 mb-4 
    ${fontSizes.inputFontSize}
  `,
  selectField: `
  	capitalize
  	w-full px-5 py-3.5
  	${fontSizes.inputFontSize}  
	font-semibold tracking-wide
  	bg-pong-secondary/10
  	rounded-xl shadow-inner 
	border border-pong-primary/10 focus:border-pong-accent
  	appearance-none
  	focus:outline-none 
	focus:ring-2 focus:ring-pong-accent focus:ring-offset-2
  	focus:bg-white/40
  	transition-all duration-300
  	relative z-10
  `,
  otpInputStyle: `
  	w-10 h-12 md:w-14 md:h-16
  	${fontSizes.inputFontSize}
	text-center font-bold tracking-widest
  	border border-pong-secondary/30
  	rounded-2xl shadow-md
  	caret-pong-accent
  	bg-white/60 backdrop-blur
  	text-pong-primary placeholder:text-pong-primary/30
  	transition-all duration-300 ease-out focus:scale-105
  	focus:outline-none focus:ring-2 focus:ring-pong-accent/70 focus:border-pong-accent
  	focus:shadow-lg
  `,
  showPassIcon: `
	fa-solid fa-eye fa-eye-slash 
	show-pass text-sm 
	absolute top-1/2 right-3
	transform -translate-y-1/2 
	cursor-pointer 
	text-pong-highlight hover:text-pong-primary 
	transition
  `,
  // === End Input Field styles ===

  // === Start Form styles ===
  mainForm: `
  	max-w-md w-full mx-auto
  	bg-gradient-to-br from-pong-secondary/20 via-pong-bg/50 to-pong-accent/10
  	shadow-2xl rounded-3xl
  	backdrop-blur-sm border border-pong-accent/20
  	flex flex-col items-center gap-6
  	px-8 py-12
	animate-fadeInUp
  `,
  secForm: `
  	w-full max-w-md mx-auto
  	bg-pong-bg/70 shadow-md rounded-2xl
  	flex flex-col items-center gap-6
  	px-8 py-12
  	backdrop-blur-md
  	border border-pong-accent/20
  `,
  customFormLink: `
	text-pong-accent 
	underline underline-offset-2 
	hover:text-pong-secondary hover:underline-offset-4 
	transition-all duration-300
  `,
  darkForm: `
  	w-full max-w-lg 
	bg-pong-dark-custom/80 
	border border-pong-accent/30 
	rounded-2xl 
	shadow-lg 
	px-8 py-10 
	flex flex-col items-center
  `,
  // === End Form styles ===

  // === Start Title Dark styles ===
  titleDark: `
	tracking-tight leading-tight
	font-bold
	text-4xl md:text-5xl lg:text-6xl xl:text-7xl
  `,
  titleSpanDark: `
	font-playfair 
	text-pong-accent 
	relative inline-block 
	underline-animated
  `,
  subtitleDark: `
	font-semibold 
	text-xl md:text-2xl lg:text-3xl xl:text-4xl
  `,
  subtitleParagraphDark: `
	text-pong-primary/80 
	leading-relaxed
	text-base md:text-lg lg:text-xl xl:text-2xl
  `,
  // === End Title Dark styles ===

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

  // === Start Nav Bar styles ===
  navToggleBtn: `
  	fixed top-2 left-4 z-50 text-2xl text-pong-dark-accent bg-transparent rounded-lg p-2 
    hover:bg-pong-dark-accent/20 transition duration-300 md:hidden
    focus:outline-none focus:ring-2 focus:ring-pong-dark-accent
  `,
  backdrop: `
  	fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 opacity-0 pointer-events-none md:hidden
  `,
  navBarContainer: `
    fixed top-0 left-0 h-full w-64 bg-black/90 z-50 
    transform transition-transform duration-300 ease-in-out -translate-x-full
    flex flex-col gap-10 px-6 py-10
    md:w-64 md:rounded-tr-3xl md:rounded-br-3xl md:shadow-2xl 
    md:border-r-2 md:border-pong-dark-accent/40 md:-translate-x-[90%] 
    md:items-center
    md:hover:translate-x-0 md:transition-all md:duration-300 md:ease-in-out
  `,
  navSettingsBtn: `
    relative flex items-center gap-3 font-semibold px-3 py-2 rounded-xl transition duration-300
    text-pong-dark-primary hover:bg-pong-dark-accent/20 hover:text-white
    md:flex-col md:gap-2 md:text-sm md:px-0 md:py-0 md:w-full md:bg-transparent
    md:hover:bg-transparent md:hover:text-pong-dark-accent
    group w-full
    focus:outline-none focus:ring-2 focus:ring-pong-dark-accent 
  `,
  navSettingsDropdown: `
    absolute left-0 top-full w-[90vw] max-w-xs md:left-full md:top-0 md:ml-2 md:w-60
    bg-black rounded-xl shadow-2xl z-50 flex flex-col gap-1
    p-3 border border-pong-dark-accent/20 hidden
    transition-all duration-200 
  `,
  navLink: `
	relative flex items-center gap-3 font-semibold px-3 py-2 rounded-xl transition duration-300
    hover:bg-pong-dark-accent/20 hover:text-white
    md:flex-col md:gap-2 md:text-sm md:px-0 md:py-0 md:w-full md:bg-transparent
    md:hover:bg-transparent md:hover:text-pong-dark-accent
    group
  `,

  // === Start Custom Cards styles ===
  cardOneStyle: `
  	flex flex-col gap-6
	bg-pong-dark-custom border border-pong-dark-highlight/30 
	w-full max-w-5xl 
	p-8 md:p-10 
	rounded-2xl 
	shadow-lg
  `,
  badgeStyle: `
	inline-flex items-center 
	gap-2 px-4 py-1.5 
	rounded-full 
	shadow-md 
	bg-pong-custom
	backdrop-blur 
	text-white font-semibold
	text-sm 
	border border-white/10 
	animate-glow
  `,
  // === End Custom Cards styles ===

  //   === Start Custom List styles ===
  listStyle: `
  	flex items-start gap-3 
	hover:bg-pong-dark-highlight/10 
	p-3 
	rounded-md 
	transition-all
  `,
};
