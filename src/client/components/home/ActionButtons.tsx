import { styles } from "@/styles/styles";

export function ActionButtons() {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      <button className="capitalize bg-pong-accent text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-pong-secondary transition">
        commence a duel
      </button>
      <button className="capitalize bg-pong-secondary text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-pong-accent transition">
        join the grand tourney
      </button>
      <button className="capitalize bg-pong-highlight text-pong-primary px-6 py-3 rounded-lg font-bold shadow hover:bg-pong-accent/80 transition">
        invite friend
      </button>
      <button className="capitalize bg-pong-dark-accent text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-pong-accent transition">
        hall of champions
      </button>
    </div>
  );
}
