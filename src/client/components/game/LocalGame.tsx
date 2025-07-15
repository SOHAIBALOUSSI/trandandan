import { navigateTo } from "@/utils/navigate-to-link";
import { initGameThemeToggle } from "@/utils/game-theme-toggle";
import { GameStateLocal } from "types/types";

export function LocalGame() {
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

  // Create a container element for the game
  const container = document.createElement("div");
  container.className =
    "w-full min-h-screen relative overflow-hidden transition-all duration-300";
  container.id = "game-screen";
  container.dataset.theme = localStorage.getItem("gameTheme") || "dark";

  container.innerHTML = `
  <button id="exit" class="absolute top-5 left-5 z-30 text-2xl md:text-3xl text-pong-sport-accent hover:text-pong-sport-primary transition p-2 rounded-full bg-pong-sport-surface/70 hover:bg-pong-sport-surface/90 backdrop-blur-md shadow-md" title="Leave Lounge">
    <i class="fa-solid fa-arrow-left"></i>
  </button>
  <button id="game-theme-toggle" class="absolute top-5 right-5 z-30 text-2xl md:text-3xl text-pong-sport-accent hover:text-pong-sport-primary transition p-2 rounded-full bg-pong-sport-surface/70 hover:bg-pong-sport-surface/90 backdrop-blur-md shadow-md" title="Switch Mood">
    <i class="fa-solid fa-circle-half-stroke"></i>
  </button>

  <h1 id="title" class="font-orbitron text-center text-[8vw] md:text-[80px] font-extrabold tracking-wide mt-14 mb-4 drop-shadow-xl text-pong-sport-primary">
    BHV <span class="text-pong-sport-accent font-orbitron">PONG</span>
  </h1>


   <div class="flex items-center justify-center flex-col w-full" style="min-height:${canvasHeight}px;">
    <div class="score flex justify-center gap-20 md:gap-60 w-full mb-4">
      <h2 id="leftPlayerScoreLocal" class="text-5xl md:text-7xl font-semibold font-orbitron text-pong-sport-light drop-shadow-md">0</h2>
      <h2 id="rightPlayerScoreLocal" class="text-5xl md:text-7xl font-semibold font-orbitron text-pong-sport-light drop-shadow-md">0</h2>
    </div>

    <div class="flex justify-center w-full pb-8">
      <canvas class="z-10 border-2 border-pong-sport-accent rounded-md shadow-[0_0_20px_rgba(255,215,0,0.3)] bg-pong-sport-bg/90 backdrop-blur-sm transition-all duration-300"
        id="canvas"
        width=${canvasWidth}
        height=${canvasHeight}>
      </canvas>
    </div>
  </div>

  <div id="gameTab"
    class="h-80 w-11/12 max-w-lg absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 shadow-2xl backdrop-blur-md hidden flex-col items-center justify-center px-6 py-4 rounded-xl border border-pong-sport-accent/30 bg-pong-sport-surface/90 text-center text-pong-sport-light">
      <h2 class="text-3xl md:text-4xl font-bold mb-2 tracking-tight text-pong-sport-primary">Match Complete</h2>
      <p id="result" class="text-xl mt-1 font-medium text-pong-sport-accent">Right Side Dominates</p>
      <button id="restart" class="mt-6 bg-pong-sport-primary hover:bg-pong-sport-accent text-black font-bold py-3 px-8 rounded-xl text-lg md:text-xl shadow-md tracking-wide transition-all duration-300">
        Challenge Again
      </button>
  </div>
`;

  const startMessage = document.createElement("div");
  startMessage.id = "startMessage";
  startMessage.className =
    "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 text-center text-2xl md:text-3xl font-bold text-pong-sport-muted bg-pong-sport-surface/70 px-6 py-4 rounded-xl shadow-lg";
  startMessage.innerHTML = `
  <p>Press <span class="text-pong-sport-accent">F</span> to Serve</p>
  <p class="text-sm text-pong-sport-light/80 mt-2 font-normal">Welcome to the BHV Lounge — let the rally begin.</p>
`;
  container.appendChild(startMessage);

  // Initialize game elements
  const canvas = container.querySelector("#canvas") as HTMLCanvasElement;
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
  const exit = container.querySelector("#exit") as HTMLElement;

  exit.addEventListener("click", () => {
    navigateTo("/arena");
  });

  // Game state and logic
  let socketLocal: WebSocket;
  let keys: { [key: string]: boolean } = {};
  let gameStarted = false;

  // Initialize the game
  function init() {
    document.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "f" && !gameStarted) {
        gameStarted = true;
        startMessage.style.display = "none";
        startGame();
      }
    });
  }

  // Function to start the game
  function startGame() {
    socketLocal = new WebSocket("ws://localhost:5000/ws");

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
      socketLocal,
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

    flow.animate();
  }

  // Optionally, handle window resize for responsiveness
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

  // Call the init function to set up the game
  init();

  // Call after DOM is ready

  return container;
}

// Modified FlowFieldLocal class
class FlowFieldLocal {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private keys: { [key: string]: boolean };
  private gameState: GameStateLocal;
  private canvasWidth: number;
  private canvasHeight: number;
  private ballPulse: number = 0;

  private domElements: {
    rightPlayerScoreLocal: HTMLElement;
    leftPlayerScoreLocal: HTMLElement;
    gameTab: HTMLElement;
    result: HTMLElement;
    restart: HTMLElement;
    socketLocal: WebSocket;
  };

  constructor(
    ctx: CanvasRenderingContext2D,
    keys: { [key: string]: boolean },
    domElements: {
      rightPlayerScoreLocal: HTMLElement;
      leftPlayerScoreLocal: HTMLElement;
      gameTab: HTMLElement;
      result: HTMLElement;
      restart: HTMLElement;
      socketLocal: WebSocket;
    }
  ) {
    this.width = 10;
    this.height = 100;
    this.canvasWidth = 1000;
    this.canvasHeight = 600;
    this.ctx = ctx;
    this.keys = keys;
    this.domElements = domElements;
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

    // console.log("ballX: ",this.gameState.ballX)
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Left paddle
    this.ctx.fillStyle = isDark ? "#00B894" : "#FFD700";
    this.ctx.fillRect(10, this.gameState.paddleLeftY, this.width, this.height);
    this.ctx.strokeRect(
      10,
      this.gameState.paddleLeftY,
      this.width,
      this.height
    );

    // Right paddle
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

    // Ball

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

    this.domElements.gameTab.style.display = "flex";
    this.domElements.socketLocal.close();

    this.domElements.restart.addEventListener("click", () => {
      this.domElements.gameTab.style.display = "none";
      const newSocket = new WebSocket("ws://0.0.0.0:5000/ws");
      this.domElements.socketLocal = newSocket;
      newSocket.onmessage = (event: MessageEvent) => {
        this.updateGameState(event.data);
      };
    });
  }

  public updateGameState(data: string): void {
    this.gameState = JSON.parse(data);
    this.domElements.rightPlayerScoreLocal.textContent =
      this.gameState.rightPlayerScore.toString();
    this.domElements.leftPlayerScoreLocal.textContent =
      this.gameState.leftPlayerScore.toString();

    if (this.gameState.rightPlayerScore === 5) {
      this.domElements.result.innerText =
        "Right Side Triumphs! A well-earned victory.";
      this.setInitialStat();
    }
    if (this.gameState.leftPlayerScore === 5) {
      this.domElements.result.innerText =
        "Left Side Prevails! The rally ends in glory.";
      this.setInitialStat();
    }
  }

  private ballPositionUpdate(): void {
    if (this.domElements.socketLocal.readyState === WebSocket.OPEN) {
      this.domElements.socketLocal.send(JSON.stringify(this.gameState));
    }
  }

  public animate(): void {
    this.draw();
    this.keysFunction();
    this.ballPositionUpdate();
    requestAnimationFrame(this.animate.bind(this));
  }
}
