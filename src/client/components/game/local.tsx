import './src/client/styles/game.css';

export function LocalGame() {
  const rightPlayerScoreLocal = document.getElementById(
    "rightPlayerScoreLocal"
  ) as HTMLElement;
  const leftPlayerScoreLocal = document.getElementById(
    "leftPlayerScoreLocal"
  ) as HTMLElement;
  const gameTab = document.getElementById("gameTab") as HTMLElement;
  const result = document.getElementById("result") as HTMLElement;
  const restart = document.getElementById("restart") as HTMLElement;

  let socketLocal: WebSocket;

  window.onload = () => {
    socketLocal = new WebSocket("ws://0.0.0.0:5000/ws");
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    let keys: { [key: string]: boolean } = {};

    window.addEventListener("keydown", (event: KeyboardEvent) => {
      keys[event.key] = true;
    });

    window.addEventListener("keyup", (event: KeyboardEvent) => {
      keys[event.key] = false;
    });

    const flow = new FlowFieldLocal(ctx, keys);

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
  };

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
    x: number; // X-coordinate of the particle
    y: number; // Y-coordinate of the particle
    radius: number; // Size of the particle
    color: string; // Color of the particle
    alpha: number; // Transparency (1 = fully visible, 0 = invisible)
    velocityX: number; // Horizontal movement speed
    velocityY: number; // Vertical movement speed
  }

  class FlowFieldLocal {
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;
    private keys: { [key: string]: boolean };
    private gameState: GameStateLocal;
    private canvasWidth: number;
    private canvasHeight: number;
    private particles: Particle[] = [];

    constructor(
      ctx: CanvasRenderingContext2D,
      keys: { [key: string]: boolean }
    ) {
      this.width = 10;
      this.height = 100;
      this.canvasWidth = 1000;
      this.canvasHeight = 600;
      this.ctx = ctx;
      this.keys = keys;
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
      gameTab.style.display = "block";
      socketLocal.close();
      restart.addEventListener("click", () => {
        gameTab.style.display = "none";
        const newSocket = new WebSocket("ws://0.0.0.0:5000/ws");
        socketLocal = newSocket;
        socketLocal.onmessage = (event: MessageEvent) => {
          this.updateGameState(event.data);
        };
      });
    }
    public updateGameState(data: string): void {
      this.gameState = JSON.parse(data);
      if (rightPlayerScoreLocal)
        rightPlayerScoreLocal.textContent =
          this.gameState.rightPlayerScore.toString();
      if (leftPlayerScoreLocal)
        leftPlayerScoreLocal.textContent =
          this.gameState.leftPlayerScore.toString();

      if (this.gameState.rightPlayerScore === 5) {
        result.innerText = "RIGHT PLAYER WON";
        this.setInitialStat();
      }
      if (this.gameState.leftPlayerScore === 5) {
        result.innerText = "LEFT PLAYER WON";
        this.setInitialStat();
      }
    }

    private ballPositionUpdate(): void {
      if (socketLocal.readyState === WebSocket.OPEN) {
        socketLocal.send(JSON.stringify(this.gameState));
      }
    }

    public animate(): void {
      this.draw();
      this.keysFunction();
      this.ballPositionUpdate();
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  const localgame = (
    <div className="w-full h-full overflow-hidden bg-game-bg">
      <h1 className="text-center text-[100px] text-amber-50 top-20 ">
        <span className="text-ping-yellow">PING</span> PONG
      </h1>
      <div className="flex items-center justify-center flex-col h-230 ">
        <div className="score flex justify-center gap-60 w-full">
          <h1 id="leftPlayerScoreLocal" className="text-amber-50 text-8xl">
            0
          </h1>
          <h1 id="rightPlayerScoreLocal" className="text-amber-50 text-8xl">
            0
          </h1>
        </div>
        <canvas
          className="bg-game-table z-10 border-4 border-white rounded-4xl"
          id="canvas"
          width="1000"
          height="600"
        ></canvas>
      </div>
      <div className="absolute w-10 h-10 bg-red-500 opacity-10 animate-square top-0 left-0"></div>
      <div className="absolute w-10 h-10 bg-blue-500 opacity-10 animate-square top-45 left-120"></div>
      <div className="absolute w-10 h-10 bg-green-500 opacity-10 animate-square top-200 left-40"></div>
      <div className="absolute w-10 h-10 bg-yellow-500 opacity-10 animate-square top-150 left-420"></div>
      <div className="absolute w-10 h-10 bg-purple-500 opacity-10 animate-square top-90 left-50"></div>
      <div className="absolute w-10 h-10 bg-pink-500 opacity-10 animate-square top-250 left-220"></div>
      <div className="absolute w-10 h-10 bg-teal-500 opacity-10 animate-square top-30 left-480"></div>
      <div className="absolute w-10 h-10 bg-orange-500 opacity-10 animate-square top-180 left-500"></div>
      <div className="absolute w-10 h-10 bg-indigo-500 opacity-10 animate-square top-75 left-100"></div>
      <div className="absolute w-10 h-10 bg-lime-500 opacity-10 animate-square top-250 left-420"></div>
      <div className="absolute w-10 h-10 bg-cyan-500 opacity-10 animate-square top-120 left-10"></div>
      <div className="absolute w-10 h-10 bg-amber-500 opacity-10 animate-square top-60 left-520"></div>
      <div className="absolute w-10 h-10 bg-rose-500 opacity-10 animate-square top-20 left-200"></div>
      <div className="absolute w-10 h-10 bg-fuchsia-500 opacity-10 animate-square top-90 left-450"></div>
      <div className="absolute w-10 h-10 bg-emerald-500 opacity-10 animate-square top-250 left-50"></div>
      <div className="absolute w-10 h-10 bg-violet-500 opacity-10 animate-square top-15 left-400"></div>
      <div className="absolute w-10 h-10 bg-sky-500 opacity-10 animate-square top-240 left-500"></div>
      <div className="absolute w-10 h-10 bg-amber-600 opacity-10 animate-square top-100 left-320"></div>
      <div className="absolute w-10 h-10 bg-pink-600 opacity-10 animate-square top-250 left-80"></div>
      <div className="absolute w-10 h-10 bg-teal-600 opacity-10 animate-square top-50 left-500"></div>
      <div className="absolute w-10 h-10 bg-indigo-600 opacity-10 animate-square top-190 left-450"></div>
      <div
        id="gameTab"
        className="h-80 w-150 bg-game-bg border-2 border-ping-yellow rounded-2xl absolute top-1/2 left-1/2 translate-y-[-20%] translate-x-[-50%] hidden  z-20"
      >
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-bold text-ping-yellow">GAME OVER</h1>
          <h1 id="result" className="text-2xl mt-2 text-amber-50">
            WON
          </h1>
          <button
            id="restart"
            className="cursor-pointer bg-ping-yellow text-game-bg py-5 px-10 mt-5 rounded-2xl glow-animation"
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  );

  return localgame;
}
