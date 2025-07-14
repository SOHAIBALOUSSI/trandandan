import { navigateTo } from "@/utils/navigate-to-link";
import { initGameThemeToggle } from "@/utils/game-theme-toggle";

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
    "w-full min-h-screen font-orbitron relative overflow-hidden transition-colors duration-300";
  container.id = "game-screen";
  container.dataset.theme = "dark";

  container.innerHTML = `
  <button id="exit" class="absolute top-5 left-5 z-30 text-2xl md:text-3xl text-pong-sport-accent hover:text-pong-sport-primary transition p-2 rounded-full bg-pong-sport-surface/70 hover:bg-pong-sport-surface/90 backdrop-blur-md shadow-md" title="Leave Match">
    <i class="fa-solid fa-arrow-left"></i>
  </button>
  <button id="game-theme-toggle" class="absolute top-6 right-6 z-30 text-xl game-control-btn bg-pong-sport-surface text-pong-sport-accent hover:bg-pong-sport-accent hover:text-pong-sport-surface transition" title="Toggle Game Theme">
    <i class="fa-solid fa-circle-half-stroke"></i>
  </button>

  <h1 class="text-center text-[8vw] md:text-[80px] font-extrabold tracking-wide mt-14 mb-4 drop-shadow-xl">
    <span class="text-pong-sport-accent">BHV</span> <span class="text-pong-sport-primary">PONG</span>
  </h1>

  <div class="flex items-center justify-center flex-col w-full" style="min-height:${
    canvasHeight + 100
  }px;">
    <div class="score flex justify-center gap-20 md:gap-60 w-full mb-4">
      <h2 id="leftPlayerScoreLocal" class="text-5xl md:text-7xl font-semibold text-pong-sport-accent">0</h2>
      <h2 id="rightPlayerScoreLocal" class="text-5xl md:text-7xl font-semibold text-pong-sport-primary">0</h2>
    </div>

    <div class="flex justify-center w-full">
      <canvas class="z-10 border-2 border-pong-sport-accent rounded-md shadow-[0_0_20px_rgba(0,184,148,0.2)] bg-pong-sport-bg/90 backdrop-blur-sm transition-all duration-300"
        id="canvas"
        width="${canvasWidth}"
        height="${canvasHeight}">
      </canvas>
    </div>
  </div>

  <div id="gameTab"
    class="game-modal h-80 w-11/12 max-w-lg absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 hidden z-20 shadow-2xl backdrop-blur-md flex flex-col items-center justify-center px-6 py-4 bg-pong-sport-surface text-pong-sport-accent">
      <h2 class="text-3xl md:text-4xl font-bold text-pong-sport-accent mb-2 tracking-tight">Match Finished</h2>
      <p id="result" class="text-xl mt-1 text-pong-sport-primary font-medium">Victory</p>
      <button id="restart" class="mt-6 game-control-btn bg-pong-sport-accent hover:bg-pong-sport-primary text-pong-sport-dark font-bold py-3 px-8 rounded-xl text-lg md:text-xl shadow-md tracking-wide">
        Rematch
      </button>
  </div>
`;

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

  // Initialize the game
  function init() {
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

  // Start the game when the container is added to DOM
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
  private particles: Particle[] = [];
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

  private ballParticle(x: number, y: number): void {
    // Generate a new particle at the ball's position
    for (let i = 0; i < 5; i++) {
      // Create multiple particles per frame
      this.particles.push({
        x: x,
        y: y,
        radius: Math.random() * 2 + 1, // Random radius between 1 and 4
        color: "#C44536", // Random transparency
        alpha: 1, // Fully visible initially
        velocityX: (Math.random() - 0.5) * 2, // Random horizontal velocity
        velocityY: (Math.random() - 0.5) * 2, // Random vertical velocity
      });
    }
  }

  private updateParticles(): void {
    this.particles.forEach((particle, index) => {
      // Update particle position
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;

      // Reduce particle transparency
      particle.alpha -= 0.02;

      // Remove particle if it becomes fully transparent
      if (particle.alpha <= 0) {
        this.particles.splice(index, 1);
      }
    });
  }

  private drawParticles(): void {
    this.particles.forEach((particle) => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color.replace("1)", `${particle.alpha})`); // Update alpha
      this.ctx.fill();
    });
  }

  private draw(): void {
    // console.log("ballX: ",this.gameState.ballX)
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Left paddle
    this.ctx.fillStyle = "#003049";
    this.ctx.fillRect(10, this.gameState.paddleLeftY, this.width, this.height);
    this.ctx.strokeRect(
      10,
      this.gameState.paddleLeftY,
      this.width,
      this.height
    );

    // Right paddle
    this.ctx.fillStyle = "#003049";
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
    this.ctx.fillStyle = "#fff";
    this.ctx.beginPath();
    this.ctx.arc(
      this.gameState.ballX,
      this.gameState.ballY,
      13,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
    this.ctx.stroke();

    // Generate particles at the ball's position
    // this.ballParticle(this.gameState.ballX, this.gameState.ballY);

    // Update and draw particles
    this.updateParticles();
    this.drawParticles();
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

    this.domElements.gameTab.style.display = "block";
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

// Your existing interfaces
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

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  velocityX: number;
  velocityY: number;
}

// below canvas div
{
  /* <div class="absolute w-10 h-10 bg-red-500 opacity-10 animate-square top-0 left-0"></div>
<div class="absolute w-10 h-10 bg-blue-500 opacity-10 animate-square top-[45px] left-[500px]"></div>
<div class="absolute w-10 h-10 bg-green-500 opacity-10 animate-square top="[800px] left="[322px]"></div>
<div class="absolute w-10 h-10 bg-yellow-500 opacity-10 animate-square top="[550px] left="[800px]"></div>
<div class="absolute w-10 h-10 bg-purple-500 opacity-10 animate-square top="[90px] left="[1800px]"></div>
<div class="absolute w-10 h-10 bg-pink-500 opacity-10 animate-square top="[250px] left="[1656px]"></div>
<div class="absolute w-10 h-10 bg-teal-500 opacity-10 animate-square top="[750px] left="[1100px]"></div>
<div class="absolute w-10 h-10 bg-orange-500 opacity-10 animate-square top="[580px] left="[100px]"></div>
<div class="absolute w-10 h-10 bg-indigo-500 opacity-10 animate-square top="[475px] left="[1580px]"></div>
<div class="absolute w-10 h-10 bg-lime-500 opacity-10 animate-square top="[250px] left="[40px]"></div>
<div class="absolute w-10 h-10 bg-cyan-500 opacity-10 animate-square top="[390px] left="[1800px]"></div>
<div class="absolute w-10 h-10 bg-amber-500 opacity-10 animate-square top="[760px] left="[770px]"></div>
<div class="absolute w-10 h-10 bg-rose-500 opacity-10 animate-square top="[200px] left="[250px]"></div>
<div class="absolute w-10 h-10 bg-fuchsia-500 opacity-10 animate-square top="[890px] left="[1450px]"></div>
<div class="absolute w-10 h-10 bg-emerald-500 opacity-10 animate-square top="[250px] left="[500px]"></div>
<div class="absolute w-10 h-10 bg-violet-500 opacity-10 animate-square top="[15px] left="[1400px]"></div>
<div class="absolute w-10 h-10 bg-sky-500 opacity-10 animate-square top="[240px] left="[1500px]"></div>
<div class="absolute w-10 h-10 bg-amber-600 opacity-10 animate-square top="[100px] left="[320px]"></div>
<div class="absolute w-10 h-10 bg-pink-600 opacity-10 animate-square top="[750px] left="[1700px]"></div>
<div class="absolute w-10 h-10 bg-teal-600 opacity-10 animate-square top="[50px] left="[500px]"></div>
<div class="absolute w-10 h-10 bg-indigo-600 opacity-10 animate-square top="[190px] left="[450px]"></div> */
}
