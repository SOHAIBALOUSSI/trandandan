
export function LocalGame() {
  // Create a container element for the game
  const container = document.createElement('div');
  container.className = 'w-full h-full overflow-hidden bg-game-bg';

  // Add your game HTML structure
  container.innerHTML = `
    <h1 class="text-center text-[100px] text-amber-50 top-20">
      <span class="text-ping-yellow">PING</span> PONG
    </h1>
    <div class="flex items-center justify-center flex-col h-230">
      <div class="score flex justify-center gap-60 w-full">
        <h1 id="leftPlayerScoreLocal" class="text-amber-50 text-8xl">0</h1>
        <h1 id="rightPlayerScoreLocal" class="text-amber-50 text-8xl">0</h1>
      </div>
      <canvas class="bg-game-table z-10 border-4 border-white rounded-4xl" id="canvas" width="1000" height="600"></canvas>
    </div>
    <!-- Your decorative elements -->
    <div class="absolute w-10 h-10 bg-red-500 opacity-10 animate-square top-0 left-0"></div>
    <!-- Add all other decorative divs -->
    <!-- Game over tab -->
    <div id="gameTab" class="h-80 w-150 bg-game-bg border-2 border-ping-yellow rounded-2xl absolute top-1/2 left-1/2 translate-y-[-20%] translate-x-[-50%] hidden z-20">
      <div class="flex flex-col items-center justify-center h-full">
        <h1 class="text-5xl font-bold text-ping-yellow">GAME OVER</h1>
        <h1 id="result" class="text-2xl mt-2 text-amber-50">WON</h1>
        <button id="restart" class="cursor-pointer bg-ping-yellow text-game-bg py-5 px-10 mt-5 rounded-2xl glow-animation">PLAY AGAIN</button>
      </div>
    </div>
  `;

  // Initialize game elements
  const canvas = container.querySelector('#canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const rightPlayerScoreLocal = container.querySelector('#rightPlayerScoreLocal') as HTMLElement;
  const leftPlayerScoreLocal = container.querySelector('#leftPlayerScoreLocal') as HTMLElement;
  const gameTab = container.querySelector('#gameTab') as HTMLElement;
  const result = container.querySelector('#result') as HTMLElement;
  const restart = container.querySelector('#restart') as HTMLElement;

  // Game state and logic
  let socketLocal: WebSocket;
  let keys: { [key: string]: boolean } = {};

  // Initialize the game
  function init() {
    socketLocal = new WebSocket("ws://0.0.0.0:5000/ws");
    
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      keys[event.key] = true;
    });

    window.addEventListener('keyup', (event: KeyboardEvent) => {
      keys[event.key] = false;
    });

    const flow = new FlowFieldLocal(ctx, keys, {
      rightPlayerScoreLocal,
      leftPlayerScoreLocal,
      gameTab,
      result,
      restart,
      socketLocal
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

  // Start the game when the container is added to DOM
  init();

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
      this.ctx.fillStyle = "#E0A458";
      this.ctx.fillRect(
        10,
        this.gameState.paddleLeftY,
        this.width,
        this.height
      );
      this.ctx.strokeRect(
        10,
        this.gameState.paddleLeftY,
        this.width,
        this.height
      );

      // Right paddle
      this.ctx.fillStyle = "#E0A458";
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
      this.ctx.fillStyle = "#C44536";
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
      this.ballParticle(this.gameState.ballX, this.gameState.ballY);

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
      this.domElements.result.innerText = "RIGHT PLAYER WON";
      this.setInitialStat();
    }
    if (this.gameState.leftPlayerScore === 5) {
      this.domElements.result.innerText = "LEFT PLAYER WON";
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