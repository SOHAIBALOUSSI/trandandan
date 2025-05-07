const rightPlayerScore = document.getElementById('rightScore') as HTMLElement;
const leftPlayerScore = document.getElementById('leftScore') as HTMLElement;
const gameEnd = document.getElementById('gameEnd') as HTMLElement;
const exitButton = document.getElementById('exitButton') as HTMLButtonElement;
const restartButton = document.getElementById("restartButton") as HTMLButtonElement;

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

let test = localStorage.getItem('player');
if (test === null) {
  localStorage.setItem('player', token);
  test = token;
}

const socket = new WebSocket(`ws://localhost:5000/remoteGame?token=${test}`);
console.log("reconnected");

window.onload = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  
  socket.onopen = () => {
    console.log('connected');
  }

  socket.onclose = () => {
    console.log('match ended');
    socket.close();
  };

  socket.onerror = (err) => {
    console.error('[client] WebSocket error:', err);
  };

  let keys: Record<string, boolean> = {};

  window.addEventListener('keydown', (key: KeyboardEvent) => {
    keys[key.key] = true;
  });

  window.addEventListener('keyup', (key: KeyboardEvent) => {
    keys[key.key] = false;
  });

  const flow = new FlowField(ctx, keys);

  socket.onmessage = (event: MessageEvent) => {
    flow.updateGameState(event.data);
  };

  flow.animate();
};

interface GameState {
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
  winner: string;
  rounds: number;
  restart: boolean;
  alive: boolean;
  gameEnd?: string;
}

class FlowField {
  private ctx: CanvasRenderingContext2D;
  private width: number = 10;
  private height: number = 150;
  private canvasWidth: number = 900;
  private canvasHeight: number = 600;
  private keys: Record<string, boolean>;
  private gameState: GameState;

  constructor(ctx: CanvasRenderingContext2D, keys: Record<string, boolean>) {
    this.ctx = ctx;
    this.keys = keys;
    this.gameState = {
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
      winner: '',
      rounds: 5,
      restart: false,
      alive: true
    };
  }

  updateGameState(data: string): void {
    try {
      const parsedData: GameState = JSON.parse(data);
      this.gameState = parsedData;

      rightPlayerScore.textContent = String(this.gameState.rightPlayerScore);
      leftPlayerScore.textContent = String(this.gameState.leftPlayerScore);

      if (this.gameState.gameEnd && this.gameState.gameEnd.length !== 0) {
        this.gameState.restart = true;
        gameEnd.textContent = this.gameState.gameEnd;
        this.gameState.leftPlayerScore = 0;
        this.gameState.rightPlayerScore = 0;
        rightPlayerScore.textContent = '0';
        leftPlayerScore.textContent = '0';
        this.gameState.gameEnd = '';

        setTimeout(() => {
          gameEnd.textContent = '';
          gameEnd.innerHTML = '';
        }, 3000);

        restartButton.addEventListener('click', () => {
          this.gameState.restart = false;
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
    this.ctx.fillRect(890, this.gameState.paddelRightY, this.width, this.height);
    this.ctx.strokeRect(890, this.gameState.paddelRightY, this.width, this.height);

    // Ball
    this.ctx.beginPath();
    this.ctx.arc(this.gameState.ballX, this.gameState.ballY, 13, 0, Math.PI * 2);
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
