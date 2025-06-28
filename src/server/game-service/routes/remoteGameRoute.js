function gameLogic(gameState) {
  let step = 8;
  if (
    gameState.keypressd === "w" &&
    gameState.playerId === 1 &&
    gameState.paddleLeftY > 0
  )
    gameState.paddleLeftY -= step;
  if (
    gameState.keypressd === "s" &&
    gameState.playerId === 1 &&
    gameState.paddleLeftY < 600 - 100
  )
    gameState.paddleLeftY += step;

  if (
    gameState.keypressd === "w" &&
    gameState.playerId === 2 &&
    gameState.paddelRightY > 0
  )
    gameState.paddelRightY -= step;
  if (
    gameState.keypressd === "s" &&
    gameState.playerId === 2 &&
    gameState.paddelRightY < 600 - 100
  )
    gameState.paddelRightY += step;

  gameState.keypressd = "";

  if (
    gameState.flagX ||
    (gameState.ballX >= 980 &&
      gameState.ballY >= gameState.paddelRightY &&
      gameState.ballY <= gameState.paddelRightY + 100)
  ) {
    if (
      gameState.ballX >= 980 &&
      gameState.ballY >= gameState.paddelRightY &&
      gameState.ballY <= gameState.paddelRightY + 100
    ) {
      gameState.hitCount++;
      if (gameState.hitCount === 2) {
        gameState.ballSpeed += 1;
        gameState.hitCount = 0;
      }
      gameState.rightPlayerBallHit++;
    }
    (gameState.ballX -= gameState.ballSpeed), (gameState.flagX = true);
  }
  if (
    !gameState.flagX ||
    (gameState.ballX <= 20 &&
      gameState.ballY >= gameState.paddleLeftY &&
      gameState.ballY <= gameState.paddleLeftY + 100)
  ) {
    if (
      gameState.ballX <= 20 &&
      gameState.ballY >= gameState.paddleLeftY &&
      gameState.ballY <= gameState.paddleLeftY + 100
    )
      gameState.leftPlayerBallHit++;
    (gameState.ballX += gameState.ballSpeed), (gameState.flagX = false);
  }

  if (gameState.ballY >= 600 || gameState.flagY)
    (gameState.ballY -= gameState.ballSpeed), (gameState.flagY = true);
  if (gameState.ballY <= 0 || !gameState.flagY)
    (gameState.ballY += gameState.ballSpeed), (gameState.flagY = false);

  if (gameState.ballX > 1000 || gameState.ballX <= 0) {
    if (gameState.ballX > 1000) gameState.leftPlayerScore += 1;
    if (gameState.ballX <= 0) gameState.rightPlayerScore += 1;

    gameState.paddleLeftY = 240;
    gameState.paddelRightY = 240;
    gameState.ballX = 1000 / 2;
    gameState.ballY = 300;
    gameState.ballSpeed = 5;
    gameState.hitCount = 0; // Reset hit count when ball resets
  }
  return gameState;
}

const rooms = {};

export function remoteGame(connection, req) {
  let roomId;
  const token = req.query.token;
  const playerRoomdId = req.query.roomId;

  let joined = false;

  for (const [id] of Object.entries(rooms)) {

    if (id === playerRoomdId) {
      if (rooms[id].rateLimited >= 2) {
        
        rooms[id].players.forEach((player) => {
          player.connection.send("disconnected.");
          player.connection.close();
        });
        delete rooms[id];
        return;
      }
      rooms[id].players.forEach((player) => {
        if (player.token === token) {
          if (rooms[id].player1Timeout) clearTimeout(rooms[id].player1Timeout);
          if (rooms[id].player2Timeout) clearTimeout(rooms[id].player2Timeout);
          rooms[id].gameState.alive = true;
          rooms[id].gameState.disconnected = true; // reconnnected
          rooms[id].rateLimited++;
          // Reset ball speed and hit count for reconnected player
          player.connection = connection;
          joined = true;
          roomId = id;
          return true;
        }
      });
    }

    if (rooms[id].players.length < 2 && !joined) {
      if (playerRoomdId === id)
      {
        rooms[id].players.push({ token: token, connection: connection });
        joined = true;
        roomId = id;
      }
      break;
    }
  }

  if (!joined) {
    roomId = playerRoomdId;
    rooms[roomId] = {
      players: [{ token: token, connection: connection }],
      rateLimited: 0,
      gameState: {
        matchId: "",
        playerId: 1,
        ballX: 500,
        ballY: 300,
        flagX: false,
        flagY: false,
        paddleLeftY: 240,
        paddelRightY: 240,
        keypressd: [],
        disconnected: false,
        leftPlayerScore: 0,
        rightPlayerScore: 0,
        rounds: 5,
        ballSpeed: 5,
        hitCount: 0,
        gameEndResult: "",
        endGame: false,
        alive: true,
        leftPlayerBallHit: 0,
        rightPlayerBallHit: 0,
        startTime: Date.now(),
        endTime: 0,
      },
    };
  }
  if (rooms[roomId].players.length === 2) {
    if (!rooms[roomId].players.every((player) => player.connection.readyState === WebSocket.OPEN))
    {
      rooms[roomId].players.forEach((player) => {
        player.connection.send("One or both players are not connected.");
        player.connection.close();
      });
      delete rooms[roomId];
      return;
    }
    const [
      { toke1: token1, connection: player1 },
      { token2: token2, connection: player2 },
    ] = rooms[roomId].players;

    rooms[roomId].gameState.startTime = Date.now();
    
    const handleMessage = (playerId) => (msg) => {
      try {
        // parse the game stat from the client
        const gameState = JSON.parse(msg);

        // stop the game after it ends
        if (gameState.endGame) {
          delete rooms[roomId];
          player1.close();
          player2.close();
          return;
        }
        // check if the client reconnected so i will not give him the startUp game stat
        if (!rooms[roomId].gameState.disconnected) {
          rooms[roomId].gameState = gameState;
        }
        rooms[roomId].gameState.keypressd = gameState.keypressd;
        rooms[roomId].gameState.playerId = playerId;
        rooms[roomId].gameState.matchId = roomId;
        // game logic
        const updatedState = gameLogic(rooms[roomId].gameState);
        // check score
        if (updatedState.rightPlayerScore === updatedState.rounds) {
          updatedState.endTime = (Date.now() - updatedState.startTime) / 1000;
          //send data to first player
          updatedState.gameEndResult = "Lost";
          updatedState.playerId = 1;
          player1.send(JSON.stringify(updatedState));

          //send data to second player
          updatedState.playerId = 2;
          updatedState.gameEndResult = "Won";
          player2.send(JSON.stringify(updatedState));
          return;
        }
        if (updatedState.leftPlayerScore === updatedState.rounds) {
          updatedState.endTime = (Date.now() - updatedState.startTime) / 1000;
          updatedState.playerId = 1;
          updatedState.gameEndResult = "Won";
          player1.send(JSON.stringify(updatedState));

          updatedState.playerId = 2;
          updatedState.gameEndResult = "Lost";
          player2.send(JSON.stringify(updatedState));
          return;
        }
        updatedState.playerId = 1;
        player1.send(JSON.stringify(updatedState));
        updatedState.playerId = 2;
        player2.send(JSON.stringify(updatedState));
      } catch (error) {
        console.error("Invalid JSON format", error);
      }
    };

    // socket message event
    player1.on("message", handleMessage(1));
    player2.on("message", handleMessage(2));

    player1.on("close", () => {
      if (!rooms[roomId]) return;

      rooms[roomId].gameState.alive = false;

      // Store the timeout id on the room object so it can be cleared later
      rooms[roomId].player1Timeout = setTimeout(() => {
        if (rooms[roomId] && !rooms[roomId].gameState.alive) {
          player2.send("player 1 disconnected");
          delete rooms[roomId];
          player1.close();
          player2.close();
        }
      }, 10000);
      player1.removeAllListeners();
      player2.removeAllListeners();
    });

    player2.on("close", () => {
      if (!rooms[roomId]) return;

      rooms[roomId].gameState.alive = false;
      // Store the timeout id on the room object so it can be cleared later

      rooms[roomId].player2Timeout = setTimeout(() => {
        if (rooms[roomId] && !rooms[roomId].gameState.alive) {
          player1.send("player 2 disconnected");
          delete rooms[roomId];
          player2.close();
          player1.close();
        }
      }, 10000);
      player1.removeAllListeners();
      player2.removeAllListeners();
    });
  }
}
