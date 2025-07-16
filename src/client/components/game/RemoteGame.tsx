import { navigateTo } from "@/utils/navigate-to-link";
import { getCurrentUser } from "@/utils/user-store";
import { UserProfile } from "types/types";
import { initGameThemeToggle } from "@/utils/game-theme-toggle";
import { styles } from "@/styles/styles";

export function RemoteGame() {
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
  container.className = styles.gameContainer;
  container.id = "game-screen";
  container.dataset.theme = localStorage.getItem("gameTheme") || "dark";

  // Add your game HTML structure
  container.innerHTML = `
  	<button id="exit" class="${styles.gameExitBtn} group" title="Leave Lounge">
      <i class="fa-solid fa-arrow-left"></i>
	  <span class="absolute text-xs bg-black/80 text-white px-2 py-0.5 rounded left-1/2 -translate-x-1/2 top-full mt-1 opacity-0 group-hover:opacity-100 transition">
        Leave Lounge
      </span>
  	</button>
  	<button id="game-theme-toggle" class="${styles.gameThemeBtn} group" title="Switch Mood">
      <i class="fa-solid fa-circle-half-stroke"></i>
  	</button>

  	<h1 id="title" class="${styles.gameTitle}">
      BHV <span class="text-pong-dark-accent font-orbitron">PONG</span>
  	</h1>

    <h3 class="text-center text-pong-dark-secondary" id="playerSide">YOU ARE LEFT PLAYER</h3>

   	<div class="flex items-center justify-center flex-col w-full" style="min-height:${canvasHeight}px;">
      <div class="score flex justify-center gap-20 md:gap-60 w-full mb-4 transition-all duration-300">
		<span id="leftPlayerScoreLocal" class="text-3xl md:text-5xl font-semibold font-orbitron">0</span>
		<span id="rightPlayerScoreLocal" class="text-3xl md:text-5xl font-semibold font-orbitron">0</span>
	  </div>

      <div class="flex justify-center w-full pb-8">
		<canvas class="${styles.gameCanvas}"
        		id="canvas"
        		width=${canvasWidth}
        		height=${canvasHeight}>
      	</canvas>
      </div>
  	</div>

    <div id="gameTab" class="h-80 w-150 bg-pong-dark-bg border-2 border-pong-dark-secondary rounded-2xl absolute top-1/2 left-1/2 translate-y-[-20%] translate-x-[-50%] hidden z-20">
      <div class="flex flex-col items-center justify-center h-full px-20 py-4">
        <h1 class="text-5xl font-bold text-pong-dark-secondary">GAME OVER</h1>
        <h1 id="result" class="text-2xl mt-2 text-amber-50">WON</h1>
        <button id="restartButton" class="cursor-pointer bg-pong-dark-secondary text-pong-dark-bg py-5 px-10 mt-5 rounded-2xl glow-animation">PLAY AGAIN</button>
      </div>
    </div>

    <div id="disconnected" class="h-80 w-150 bg-pong-dark-bg border-2 border-pong-dark-secondary rounded-2xl absolute top-1/2 left-1/2 translate-y-[-20%] translate-x-[-50%] hidden z-20">
        <div class="flex flex-col items-center justify-center h-full px-20 py-4">
          <h1 class="text-5xl font-bold text-pong-dark-secondary">GAME OVER</h1>
          <h1 class="text-2xl mt-2 text-amber-50"> DISCONNECTED</h1>
        </div>
    </div>
 
  `;

  // Initialize game elements
  const canvas = container.querySelector("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const rightPlayerScore = container.querySelector(
    "#rightPlayerScoreRemote"
  ) as HTMLElement;
  const leftPlayerScore = container.querySelector(
    "#leftPlayerScoreRemote"
  ) as HTMLElement;
  const restartButton = container.querySelector(
    "#restartButton"
  ) as HTMLButtonElement;
  const result = container.querySelector("#result") as HTMLElement;
  const gameTabe = container.querySelector("#gameTab") as HTMLElement;
  const disconnectedResult = container.querySelector(
    "#disconnected"
  ) as HTMLElement;
  const exit = container.querySelector("#exit") as HTMLElement;
  const playerSide = container.querySelector("#playerSide") as HTMLElement;

  // Utility functions
  const userInfo = getCurrentUser();

  const getRoomIdByUserId = async (userId: number) => {
    return fetch("http://localhost:5000/getRoomId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }), // send { userId: someNumber }
    })
      .then((response) => {
        if (!response.ok) {
          // Handle HTTP errors (like 404, 500)
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON body
      })
      .then((data) => {
        // data will be the JSON response from your Fastify route
        // e.g. { message: "Room found", roomData: "room-123" }
        return data.roomData; // return the roomData string
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        return null; // or handle error how you want
      });
  };

  let socket: WebSocket;

  // Initialize the game
  async function init() {
    const userName: string = userInfo?.username ?? "username";
    const roomdIdentif = await getRoomIdByUserId(userInfo?.id ?? 0);
    console.log("roomdIdentif:", roomdIdentif);

    socket = new WebSocket(
      `ws://0.0.0.0:5000/remoteGame?token=${userInfo?.userId}&roomId=${roomdIdentif}`
    );
    exit.addEventListener("click", () => {
      socket.close();
      navigateTo("/arena");
    });
    let keys: Record<string, boolean> = {};
    window.addEventListener("keydown", (key: KeyboardEvent) => {
      keys[key.key] = true;
    });

    window.addEventListener("keyup", (key: KeyboardEvent) => {
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
      roomdIdentif,
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

  window.addEventListener("resize", (e) => {
    e.preventDefault();
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
  private deps: FlowFieldDependencies;
  private ballPulse: number = 0;

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

  private draw(): void {
    const isDark =
      document.getElementById("game-screen")?.dataset.theme === "dark";

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Paddle left
    this.ctx.fillStyle = isDark ? "#00B894" : "#FFD700";
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
   this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(
      this.gameState.ballX,
      this.gameState.ballY,
      13,
      0,
      Math.PI * 2
    );
    this.ctx.shadowColor = isDark ? "#FFD700" : "#00B894";
    this.ctx.shadowBlur = 24;
    this.ctx.fillStyle = isDark ? "#FFD700" : "#00B894";
    this.ctx.fill();
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = isDark ? "#fff" : "#23272f";
    this.ctx.stroke();
    this.ctx.restore();
    this.ballPulse += 0.08;
    this.ctx.globalAlpha = 0.25 + 0.15 * Math.sin(this.ballPulse);
    this.ctx.beginPath();
    this.ctx.arc(
      this.gameState.ballX,
      this.gameState.ballY,
      13 + 10 + 5 * Math.abs(Math.sin(this.ballPulse)),
      0,
      Math.PI * 2
    );
    this.ctx.fillStyle = isDark ? "#FFD700" : "#00B894";
    this.ctx.fill();
    this.ctx.globalAlpha = 1;
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
  public normalizeUser(raw: UserProfile): UserProfile {
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
      matches_played: raw.matches_played ?? 0,
      matches_won: raw.matches_won ?? 0,
      matches_lost: raw.matches_lost ?? 0,
    };
  }
  public updateUser(currentUser: UserProfile): void {
    fetch(`/profile/${currentUser.userId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User updated successfully:", data);
      })
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
      this.deps.rightPlayerScore.textContent = String(
        this.gameState.rightPlayerScore
      );
      this.deps.leftPlayerScore.textContent = String(
        this.gameState.leftPlayerScore
      );
      if (
        this.gameState.gameEndResult &&
        this.gameState.gameEndResult.length !== 0
      ) {
        const currentUser = getCurrentUser();
        console.log("currentUser:", currentUser);
        // const currentUser: UserProfile = this.normalizeUser(rawUser);

        this.gameState.endGame = true;
        this.deps.result.textContent = "You " + this.gameState.gameEndResult;
        this.deps.gameTabe.style.display = "block";

        if (this.gameState.playerId === 1 && flag_one === true) {
          flag_one = false;
          if (currentUser) {
            if (this.gameState.gameEndResult === "Won") {
              currentUser.matches_won += 1;
            } else if (this.gameState.gameEndResult === "Lost") {
              currentUser.matches_lost += 1;
            }
            currentUser.matches_played += 1;
            currentUser.level += this.gameState.leftPlayerScore;
            if (this.gameState.gameEndResult === "Won") {
              currentUser.level += 10;
            } else if (this.gameState.gameEndResult === "Lost") {
              if (currentUser.level > 5) currentUser.level -= 5;
            }
          }
        }

        if (this.gameState.playerId === 2 && flag_two === true) {
          flag_two = false;
          if (currentUser) {
            if (this.gameState.gameEndResult === "Won") {
              currentUser.matches_won += 1;
            } else if (this.gameState.gameEndResult === "Lost") {
              currentUser.matches_lost += 1;
            }
            currentUser.matches_played += 1;
            currentUser.level += this.gameState.rightPlayerScore;
            if (this.gameState.gameEndResult === "Won") {
              currentUser.level += 10;
            } else if (this.gameState.gameEndResult === "Lost") {
              if (currentUser.level > 5) currentUser.level -= 5;
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
        if (currentUser && flag_update === true) {
          flag_update = false;
          if (this.gameState.playerId === 1) this.updateUser(currentUser);
          else if (this.gameState.playerId === 2) this.updateUser(currentUser);
        }
        this.sendPlayerData(playerData);
        this.deps.restartButton.addEventListener(
          "click",
          this.handleRestart.bind(this)
        );
      }
    } catch (err) {
      console.error("Error parsing game state:", err);
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
