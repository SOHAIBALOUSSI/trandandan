import { styles } from "@/styles/styles";
import { displayToast } from "@/utils/display-toast";
import { initGameThemeToggle } from "@/utils/game-theme-toggle";
import { navigateTo } from "@/utils/navigate-to-link";

interface GameStateLocal {
  paddleLeftY: number;
  paddelRightY: number;
  ballX: number;
  ballY: number;
  keypressd: string[];
  rightPlayerScore: number;
  leftPlayerScore: number;
  flagX: boolean;
  flagY: boolean;
  ballSpeed: number;
  count: number;
}

interface FlowFieldDependencies {
  rightPlayerScoreLocal: HTMLElement;
  leftPlayerScoreLocal: HTMLElement;
  gameTab: HTMLElement;
  result: HTMLElement;
  restart: HTMLElement;
  Players: string[];
  Winners: string[];
  prevMatch: HTMLElement;
  currentMatch: HTMLElement;
  nextMatch: HTMLElement;
  resultTab: HTMLElement;
  resultStat: HTMLElement;
  restartTournoi: HTMLElement;
  socketLocal: WebSocket;
  start: HTMLElement;
}

export function Tournaments() {
  setTimeout(() => {
    initGameThemeToggle();
  }, 0);

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  const canvasWidth = Math.min(1000, vw * 0.95);
  const canvasHeight = Math.min(600, vh * 0.7);

  const container = document.createElement("div");
  container.className = styles.gameContainer;
  container.id = "game-screen";
  container.dataset.theme = localStorage.getItem("gameTheme") || "dark";
  container.innerHTML = `
    <button id="exit" class="${styles.gameExitBtn} group" title="Exit Lounge">
      <i class="fa-solid fa-arrow-left"></i>
      <span class="absolute text-xs bg-black/80 text-white px-2 py-0.5 rounded left-1/2 -translate-x-1/2 top-full mt-1 opacity-0 group-hover:opacity-100 transition">
        Leave Lounge
      </span>
    </button>
    <button id="game-theme-toggle" class="${styles.gameThemeBtn} group" title="Switch Theme">
      <i class="fa-solid fa-circle-half-stroke"></i>
    </button>
    <h1 id="title" class="${styles.gameTitle}">
      BHV <span class="text-pong-dark-accent font-orbitron">PONG</span>
    </h1>
    <div class="flex items-center justify-center flex-col w-full" style="min-height:${canvasHeight}px;">
      <div class="score flex justify-center gap-20 md:gap-60 w-full mb-4 transition-all duration-300">
        <span id="leftPlayerScoreLocal" class="text-3xl md:text-5xl font-semibold font-orbitron">0</span>
        <span id="rightPlayerScoreLocal" class="text-3xl md:text-5xl font-semibold font-orbitron">0</span>
      </div>
      <div class="flex justify-center w-full pb-8">
        <canvas class="${styles.gameCanvas}" id="canvas" width=${canvasWidth} height=${canvasHeight}></canvas>
      </div>
    </div>
    <div id="gameTab" class="${styles.gameTab} game-tab p-6 rounded-2xl border transition-all duration-300 shadow-xl space-y-4 hidden">
      <h2 id="result" class="text-3xl font-bold tracking-tight text-center">Victory Board</h2>
      <div class="flex flex-col gap-3 text-base md:text-lg text-center font-medium">
        <h3 id="currentMatch" class="py-2 px-4 rounded-lg shadow-md">Current Challenge</h3>
        <h3 id="prevMatch" class="py-2 px-4 rounded-lg shadow-md hidden">Previous Duel</h3>
        <h3 id="nextMatch" class="py-2 px-4 rounded-lg shadow-md hidden">Next Face-off</h3>
      </div>
      <div class="flex justify-center gap-4 mt-6">
        <button id="restart" class="hidden game-btn font-semibold py-3 px-8 rounded-xl text-md md:text-lg shadow-md tracking-wide transition-all duration-300 text-white bg-pong-sport-accent hover:bg-pong-sport-primary dark:bg-pong-dark-secondary dark:hover:bg-pong-dark-accent">Play Again</button>
        <button id="start" class="game-btn font-semibold py-3 px-8 rounded-xl text-md md:text-lg shadow-md tracking-wide transition-all duration-300 text-white bg-pong-sport-accent hover:bg-pong-sport-primary dark:bg-pong-dark-accent dark:hover:bg-pong-dark-secondary">Start Game</button>
      </div>
    </div>
    <div id="resultTab" class="game-tab h-80 w-150 bg-pong-dark-bg border-2 border-pong-dark-secondary rounded-2xl absolute top-1/2 left-1/2 translate-y-[-20%] translate-x-[-50%] z-20 hidden">
      <div class="flex flex-col items-center justify-center h-full px-20 gap-6">
        <h2 id="resultStat" class="text-2xl font-bold">Champion Crowned!</h2>
        <button id="restartTournoi" class="game-btn text-white font-bold py-3 px-8 rounded-xl text-lg md:text-xl shadow-md tracking-wide transition-all duration-300">Play Again</button>
      </div>
    </div>
    <div id="tourTab" class="${styles.gameTab} game-tab">
      <div id="selectTab" class="flex flex-col items-center justify-center h-full gap-6">
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight">Choose Your Arena Size</h2>
        <div id="tournPlayerNumber" class="flex items-center justify-center gap-20">
          <button id="eight_players" class="game-btn text-white font-bold py-3 px-8 rounded-xl text-lg md:text-xl shadow-md tracking-wide transition-all duration-300">8 Players</button>
          <button id="four_Players" class="game-btn text-white font-bold py-3 px-8 rounded-xl text-lg md:text-xl shadow-md tracking-wide transition-all duration-300">4 Players</button>
        </div>
      </div>
      <div id="inputPlayers" class="h-full hidden">
        <div class="flex flex-col items-center justify-center gap-6">
          <h2 class="text-3xl md:text-4xl font-bold mb-2 tracking-tight text-center">Enter Challenger Usernames</h2>
          <div class="flex items-center justify-center gap-6">
            <input type="text" id="playerIdField" pattern="[a-zA-Z0-9]+" placeholder="Username" class="focus:outline-none normal-case placeholder:capitalize text-md rounded-lg p-3 placeholder-pong-sport-muted" maxlength="15" />
            <button id="addPlayerBtn" class="capitalize game-btn text-white font-bold py-3 px-8 rounded-xl text-md shadow-md tracking-wide transition-all duration-300">Add Player</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const canvas = container.querySelector("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const rightPlayerScoreLocal = container.querySelector(
    "#rightPlayerScoreLocal"
  ) as HTMLElement;
  const leftPlayerScoreLocal = container.querySelector(
    "#leftPlayerScoreLocal"
  ) as HTMLElement;
  const gameTab = container.querySelector("#gameTab") as HTMLElement;
  const result = container.querySelector("#result") as HTMLElement;
  const restart = container.querySelector("#restart") as HTMLElement;
  const players8 = container.querySelector("#eight_players") as HTMLElement;
  const players4 = container.querySelector("#four_Players") as HTMLElement;
  const selectTab = container.querySelector("#selectTab") as HTMLElement;
  const inputPlayers = container.querySelector("#inputPlayers") as HTMLElement;
  const playerIdField = container.querySelector(
    "#playerIdField"
  ) as HTMLInputElement;
  const addPlayerBtn = container.querySelector("#addPlayerBtn") as HTMLElement;
  const tourTab = container.querySelector("#tourTab") as HTMLElement;
  const prevMatch = container.querySelector("#prevMatch") as HTMLElement;
  const currentMatch = container.querySelector("#currentMatch") as HTMLElement;
  const nextMatch = container.querySelector("#nextMatch") as HTMLElement;
  const resultTab = container.querySelector("#resultTab") as HTMLElement;
  const resultStat = container.querySelector("#resultStat") as HTMLElement;
  const restartTournoi = container.querySelector(
    "#restartTournoi"
  ) as HTMLElement;
  const start = container.querySelector("#start") as HTMLElement;
  const exit = container.querySelector("#exit") as HTMLElement;

  let numberOfPlayers = 0;
  let socketLocal: WebSocket;
  const Players: string[] = [];
  const Winners: string[] = [];

  exit.addEventListener("click", () => {
    navigateTo("/arena");
  });

  window.addEventListener("resize", () => {
    const newVw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const newVh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    canvas.width = Math.min(1000, newVw * 0.95);
    canvas.height = Math.min(600, newVh * 0.7);
  });

  function init() {
    socketLocal = new WebSocket("wss://localhost:9090/game/ws");
    const keys: { [key: string]: boolean } = {};

    window.addEventListener("keydown", (event: KeyboardEvent) => {
      keys[event.key] = true;
    });
    window.addEventListener("keyup", (event: KeyboardEvent) => {
      keys[event.key] = false;
    });

    const flow = new FlowFieldLocal(ctx, keys, {
      rightPlayerScoreLocal,
      leftPlayerScoreLocal,
      gameTab,
      result,
      restart,
      Players,
      Winners,
      prevMatch,
      currentMatch,
      nextMatch,
      resultTab,
      resultStat,
      restartTournoi,
      socketLocal,
      start,
    });

    players4.addEventListener("click", () => {
      selectTab.style.display = "none";
      inputPlayers.style.display = "block";
      numberOfPlayers = 4;
    });
    players8.addEventListener("click", () => {
      selectTab.style.display = "none";
      inputPlayers.style.display = "flex";
      numberOfPlayers = 8;
    });

    addPlayerBtn.addEventListener("click", () => {
      if (!playerIdField.checkValidity()) {
        displayToast("Invalid username!", "error");
        playerIdField.value = "";
        playerIdField.focus();
        return;
      }
      if (Players.includes(playerIdField.value)) {
        displayToast("Player already exists!", "error");
        playerIdField.value = "";
        playerIdField.focus();
        return;
      }
      Players.push(playerIdField.value);
      playerIdField.value = "";

      if (Players.length === numberOfPlayers) {
        inputPlayers.style.display = "none";
        tourTab.style.display = "none";
        gameTab.style.display = "flex";
        currentMatch.textContent = `${Players[0]} vs ${Players[1]}`;
        if (Players.length > 2) {
          nextMatch.textContent = `NEXT MATCH: ${Players[2]} vs ${Players[3]}`;
        }

        start.addEventListener("click", () => {
          start.style.display = "none";
          restart.style.display = "flex";
          gameTab.style.display = "none";
          flow.animate();
        });
      }
    });

    socketLocal.onmessage = (event: MessageEvent) => {
      flow.updateGameState(event.data);
    };
    socketLocal.onclose = () => {
      console.log("[client] Disconnected from server");
    };
    socketLocal.onerror = (err: Event) => {
      console.error("[client] WebSocket error:", err);
    };
  }

  init();
  return container;
}

class FlowFieldLocal {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private keys: { [key: string]: boolean };
  private gameState: GameStateLocal;
  private canvasWidth: number;
  private canvasHeight: number;
  private deps: FlowFieldDependencies;
  private ballPulse: number = 0;

  constructor(
    ctx: CanvasRenderingContext2D,
    keys: { [key: string]: boolean },
    dependencies: FlowFieldDependencies
  ) {
    this.width = 10;
    this.height = 100;
    this.canvasWidth = 1000;
    this.canvasHeight = 600;
    this.ctx = ctx;
    this.keys = keys;
    this.deps = dependencies;
    this.gameState = {
      paddleLeftY: 240,
      paddelRightY: 240,
      ballX: 500,
      ballY: 300,
      keypressd: [],
      rightPlayerScore: 0,
      leftPlayerScore: 0,
      flagX: false,
      flagY: false,
      ballSpeed: 5,
      count: 0,
    };
  }

  private draw(): void {
    const isDark =
      document.getElementById("game-screen")?.dataset.theme === "dark";
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.ctx.fillStyle = isDark ? "#00B894" : "#FFD700";
    this.ctx.fillRect(10, this.gameState.paddleLeftY, this.width, this.height);
    this.ctx.strokeRect(
      10,
      this.gameState.paddleLeftY,
      this.width,
      this.height
    );

    this.ctx.fillStyle = isDark ? "#00B894" : "#FFD700";
    this.ctx.fillRect(
      980,
      this.gameState.paddelRightY,
      this.width,
      this.height
    );
    this.ctx.strokeRect(
      980,
      this.gameState.paddelRightY,
      this.width,
      this.height
    );

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(
      this.gameState.ballX,
      this.gameState.ballY,
      13,
      0,
      Math.PI * 2
    );
    this.ctx.shadowColor = isDark ? "#FFD700" : "#00B894";
    this.ctx.shadowBlur = 24;
    this.ctx.fillStyle = isDark ? "#FFD700" : "#00B894";
    this.ctx.fill();
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = isDark ? "#fff" : "#23272f";
    this.ctx.stroke();
    this.ctx.restore();
    this.ballPulse += 0.08;
    this.ctx.globalAlpha = 0.25 + 0.15 * Math.sin(this.ballPulse);
    this.ctx.beginPath();
    this.ctx.arc(
      this.gameState.ballX,
      this.gameState.ballY,
      13 + 10 + 5 * Math.abs(Math.sin(this.ballPulse)),
      0,
      Math.PI * 2
    );
    this.ctx.fillStyle = isDark ? "#FFD700" : "#00B894";
    this.ctx.fill();
    this.ctx.globalAlpha = 1;
  }

  private keysFunction(): void {
    if (
      this.keys["w"] &&
      !this.gameState.keypressd.includes("w") &&
      this.gameState.paddleLeftY > 0
    ) {
      this.gameState.keypressd.push("w");
    }
    if (
      this.keys["s"] &&
      !this.gameState.keypressd.includes("s") &&
      this.gameState.paddleLeftY < this.canvasHeight - this.height
    ) {
      this.gameState.keypressd.push("s");
    }
    if (
      this.keys["ArrowUp"] &&
      !this.gameState.keypressd.includes("ArrowUp") &&
      this.gameState.paddelRightY > 0
    ) {
      this.gameState.keypressd.push("ArrowUp");
    }
    if (
      this.keys["ArrowDown"] &&
      !this.gameState.keypressd.includes("ArrowDown") &&
      this.gameState.paddelRightY < this.canvasHeight - this.height
    ) {
      this.gameState.keypressd.push("ArrowDown");
    }
  }

  private setInitialStat() {
    if (this.deps.result.textContent === `Winner: ${this.deps.Players[1]}`) {
      this.deps.Winners.push(this.deps.Players[1]);
    } else if (
      this.deps.result.textContent === `Winner: ${this.deps.Players[0]}`
    ) {
      this.deps.Winners.push(this.deps.Players[0]);
    }

    const oldPlayerLeft = this.deps.Players[0];
    const oldPlayerRight = this.deps.Players[1];

    this.deps.Players.splice(0, 2);

    if (this.deps.Players.length < 1) {
      this.deps.Players = [...this.deps.Winners];
      this.deps.Winners = [];

      if (this.deps.Players.length === 1) {
        this.deps.gameTab.style.display = "none";
        this.deps.resultTab.style.display = "flex";
        this.deps.resultStat.textContent = `Tournament winner is: ${this.deps.Players[0]}`;
        this.deps.restartTournoi.addEventListener("click", () => {
          navigateTo("/tournament");
        });
      }
    }

    if (this.deps.Players.length % 2 === 0) {
      this.deps.prevMatch.textContent = `PREVIOUS MATCH: ${oldPlayerLeft} vs ${oldPlayerRight}`;
      this.deps.currentMatch.textContent = `${this.deps.Players[0]} vs ${this.deps.Players[1]}`;
      if (this.deps.Players.length >= 4) {
        this.deps.nextMatch.textContent = `NEXT MATCH: ${this.deps.Players[2]} vs ${this.deps.Players[3]}`;
      } else {
        this.deps.nextMatch.textContent = "";
      }
    }

    this.resetGameState();
    this.deps.gameTab.style.display = "flex";
    this.deps.socketLocal.close();

    this.deps.restart.addEventListener("click", () => {
      this.deps.gameTab.style.display = "none";
      const newSocket = new WebSocket("wss://localhost:9090/game/ws");
      this.deps.socketLocal = newSocket;
      newSocket.onmessage = (event: MessageEvent) => {
        this.updateGameState(event.data);
      };
    });
  }

  private resetGameState() {
    this.gameState = {
      paddleLeftY: 240,
      paddelRightY: 240,
      ballX: 500,
      ballY: 300,
      keypressd: [],
      rightPlayerScore: 0,
      leftPlayerScore: 0,
      flagX: false,
      flagY: false,
      ballSpeed: 5,
      count: 0,
    };
  }

  public updateGameState(data: string): void {
    try {
      this.gameState = JSON.parse(data);
      this.deps.rightPlayerScoreLocal.textContent =
        this.gameState.rightPlayerScore.toString();
      this.deps.leftPlayerScoreLocal.textContent =
        this.gameState.leftPlayerScore.toString();

      if (this.gameState.rightPlayerScore === 5) {
        this.deps.result.textContent = `Winner: ${this.deps.Players[1]}`;
        this.setInitialStat();
      } else if (this.gameState.leftPlayerScore === 5) {
        this.deps.result.textContent = `Winner: ${this.deps.Players[0]}`;
        this.setInitialStat();
      }
    } catch (err) {
      console.error("Error updating game state:", err);
    }
  }

  private ballPositionUpdate(): void {
    if (this.deps.socketLocal.readyState === WebSocket.OPEN) {
      this.deps.socketLocal.send(JSON.stringify(this.gameState));
    }
  }

  public animate(): void {
    this.draw();
    this.keysFunction();
    this.ballPositionUpdate();
    requestAnimationFrame(this.animate.bind(this));
  }
}
