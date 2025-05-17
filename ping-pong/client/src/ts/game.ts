const canvas = document.getElementById("canvas-game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

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

// Disable image smoothing for crisp pixel art
ctx.imageSmoothingEnabled = false;

let FrogImg = FrogArray();
let FrogimgIndex: number = 1;
let FrogSpeed: number = 0;
let FrogRemainder = 10;

let PlayerImg = PlayerArray();
let PlayerimgIndex: number = 1;
let PlayerSpeed: number = 0;
let PlayerRemainder = 5;

const groundImg = new Image();
groundImg.src = "./assets/ground/ground.png";
let groundX = 700;
let groundSpeed = 9;
let frameCount = 0;

let BirdImg = BirdArray();
let BirdimgIndex: number = 1;
let BirdSpeed: number = 0;
let BirdRemainder = 6;

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (PlayerimgIndex === 5) PlayerimgIndex = 1;
  ctx.drawImage(PlayerImg[PlayerimgIndex], 100, 405, 100, 100);
  if (PlayerSpeed % PlayerRemainder === 0) PlayerimgIndex++;
  PlayerSpeed++;

  if (FrogimgIndex === 6) FrogimgIndex = 1;
  ctx.drawImage(FrogImg[FrogimgIndex], 600, 405, 100, 100);
  if (FrogSpeed % FrogRemainder === 0) FrogimgIndex++;
  FrogSpeed++;

  if (BirdimgIndex === 4) BirdimgIndex = 1;
  ctx.drawImage(BirdImg[BirdimgIndex], 600, 200, 100, 100);
  if (BirdSpeed % BirdRemainder === 0) BirdimgIndex++;
  BirdSpeed++;

  if (groundX < -100) groundX = 700;

  // ground pics
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

  // increase the speed of the ground every 300 frame
  frameCount++;
  if (frameCount % 300 === 0) groundSpeed++;
  groundX -= groundSpeed;

  // enemy drawing

  requestAnimationFrame(animate);
}
animate();
