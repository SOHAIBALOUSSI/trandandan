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

  const flow = new FlowField(ctx, keys);
  flow.animate();

}

class FlowField {
  #ctx;
  #width;
  #height;
  #keys;
  #paddleStat;
  #canvasWidth;
  #canvasHeight;
  constructor(ctx, keys) {
    this.#width = 10;
    this.#height = 150;
    this.#canvasWidth = 900;
    this.#canvasHeight = 600;
    this.#ctx = ctx;
    this.#keys = keys;
    this.#paddleStat = {paddleLeftY: 0,paddelRightY: 0, ballX: 0, ballY: 300,gameStat: 1, keypressd: []};
  }

  #draw() 
  {
    this.#ctx.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight);

    //paddle left 
    this.#ctx.fillRect(0, this.#paddleStat.paddleLeftY, this.#width, this.#height);
    this.#ctx.strokeRect(0, this.#paddleStat.paddleLeftY, this.#width, this.#height);

    //paddle right
    this.#ctx.fillRect(890, this.#paddleStat.paddelRightY, this.#width, this.#height);
    this.#ctx.strokeRect(890, this.#paddleStat.paddelRightY, this.#width, this.#height);


    //ball
    this.#ctx.beginPath();
    this.#ctx.arc(this.#paddleStat.ballX, this.#paddleStat.ballY, 13, 0, Math.PI * 2);
    this.#ctx.fill();
    this.#ctx.stroke();
  }

  keysFunction() 
  {
    if (this.#keys["w"] === true && !this.#paddleStat.keypressd.includes("w") && this.#paddleStat.paddleLeftY > 0)
      {
        this.#paddleStat.keypressd.push("w");
      }
      if (this.#keys["s"] === true && !this.#paddleStat.keypressd.includes("s") && this.#paddleStat.paddleLeftY < this.#canvasHeight - this.#height)
      {
        this.#paddleStat.keypressd.push("s");
      }
      if (this.#keys["ArrowUp"] === true && !this.#paddleStat.keypressd.includes("ArrowUp") && this.#paddleStat.paddelRightY > 0)
      {
        this.#paddleStat.keypressd.push("ArrowUp");
      }
      if (this.#keys["ArrowDown"] === true && !this.#paddleStat.keypressd.includes("ArrowDown") && this.#paddleStat.paddelRightY < this.#canvasHeight - this.#height)
      {
        this.#paddleStat.keypressd.push("ArrowDown");
      }
    }
    ballPositionUpdate()
    {
      socket.onmessage = (event) => {
        this.#paddleStat = JSON.parse(event.data);     
      };
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(this.#paddleStat));
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



