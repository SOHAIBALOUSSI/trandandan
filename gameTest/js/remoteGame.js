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
      this.#paddleStat = {
        playerId: 0,
        ballX: 0,
        ballY: 300,
        ballSpeed: 5,
        flagX: false,
        flagY: false, 
        paddleLeftY: 0, 
        paddelRightY: 0,
        keypressd: [],
        disconnected: false
      };
    }
    updateGameState(data) {
      try {
        this.#paddleStat = JSON.parse(data);
        
      } catch (error) {
        console.log(data);
        if (data === 'player disconnected')
        {
          // setTimeout(() => {
          //   const ws = new WebSocket(`ws://localhost:5000/remoteGame?token=${test}`);
          //   ws.onopen = () => {
          //     console.log('reconnect');
          //   }
          // }, 2000);
        }
      }
    }
      
    #draw() 
    {
      this.#ctx.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight);
  
    //   paddle left 
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
        if (this.#keys["w"] === true)
        {
          this.#paddleStat.keypressd.push("w");
        }
        if (this.#keys["s"] === true)
        {
          this.#paddleStat.keypressd.push("s");
        }
    }
    ballPositionUpdate()
    {
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