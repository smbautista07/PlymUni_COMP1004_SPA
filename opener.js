"use strict";
// import {gameStart, gameEnd} from "./pong.js";

const gamePaths =
{
    pong:"./games/pong.js",
    test:"./games/test.js"
}


const gameNames = Object.keys(gamePaths);



// gameNames.forEach(createButton);

// async function createButton(gameName)
// {
//     let gameFunctions = await import(gamePaths[gameName]); 
//     let starterButton = document.createElement("div");
//     let starterButtonText = document.createTextNode(gameName);
//     starterButton.appendChild(starterButtonText);
//     starterButton.onclick = gameFunctions;
// }

console.log(gameNames);

gameNames.forEach(createButton);

async function createButton(gameName)
{
    var starterButton = document.createElement("div");
    var starterButtonText = document.createTextNode(gameName);
    starterButton.appendChild(starterButtonText);
    starterButton.setAttribute("class", "gameButton");
    var gameGrid = document.getElementById("gameGrid");
    var gameFunctions = await import(gamePaths[gameName]);
    
    starterButton.onclick = () =>
        {
            // gameGrid.setAttribute("style.")
            // gameGrid.style.display = 'none';
            hideGameButtons();
            gameFunctions.gameStart();
        }
    gameGrid.appendChild(starterButton);
}

function hideGameButtons()
{
    console.log(document.getElementsByClassName("gameButton"));
    // idk.forEach(hideElement);
    let buttons = document.getElementsByClassName("gameButton");

    Array.from(buttons).forEach(hideElement);
}

function hideElement(elem)
{
    elem.style.display = "none";
}