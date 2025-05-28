
export function Tournaments() {
  // Create container element
  const container = document.createElement('div');
  container.className = 'w-full h-full overflow-hidden bg-game-bg';

  // Add HTML structure
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
    <!-- Decorative elements -->
    <div class="absolute w-10 h-10 bg-red-500 opacity-10 animate-square top-0 left-0"></div>
    <!-- Add all other decorative divs -->
    <!-- Game tab -->
    <div id="gameTab" class="h-80 w-150 bg-game-bg border-2 border-ping-yellow rounded-2xl absolute top-1/2 left-1/2 translate-y-[-20%] translate-x-[-50%] hidden z-20">
      <div class="flex flex-col items-center justify-center h-full">
        <h1 id="result" class="text-2xl mt-2 text-amber-50"></h1>
        <h1 id="currentMatch" class="text-2xl mt-2 text-amber-50"></h1>
        <h1 id="prevMatch" class="text-ping-yellow"></h1>
        <h1 id="nextMatch" class="text-ping-yellow"></h1>
        <button id="restart" class="cursor-pointer bg-ping-yellow text-game-bg py-5 px-10 mt-5 rounded-2xl glow-animation hidden">PLAY</button>
        <button id="start" class="cursor-pointer bg-ping-yellow text-game-bg py-5 px-10 mt-5 rounded-2xl glow-animation">PLAY</button>
      </div>
    </div>
    <!-- Result tab -->
    <div id="resultTab" class="h-80 w-150 bg-game-bg border-2 border-ping-yellow rounded-2xl absolute top-1/2 left-1/2 translate-y-[-20%] translate-x-[-50%] hidden z-20">
      <div class="flex flex-col items-center justify-center h-full">
        <h1 id="resultStat" class="text-2xl mt-2 text-amber-50"></h1>
        <button id="restartTournoi" class="cursor-pointer bg-ping-yellow text-game-bg py-5 px-10 mt-5 rounded-2xl glow-animation">PLAY AGAIN</button>
      </div>
    </div>
    <!-- Tournament tab -->
    <div id="tourTab" class="h-80 w-150 bg-game-bg border-2 border-ping-yellow rounded-2xl absolute top-1/2 left-1/2 translate-y-[-20%] translate-x-[-50%] z-20">
      <div id="selectTab" class="flex flex-col items-center justify-center h-full">
        <h1 class="text-2xl text-ping-yellow">SELECT THE NUMBER OF PLAYERS</h1>
        <div id="tournPlayerNumber" class="flex items-center justify-center gap-20">
          <button id="eight_players" class="cursor-pointer bg-ping-yellow text-game-bg py-5 px-10 mt-5 rounded-2xl glow-animation">8</button>
          <button id="four_Players" class="cursor-pointer bg-ping-yellow text-game-bg py-5 px-10 mt-5 rounded-2xl glow-animation">4</button>
        </div>
      </div>
      <div id="inputPlayers" class="h-full hidden">
        <div class="flex flex-col items-center justify-center mt-20">
          <h1 class="text-2xl text-ping-yellow">ENTER THE PLAYER'S USERNAME</h1>
          <div class="flex items-center justify-center gap-20">
            <div>
              <label for="playerId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PLAYER ID</label>
              <input type="text" id="playerIdField" class="bg-game-bg border border-ping-yellow text-amber-50 text-sm rounded-lg focus:ring-ping-yellow focus:border-ping-yellow block w-full p-2.5 placeholder-amber-50" maxlength="15" pattern="[A-Za-z0-9]+" title="Only alphanumeric characters are allowed and up to 15 characters" required />
            </div>
            <button id="addPlayerBtn" class="cursor-pointer bg-ping-yellow text-game-bg py-5 px-5 mt-5 rounded-2xl glow-animation">ADD PLAYER</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Get DOM elements
  const canvas = container.querySelector('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const rightPlayerScoreLocal = container.querySelector('#rightPlayerScoreLocal') as HTMLElement;
  const leftPlayerScoreLocal = container.querySelector('#leftPlayerScoreLocal') as HTMLElement;
  const gameTab = container.querySelector('#gameTab') as HTMLElement;
  const result = container.querySelector('#result') as HTMLElement;
  const restart = container.querySelector('#restart') as HTMLElement;
  const players8 = container.querySelector('#eight_players') as HTMLElement;
  const players4 = container.querySelector('#four_Players') as HTMLElement;
  const selectTab = container.querySelector('#selectTab') as HTMLElement;
  const inputPlayers = container.querySelector('#inputPlayers') as HTMLElement;
  const playerIdField = container.querySelector('#playerIdField') as HTMLInputElement;
  const addPlayerBtn = container.querySelector('#addPlayerBtn') as HTMLElement;
  const tourTab = container.querySelector('#tourTab') as HTMLElement;
  const prevMatch = container.querySelector('#prevMatch') as HTMLElement;
  const currentMatch = container.querySelector('#currentMatch') as HTMLElement;
  const nextMatch = container.querySelector('#nextMatch') as HTMLElement;
  const resultTab = container.querySelector('#resultTab') as HTMLElement;
  const resultStat = container.querySelector('#resultStat') as HTMLElement;
  const restartTournoi = container.querySelector('#restartTournoi') as HTMLElement;
  const start = container.querySelector('#start') as HTMLElement;
  console.log("[client] Tournaments component is being initialized"); 

  // Game state
  let numberOfPlayers = 0;
  let socketLocal: WebSocket;
  const Players: string[] = [];
  const Winners: string[] = [];

  // Initialize the game
  function init() {
    socketLocal = new WebSocket("ws://0.0.0.0:5000/ws");
    
    const keys: { [key: string]: boolean } = {};

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
      Players,
      Winners,
      prevMatch,
      currentMatch,
      nextMatch,
      resultTab,
      resultStat,
      restartTournoi,
      socketLocal,
      start
    });

    // Setup event listeners
    players4.addEventListener('click', () => {
      selectTab.style.display = "none";
      inputPlayers.style.display = "block";
      numberOfPlayers = 4;
    });

    players8.addEventListener('click', () => {
      selectTab.style.display = "none";
      inputPlayers.style.display = "block";
      numberOfPlayers = 8;
    });

    addPlayerBtn.addEventListener('click', () => {
      if (!playerIdField.checkValidity()) {
        alert("Invalid input! Please enter a valid player ID.");
        return;
      }
      if (Players.includes(playerIdField.value)) {
        alert("Player Already Exist.");
        return;
      }
      Players.push(playerIdField.value);
      playerIdField.value = "";

      if (Players.length === numberOfPlayers) {
        inputPlayers.style.display = "none";
        tourTab.style.display = "none";
        gameTab.style.display = "block";
        currentMatch.textContent = `${Players[0]} vs ${Players[1]}`;
        if (Players.length > 2) {
          nextMatch.textContent = `NEXT MATCH: ${Players[2]} vs ${Players[3]}`;
        }
        
        start.addEventListener('click', () => {
          start.style.display = "none";
          restart.style.display = "block";
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
  // Start initialization
  setTimeout(init, 0);

  console.log("[client] Tournaments component initialized");
  return container;
}

// Interfaces
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

class FlowFieldLocal {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private keys: { [key: string]: boolean };
  private gameState: GameStateLocal;
  private canvasWidth: number;
  private canvasHeight: number;
  private particles: Particle[] = [];
  private deps: FlowFieldDependencies;

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

  private ballParticle(x: number, y: number): void {
    for (let i = 0; i < 5; i++) {
      this.particles.push({
        x: x,
        y: y,
        radius: Math.random() * 2 + 1,
        color: "#C44536",
        alpha: 1,
        velocityX: (Math.random() - 0.5) * 2,
        velocityY: (Math.random() - 0.5) * 2,
      });
    }
  }

  private updateParticles(): void {
    this.particles.forEach((particle, index) => {
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      particle.alpha -= 0.02;

      if (particle.alpha <= 0) {
        this.particles.splice(index, 1);
      }
    });
  }

  private drawParticles(): void {
    this.particles.forEach((particle) => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color.replace("1)", `${particle.alpha})`);
      this.ctx.fill();
    });
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Left paddle
    this.ctx.fillStyle = "#E0A458";
    this.ctx.fillRect(10, this.gameState.paddleLeftY, this.width, this.height);
    this.ctx.strokeRect(10, this.gameState.paddleLeftY, this.width, this.height);

    // Right paddle
    this.ctx.fillRect(980, this.gameState.paddelRightY, this.width, this.height);
    this.ctx.strokeRect(980, this.gameState.paddelRightY, this.width, this.height);

    // Ball
    this.ctx.fillStyle = "#C44536";
    this.ctx.beginPath();
    this.ctx.arc(this.gameState.ballX, this.gameState.ballY, 13, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    this.ballParticle(this.gameState.ballX, this.gameState.ballY);
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
    if (this.deps.result.textContent === `Winner: ${this.deps.Players[1]}`) {
      this.deps.Winners.push(this.deps.Players[1]);
    } else if (this.deps.result.textContent === `Winner: ${this.deps.Players[0]}`) {
      this.deps.Winners.push(this.deps.Players[0]);
    }

    const oldPlayerLeft = this.deps.Players[0];
    const oldPlayerRight = this.deps.Players[1];

    this.deps.Players.splice(0, 2);

    if (this.deps.Players.length < 1) {
      // Move winners to the next round
      this.deps.Players = [...this.deps.Winners];
      this.deps.Winners = [];

      // If there's only one winner left, declare them as the final winner
      if (this.deps.Players.length === 1) {
        this.deps.restartTournoi.addEventListener("click", () => {
          window.location.reload();
        });
        this.deps.resultStat.textContent = `Tournament winner is: ${this.deps.Players[0]}`;
        this.deps.resultTab.style.display = "block";
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
    this.deps.gameTab.style.display = "block";
    this.deps.socketLocal.close();
    
    this.deps.restart.addEventListener("click", () => {
      this.deps.gameTab.style.display = "none";
      const newSocket = new WebSocket("ws://0.0.0.0:5000/ws");
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

      this.deps.rightPlayerScoreLocal.textContent = this.gameState.rightPlayerScore.toString();
      this.deps.leftPlayerScoreLocal.textContent = this.gameState.leftPlayerScore.toString();

      if (this.gameState.rightPlayerScore === 5) {
        this.deps.result.textContent = `Winner: ${this.deps.Players[1]}`;
        this.setInitialStat();
      } else if (this.gameState.leftPlayerScore === 5) {
        this.deps.result.textContent = `Winner: ${this.deps.Players[0]}`;
        this.setInitialStat();
      }
    } catch (error) {
      console.error("Error updating game state:", error);
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