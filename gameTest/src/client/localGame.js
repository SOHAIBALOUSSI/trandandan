"use strict";
const rightPlayerScoreLocal = document.getElementById('rightScore');
const leftPlayerScoreLocal = document.getElementById('leftScore');
let socketLocal;
window.onload = () => {
    socketLocal = new WebSocket('ws://localhost:5000/ws');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let keys = {};
    window.addEventListener('keydown', (event) => {
        keys[event.key] = true;
    });
    window.addEventListener('keyup', (event) => {
        keys[event.key] = false;
    });
    const flow = new FlowFieldLocal(ctx, keys);
    socketLocal.onmessage = (event) => {
        flow.updateGameState(event.data);
    };
    socketLocal.onclose = () => {
        console.log('[client] Disconnected from server');
    };
    socketLocal.onerror = (err) => {
        console.error('[client] WebSocket error:', err);
    };
    flow.animate();
};
class FlowFieldLocal {
    constructor(ctx, keys) {
        this.width = 10;
        this.height = 150;
        this.canvasWidth = 900;
        this.canvasHeight = 600;
        this.ctx = ctx;
        this.keys = keys;
        this.gameState = {
            paddleLeftY: 240,
            paddelRightY: 240,
            ballX: 450,
            ballY: 300,
            keypressd: [],
            rightPlayerScore: 0,
            leftPlayerScore: 0,
            flagX: false,
            flagY: false,
            ballSpeed: 5,
            count: 0
        };
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        // Left paddle
        this.ctx.fillRect(0, this.gameState.paddleLeftY, this.width, this.height);
        this.ctx.strokeRect(0, this.gameState.paddleLeftY, this.width, this.height);
        // Right paddle
        this.ctx.fillRect(890, this.gameState.paddelRightY, this.width, this.height);
        this.ctx.strokeRect(890, this.gameState.paddelRightY, this.width, this.height);
        // Ball
        this.ctx.beginPath();
        this.ctx.arc(this.gameState.ballX, this.gameState.ballY, 13, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
    }
    keysFunction() {
        if (this.keys['w'] && !this.gameState.keypressd.includes('w') && this.gameState.paddleLeftY > 0) {
            this.gameState.keypressd.push('w');
        }
        if (this.keys['s'] && !this.gameState.keypressd.includes('s') && this.gameState.paddleLeftY < this.canvasHeight - this.height) {
            this.gameState.keypressd.push('s');
        }
        if (this.keys['ArrowUp'] && !this.gameState.keypressd.includes('ArrowUp') && this.gameState.paddelRightY > 0) {
            this.gameState.keypressd.push('ArrowUp');
        }
        if (this.keys['ArrowDown'] && !this.gameState.keypressd.includes('ArrowDown') && this.gameState.paddelRightY < this.canvasHeight - this.height) {
            this.gameState.keypressd.push('ArrowDown');
        }
    }
    updateGameState(data) {
        this.gameState = JSON.parse(data);
        if (rightPlayerScoreLocal)
            rightPlayerScoreLocal.textContent = this.gameState.rightPlayerScore.toString();
        if (leftPlayerScoreLocal)
            leftPlayerScoreLocal.textContent = this.gameState.leftPlayerScore.toString();
        if (this.gameState.rightPlayerScore === 5 || this.gameState.leftPlayerScore === 5) {
            socketLocal.close();
        }
    }
    ballPositionUpdate() {
        if (socketLocal.readyState === WebSocket.OPEN) {
            socketLocal.send(JSON.stringify(this.gameState));
        }
    }
    animate() {
        this.draw();
        this.keysFunction();
        this.ballPositionUpdate();
        requestAnimationFrame(this.animate.bind(this));
    }
}
