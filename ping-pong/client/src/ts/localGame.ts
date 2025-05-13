const rightPlayerScoreLocal = document.getElementById('rightScore') as HTMLElement;
const leftPlayerScoreLocal = document.getElementById('leftScore') as HTMLElement;

let socketLocal: WebSocket;

window.onload = () => {
  socketLocal = new WebSocket('ws://localhost:5000/ws');
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  let keys: { [key: string]: boolean } = {};

  window.addEventListener('keydown', (event: KeyboardEvent) => {
    keys[event.key] = true;
  });

  window.addEventListener('keyup', (event: KeyboardEvent) => {
    keys[event.key] = false;
  });

  const flow = new FlowFieldLocal(ctx, keys);

  socketLocal.onmessage = (event: MessageEvent) => {
    flow.updateGameState(event.data);
  };

  socketLocal.onclose = () => {
    console.log('[client] Disconnected from server');
  };

  socketLocal.onerror = (err: Event) => {
    console.error('[client] WebSocket error:', err);
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

class FlowFieldLocal {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private keys: { [key: string]: boolean };
  private gameState: GameStateLocal;
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(ctx: CanvasRenderingContext2D, keys: { [key: string]: boolean }) {
    this.width = 10;
    this.height = 150;
    this.canvasWidth = 900;
    this.canvasHeight = 600;
    this.ctx = ctx;
    this.keys = keys;
    this.gameState = {
      paddleLeftY: 240,
      paddelRightY: 240,
      ballX: 450,
      ballY: 300,
      keypressd: [],
      rightPlayerScore: 0,
      leftPlayerScore: 0,
      flagX: false,
			flagY: false,
			ballSpeed: 5,
			count: 0
    };
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Left paddle
    this.ctx.fillRect(0, this.gameState.paddleLeftY, this.width, this.height);
    this.ctx.strokeRect(0, this.gameState.paddleLeftY, this.width, this.height);

    // Right paddle
    this.ctx.fillRect(890, this.gameState.paddelRightY, this.width, this.height);
    this.ctx.strokeRect(890, this.gameState.paddelRightY, this.width, this.height);

    // Ball
    this.ctx.beginPath();
    this.ctx.arc(this.gameState.ballX, this.gameState.ballY, 13, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
  }

  private keysFunction(): void {
    if (this.keys['w'] && !this.gameState.keypressd.includes('w') && this.gameState.paddleLeftY > 0) {
      this.gameState.keypressd.push('w');
    }
    if (this.keys['s'] && !this.gameState.keypressd.includes('s') && this.gameState.paddleLeftY < this.canvasHeight - this.height) {
      this.gameState.keypressd.push('s');
    }
    if (this.keys['ArrowUp'] && !this.gameState.keypressd.includes('ArrowUp') && this.gameState.paddelRightY > 0) {
      this.gameState.keypressd.push('ArrowUp');
    }
    if (this.keys['ArrowDown'] && !this.gameState.keypressd.includes('ArrowDown') && this.gameState.paddelRightY < this.canvasHeight - this.height) {
      this.gameState.keypressd.push('ArrowDown');
    }
  }

  public updateGameState(data: string): void {
    this.gameState = JSON.parse(data);
    if (rightPlayerScoreLocal) rightPlayerScoreLocal.textContent = this.gameState.rightPlayerScore.toString();
    if (leftPlayerScoreLocal) leftPlayerScoreLocal.textContent = this.gameState.leftPlayerScore.toString();

    if (this.gameState.rightPlayerScore === 5 || this.gameState.leftPlayerScore === 5) {
      socketLocal.close();
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
