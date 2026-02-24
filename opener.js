"use strict";
import {gameStart} from "./pong.js";

// var starterButton = document.getElementById("pongStarter");
// starterButton.style.color="green";
// starterButton.onclick = gameStart;
// starterButton.onclick = gameStart;

var starterButton = document.createElement("div");
var starterButtonText = document.createTextNode("Pong");
starterButton.appendChild(starterButtonText);


// starterButton.setAttribute("onclick",gameStart);

starterButton.onclick = launchGame;


starterButton.setAttribute("class", "gameButton");
var bodies = document.getElementById("gameGrid");

bodies.appendChild(starterButton);



function launchGame()
{
    gameStart();
    starterButton.onclick = "";
}

