"use strict"

import {displayHandler, gameObjectHandler, inputHandler, rectangle} from "./gameLib.js";

var player;
var idk;
var gameLoopID;
function gameStart()
{
    player = new rectangle({height:20, width:20});
    displayHandler.createDisplay({height:100,width:200});
    gameLoopID = setInterval(gameLoop, 20);
}

function gameLoop()
{
    displayHandler.drawAll();
    
}

function gameEnd()
{
    displayHandler.deleteDisplay();
}

export {gameStart};
