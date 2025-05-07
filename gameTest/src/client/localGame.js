const rightPlayerScore = document.getElementById('rightScore');
const leftPlayerScore = document.getElementById('leftScore');
let socket
window.onload = () => {
  socket = new WebSocket('ws://localhost:5000/ws');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  

  socket.onmessage = (event) => {
    console.log('[client] Message from server:', event.data);
  };
  socket.onclose = () => {
    console.log('[client] Disconnected from server');
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
      paddleLeftY: 240,
      paddelRightY: 240,
      ballX: 450,
      ballY: 300,
      gameStat: 1,
      keypressd: [],
      rightPlayerScore: 0,
      leftPlayerScore: 0
    };
  }

  #draw() 
  {
    this.#ctx.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight);

    //paddle left 
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
    if (this.#keys["w"] === true && !this.#gameState.keypressd.includes("w") && this.#gameState.paddleLeftY > 0)
      {
        this.#gameState.keypressd.push("w");
      }
      if (this.#keys["s"] === true && !this.#gameState.keypressd.includes("s") && this.#gameState.paddleLeftY < this.#canvasHeight - this.#height)
      {
        this.#gameState.keypressd.push("s");
      }
      if (this.#keys["ArrowUp"] === true && !this.#gameState.keypressd.includes("ArrowUp") && this.#gameState.paddelRightY > 0)
      {
        this.#gameState.keypressd.push("ArrowUp");
      }
      if (this.#keys["ArrowDown"] === true && !this.#gameState.keypressd.includes("ArrowDown") && this.#gameState.paddelRightY < this.#canvasHeight - this.#height)
      {
        this.#gameState.keypressd.push("ArrowDown");
      }
    }
    updateGameState(data) {
      this.#gameState = JSON.parse(data);
      rightPlayerScore.textContent = this.#gameState.rightPlayerScore;
      leftPlayerScore.textContent = this.#gameState.leftPlayerScore;

      if (this.#gameState.rightPlayerScore === 5 || this.#gameState.leftPlayerScore === 5)
          socket.close();

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



