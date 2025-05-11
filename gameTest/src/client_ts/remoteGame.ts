const rightPlayerScore = document.getElementById("rightScore") as HTMLElement;
const leftPlayerScore = document.getElementById("leftScore") as HTMLElement;
const gameEndResult = document.getElementById("gameEndResult") as HTMLElement;
const exitButton = document.getElementById("exitButton") as HTMLButtonElement;
const restartButton = document.getElementById(
  "restartButton"
) as HTMLButtonElement;

restartButton.style.display = "none";
exitButton.style.display = "none";

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

let test = localStorage.getItem("player");
if (test === null) {
  localStorage.setItem("player", token);
  test = token;
}
let userName = generateToken();
let socket = new WebSocket(`ws://localhost:5000/remoteGame?token=${test}`);
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
  keypressd: string[];
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

class FlowField {
  private ctx: CanvasRenderingContext2D;
  private width: number = 10;
  private height: number = 150;
  private canvasWidth: number = 900;
  private canvasHeight: number = 600;
  private keys: Record<string, boolean>;
  private gameState: GameState;
  private games: PlayerData[] = [];

  constructor(ctx: CanvasRenderingContext2D, keys: Record<string, boolean>) {
    this.ctx = ctx;
    this.keys = keys;
    this.gameState = {
      matchId: "",
      playerId: 0,
      ballX: 0,
      ballY: 300,
      ballSpeed: 3,
      flagX: false,
      flagY: false,
      paddleLeftY: 240,
      paddelRightY: 240,
      keypressd: [],
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
    fetch("http://localhost:5000/storePlayerData", {
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

      rightPlayerScore.textContent = String(this.gameState.rightPlayerScore);
      leftPlayerScore.textContent = String(this.gameState.leftPlayerScore);

      if (
        this.gameState.gameEndResult &&
        this.gameState.gameEndResult.length !== 0
      ) {
        // set a flag that to tell server that the game ended
        this.gameState.endGame = true;

        gameEndResult.textContent = "You " + this.gameState.gameEndResult;
        restartButton.style.display = "block";
        exitButton.style.display = "block";

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
          // this.sendPlayerData(playerData);
          console.log(playerData);
        } else {
          // this.sendPlayerData(playerData);
          console.log(playerData);
        }
        restartButton.addEventListener("click", () => {
          restartButton.style.display = "none";
          exitButton.style.display = "none";


          // Reset the game state
          this.gameState = {
            matchId: "",
            playerId: 0,
            ballX: 0,
            ballY: 300,
            ballSpeed: 3,
            flagX: false,
            flagY: false,
            paddleLeftY: 240,
            paddelRightY: 240,
            keypressd: [],
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
              `ws://localhost:5000/remoteGame?token=${test}`
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
      console.log(data);
    }
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Paddle left
    this.ctx.fillRect(0, this.gameState.paddleLeftY, this.width, this.height);
    this.ctx.strokeRect(0, this.gameState.paddleLeftY, this.width, this.height);

    // Paddle right
    this.ctx.fillRect(
      890,
      this.gameState.paddelRightY,
      this.width,
      this.height
    );
    this.ctx.strokeRect(
      890,
      this.gameState.paddelRightY,
      this.width,
      this.height
    );

    // Ball
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
  }

  private keysFunction(): void {
    if (this.keys["w"]) {
      this.gameState.keypressd.push("w");
    }
    if (this.keys["s"]) {
      this.gameState.keypressd.push("s");
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
