"use strict";

function initialise()
{
    const gameDisplay = document.createElement("canvas");
    gameDisplay.width = 960;
    gameDisplay.height = 540;
    gameDisplay.id = "display";
    document.body.appendChild(gameDisplay);
    console.log("connected");
}

initialise();