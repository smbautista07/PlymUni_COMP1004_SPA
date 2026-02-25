"use strict";
import {gameStart} from "./pong.js";

var starterButton = document.createElement("div");
var starterButtonText = document.createTextNode("Pong");
starterButton.appendChild(starterButtonText);

starterButton.onclick = launchGame;


starterButton.setAttribute("class", "gameButton");
var bodies = document.getElementById("gameGrid");

bodies.appendChild(starterButton);



function launchGame()
{
    gameStart();
    starterButton.onclick = "";
}

