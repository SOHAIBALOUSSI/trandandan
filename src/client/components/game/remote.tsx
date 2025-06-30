import { getCurrentUser } from "@/utils/user-store";
import { UserProfile } from "types/types";

export function RemoteGame() {
  // Create a container element for the game
  const container = document.createElement('div');
  container.className = 'w-full h-[100vh] overflow-hidden bg-game-bg font-orbitron relative';

  // Add your game HTML structure
  container.innerHTML = `
    <h1 class="text-center text-[100px] text-amber-50 top-20">
      <span class="text-ping-yellow">PING</span> PONG
    </h1>
    <h3 class="text-center text-ping-yellow" id="playerSide">YOU ARE LEFT PLAYER</h3>
    <div class="flex items-center justify-center flex-col h-230">
      <div class="score flex justify-center gap-60 w-full">
        <h1 id="leftPlayerScoreRemote" class="text-amber-50 text-8xl">0</h1>
        <h1 id="rightPlayerScoreRemote" class="text-amber-50 text-8xl">0</h1>
      </div>
      <canvas class="bg-game-table z-10 border-4 border-white rounded-4xl" id="canvas" width="1000" height="600"></canvas>
    </div>
    <!-- Your decorative elements -->
    <div class="absolute w-10 h-10 bg-red-500 opacity-10 animate-square top-0 left-0"></div>
    <div class="absolute w-10 h-10 bg-blue-500 opacity-10 animate-square top-[45px] left-[500px]"></div>
    <div class="absolute w-10 h-10 bg-green-500 opacity-10 animate-square top-[800px] left-[322px]"></div>
    <div class="absolute w-10 h-10 bg-yellow-500 opacity-10 animate-square top-[550px] left-[800px]"></div>
    <div class="absolute w-10 h-10 bg-purple-500 opacity-10 animate-square top-[90px] left-[1800px]"></div>
    <div class="absolute w-10 h-10 bg-pink-500 opacity-10 animate-square top-[250px] left-[1656px]"></div>
    <div class="absolute w-10 h-10 bg-teal-500 opacity-10 animate-square top-[750px] left-[1100px]"></div>
    <div class="absolute w-10 h-10 bg-orange-500 opacity-10 animate-square top-[580px] left-[100px]"></div>
    <div class="absolute w-10 h-10 bg-indigo-500 opacity-10 animate-square top-[475px] left-[1580px]"></div>
    <div class="absolute w-10 h-10 bg-lime-500 opacity-10 animate-square top-[250px] left-[40px]"></div>
    <div class="absolute w-10 h-10 bg-cyan-500 opacity-10 animate-square top-[390px] left-[1800px]"></div>
    <div class="absolute w-10 h-10 bg-amber-500 opacity-10 animate-square top-[760px] left-[770px]"></div>
    <div class="absolute w-10 h-10 bg-rose-500 opacity-10 animate-square top-[200px] left-[250px]"></div>
    <div class="absolute w-10 h-10 bg-fuchsia-500 opacity-10 animate-square top-[890px] left-[1450px]"></div>
    <div class="absolute w-10 h-10 bg-emerald-500 opacity-10 animate-square top-[250px] left-[500px]"></div>
    <div class="absolute w-10 h-10 bg-violet-500 opacity-10 animate-square top-[15px] left-[1400px]"></div>
    <div class="absolute w-10 h-10 bg-sky-500 opacity-10 animate-square top-[240px] left-[1500px]"></div>
    <div class="absolute w-10 h-10 bg-amber-600 opacity-10 animate-square top-[100px] left-[320px]"></div>
    <div class="absolute w-10 h-10 bg-pink-600 opacity-10 animate-square top-[750px] left-[1700px]"></div>
    <div class="absolute w-10 h-10 bg-teal-600 opacity-10 animate-square top-[50px] left-[500px]"></div>
    <div class="absolute w-10 h-10 bg-indigo-600 opacity-10 animate-square top-[190px] left-[450px]"></div>
    <div id="gameTab" class="h-80 w-150 bg-game-bg border-2 border-ping-yellow rounded-2xl absolute top-1/2 left-1/2 translate-y-[-20%] translate-x-[-50%] hidden z-20">
      <div class="flex flex-col items-center justify-center h-full px-20 py-4">
        <h1 class="text-5xl font-bold text-ping-yellow">GAME OVER</h1>
        <h1 id="result" class="text-2xl mt-2 text-amber-50">WON</h1>
        <button id="restartButton" class="cursor-pointer bg-ping-yellow text-game-bg py-5 px-10 mt-5 rounded-2xl glow-animation">PLAY AGAIN</button>
        </div>
        </div>
        <div id="disconnected" class="h-80 w-150 bg-game-bg border-2 border-ping-yellow rounded-2xl absolute top-1/2 left-1/2 translate-y-[-20%] translate-x-[-50%] hidden z-20">
          <div class="flex flex-col items-center justify-center h-full px-20 py-4">
            <h1 class="text-5xl font-bold text-ping-yellow">GAME OVER</h1>
            <h1 class="text-2xl mt-2 text-amber-50"> DISCONNECTED</h1>
          </div>
        </div>
        <div id="exitTab" class="h-80 w-150 bg-game-bg  rounded-2xl absolute top-1/2 left-1/2 translate-y-[120%] translate-x-[-50%] ">
          <button id="exit" class="cursor-pointer bg-ping-yellow text-game-bg py-5 px-10 mt-5 rounded-2xl glow-animation">EXIT</button>
        </div>
  `;

  // Initialize game elements
  const canvas = container.querySelector('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const rightPlayerScore = container.querySelector('#rightPlayerScoreRemote') as HTMLElement;
  const leftPlayerScore = container.querySelector('#leftPlayerScoreRemote') as HTMLElement;
  const restartButton = container.querySelector('#restartButton') as HTMLButtonElement;
  const result = container.querySelector('#result') as HTMLElement;
  const gameTabe = container.querySelector('#gameTab') as HTMLElement;
  const disconnectedResult = container.querySelector('#disconnected') as HTMLElement;
  const exit = container.querySelector('#exit') as HTMLElement;
  const playerSide = container.querySelector('#playerSide') as HTMLElement;

  exit.addEventListener("click", () => {
    window.location.href = "/arena";
  });
  // Utility functions
  const userInfo = getCurrentUser();


  const getRoomIdByUserId = async (userId: number) => {
    return fetch('http://localhost:5000/getRoomId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),  // send { userId: someNumber }
    })
    .then(response => {
      if (!response.ok) {
        // Handle HTTP errors (like 404, 500)
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();  // Parse JSON body
    })
    .then(data => {
      // data will be the JSON response from your Fastify route
      // e.g. { message: "Room found", roomData: "room-123" }
      return data.roomData;  // return the roomData string
    })
    .catch(err => {
      console.error("Fetch error:", err);
      return null;  // or handle error how you want
    });
  };


  let roomdIdentif =  getRoomIdByUserId(userInfo?.id ?? 0);
  console.log("roomdIdentif:", roomdIdentif);
  let socket: WebSocket;


  // Initialize the game
  function init() {
    const userName: string = userInfo?.username ?? "username";
    socket = new WebSocket(
      `ws://0.0.0.0:5000/remoteGame?token=${userInfo?.userId}&roomId=${roomdIdentif}`
    );
    let keys: Record<string, boolean> = {};

    window.addEventListener('keydown', (key: KeyboardEvent) => {
      keys[key.key] = true;
    });

    window.addEventListener('keyup', (key: KeyboardEvent) => {
      keys[key.key] = false;
    });

    const flow = new FlowField(ctx, keys, {
      rightPlayerScore,
      leftPlayerScore,
      restartButton,
      result,
      gameTabe,
      disconnectedResult,
      exit,
      playerSide,
      socket,
      userName,
      roomdIdentif
    });

    socket.onopen = () => {
      console.log("connected");
    };

    socket.onclose = () => {
      
      console.log("match ended");
    };

    socket.onerror = (err) => {
      console.error("[client] WebSocket error:", err);
    };

    socket.onmessage = (event: MessageEvent) => {
      flow.updateGameState(event.data);
    };

    flow.animate();
  }

  // Start the game when the container is added to DOM
  init();

  return container;
}
let flag_one: boolean = true;
let flag_two: boolean = true;
let flag_update: boolean = true;

// Interfaces
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
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  velocityX: number;
  velocityY: number;
}

interface FlowFieldDependencies {
  rightPlayerScore: HTMLElement;
  leftPlayerScore: HTMLElement;
  restartButton: HTMLButtonElement;
  result: HTMLElement;
  gameTabe: HTMLElement;
  disconnectedResult: HTMLElement;
  exit: HTMLElement;
  playerSide: HTMLElement;
  socket: WebSocket;
  userName: string;
  roomdIdentif: string;
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
  private deps: FlowFieldDependencies;

  constructor(
    ctx: CanvasRenderingContext2D,
    keys: Record<string, boolean>,
    dependencies: FlowFieldDependencies
  ) {
    this.ctx = ctx;
    this.keys = keys;
    this.deps = dependencies;
    this.gameState = {
      matchId: "",
      playerId: 0,
      ballX: 500,
      ballY: 300,
      ballSpeed: 5,
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

  private sendPlayerData(playerData: PlayerData): void {
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

    // Paddle left
    this.ctx.fillStyle = "#E0A458";
    this.ctx.fillRect(10, this.gameState.paddleLeftY, this.width, this.height);
    this.ctx.strokeRect(10, this.gameState.paddleLeftY, this.width, this.height);

    // Paddle right
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
    if (this.keys["w"]) {
      this.gameState.keypressd = "w";
    } else if (this.keys["s"]) {
      this.gameState.keypressd = "s";
    }
  }

  private ballPositionUpdate(): void {
    if (this.deps.socket.readyState === WebSocket.OPEN) {
      this.deps.socket.send(JSON.stringify(this.gameState));
    }
  }

  private handleRestart(): void {
    this.deps.gameTabe.style.display = "none";
    const userInfo = getCurrentUser();

    // Reset the game state
    this.gameState = {
      matchId: "",
      playerId: 0,
      ballX: 500,
      ballY: 300,
      ballSpeed: 5,
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
      this.deps.socket.readyState === WebSocket.CLOSED ||
      this.deps.socket.readyState === WebSocket.CLOSING
    ) {
      const newSocket = new WebSocket(
        `ws://0.0.0.0:5000/remoteGame?token=${userInfo?.userId}&roomId=${this.deps.roomdIdentif}`
      );
      
      newSocket.onopen = () => {
        console.log("WebSocket reconnected");
        newSocket.send(JSON.stringify(this.gameState));
      };
      flag_one = true;
      flag_two = true;
      flag_update = true;
      newSocket.onmessage = (event: MessageEvent) => {
        this.updateGameState(event.data);
      };

      newSocket.onerror = (err) => {
        console.error("[client] WebSocket error:", err);
      };

      newSocket.onclose = () => {
        console.log("match ended");
      };

      this.deps.socket = newSocket;
    }
  }
  public normalizeUser(raw: any): UserProfile {
    return {
      id: raw.id,
      userId: raw.userId,
      username: raw.username,
      email: raw.email,
      gender: raw.gender,
      avatar_url: raw.avatar_url,
      status: raw.status,
      solde: raw.solde,
      rank: raw.rank,
      level: raw.level,
      created_at: raw.created_at,
      matchesPlayed: raw.matches_played ?? 0,
      matchesWon: raw.matches_won ?? 0,
      matchesLost: raw.matches_lost ?? 0,
    };
  }
  public updateUser(currentUser: UserProfile): void {
    fetch(`/profile/${currentUser.userId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentUser)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User updated successfully:", data);
      }
      )
      .catch((error) => {
        console.error("Error updating user:", error);
      });
    }
  public updateGameState(data: string): void {
    try {
      const parsedData: GameState = JSON.parse(data);
      this.gameState = parsedData;
      if (this.gameState.playerId === 1) {
        this.deps.playerSide.innerText = "YOU ARE ON THE LEFT SIDE";
      } else if (this.gameState.playerId === 2) {
        this.deps.playerSide.innerText = "YOU ARE ON THE RIGHT SIDE";
      }
      this.deps.rightPlayerScore.textContent = String(this.gameState.rightPlayerScore);
      this.deps.leftPlayerScore.textContent = String(this.gameState.leftPlayerScore);
      if (this.gameState.gameEndResult && this.gameState.gameEndResult.length !== 0) {
        const currentUser = getCurrentUser();
        console.log("currentUser:", currentUser);
        // const currentUser: UserProfile = this.normalizeUser(rawUser);
        
        this.gameState.endGame = true;
        this.deps.result.textContent = "You " + this.gameState.gameEndResult;
        this.deps.gameTabe.style.display = "block";

        if (this.gameState.playerId === 1 && flag_one === true) 
        {
          flag_one = false;
          if (currentUser) {
            if (this.gameState.gameEndResult === "Won") {
              currentUser.matchesWon += 1;
            } else if (this.gameState.gameEndResult === "Lost") {
                currentUser.matchesLost += 1;
            }
            currentUser.matchesPlayed += 1;
            currentUser.level += this.gameState.leftPlayerScore;
            if (this.gameState.gameEndResult === "Won")
            {
                currentUser.level += 10;
            }
            else if (this.gameState.gameEndResult === "Lost")
            {
                if (currentUser.level > 5)
                    currentUser.level -= 5;
            }
          }
        }

        if (this.gameState.playerId === 2 && flag_two === true) 
        {
          flag_two = false;
          if (currentUser) {
            if (this.gameState.gameEndResult === "Won") {
              currentUser.matchesWon += 1;
            } else if (this.gameState.gameEndResult === "Lost") {
                currentUser.matchesLost += 1;
            }
            currentUser.matchesPlayed += 1;
            currentUser.level += this.gameState.rightPlayerScore;
            if (this.gameState.gameEndResult === "Won")
            {
                currentUser.level += 10;
            }
            else if (this.gameState.gameEndResult === "Lost")
            {
                if (currentUser.level > 5)
                    currentUser.level -= 5;
            }
          }
        }
        const playerData: PlayerData = {
          userName: this.deps.userName,
          matchId: this.gameState.matchId,
          playerId: this.gameState.playerId,
          leftPlayerScore: this.gameState.leftPlayerScore,
          rightPlayerScore: this.gameState.rightPlayerScore,
          gameDuration: this.gameState.endTime,
          gameEndResult: this.gameState.gameEndResult,
          leftPlayerBallHit: this.gameState.leftPlayerBallHit,
          rightPlayerBallHit: this.gameState.rightPlayerBallHit,
        };
        if (currentUser && flag_update === true)
        {
          flag_update = false;
          if (this.gameState.playerId === 1)
            this.updateUser(currentUser);
          else if (this.gameState.playerId === 2)
            this.updateUser(currentUser);
        }
        this.sendPlayerData(playerData);
        this.deps.restartButton.addEventListener("click", this.handleRestart.bind(this));
      }
    } catch (error) {
      console.error("Error parsing game state:", error);
      this.deps.disconnectedResult.style.display = "block";
    }
  }

  public animate(): void {
    this.draw();
    this.keysFunction();
    this.ballPositionUpdate();
    requestAnimationFrame(this.animate.bind(this));
  }
}