"use strict";

class displayHandler
{
    static gameCanvas;
    static ctx;

    static updateDisplay()
    {
        displayHandler.clearDisplay();
        displayHandler.drawAll();
        requestAnimationFrame(displayHandler.updateDisplay);
    }

    static createDisplay({width, height})
    {
        displayHandler.gameCanvas = document.createElement("canvas");
        displayHandler.gameCanvas.width = 960;
        displayHandler.gameCanvas.height = 540;
        displayHandler.gameCanvas.id = "display";
        document.body.appendChild(displayHandler.gameCanvas);
        
        displayHandler.ctx = displayHandler.gameCanvas.getContext("2d");
    }

    static drawRect(rect_obj)
    {
        displayHandler.ctx.fillRect(rect_obj.x,rect_obj.y,rect_obj.width,rect_obj.height);
    }

    static drawText(text_obj)
    {
        displayHandler.ctx.font = "bold 100px sans-serif";
        displayHandler.ctx.textAlign = "center";
        displayHandler.ctx.fillText(text_obj.text, text_obj.x, text_obj.y);
    }

    static drawAll()
    {
        for (const gameObj of gameObjectHandler.gameObjects)
        {
            switch(gameObj.constructor.name)
            {
                case "rectangle":
                    displayHandler.drawRect(gameObj);
                    break;
                case "textGameObj":
                    displayHandler.drawText(gameObj);
                    break;
                default:
                    console.error("Invalid object drawn");

            }
            
        }
    }

    static clearDisplay()
    {
        displayHandler.ctx.clearRect(0,0,displayHandler.gameCanvas.width, displayHandler.gameCanvas.height);
    }
}

class rectangle
{
    constructor({height, width, x=0, y=0})
    {
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        
        gameObjectHandler.gameObjects.add(this);
    }
}

class textGameObj
{
    constructor({text, x, y})
    {
        this.text = text;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        gameObjectHandler.gameObjects.add(this);
    }
}

class gameObjectHandler
{
    static gameObjects = new Set();

    static collisionInteractions = new Set();
    static positionUpdateAll()
    {
        gameObjectHandler.gameObjects.forEach(gameObjectHandler.positionUpdate);
    }

    static positionUpdate(gameObj)
    {
        gameObj.x += gameObj.speedX;
        gameObj.y += gameObj.speedY;
    }

    static createCollisionInteraction({gameObj1, gameObj2, collisionFunc})
    {
        gameObjectHandler.collisionInteractions.add({obj1:gameObj1, obj2:gameObj2, collisionFunc:collisionFunc});
    }

    static checkCollisionInteractions()
    {
        gameObjectHandler.collisionInteractions.forEach(gameObjectHandler.checkCollisionInteraction);
    } 

    static checkCollisionInteraction(infoObj)
    {
        if (gameObjectHandler.AABB(infoObj.obj1, infoObj.obj2))
        {
            infoObj.collisionFunc();
        }
    }
    
    static AABB(gameObj1, gameObj2)
    {
        if (gameObj1.x+gameObj1.width>gameObj2.x && gameObj1.x < gameObj2.x+gameObj2.width)
        {
            if (gameObj1.y<gameObj2.y+gameObj2.height && gameObj1.y+gameObj1.height > gameObj2.y)
            {
                return true;
            }
        }
        return false;
    }
}

class inputHandler
{
    static preventDefaultKeyAction = new Set();
    
    static keyStates = new Map();
    static keyDown = new Set(); 
    static keyUp = new Set();

    static getKeyDown(key)
    {
        if (inputHandler.keyDown.has(key))
        {
            inputHandler.keyDown.delete(key);
            return true;
        }
        return false;
    }

    static getKeyUp(key)
    {
        if (inputHandler.keyUp.has(key))
        {
            inputHandler.keyUp.delete(key);
            return true;
        }
        return false;
    }

    static setup()
    {
        document.addEventListener("keydown", inputHandler.updateKeyDown);
        document.addEventListener("keyup", inputHandler.updateKeyUp);
    }

    static updateKeyDown(event)
    {
        if (event.repeat != true)
        {
            inputHandler.keyDown.add(event.code);
        }
        if (inputHandler.preventDefaultKeyAction.has(event.code))
        {
            event.preventDefault();
        }
    }

    static updateKeyUp(event)
    {
        if (event.repeat != true)
        {
            inputHandler.keyUp.add(event.code);
        }
    }

    static preventDefault(key)
    {
        inputHandler.preventDefaultKeyAction.add(key);
    }
}

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
    inputHandler.update
}

gameStart();
setInterval(gameLoop, 10);  

requestAnimationFrame(displayHandler.updateDisplay);