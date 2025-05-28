import './src/client/styles/game.css';

export function RemoteGame() {
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
  const disconnectedResult = document.getElementById(
    "disconnected"
  ) as HTMLElement;
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

  let roomdId = "123";

  let socket = new WebSocket(
    `ws://0.0.0.0:5000/remoteGame?token=${connectionId}&roomId=${roomdId}`
  );
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

        if (this.gameState.playerId === 1) {
          playerSide.innerText = "YOU ARE ON THE LEFT SIDE";
        } else if (this.gameState.playerId === 2) {
          playerSide.innerText = "YOU ARE ON THE RIGHT SIDE";
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
        disconnectedResult.style.display = "block";
        exit.addEventListener("click", () => {
          window.location.href = "/";
        });
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
  return (<div className="w-full h-full overflow-hidden bg-game-bg">
        <h1 className="text-center text-[100px] text-amber-50 top-20 "><span className="text-ping-yellow">PING</span> PONG</h1>
        <h3 className="text-center text-ping-yellow" id="playerSide">YOU ARE LEFT PLAYER</h3>
        <div className="flex items-center justify-center flex-col h-230 ">
            <div className="score flex justify-center gap-60 w-full">
                <h1 id="leftPlayerScoreRemote" className="text-amber-50 text-8xl">0</h1>
                <h1 id="rightPlayerScoreRemote" className="text-amber-50 text-8xl">0</h1>
            </div>
            <canvas className="bg-game-table z-10 border-4 border-white rounded-4xl" id="canvas" width="1000" height="600">
            </canvas>
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
        <div id="gameTab" className="h-80 w-150 bg-game-bg border-2 border-ping-yellow rounded-2xl absolute top-1/2 left-1/2 translate-y-[-20%] translate-x-[-50%] hidden  z-20">
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-5xl font-bold text-ping-yellow">GAME OVER</h1>
                <h1 id="result" className="text-2xl mt-2 text-amber-50">WON</h1>
                <button id="restartButton" className="cursor-pointer bg-ping-yellow text-game-bg py-5 px-10 mt-5 rounded-2xl glow-animation">PLAY AGAIN</button>
            </div>
        </div>
        <div id="disconnected" className="h-80 w-150 bg-game-bg border-2 border-ping-yellow rounded-2xl absolute top-1/2 left-1/2 translate-y-[-20%] translate-x-[-50%] hidden z-20">
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-5xl font-bold text-ping-yellow">GAME OVER</h1>
                <h1 className="text-2xl mt-2 text-amber-50">OPPONENT DISCONNECTED</h1>
                <button id="exit" className="cursor-pointer bg-ping-yellow text-game-bg py-5 px-10 mt-5 rounded-2xl glow-animation">EXIT</button>
            </div>
        </div>
    </div>);
}
