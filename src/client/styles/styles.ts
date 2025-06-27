import { fontSizes } from "./fontSizes";

export const styles = {
  // === Start Page Layout styles ===
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
  // === End Page Layout styles ===

  // === Start Custom Sections styles ===
  customSectionStyles: `
  	bg-pong-secondary/5 shadow-[0_8px_30px_rgba(0,0,0,0.15)]
  	rounded-3xl border border-pong-accent/30
  	backdrop-blur-md
  	max-w-xl w-full mx-auto 
  	px-8 py-10 md:py-14
  `,
  customForm: `
  	flex flex-col gap-6
  	w-full max-w-md mx-auto
  	bg-pong-bg/70 shadow-xl rounded-2xl
  	px-6 py-10
  	backdrop-blur-md
  	border border-pong-accent/20
  `,
  // === End Custom Sections styles ===

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
	absolute top-6 right-6 md:top-8 md:right-8 lg:top-10 lg:right-10
	animate-float
  `,
  // === End Hero styles ===

  // === Start Primary Button styles ===
  primaryButton: `
    group 
	relative 
	w-full md:w-[320px] mx-auto
    px-6 py-4 md:px-8 md:py-5
    flex items-center justify-center gap-2
	${fontSizes.buttonFontSize}
	font-bold capitalize tracking-wider
    text-white bg-pong-accent hover:bg-pong-secondary
    rounded-xl shadow-md hover:shadow-lg
    transition-all duration-300 transform active:scale-[0.97]
    focus:outline-none focus:ring-2 focus:ring-pong-accent focus:ring-offset-2
  `,
  primaryButtonIcon: `
	transition-transform duration-300 
	group-hover:-translate-x-1
  `,
  // === End Primary Button styles ===

  // === Start Input Field styles ===
  mainInputFieldStyles: `
  	normal-case
	input-field
	w-full px-5 py-3.5
	${fontSizes.buttonFontSize} 
	font-semibold tracking-wide
	text-pong-primary bg-pong-secondary/10
	rounded-xl shadow-inner
	border border-pong-primary/10 focus:border-pong-accent
	placeholder:text-pong-primary/50
	placeholder:capitalize
	focus:outline-none focus:ring-2 focus:ring-pong-accent focus:ring-offset-2
	focus:bg-white/40
	transition-all duration-300
	backdrop-blur-md
  `,
  customSelect: `
  	w-full px-4 py-3 pr-10
  	${fontSizes.buttonFontSize}  
	font-semibold
  	bg-pong-secondary/10
  	capitalize text-pong-primary
  	rounded-md border border-pong-primary/10
  	appearance-none
  	transition-all duration-300
  	focus:outline-none focus:ring-2 focus:ring-pong-primary focus:ring-offset-2
  	focus:bg-pong-secondary/20
  	relative z-10
  `,
  otpInputStyle: `
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
  `,
  // === End Input Field styles ===

  // === Start Form styles ===
  form: `
  	max-w-md w-full mx-auto
  	bg-gradient-to-br from-pong-secondary/20 via-pong-bg/50 to-pong-accent/10
  	shadow-2xl rounded-3xl
  	backdrop-blur-sm border border-pong-accent/20
  	flex flex-col items-center gap-6
  	px-8 py-12
  `,
  // === End Form styles ===

  // === Start Main Header styles ===
  titleDark: `
	tracking-tight leading-tight
	${fontSizes.titleFontSize}
  `,
  titleSpanDark: `
	font-playfair 
	text-pong-accent 
	relative inline-block 
	underline-animated
  `,
  subtitleDark: `
	font-semibold 
	${fontSizes.subtitleFontSize}
  `,
  subtitleParagraphDark: `
	text-pong-primary/80 
	leading-relaxed
	${fontSizes.bodyFontSize}
  `,
  // === End Main Header styles ===

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

  // === Start Page Content styles ===
  pageContent: `
	px-12 md:px-20 pt-20 md:pt-26 
	h-[calc(100vh-2rem)] 
	overflow-y-auto
	flex flex-col items-center gap-6
  `,
  // === End Page Content styles ===

  // === Start Custom Links styles ===
  customFormLink: `
	text-pong-accent 
	underline underline-offset-2 
	hover:text-pong-secondary hover:underline-offset-4 
	transition-all duration-300
  `,
  customBtnLink: `
	inline-block 
	px-6 py-2 
	bg-pong-accent 
	hover:bg-pong-dark-accent 
	text-white 
	rounded-lg shadow 
	transition-colors duration-200 
	${fontSizes.buttonFontSize} 
	font-semibold
  `,
  // === End Custom Links styles ===

  // === Start Custom Cards styles ===
  settingsLayout: `
  	bg-pong-dark-bg 
	border border-pong-accent/30 rounded-3xl 
	shadow-2xl 
	w-full max-w-3xl 
	p-8 md:p-10 
	my-4 mx-auto
  `,
  enabledStyle: `
	ml-2 px-2 py-1 
	text-xs font-bold 
	rounded-full 
	bg-pong-success/10 
	text-pong-success/90
  `,
  disabledStyle: `
	ml-2 px-2 py-1 
	text-xs font-bold 
	rounded-full 
	bg-pong-error/10 
	text-pong-error/90
  `,
  primaryStyle: `
	ml-2 px-2 py-1 
	text-xs font-bold 
	rounded-full 
	bg-pong-primary/30 
	text-pong-dark-accent 
  `,
};
