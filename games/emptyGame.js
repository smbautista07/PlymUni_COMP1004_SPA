"use strict"

import {displayHandler, gameObjectHandler, inputHandler, rectangle} from "./gameLib.js";

var player;
var player2;
var idk;
var gameLoopID;
function gameStart()
{
    inputHandler.setup();
    displayHandler.createDisplay({height:600,width:1400});
    gameLoopID = setInterval(gameLoop,20);
    
}


function gameLoop()
{
    inputHandler.updateKeysThisFrame();

    if (inputHandler.getKeyDown("Backquote"))
    {
        exitGame();
    }

    gameObjectHandler.positionUpdateAll();
    gameObjectHandler.checkCollisionInteractions();
    displayHandler.updateDisplay();
}



function exitGame()
{
    inputHandler.cease();
    gameObjectHandler.gameObjects.clear();
    gameObjectHandler.collisionInteractions.clear();
    displayHandler.deleteDisplay();
    clearInterval(gameLoopID);
    let b = document.getElementsByClassName("gameButton");
    Array.from(b).forEach((currentButton)=>{currentButton.style.visibility = "visible";});
}

export {gameStart};
