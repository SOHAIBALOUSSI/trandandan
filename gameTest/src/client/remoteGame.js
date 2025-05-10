"use strict";
const rightPlayerScore = document.getElementById('rightScore');
const leftPlayerScore = document.getElementById('leftScore');
const gameEndResult = document.getElementById('gameEndResult');
const exitButton = document.getElementById('exitButton');
const endGameButton = document.getElementById("endGameButton");
function generateToken() {
    let roomId = "";
    const stringOfChar = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let index = 0; index < 12; index++) {
        roomId += stringOfChar[Math.floor(Math.random() * stringOfChar.length)];
    }
    return roomId;
}
let token = generateToken();
console.log(token);
let test = localStorage.getItem('player');
if (test === null) {
    localStorage.setItem('player', token);
    test = token;
}
const socket = new WebSocket(`ws://localhost:5000/remoteGame?token=${test}`);
console.log("reconnected");
window.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    socket.onopen = () => {
        console.log('connected');
    };
    socket.onclose = () => {
        console.log('match ended');
        socket.close();
    };
    socket.onerror = (err) => {
        console.error('[client] WebSocket error:', err);
    };
    let keys = {};
    window.addEventListener('keydown', (key) => {
        keys[key.key] = true;
    });
    window.addEventListener('keyup', (key) => {
        keys[key.key] = false;
    });
    const flow = new FlowField(ctx, keys);
    socket.onmessage = (event) => {
        flow.updateGameState(event.data);
    };
    flow.animate();
};
class FlowField {
    constructor(ctx, keys) {
        this.width = 10;
        this.height = 150;
        this.canvasWidth = 900;
        this.canvasHeight = 600;
        this.ctx = ctx;
        this.keys = keys;
        this.gameState = {
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
            rounds: 5,
            endGame: false,
            alive: true,
            leftPlayerBallHit: 0,
            rightPlayerBallHit: 0,
            startTime: Date.now(),
            endTime: 0
        };
    }
    sendPlayerData(playerData) {
        fetch('http://localhost:5000/storePlayerData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerData),
        })
            .then((response) => response.json())
            .then((data) => {
            console.log('Server response:', data);
        })
            .catch((error) => {
            console.error('Error sending player data:', error);
        });
    }
    updateGameState(data) {
        try {
            const parsedData = JSON.parse(data);
            this.gameState = parsedData;
            rightPlayerScore.textContent = String(this.gameState.rightPlayerScore);
            leftPlayerScore.textContent = String(this.gameState.leftPlayerScore);
            if (this.gameState.gameEndResult && this.gameState.gameEndResult.length !== 0) {
                this.gameState.endGame = true;
                gameEndResult.textContent = "You " + this.gameState.gameEndResult;
                // send this remoteGameRoute to store it to the database
                const playerData = {
                    playerId: this.gameState.playerId,
                    leftPlayerScore: this.gameState.leftPlayerScore,
                    rightPlayerScore: this.gameState.rightPlayerScore,
                    gameDuration: this.gameState.endTime, // Duration in seconds
                    gameEndResult: this.gameState.gameEndResult,
                    leftPlayerBallHit: this.gameState.leftPlayerBallHit,
                    rightPlayerBallHit: this.gameState.rightPlayerBallHit,
                };
                this.sendPlayerData(playerData);
            }
        }
        catch (error) {
            console.log(data);
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        // Paddle left
        this.ctx.fillRect(0, this.gameState.paddleLeftY, this.width, this.height);
        this.ctx.strokeRect(0, this.gameState.paddleLeftY, this.width, this.height);
        // Paddle right
        this.ctx.fillRect(890, this.gameState.paddelRightY, this.width, this.height);
        this.ctx.strokeRect(890, this.gameState.paddelRightY, this.width, this.height);
        // Ball
        this.ctx.beginPath();
        this.ctx.arc(this.gameState.ballX, this.gameState.ballY, 13, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
    }
    keysFunction() {
        if (this.keys["w"]) {
            this.gameState.keypressd.push("w");
        }
        if (this.keys["s"]) {
            this.gameState.keypressd.push("s");
        }
    }
    ballPositionUpdate() {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(this.gameState));
        }
    }
    animate() {
        this.draw();
        this.keysFunction();
        this.ballPositionUpdate();
        requestAnimationFrame(this.animate.bind(this));
    }
}
