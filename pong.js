"use strict";

class displayHandler
{
    static gameCanvas;
    static ctx;

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
    static clearRect(rect_obj)
    {
        displayHandler.ctx.clearRect(rect_obj.x,rect_obj.y,rect_obj.width,rect_obj.height);
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
    constructor({height, width})
    {
        this.height = height;
        this.width = width;
        this.speedX = 0;
        this.speedY = 0;
        
        gameObjectHandler.gameObjects.add(this);
    }

    setPosition({x,y})
    {
        if (x !== undefined)
        {
            this.x = x;    
        } 
        if (y !== undefined)
        {
            this.y = y;    
        } 
    }
}

class textGameObj
{
    constructor({text, x, y})
    {
        this.text = text;
        this.x = x;
        this.y = y;
        gameObjectHandler.gameObjects.add(this);
    }
}

class gameObjectHandler
{
    static gameObjects = new Set();

    static collisionInteraction = new Set();
    static positionUpdateAll()
    {
        for (const gameObj of gameObjectHandler.gameObjects)
        {
            if (gameObj.speedX === undefined||gameObj.speedY ===undefined)
            {
                return;
            }

            gameObjectHandler.positionUpdate(gameObj);
        }
    }

    static positionUpdate(gameObj)
    {
        gameObj.x += gameObj.speedX;
        gameObj.y += gameObj.speedY;
    }

    static createCollisionInteraction({gameObj1, gameObj2, collisionFunc})
    {
        gameObjectHandler.collisionInteraction.add({obj1:gameObj1, obj2:gameObj2, collisionFunc:collisionFunc});
    }

    static checkCollisionInteractions()
    {
        for (const infoObj of gameObjectHandler.collisionInteraction)
        {
            if (gameObjectHandler.AABB(infoObj.obj1, infoObj.obj2))
            {
                infoObj.collisionFunc();
            }
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
    static keyObjectMap = new Map();
    static preventDefaultKeyAction = new Set();

    static setup()
    {
        document.addEventListener("keydown", inputHandler.keyToAction);
        document.addEventListener("keyup", inputHandler.keyToAction);
    }
    
    static createKeyBind({key, onPress, onRelease})
    {
        const currentKeyObj = {onPress:onPress, onRelease:onRelease, keyStillPressed:false};
        inputHandler.keyObjectMap.set(key, currentKeyObj);
    }

    static keyToAction(event)
    {
        const currentKey = event.code;
        if (inputHandler.keyObjectMap.has(currentKey))
        {
            const keyObj = inputHandler.keyObjectMap.get(currentKey);
            if (keyObj.keyStillPressed == false && event.type == "keydown")
            {
                keyObj.onPress();
                keyObj.keyStillPressed = true;
            }
            if (keyObj.keyStillPressed == true && event.type == "keyup")
            {
                keyObj.onRelease();
                keyObj.keyStillPressed = false;
            }
        }

        if (inputHandler.preventDefaultKeyAction.has(currentKey))
        {
            event.preventDefault();
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
    leftPaddle = new rectangle({height:100, width:10});
    rightPaddle = new rectangle({height:100, width:10});

    leftPlayerScoreBoard = new textGameObj({text:0, x:displayHandler.gameCanvas.width/3, y:100});
    rightPlayerScoreBoard = new textGameObj({text:0, x:displayHandler.gameCanvas.width*2/3, y:100});

    inputHandler.createKeyBind({key:"KeyW", onPress:temp, onRelease:temp2});
    inputHandler.createKeyBind({key: "KeyS", onPress:temp2, onRelease:temp});
    inputHandler.createKeyBind({key: "ArrowUp", onPress:temp3, onRelease:temp4});
    inputHandler.createKeyBind({key: "ArrowDown", onPress:temp4, onRelease:temp3});
    inputHandler.preventDefault("Tab");

    gameObjectHandler.createCollisionInteraction({gameObj1:pongBall, gameObj2:leftPaddle, collisionFunc:bounce});
    gameObjectHandler.createCollisionInteraction({gameObj1:pongBall, gameObj2:rightPaddle, collisionFunc:bounce});

    leftPaddle.setPosition({x:50, y:bottomScreenY(leftPaddle)/2});
    rightPaddle.setPosition({x:endScreenX(rightPaddle)-50, y:bottomScreenY(rightPaddle)/2});
    resetPongball();
}

function resetPongball()
{
    pongBall.setPosition({x:endScreenX(pongBall)/2, y:bottomScreenY(pongBall)/2});
    pongBall.speedX = Math.random()*10;
    pongBall.speedY = Math.random()*10;
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

function temp()
{
    leftPaddle.speedY += -10;
}
function temp2()
{
    leftPaddle.speedY += 10;
}

function temp3()
{
    rightPaddle.speedY += -10;
}
function temp4()
{
    rightPaddle.speedY += 10;
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
    displayHandler.clearDisplay();
    gameObjectHandler.positionUpdateAll();
    pongBallEdgeInteraction(pongBall);
    paddleScreenEdgeInteraction(leftPaddle);
    paddleScreenEdgeInteraction(rightPaddle);
    gameObjectHandler.checkCollisionInteractions();
    displayHandler.drawAll();
}

gameStart();
setInterval(gameLoop, 10);  
