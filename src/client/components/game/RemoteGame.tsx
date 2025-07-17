import { navigateTo } from "@/utils/navigate-to-link";
import { getCurrentUser } from "@/utils/user-store";
import { UserProfile } from "types/types";

export function RemoteGame() {
  // Create a container element for the game
  const container = document.createElement("div");
  container.className =
    "w-full h-[100vh] overflow-hidden bg-pong-dark-bg font-orbitron relative";

  // Add your game HTML structure
  container.innerHTML = `
    <h1 class="text-center text-[100px] text-amber-50 top-20">
      <span class="text-pong-dark-secondary">PING</span> PONG
    </h1>
    <h3 class="text-center text-pong-dark-secondary" id="playerSide">YOU ARE LEFT PLAYER</h3>
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
        <div id="exitTab" class="h-80 w-150 bg-pong-dark-bg  rounded-2xl absolute top-1/2 left-1/2 translate-y-[120%] translate-x-[-50%] ">
          <button id="exit" class="cursor-pointer bg-pong-dark-secondary text-pong-dark-bg py-5 px-10 mt-5 rounded-2xl glow-animation">EXIT</button>
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
  solde: number;
  level: number;
  matchPlayed: number;
  matchWon: number;
  matchLost: number;
  enemyId: number;
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
  Solde: number;
  level: number;
  matchPlayed: number;
  matchWon: number;
  matchLost: number;
  enemyId: number; // Added enemyId to track the opponent
  userId?: number; // Optional, used for server-side updates
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
interface LastMatchData {
  level: number;
  Solde: number;
  matchPlayed: number;
  matchWon: number;
  matchLost: number;
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
      solde: 5,
      level: 0,
      matchPlayed: 0,
      matchWon: 0,
      matchLost: 0,
      enemyId: 0, // Added enemyId to track the opponent
    };

    this.deps.restartButton.addEventListener("click", async () => {
      try {
        // Fetch the latest user level from the server
        const getLastUserData =
        await this.getOldDataOfgetCurrentUserDataMatchId();
        // console.log("Last match data fetched:___", getLastUserData);
        this.handleRestart(getLastUserData);
      } catch (error) {
        console.error("Error fetching user level:", error);
        // Fallback to cached user level
        // const currentUser = getCurrentUser();
        // const fallbackLevel = currentUser?.level ?? 0;
        // console.log("Using fallback level:", fallbackLevel);
        // this.handleRestart(fallbackLevel);
      }
    });
  }
  private async getOldDataOfgetCurrentUserDataMatchId(): Promise<LastMatchData> {
    const response = await fetch(
      `http://localhost:5000/last-match/${this.deps.userName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const matchData = data[0]; 

    return matchData as LastMatchData;
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

  private handleRestart(lastUserData: LastMatchData): void {
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
      solde: lastUserData.Solde, // Use the last match data
      level: lastUserData.level,
      matchPlayed: lastUserData.matchPlayed,
      matchWon: lastUserData.matchWon,
      matchLost: lastUserData.matchLost,
      enemyId: 0, // Reset enemyId
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
    console.log("Updating user data:");
    const payload = {
      level: currentUser.level,
      solde: currentUser.solde,
      matches_played: currentUser.matches_played,
      matches_won: currentUser.matches_won,
      matches_lost: currentUser.matches_lost,
    };
    fetch(`/profile/user/${currentUser.userId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("User updated successfully:", data);
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
        this.gameState.endGame = true;
        this.deps.result.textContent = "You " + this.gameState.gameEndResult;
        this.deps.gameTabe.style.display = "block";
        (async () => {
          const getOldDataOfCurrentUserData = getCurrentUser();
          const cuurrUser = getOldDataOfCurrentUserData?.userId;
          if (!getOldDataOfCurrentUserData) {
            console.warn(
              "No previous match data found. Initializing defaults."
            );
            const playerData: PlayerData = {
              userName: this.deps.userName,
              matchId: this.gameState.matchId,
              playerId: this.gameState.playerId,
              leftPlayerScore: this.gameState.leftPlayerScore,
              rightPlayerScore: this.gameState.rightPlayerScore,
              gameDuration: this.gameState.endTime,
              gameEndResult: this.gameState.gameEndResult ?? "",
              leftPlayerBallHit: this.gameState.leftPlayerBallHit,
              rightPlayerBallHit: this.gameState.rightPlayerBallHit,
              level: 5,
              Solde: 5,
              matchPlayed: 1,
              matchWon: this.gameState.gameEndResult === "Won" ? 1 : 0,
              matchLost: this.gameState.gameEndResult === "Lost" ? 1 : 0,
              enemyId: this.gameState.enemyId, // Include
              userId: cuurrUser,
            };

            const currentUser = getCurrentUser();
            if (currentUser) {
              currentUser.solde = 5;
              currentUser.level = 5;
              currentUser.matches_played = 1;
              currentUser.matches_won =
                this.gameState.gameEndResult === "Won" ? 1 : 0;
              currentUser.matches_lost =
                this.gameState.gameEndResult === "Lost" ? 1 : 0;
              if (this.gameState.playerId === 1) this.updateUser(currentUser);
              else if (this.gameState.playerId === 2)
                this.updateUser(currentUser);
            }
            this.sendPlayerData(playerData);
            return;
          }
          if (this.gameState.playerId === 1 && flag_one === true) {
            flag_one = false;

            const scoreFactor = 0.1;
            const levelGain = this.gameState.leftPlayerBallHit * scoreFactor;

            this.gameState.matchPlayed =
              getOldDataOfCurrentUserData.matches_played + 1;
            if (this.gameState.gameEndResult === "Won") {
              this.gameState.solde = Math.max(
                0,
                5 + getOldDataOfCurrentUserData.solde
              );
              console.log("gamseStat ", this.gameState.level);
              console.log("OldGamestat ", getOldDataOfCurrentUserData.level);
              this.gameState.level += getOldDataOfCurrentUserData.level + 1; // 1 is the win bonus
              this.gameState.matchLost =
                getOldDataOfCurrentUserData.matches_lost;
              this.gameState.matchWon =
                getOldDataOfCurrentUserData.matches_won + 1;
            } else if (this.gameState.gameEndResult === "Lost") {
              this.gameState.solde = Math.max(
                0,
                getOldDataOfCurrentUserData.solde - 5
              );
              if (getOldDataOfCurrentUserData.level - 1 < 0) {
                this.gameState.level = 0; // Ensure level never goes negative
              } else
                this.gameState.level = getOldDataOfCurrentUserData.level - 1; // Subtract penalty safely
              this.gameState.matchLost =
                getOldDataOfCurrentUserData.matches_lost + 1;
              this.gameState.matchWon = getOldDataOfCurrentUserData.matches_won;
            }
            console.log("player 1 ", this.gameState.level);
          }

          if (this.gameState.playerId === 2 && flag_two === true) {
            flag_two = false;
            const scoreFactor = 0.1; // adjust this value to control how much each point increases the level
            const levelGain = this.gameState.rightPlayerBallHit * scoreFactor;

            this.gameState.matchPlayed =
              getOldDataOfCurrentUserData.matches_played + 1;
            if (this.gameState.gameEndResult === "Won") {
              this.gameState.solde = Math.max(
                0,
                5 + getOldDataOfCurrentUserData.solde
              );
              this.gameState.level = getOldDataOfCurrentUserData.level + 1; // 1 is the win bonus
              this.gameState.matchWon =
                getOldDataOfCurrentUserData.matches_won + 1;
              this.gameState.matchLost =
                getOldDataOfCurrentUserData.matches_lost;
            } else if (this.gameState.gameEndResult === "Lost") {
              // Ensure solde and level never go negative
              this.gameState.solde = Math.max(
                0,
                getOldDataOfCurrentUserData.solde - 5
              );
              if (getOldDataOfCurrentUserData.level - 1 < 0) {
                this.gameState.level = 0; // Ensure level never goes negative
              } else
                this.gameState.level = getOldDataOfCurrentUserData.level - 1; // Subtract penalty safely
              this.gameState.matchLost =
                getOldDataOfCurrentUserData.matches_lost + 1;
              this.gameState.matchWon = getOldDataOfCurrentUserData.matches_won;
            }

            // Ensure level stays non-negative
            console.log("player id", this.gameState.level);
          }
          const currentUser = getCurrentUser();
          const playerData: PlayerData = {
            userName: this.deps.userName,
            matchId: this.gameState.matchId,
            playerId: this.gameState.playerId,
            leftPlayerScore: this.gameState.leftPlayerScore,
            rightPlayerScore: this.gameState.rightPlayerScore,
            gameDuration: this.gameState.endTime,
            gameEndResult: this.gameState.gameEndResult ?? "",
            leftPlayerBallHit: this.gameState.leftPlayerBallHit,
            rightPlayerBallHit: this.gameState.rightPlayerBallHit,
            level: this.gameState.level,
            Solde: this.gameState.solde,
            matchPlayed: this.gameState.matchPlayed,
            matchWon: this.gameState.matchWon,
            matchLost: this.gameState.matchLost,
            enemyId: this.gameState.enemyId, // Include
            userId: currentUser?.userId ?? 0, // Include userId
          };
          this.sendPlayerData(playerData);

          if (currentUser) {
            currentUser.solde = this.gameState.solde;
            currentUser.level = this.gameState.level;
            currentUser.matches_played = this.gameState.matchPlayed;
            currentUser.matches_won = this.gameState.matchWon;
            currentUser.matches_lost = this.gameState.matchLost;
            if (this.gameState.playerId === 1 && flag_update === true) {
              flag_update = false;
              this.updateUser(currentUser);
            } else if (this.gameState.playerId === 2 && flag_update === true) {
              flag_update = false;
              this.updateUser(currentUser);
            }
          }
        })();
        // this.deps.restartButton.addEventListener("click", () => {
        //     console.log("level", this.gameState.level);
        //     this.handleRestart(this.gameState.level);
        // });
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
