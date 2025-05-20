const canvas = document.getElementById("canvas-game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

let counting: number = 0;
const tab = document.getElementById("tab") as HTMLElement;

// import { BirdArray } from "./assets";
function PlayerArray(): any[] {
  const ImgArr: any[] = [];
  let playerImage: any = new Image();
  playerImage.src = "./assets/player/1.png";
  ImgArr.push(playerImage);

  playerImage = new Image();
  playerImage.src = "./assets/player/2.png";
  ImgArr.push(playerImage);

  playerImage = new Image();
  playerImage.src = "./assets/player/3.png";
  ImgArr.push(playerImage);

  playerImage = new Image();
  playerImage.src = "./assets/player/4.png";
  ImgArr.push(playerImage);

  playerImage = new Image();
  playerImage.src = "./assets/player/5.png";
  ImgArr.push(playerImage);

  return ImgArr;
}

function FrogArray(): any[] {
  const ImgArr: any[] = [];
  let playerImage: any = new Image();
  playerImage.src = "./assets/frog/frog1.png";
  ImgArr.push(playerImage);

  playerImage = new Image();
  playerImage.src = "./assets/frog/frog2.png";
  ImgArr.push(playerImage);

  playerImage = new Image();
  playerImage.src = "./assets/frog/frog3.png";
  ImgArr.push(playerImage);

  playerImage = new Image();
  playerImage.src = "./assets/frog/frog3.png";
  ImgArr.push(playerImage);

  playerImage = new Image();
  playerImage.src = "./assets/frog/frog2.png";
  ImgArr.push(playerImage);

  playerImage = new Image();
  playerImage.src = "./assets/frog/frog1.png";
  ImgArr.push(playerImage);

  return ImgArr;
}

function BirdArray(): any[] {
  const ImgArr: any[] = [];
  let playerImage: any = new Image();
  playerImage.src = "./assets/bird/1.png";
  ImgArr.push(playerImage);

  playerImage = new Image();
  playerImage.src = "./assets/bird/4.png";
  ImgArr.push(playerImage);

  playerImage = new Image();
  playerImage.src = "./assets/bird/3.png";
  ImgArr.push(playerImage);

  playerImage = new Image();
  playerImage.src = "./assets/bird/1.png";
  ImgArr.push(playerImage);

  return ImgArr;
}

function DrawGround(groundImg: any, groundX: number) {
  ctx.drawImage(groundImg, groundX, 500, 100, 100);
  ctx.drawImage(groundImg, groundX - 100, 500, 100, 100);
  ctx.drawImage(groundImg, groundX - 200, 500, 100, 100);
  ctx.drawImage(groundImg, groundX - 300, 500, 100, 100);
  ctx.drawImage(groundImg, groundX - 400, 500, 100, 100);
  ctx.drawImage(groundImg, groundX - 500, 500, 100, 100);
  ctx.drawImage(groundImg, groundX - 600, 500, 100, 100);
  ctx.drawImage(groundImg, groundX - 700, 500, 100, 100);
  ctx.drawImage(groundImg, groundX - 800, 500, 100, 100);
  ctx.drawImage(groundImg, groundX, 900, 100, 100);
  ctx.drawImage(groundImg, groundX + 100, 500, 100, 100);
  ctx.drawImage(groundImg, groundX + 200, 500, 100, 100);
  ctx.drawImage(groundImg, groundX + 300, 500, 100, 100);
  ctx.drawImage(groundImg, groundX + 400, 500, 100, 100);
  ctx.drawImage(groundImg, groundX + 500, 500, 100, 100);
  ctx.drawImage(groundImg, groundX + 600, 500, 100, 100);
  ctx.drawImage(groundImg, groundX + 700, 500, 100, 100);
  ctx.drawImage(groundImg, groundX + 800, 500, 100, 100);
  ctx.drawImage(groundImg, groundX + 900, 500, 100, 100);
}

// Disable image smoothing for crisp pixel art
ctx.imageSmoothingEnabled = false;
let PlayerImg = PlayerArray();
let PlayerimgIndex: number = 1;
let PlayerSpeed: number = 0;
let PlayerRemainder = 5;
let playerDeath = new Image();
playerDeath.src = "./assets/player/death.png";

const JumpImg = new Image();
JumpImg.src = "./assets/player/up.png";
const DownImg = new Image();
DownImg.src = "./assets/player/down.png";

const groundImg = new Image();
groundImg.src = "./assets/ground/ground.png";
let groundX = 700;
let groundSpeed = 9;
let frameCount = 0;
const backgroundImg = new Image();
backgroundImg.src = "./assets/ground/back.png";
const grass = new Image();
grass.src = "./assets/ground/grass.png";

interface Grass {
  x: number;
  y: number;
  speed: number;
}
let grasss: Grass[] = [];
// Spawn a new grass every 2 seconds
setInterval(() => {
  grasss.push({
    x: CANVAS_WIDTH + 100,
    y: 405,
    speed: 4 + Math.random() * 2, // randomize speed a bit
  });
}, 800);

const wood = new Image();
wood.src = "./assets/ground/wood.png";

interface Wood {
  x: number;
  y: number;
  speed: number;
}
let woods: Wood[] = [];
// Spawn a new wood every 2 seconds
setInterval(() => {
  woods.push({
    x: CANVAS_WIDTH + 100,
    y: 405,
    speed: 4 + Math.random() * 2, // randomize speed a bit
  });
}, 1500);

let FrogImg = FrogArray();
let FrogSpeed: number = 0;
let FrogRemainder = 10;

interface Frog {
  x: number;
  y: number;
  frame: number;
}

let frogs: Frog[] = [];

// Spawn a new frog every 4 seconds
setInterval(() => {
  frogs.push({
    x: CANVAS_WIDTH + 100,
    y: 405,
    frame: 1,
  });
}, 4000);

let birds: Bird[] = [];
let BirdImg = BirdArray();
let BirdSpeed: number = 0;
let BirdRemainder = 6;

interface Bird {
  x: number;
  y: number;
  frame: number;
  speed: number;
}

// Spawn a new bird every 2 seconds
setInterval(() => {
  birds.push({
    x: CANVAS_WIDTH + 100,
    y: 350,
    frame: 1,
    speed: 5 + Math.random() * 2, // randomize speed a bit
  });
}, 7000);

let keys: { [key: string]: boolean } = {};

window.addEventListener("keydown", (event: KeyboardEvent) => {
  keys[event.key] = true;
});

window.addEventListener("keyup", (event: KeyboardEvent) => {
  keys[event.key] = false;
});

let jumpY = 405;
let isJumping = false;
let velocityY = 0;
const gravity = 1;
const jumpPower = -20;

function handleInput() {
  if (keys["w"] && !isJumping) {
    // Only start jump if not already jumping
    velocityY = jumpPower;
    isJumping = true;
  }
}

function isColliding(
  x1: number,
  y1: number,
  w1: number,
  h1: number,
  x2: number,
  y2: number,
  w2: number,
  h2: number
): boolean {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}
let playerX: number = 100;
let playerY: number = 405;
let enemyX: number = 0;
let enemyY: number = 0;
let cancel: boolean = false;

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (let i = 0; i < woods.length; i++) {
    let woodObj = woods[i];
    ctx.drawImage(wood, woodObj.x, woodObj.y, 100, 100);
    woodObj.x -= groundSpeed;
  }
  // Remove woods that have left the screen
  woods = woods.filter((woodObj) => woodObj.x > -100);

  for (let i = 0; i < grasss.length; i++) {
    let grassObj = grasss[i];
    ctx.drawImage(grass, grassObj.x, grassObj.y, 100, 100);
    grassObj.x -= groundSpeed;
  }
  // Remove grasss that have left the screen
  grasss = grasss.filter((grassObj) => grassObj.x > -100);

  // frog animation
  for (let i = 0; i < frogs.length; i++) {
    let frog = frogs[i];
    if (FrogSpeed % FrogRemainder === 0) {
      frog.frame++;
      if (frog.frame >= FrogImg.length) frog.frame = 1;
    }
    ctx.drawImage(FrogImg[frog.frame], frog.x, frog.y, 100, 100);
    if (jumpY) frog.x -= groundSpeed;
    enemyX = frog.x;
    enemyY = frog.y;
  }
  if (isColliding(playerX, playerY, 80, 80, enemyX, enemyY, 80, 80)) {
    cancel = true;
  }
  FrogSpeed++;
  // Remove frogs that have left the screen
  frogs = frogs.filter((frog) => frog.x > -100);

  // bird animation
  for (let i = 0; i < birds.length; i++) {
    let bird = birds[i];
    // Animate bird frame
    if (BirdSpeed % BirdRemainder === 0) {
      bird.frame++;
      if (bird.frame >= BirdImg.length) bird.frame = 1;
    }
    ctx.drawImage(BirdImg[bird.frame], bird.x, bird.y, 100, 100);
    bird.x -= groundSpeed;
    enemyX = bird.x;
    enemyY = bird.y;
  }
  if (isColliding(playerX, playerY, 80, 80, enemyX, enemyY, 80, 80)) {
    cancel = true;
  }
  BirdSpeed++;
  // Remove birds that have left the screen
  birds = birds.filter((bird) => bird.x > -100);

  if (groundX < -100) groundX = 700;

  // Apply velocity and gravity
  handleInput();
  // Apply velocity and gravity
  jumpY += velocityY;
  velocityY += gravity;
  // Collision with ground
  if (jumpY >= 405) {
    jumpY = 405;
    velocityY = 0;
    isJumping = false;
  }
  // Choose image based on state
  if (isJumping && velocityY < 0) {
    if (!cancel) ctx.drawImage(DownImg, 100, jumpY, 100, 100); // going up
  } else if (isJumping && velocityY > 0) {
    if (!cancel) ctx.drawImage(JumpImg, 100, jumpY, 100, 100); // falling down
  } else {
    // idle or running
    if (PlayerimgIndex === 5) PlayerimgIndex = 1;
    if (!cancel) ctx.drawImage(PlayerImg[PlayerimgIndex], 100, jumpY, 100, 100);
    if (PlayerSpeed % PlayerRemainder === 0) PlayerimgIndex++;
    PlayerSpeed++;
  }
  playerX = 100;
  playerY = jumpY;

  // ground pics
  DrawGround(groundImg, groundX);
  // increase the speed of the ground every 300 frame
  frameCount++;
  if (frameCount % 500 === 0) groundSpeed++;
  groundX -= groundSpeed;

  counting++;
  // Draw highscore (top right)
  ctx.textAlign = "right";
  const highscore = localStorage.getItem("highscore") || "0";
  ctx.fillText("Highscore: " + highscore, CANVAS_WIDTH - 20, 40);
  ctx.fillStyle = "#fb8500"; // gold/yellow
  ctx.font = "24px 'Orbitron', Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Score: " + counting, 20, 40);
  if (cancel) {
    tab.style.display = "block";
    ctx.drawImage(playerDeath, playerX, playerY, 100, 100);
    counting--;
    if (counting > parseInt(highscore))
      localStorage.setItem("highscore", counting.toString());
    return;
  }

  requestAnimationFrame(animate);
}
window.addEventListener("keydown", (event: KeyboardEvent) => {
  keys[event.key] = true;

  if (event.key === "r" && cancel) {
    window.location.reload();
  }
});

animate();
