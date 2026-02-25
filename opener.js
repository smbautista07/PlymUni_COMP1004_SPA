"use strict";
import {gameStart, gameEnd} from "./pong.js";

// var starterButton = document.getElementById("pongStarter");
// starterButton.style.color="green";
// starterButton.onclick = gameStart;
// starterButton.onclick = gameStart;

var starterButton = document.createElement("div");
var starterButtonText = document.createTextNode("Pong");
starterButton.appendChild(starterButtonText);


// starterButton.setAttribute("onclick",gameStart);

starterButton.onclick = launchGameButtonAction;


starterButton.setAttribute("class", "gameButton");
var bodies = document.getElementById("gameGrid");

bodies.appendChild(starterButton);

function launchGameButtonAction()
{
    gameStart();
    starterButton.onclick = endGameButtonAction;
}

function endGameButtonAction()
{
    gameEnd();
    starterButton.onclick = launchGameButtonAction;
}
