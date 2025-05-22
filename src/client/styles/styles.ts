export const styles = {
  primaryButton: `
    flex items-center justify-center gap-2
    w-full px-6 py-4
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

  fadeInSection: "opacity-0 animate-fade-in",
  blurInText: "opacity-0 animate-blur-in",

  heroCallToAction: "flex flex-col items-center gap-2 animate-fade-in",
  heroSubtitle: `
    mt-3 text-base text-pong-primary
    md:text-[clamp(1rem,2vw,1.375rem)]
    animate-blur-in
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

  pageLayoutLight:
    "w-full min-h-screen bg-gradient-to-b from-[#fdfdfc] via-[#faf8f5] to-[#f8f6f2] text-pong-primary px-4 sm:px-6 md:px-8 py-16",

  welcomeContent:
    "flex flex-col items-center justify-between text-center min-h-screen w-full gap-10",

  footerPrimary:
    "text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl text-center text-pong-footer",
};
