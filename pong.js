"use strict";

// import jsonData from './controls.json';

import {displayHandler, gameObjectHandler, textGameObj, rectangle, inputHandler} from "./gameLib.js";

// var Data = fs.readFile("./controls.json");
// var data = jsonData;

var pongBall;
var leftPaddle;
var rightPaddle;
var leftPlayerScoreBoard;
var rightPlayerScoreBoard;

function gameStart()
{
    displayHandler.createDisplay({width:960, height:540});    
    inputHandler.setup();

    pongBall = new rectangle({height:20, width:20});
    resetPongball();

    leftPaddle = new rectangle({height:100, width:10});
    leftPaddle.x = 50;
    leftPaddle.y = bottomScreenY(leftPaddle)/2

    rightPaddle = new rectangle({height:100, width:10});
    rightPaddle.x=endScreenX(rightPaddle)-50;
    rightPaddle.y=bottomScreenY(rightPaddle)/2

    leftPlayerScoreBoard = new textGameObj({text:0, x:displayHandler.gameCanvas.width/3, y:100});
    rightPlayerScoreBoard = new textGameObj({text:0, x:displayHandler.gameCanvas.width*2/3, y:100});

    gameObjectHandler.createCollisionInteraction({gameObj1:pongBall, gameObj2:leftPaddle, collisionFunc:bounce});
    gameObjectHandler.createCollisionInteraction({gameObj1:pongBall, gameObj2:rightPaddle, collisionFunc:bounce});
    inputHandler.preventDefault("Tab");
}

function resetPongball()
{
    pongBall.x = endScreenX(pongBall)/2;
    pongBall.y = bottomScreenY(pongBall)/2;

    pongBall.speedX = randomInt(4,8);
    if (Math.random() <= 0.5)
    {
        pongBall.speedX *= -1;
    }
    pongBall.speedY = randomInt(4,8);
    if (Math.random() <= 0.5)
    {
        pongBall.speedY *= -1;
    }
}

function randomNumber(min, max)
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

function bounce()
{
    pongBall.speedX *= -1;
}

function pongBallEdgeInteraction()
{
    if (pongBall.x < 0)
    {
        resetPongball();
        rightPlayerScoreBoard.text++;
    }
    if (pongBall.x+pongBall.width > displayHandler.gameCanvas.width)
    {
        resetPongball();
        leftPlayerScoreBoard.text++;
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

function gameLoop()
{    
    inputHandler.updateKeysThisFrame();
    
    if (inputHandler.getKeyDown('KeyW'))
    {
        leftPaddle.speedY += -10;
    }
    if (inputHandler.getKeyUp('KeyW'))
    {
        leftPaddle.speedY += 10;
    }
    if (inputHandler.getKeyDown('KeyS'))
    {
        leftPaddle.speedY += 10;
    }
    if (inputHandler.getKeyUp('KeyS'))
    {
        leftPaddle.speedY += -10;
    }
    if (inputHandler.getKeyDown('ArrowUp'))
    {
        rightPaddle.speedY += -10;
    }
    if (inputHandler.getKeyUp('ArrowUp'))
    {
        rightPaddle.speedY += 10;
    }
    if (inputHandler.getKeyDown('ArrowDown'))
    {
        rightPaddle.speedY += 10;
    }
    if (inputHandler.getKeyUp('ArrowDown'))
    {
        rightPaddle.speedY += -10;
    }

    gameObjectHandler.positionUpdateAll();
    pongBallEdgeInteraction(pongBall);
    paddleScreenEdgeInteraction(leftPaddle);
    paddleScreenEdgeInteraction(rightPaddle);
    gameObjectHandler.checkCollisionInteractions();
}

addEventListener("DOMContentLoaded", gameStart);
setInterval(gameLoop, 10);  

requestAnimationFrame(displayHandler.updateDisplay);