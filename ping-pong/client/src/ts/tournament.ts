const rightPlayerScoreLocal = document.getElementById(
  "rightPlayerScoreLocal"
) as HTMLElement;
const leftPlayerScoreLocal = document.getElementById(
  "leftPlayerScoreLocal"
) as HTMLElement;
const gameTab = document.getElementById("gameTab") as HTMLElement;
const result = document.getElementById("result") as HTMLElement;
const restart = document.getElementById("restart") as HTMLElement;
const players8 = document.getElementById("8Players") as HTMLElement;
const players4 = document.getElementById("4Players") as HTMLElement;
const selectTab = document.getElementById("selectTab") as HTMLElement;
const inputPlayers = document.getElementById("inputPlayers") as HTMLElement;
const playerIdField = document.getElementById("playerIdField") as HTMLElement;
const addPlayerBtn = document.getElementById("addPlayerBtn") as HTMLElement;
const tourTab = document.getElementById('tourTab') as HTMLElement;
const prevMatch = document.getElementById('prevMatch') as HTMLElement;
const currentMatch = document.getElementById('currentMatch') as HTMLElement;
const nextMatch = document.getElementById('nextMatch') as HTMLElement;
const resultTab = document.getElementById('resultTab') as HTMLElement;
const resultStat = document.getElementById('resultStat') as HTMLElement;
const restartTournoi = document.getElementById('restartTournoi') as HTMLElement;

const start = document.getElementById('start') as HTMLElement;
let numberOfPlayers: number = 0;
let socketLocal: WebSocket;
let Players: string[] = [];
let Winners: string[] = [];

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

  players4.addEventListener("click", () => {
    selectTab.style.display = "none";
    inputPlayers.style.display = "block";
    numberOfPlayers = 4;
  });
  players8.addEventListener("click", () => {
    selectTab.style.display = "none";
    inputPlayers.style.display = "block";
    numberOfPlayers = 8;
  });

  const flow = new FlowFieldLocal(ctx, keys);

  addPlayerBtn.addEventListener("click", () => {
    if (!playerIdField.checkValidity()) {
      alert("Invalid input! Please enter a valid player ID.");
      return;
    }
    if (Players.includes(playerIdField.value))
    {
      alert("Player Already Exist.");
      return;
    }
    Players.push(playerIdField.value);
		playerIdField.value = "";
    
    if (Players.length === numberOfPlayers) {
      inputPlayers.style.display = "none";
			tourTab.style.display = "none";
			gameTab.style.display = "block";
			currentMatch.innerText = Players[0] + " vs " + Players[1];
			nextMatch.innerText = "NEXT MATCH: " + Players[2] + " vs " + Players[3]
			start.addEventListener('click', () => {
        start.style.display = 'none';
        restart.style.display = 'block';
				gameTab.style.display = 'none';
				flow.animate();
			})
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

  constructor(ctx: CanvasRenderingContext2D, keys: { [key: string]: boolean }) {
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
    this.ctx.fillRect(10, this.gameState.paddleLeftY, this.width, this.height);
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
    if (result.innerText === "Winner: " + Players[1]) Winners.push(Players[1]);
    else if (result.innerText === "Winner: " + Players[0]) Winners.push(Players[0]);
		let oldPlayerLeft = Players[0];
		let oldPlayerRight = Players[1];

    Players.splice(0, 2);
    if (Players.length < 1) {
      // Move winners to the next round
      Players = Winners;
      Winners = [];

      // If there's only one winner left, declare them as the final winner
      if (Players.length === 1) {
        restartTournoi.addEventListener('click', () => {
          window.location.reload();
        })
        resultStat.innerText = "Tournament winner is: " + Players[0];
        resultTab.style.display = 'block';
      }
    }
    if (Players.length % 2 === 0)
		{
			prevMatch.innerText = "PREVIOUS MATCH: " + oldPlayerLeft + " vs " + oldPlayerRight;
      currentMatch.innerText = Players[0] + " vs " + Players[1];
			if (Players.length >= 4)
				nextMatch.innerText = "NEXT MATCH: " + Players[2] + " vs " + Players[3];
      else
        nextMatch.innerText = "";
		}

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
      result.innerText = "Winner: " + Players[1];
      this.setInitialStat();
    }
    if (this.gameState.leftPlayerScore === 5) {
      result.innerText = "Winner: " + Players[0];
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
