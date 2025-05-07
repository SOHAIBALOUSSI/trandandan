const rightPlayerScore = document.getElementById('rightScore');
const leftPlayerScore = document.getElementById('leftScore');
const gameEnd = document.getElementById('gameEnd');
const exitButton = document.getElementById('exitButton');
const restartButton = document.getElementById("restartButton");

function generateToken(params) {
  let roomId = "";
  
  const stringOfChar = "abcdefghijklmnopqrstuvwxyz0123456789";
  
  for (let index = 0; index < 12; index++) {
    roomId += stringOfChar[Math.floor(Math.random() * stringOfChar.length)]; 
  }
  return roomId;
}
let token = generateToken();
console.log(token);
const test = localStorage.getItem('player');
if (test === null)
  localStorage.setItem('player', token);

const socket = new WebSocket(`ws://localhost:5000/remoteGame?token=${test}`);
console.log("reconnected")
  window.onload = () => {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      socket.onopen = () => {
          console.log('connected');
      }
      socket.onmessage = (event) => {
          console.log('[client] Message from server:', event.data);
      };
      socket.onclose = () => {
        console.log('[client] Disconnected from server');
        socket.close();
        // setTimeout(() => {
          // const ws = new WebSocket(`ws://localhost:5000/remoteGame?token=${test}`);
          // ws.onopen = () => {
          // }
        // }, 2000);
      };
      socket.onerror = (err) => {
        console.error('[client] WebSocket error:', err);
      };


      let keys = {};
      window.addEventListener('keydown', (key) => {
        keys[key.key] = true;
      })
      window.addEventListener('keyup', (key) => {
        keys[key.key] = false;
      })
      socket.onmessage = (event) => {
          flow.updateGameState(event.data); 
      };
      const flow = new FlowField(ctx, keys);
      flow.animate();
  }

class FlowField {
    #ctx;
    #width;
    #height;
    #keys;
    #gameState;
    #canvasWidth;
    #canvasHeight;
    constructor(ctx, keys) {
      this.#width = 10;
      this.#height = 150;
      this.#canvasWidth = 900;
      this.#canvasHeight = 600;
      this.#ctx = ctx;
      this.#keys = keys;
      this.#gameState = {
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
    updateGameState(data) {
      try {
        this.#gameState = JSON.parse(data);
        rightPlayerScore.textContent = this.#gameState.rightPlayerScore;
        leftPlayerScore.textContent = this.#gameState.leftPlayerScore;
        if (this.#gameState.gameEnd.length != 0) {
          this.#gameState.restart = true;
          gameEnd.textContent = this.#gameState.gameEnd;
          this.#gameState.leftPlayerScore = 0;
          this.#gameState.rightPlayerScore = 0;
          rightPlayerScore.textContent = this.#gameState.rightPlayerScore;
          leftPlayerScore.textContent = this.#gameState.leftPlayerScore;
          this.#gameState.gameEnd = '';
          
          setTimeout(() => {
            gameEnd.textContent = ''; // Clear game end message
            gameEnd.innerHTML = ''; // Remove buttons
          }, 3000);
          restartButton.addEventListener('click', () => {
            this.#gameState.restart = false;
          })
        }
      } catch (error) {
        console.log(data);
      }
    }
    #draw() 
    {
      this.#ctx.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight);
  
    //   paddle left 
      this.#ctx.fillRect(0, this.#gameState.paddleLeftY, this.#width, this.#height);
      this.#ctx.strokeRect(0, this.#gameState.paddleLeftY, this.#width, this.#height);
  
      //paddle right
      this.#ctx.fillRect(890, this.#gameState.paddelRightY, this.#width, this.#height);
      this.#ctx.strokeRect(890, this.#gameState.paddelRightY, this.#width, this.#height);
  
  
      //ball
      this.#ctx.beginPath();
      this.#ctx.arc(this.#gameState.ballX, this.#gameState.ballY, 13, 0, Math.PI * 2);
      this.#ctx.fill();
      this.#ctx.stroke();
    }
    
    keysFunction() 
    {
        if (this.#keys["w"] === true)
        {
          this.#gameState.keypressd.push("w");
        }
        if (this.#keys["s"] === true)
        {
          this.#gameState.keypressd.push("s");
        }
    }
    ballPositionUpdate()
    {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(this.#gameState));
        }
    }
  
    animate()
    {
      this.#draw();
      this.keysFunction();
      this.ballPositionUpdate();
      requestAnimationFrame(this.animate.bind(this))
    }
  }