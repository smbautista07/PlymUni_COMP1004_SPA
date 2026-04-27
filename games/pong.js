"use strict";

// import jsonData from './controls.json';

import {displayHandler, gameObjectHandler, textGameObj, rectangle, inputHandler} from "./gameLib.js";

// var Data = fs.readFile("./controls.json");
// var data = jsonData;

var pongBall;
var gameLoopID;
var gameMode;
var leftPlayer;
var rightPlayer;
var allPaddleSpeed = 10;
var pauseButton;

class player
{
    constructor()
    {
        var paddle;
        var controls;
        var scoreBoard;
    }
}

function gameStart()
{
    displayHandler.createDisplay({width:960, height:540});    
    inputHandler.setup();

    pongBall = new rectangle({height:20, width:20});
    resetPongball();

    leftPlayer = new player();
    leftPlayer.paddle = new rectangle({height:100, width:20});
    leftPlayer.paddle.x = 50;
    leftPlayer.paddle.y = bottomScreenY(leftPlayer.paddle)/2
    leftPlayer.controls = {
        up:"KeyW",
        down:"KeyS"
    };

    rightPlayer = new player();
    rightPlayer.paddle = new rectangle({height:100, width:20});
    rightPlayer.paddle.x=endScreenX(rightPlayer.paddle)-50;
    rightPlayer.paddle.y=bottomScreenY(rightPlayer.paddle)/2
    rightPlayer.controls = 
    {
        up:"ArrowUp",
        down:"ArrowDown"
    }

    leftPlayer.scoreBoard = new textGameObj({text:0, x:displayHandler.gameCanvas.width/3, y:100});
    rightPlayer.scoreBoard = new textGameObj({text:0, x:displayHandler.gameCanvas.width*2/3, y:100});

    let r1 = new rectangle({height:80, width:20, isVisible:false});
    r1.y = bottomScreenY(r1)/2;
    r1.x = endScreenX(r1)/2-20;
    let r2 = new rectangle({height:80, width:20, isVisible:false});
    r2.y = bottomScreenY(r1)/2;
    r2.x = endScreenX(r2)/2+20;

    pauseButton = {leftLine:r1, rightLine:r2};

    gameObjectHandler.createCollisionInteraction({gameObj1:pongBall, gameObj2:leftPlayer.paddle, collisionFunc:pongPaddleInteraction});
    gameObjectHandler.createCollisionInteraction({gameObj1:pongBall, gameObj2:rightPlayer.paddle, collisionFunc:pongPaddleInteraction});
    inputHandler.preventDefault("Tab");

    gameObjectHandler.isPaused = true;
    addEventListener("keydown", selectGameMode);
    gameLoopID = setInterval(gameLoop,10); 
    requestAnimationFrame(displayHandler.updateDisplay);    
}

function selectGameMode(event)
{
    //Single player option
    switch (event.code)
    {
        case "Digit1":
            gameMode = "Singleplayer";
        break;
        case "Digit2":
            gameMode = "Multiplayer";
        break;
        default:
        console.log("Not an option");
    }
    if (gameMode) 
    {
        gameObjectHandler.isPaused = false;
        removeEventListener("keydown", selectGameMode);
    }
}

function resetPongball()
{
    var nextDirection;
    pongBall.x = endScreenX(pongBall)/2;
    pongBall.y = bottomScreenY(pongBall)/2;

    if (pongBall.speedX < 0)
    {
        pongBall.speedX = randomInt(4,6);   
    }
    else
    {
        pongBall.speedX = randomInt(4,6) * -1;
    }
    pongBall.speedY = randomInt(4,6);
}

function randomFloat(min, max)
{
    return Math.random()*(max-min)+min;
}

function randomInt(min, max)
{
    return Math.floor(Math.random()*(max-min+1) + min);
}

function bottomScreenY(gameObj)
{
    return (displayHandler.gameCanvas.height-gameObj.height)
}
function endScreenX(gameObj)
{
    return (displayHandler.gameCanvas.width-gameObj.width)
}

function pongPaddleInteraction(pongBall, currentPaddle)
{
    let firstContactDimension = revertOverlap(pongBall, currentPaddle);
    bounce(pongBall, currentPaddle, firstContactDimension);
}

function revertOverlap(pongBall, currentPaddle)
{   
    var currentDirectionX = (pongBall.speedX >= 0) ? "right":"left";
    var overlapX = (currentDirectionX == "right") ? pongBall.x + pongBall.width - currentPaddle.x : pongBall.x - (currentPaddle.x + currentPaddle.width);
    var overlapTimeX = overlapX / pongBall.speedX;

    var currentDirectionY = (pongBall.speedY >= 0) ? "down":"up";

    var overlapY = (currentDirectionY == "down") ? pongBall.y + pongBall.height - currentPaddle.y : pongBall.y - (currentPaddle.y + currentPaddle.height);
    console.log(overlapY);

    var overlapTimeY = overlapY / pongBall.speedY;

    //The dimension with greater overlap time is the one with first overlap
    var firstContactDimension = (overlapTimeX <= overlapTimeY) ? "x": "y";

    if (firstContactDimension == "x")
    {
        pongBall.x -= pongBall.speedX*overlapTimeX;
        pongBall.y -= pongBall.speedY*overlapTimeX
    }
    if (firstContactDimension == "y")
    {
        // let overlapRatio = pongBall.speedY/(pongBall.speedY+currentPaddle.speedY);
        pongBall.x -= pongBall.speedX*overlapTimeY;
        pongBall.y -= pongBall.speedY*overlapTimeY/*overlapRatio*/;
        // currentPaddle.y -= currentPaddle.speedY*overlapTimeY*(1-overlapRatio);
    }

    return firstContactDimension;
}

function bounce(pongBall, currentPaddle, dimension)
{
    if (dimension == "x")
    {
        pongBall.speedX *= -1.1;
    }

    if (dimension == "y")
    {
        pongBall.speedY += currentPaddle.speedY;
    }
}

function pongBallEdgeInteraction()
{
    if (pongBall.x < 0)
    {
        resetPongball();
        rightPlayer.scoreBoard.text++;
    }
    if (pongBall.x+pongBall.width > displayHandler.gameCanvas.width)
    {
        resetPongball();
        leftPlayer.scoreBoard.text++;
    }
    if (pongBall.y < 0)
    {
        pongBall.y = 0;
        pongBall.speedY *=-1;
    }
    if (pongBall.y + pongBall.height > displayHandler.gameCanvas.height)
    {
        pongBall.y = displayHandler.gameCanvas.height - pongBall.height;
        pongBall.speedY *=-1;
    }
}

function paddleScreenEdgeInteraction(gameObj)
{
    if (gameObj.y < 0)
    {
        gameObj.y = 0;
    }
    if (gameObj.y > bottomScreenY(gameObj))
    {
        gameObj.y = bottomScreenY(gameObj);
    }
}

function startOrStop()
{
    if (!gameMode)
    {
        return;
    }

    if (gameObjectHandler.isPaused)
    {
        gameObjectHandler.isPaused = false;
        pauseButton.leftLine.isVisible = false;
        pauseButton.rightLine.isVisible = false;
    }
    else
    {
        gameObjectHandler.isPaused = true;
        pauseButton.leftLine.isVisible = true;
        pauseButton.rightLine.isVisible = true;
    }
}

function gameLoop()
{    
    inputHandler.updateKeysThisFrame();

    checkPlayerInputs(leftPlayer);
    if (gameMode == "Singleplayer")
    {
        botAction();
    }
    if (gameMode == "Multiplayer")
    {
        checkPlayerInputs(rightPlayer);
    }

    if (inputHandler.getKeyDown('Space'))
    {
        startOrStop();
    }

    gameObjectHandler.positionUpdateAll();
    pongBallEdgeInteraction(pongBall);
    paddleScreenEdgeInteraction(leftPlayer.paddle);
    paddleScreenEdgeInteraction(rightPlayer.paddle);
    gameObjectHandler.checkCollisionInteractions();
}

function checkPlayerInputs(player)
{
    let p = player;
    if(inputHandler.getKeyDown(player.controls.up))
    {
        p.paddle.speedY += -allPaddleSpeed;
    }
    if (inputHandler.getKeyUp(player.controls.up))
    {
        p.paddle.speedY += allPaddleSpeed;
    }
    if (inputHandler.getKeyDown(player.controls.down))
    {
        p.paddle.speedY += allPaddleSpeed;
    }
    if (inputHandler.getKeyUp(player.controls.down))
    {
        p.paddle.speedY += -allPaddleSpeed;
    }
}

function botAction()
{
    if (pongBall.speedX > 0)
    {    
        if (Math.random() < 0.3)
        {
            if (pongBall.y > rightPlayer.paddle.y + rightPlayer.paddle.height*0.75)
            {
                rightPlayer.paddle.speedY = allPaddleSpeed*(0.5 + Math.random()/2);
            }
            else if (pongBall.y + pongBall.height < rightPlayer.paddle.y + rightPlayer.paddle.height*0.25)
            {
                rightPlayer.paddle.speedY = -allPaddleSpeed*(0.5 + Math.random()/2);
            }
            else
            {
                rightPlayer.paddle.speedY = 0;
            }
        }
    }
}

function gameEnd()
{
    displayHandler.deleteDisplay();
    gameObjectHandler.gameObjects.clear();
    gameObjectHandler.collisionInteractions.clear();
    clearInterval(gameLoopID);
}

export {gameStart, gameEnd};