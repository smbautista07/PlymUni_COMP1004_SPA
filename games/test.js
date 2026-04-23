"use strict"

import {displayHandler, gameObjectHandler, inputHandler, rectangle} from "./gameLib.js";

var player;
var player2;
var idk;
var gameLoopID;
function gameStart()
{
    inputHandler.setup()

    displayHandler.createDisplay({height:900,width:1800});

    player = new rectangle({height:40, width:40});
    player2 = new rectangle({height:40, width:40});
    player2.y = displayHandler.gameCanvas.height/2;
    gameLoopID = setInterval(gameLoop, 10);
    gameObjectHandler.createCollisionInteraction({gameObj1:player, gameObj2: player2, collisionFunc:resolveCollision});
}

function resolveCollision(player, player2)
{
    let resultantSpeedX = player.speedX - player2.speedX;
    /*Scenarios:
    player approaches player2 from left 
    player2 approaches player from right */ 
    if (resultantSpeedX > 0)
    {
        player2.x = player.x+player.width;
    }
    if (resultantSpeedX < 0)
    {
        player2.x = player.x-player2.width;
    }
    
}

function gameLoop()
{
    
    checkInputs();
    gameObjectHandler.positionUpdateAll();
    gameObjectHandler.checkCollisionInteractions();
    displayHandler.updateDisplay();
}



function checkInputs()
{
    inputHandler.updateKeysThisFrame();
    
    if (inputHandler.getKeyDown("KeyW"))
    {
        player.speedY -= 10;
    }
    if (inputHandler.getKeyDown("KeyA"))
    {
        player.speedX -= 10;
    }
    if (inputHandler.getKeyDown("KeyS"))
    {
        player.speedY += 10;
    }
    if (inputHandler.getKeyDown("KeyD"))
    {
        player.speedX += 10;
    }
    if (inputHandler.getKeyUp("KeyW"))
    {
        player.speedY += 10;
    }
    if (inputHandler.getKeyUp("KeyA"))
    {
        player.speedX += 10;
    }
    if (inputHandler.getKeyUp("KeyS"))
    {
        player.speedY -= 10;
    }
    if (inputHandler.getKeyUp("KeyD"))
    {
        player.speedX -= 10;
    }

    if (inputHandler.getKeyDown("ArrowUp"))
    {
        player2.speedY -=10;
    }
    if (inputHandler.getKeyUp("ArrowUp"))
    {
        player2.speedY +=10;
    }
    if (inputHandler.getKeyDown("ArrowDown"))
    {
        player2.speedY +=10;
    }
    if (inputHandler.getKeyUp("ArrowDown"))
    {
        player2.speedY -=10;
    }
    
    if (inputHandler.getKeyDown("ArrowLeft"))
    {
        player2.speedX -=10;
    }
    if (inputHandler.getKeyUp("ArrowLeft"))
    {
        player2.speedX +=10;
    }
    if (inputHandler.getKeyDown("ArrowRight"))
    {
        player2.speedX +=10;
    }
    if (inputHandler.getKeyUp("ArrowRight"))
    {
        player2.speedX -=10;
    }

}

function gameEnd()
{
    displayHandler.deleteDisplay();
}

export {gameStart};
