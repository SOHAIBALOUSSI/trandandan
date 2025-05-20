const rightPlayerScore = document.getElementById(
  "rightPlayerScoreRemote"
) as HTMLElement;
const leftPlayerScore = document.getElementById(
  "leftPlayerScoreRemote"
) as HTMLElement;
const restartButton = document.getElementById(
  "restartButton"
) as HTMLButtonElement;

const result = document.getElementById("result") as HTMLElement;
const gameTabe = document.getElementById("gameTab") as HTMLElement;
const disconnectedResult = document.getElementById("disconnected") as HTMLElement;
const exit = document.getElementById("exit") as HTMLElement;
const playerSide = document.getElementById("playerSide") as HTMLElement;
function generateToken(): string {
  let roomId = "";
  const stringOfChar = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let index = 0; index < 12; index++) {
    roomId += stringOfChar[Math.floor(Math.random() * stringOfChar.length)];
  }
  return roomId;
}


let token = generateToken();
console.log(token);

let connectionId = localStorage.getItem("player");
if (connectionId === null) {
  localStorage.setItem("player", token);
  connectionId = token;
}

let userName = localStorage.getItem("userName") || generateToken();
if (!localStorage.getItem("userName")) {
  localStorage.setItem("userName", userName);
}


let roomdId = '123';

let socket = new WebSocket(`ws://0.0.0.0:5000/remoteGame?token=${connectionId}&roomId=${roomdId}`);
console.log("reconnected");

window.onload = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;

  socket.onopen = () => {
    console.log("connected");
  };

  socket.onclose = () => {
    console.log("match ended");
    socket.close();
  };

  socket.onerror = (err) => {
    console.error("[client] WebSocket error:", err);
  };

  let keys: Record<string, boolean> = {};

  window.addEventListener("keydown", (key: KeyboardEvent) => {
    keys[key.key] = true;
  });

  window.addEventListener("keyup", (key: KeyboardEvent) => {
    keys[key.key] = false;
  });

  const flow = new FlowField(ctx, keys);

  socket.onmessage = (event: MessageEvent) => {
    flow.updateGameState(event.data);
  };

  flow.animate();
};

interface GameState {
  matchId: string;
  playerId: number;
  ballX: number;
  ballY: number;
  ballSpeed: number;
  flagX: boolean;
  flagY: boolean;
  paddleLeftY: number;
  paddelRightY: number;
  keypressd: string;
  disconnected: boolean;
  leftPlayerScore: number;
  rightPlayerScore: number;
  rounds: number;
  endGame: boolean;
  alive: boolean;
  gameEndResult?: string;
  leftPlayerBallHit: number;
  rightPlayerBallHit: number;
  startTime: number;
  endTime: number;
}
interface PlayerData {
  userName: string;
  matchId: string;
  playerId: number;
  leftPlayerScore: number;
  rightPlayerScore: number;
  gameDuration: number;
  gameEndResult: string;
  leftPlayerBallHit: number;
  rightPlayerBallHit: number;
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

class FlowField {
  private ctx: CanvasRenderingContext2D;
  private width: number = 10;
  private height: number = 100;
  private canvasWidth: number = 1000;
  private canvasHeight: number = 600;
  private keys: Record<string, boolean>;
  private gameState: GameState;
  private particles: Particle[] = [];

  constructor(ctx: CanvasRenderingContext2D, keys: Record<string, boolean>) {
    this.ctx = ctx;
    this.keys = keys;
    this.gameState = {
      matchId: "",
      playerId: 0,
      ballX: 500,
      ballY: 300,
      ballSpeed: 3,
      flagX: false,
      flagY: false,
      paddleLeftY: 240,
      paddelRightY: 240,
      keypressd: "",
      disconnected: false,
      leftPlayerScore: 0,
      rightPlayerScore: 0,
      rounds: 5,
      endGame: false,
      alive: true,
      leftPlayerBallHit: 0,
      rightPlayerBallHit: 0,
      startTime: Date.now(),
      endTime: 0,
    };
  }

  sendPlayerData(playerData: object): void {
    fetch("http://0.0.0.0:5000/storePlayerData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerData),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Server response:', data);
      })
      .catch((error) => {
        console.error("Error sending player data:", error);
      });
  }

  updateGameState(data: string): void {
    try {
      const parsedData: GameState = JSON.parse(data);
      this.gameState = parsedData;

      if (this.gameState.playerId === 1)
      {
        playerSide.innerText = 'YOU ARE ON THE LEFT SIDE';
      }
      else if (this.gameState.playerId === 2)
      {
        playerSide.innerText = 'YOU ARE ON THE RIGHT SIDE';
      }
      rightPlayerScore.textContent = String(this.gameState.rightPlayerScore);
      leftPlayerScore.textContent = String(this.gameState.leftPlayerScore);

      
      if (
        this.gameState.gameEndResult &&
        this.gameState.gameEndResult.length !== 0
      ) {
        // set a flag that to tell server that the game ended
        this.gameState.endGame = true;
        result.textContent = "You " + this.gameState.gameEndResult;
        gameTabe.style.display = "block";

        const playerData: PlayerData = {
          userName: userName,
          matchId: this.gameState.matchId,
          playerId: this.gameState.playerId,
          leftPlayerScore: this.gameState.leftPlayerScore,
          rightPlayerScore: this.gameState.rightPlayerScore,
          gameDuration: this.gameState.endTime,
          gameEndResult: this.gameState.gameEndResult,
          leftPlayerBallHit: this.gameState.leftPlayerBallHit,
          rightPlayerBallHit: this.gameState.rightPlayerBallHit,
        };
        if (this.gameState.playerId === 0) {
          this.sendPlayerData(playerData);
          // console.log(playerData);
        } else {
          this.sendPlayerData(playerData);
          // console.log(playerData);
        }
        restartButton.addEventListener("click", () => {
          gameTabe.style.display = "none";

          // Reset the game state
          this.gameState = {
            matchId: "",
            playerId: 0,
            ballX: 500,
            ballY: 300,
            ballSpeed: 3,
            flagX: false,
            flagY: false,
            paddleLeftY: 240,
            paddelRightY: 240,
            keypressd: "",
            disconnected: false,
            leftPlayerScore: 0,
            rightPlayerScore: 0,
            rounds: 5,
            endGame: false,
            alive: true,
            leftPlayerBallHit: 0,
            rightPlayerBallHit: 0,
            startTime: Date.now(),
            endTime: 0,
          };

          // Reconnect the WebSocket if it is closed
          if (
            socket.readyState === WebSocket.CLOSED ||
            socket.readyState === WebSocket.CLOSING
          ) {
            const newSocket = new WebSocket(
              `ws://0.0.0.0:5000/remoteGame?token=${connectionId}&roomId=${roomdId}`
            );
            newSocket.onopen = () => {
              console.log("WebSocket reconnected");
              newSocket.send(JSON.stringify(this.gameState)); // Send the reset game state
            };

            newSocket.onmessage = (event: MessageEvent) => {
              this.updateGameState(event.data);
            };

            newSocket.onerror = (err) => {
              console.error("[client] WebSocket error:", err);
            };

            newSocket.onclose = () => {
              console.log("match ended");
            };
            // Replace the old socket with the new one
            socket = newSocket;
          }
        });
      }
    } catch (error) {
      disconnectedResult.style.display = 'block';
      exit.addEventListener('click', () => {
        window.location.href = "/";
      })
      // console.log(data);
    }
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
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Paddle left
    this.ctx.fillStyle = "#E0A458";
    this.ctx.fillRect(10, this.gameState.paddleLeftY, this.width, this.height);
    this.ctx.strokeRect(
      10,
      this.gameState.paddleLeftY,
      this.width,
      this.height
    );

    // Paddle right
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
    if (this.keys["w"]) {
      this.gameState.keypressd = "w";
    } else if (this.keys["s"]) {
      this.gameState.keypressd = "s";
    }
  }

  private ballPositionUpdate(): void {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(this.gameState));
    }
  }

  animate(): void {
    this.draw();
    this.keysFunction();
    this.ballPositionUpdate();
    requestAnimationFrame(this.animate.bind(this));
  }
}
