import { styles } from "@/styles/styles";

export function RemoteLink() {
  return (
    <div>
      <div className="line-divider relative w-full flex items-center justify-center mb-6 min-h-[2.5rem]">
        <i className="fa-solid fa-table-tennis-paddle-ball"></i>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <button
          type="button"
          id="google-signin-btn"
          className={`
    		group relative w-full md:w-[320px] mx-auto
    		px-6 py-4 md:px-8 md:py-5
    		flex items-center justify-center gap-2
    		text-sm lg:text-base font-bold uppercase tracking-wider
    		hover:bg-pong-secondary
    		rounded-xl shadow-md hover:shadow-lg
    		transition-all duration-300 transform active:scale-[0.97]
    		focus:outline-none focus:ring-2 focus:ring-pong-accent focus:ring-offset-2 bg-white text-pong-primary border border-pong-primary/20
            hover:bg-pong-secondary/10 hover:text-pong-accent
          `}
        >
          <i className={`fa-brands fa-google ${styles.primaryButtonIcon}`}></i>
          enter with google
        </button>
        <button
          type="button"
          id="ft-signin-btn"
          className={`
    		group relative w-full md:w-[320px] mx-auto
    		px-6 py-4 md:px-8 md:py-5
    		flex items-center justify-center gap-2
    		text-sm lg:text-base font-bold uppercase tracking-wider
    		rounded-xl shadow-md hover:shadow-lg
    		transition-all duration-300 transform active:scale-[0.97]
    		focus:outline-none focus:ring-2 focus:ring-pong-accent focus:ring-offset-2
            bg-[#2c2c2c] text-white border border-pong-primary/20
            hover:bg-pong-accent hover:text-white
          `}
        >
          <i
            className={`fa-solid fa-chess-knight ${styles.primaryButtonIcon}`}
          ></i>
          enter with 42
        </button>
      </div>
    </div>
  );
}
