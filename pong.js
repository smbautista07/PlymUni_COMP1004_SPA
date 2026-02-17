"use strict";

class displayHandler
{
    static width = 960;
    static height = 540;
    static gameCanvas;
    static ctx;

    static createDisplay({width, height})
    {
        displayHandler.gameCanvas = document.createElement("canvas");
        displayHandler.gameCanvas.width = displayHandler.width;
        displayHandler.gameCanvas.height = displayHandler.height;
        displayHandler.gameCanvas.id = "display";
        document.body.appendChild(displayHandler.gameCanvas);
        
        displayHandler.ctx = displayHandler.gameCanvas.getContext("2d");
    }

    static drawRect(rect_obj)
    {
        displayHandler.ctx.fillRect(rect_obj.x,rect_obj.y,rect_obj.width,rect_obj.height);
    }

    static clearRect(rect_obj)
    {
        displayHandler.ctx.clearRect(rect_obj.x,rect_obj.y,rect_obj.width,rect_obj.height);
    }
    
    static drawAll()
    {
        for (const gameObj of gameObjectHandler.gameObjects)
        {
            displayHandler.drawRect(gameObj);
        }
    }

    static clearAll()
    {
        displayHandler.ctx.clearRect(0,0,displayHandler.width, displayHandler.height);
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

class gameObjectHandler
{
    static gameObjects = new Set();

    static collisionPairToFunc = new Set();
    static positionUpdateAll()
    {
        for (const gameObj of gameObjectHandler.gameObjects)
        {
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
        gameObjectHandler.collisionPairToFunc.add({obj1:gameObj1, obj2:gameObj2, collisionFunc:collisionFunc});
    }

    static checkCollisionInteractions()
    {
        for (const infoObj of gameObjectHandler.collisionPairToFunc)
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

function gameStart()
{
    displayHandler.createDisplay({width:960, height:540});    
    inputHandler.setup();

    pongBall = new rectangle({height:20, width:20});
    leftPaddle = new rectangle({height:100, width:10});
    rightPaddle = new rectangle({height:100, width:10});

    inputHandler.createKeyBind({key:"KeyW", onPress:temp, onRelease:temp2} );
    inputHandler.createKeyBind({key: "KeyS", onPress:temp2, onRelease:temp});
    inputHandler.createKeyBind({key: "ArrowUp", onPress:temp3, onRelease:temp4});
    inputHandler.createKeyBind({key: "ArrowDown", onPress:temp4, onRelease:temp3});
    inputHandler.preventDefault("Tab");

    gameObjectHandler.createCollisionInteraction({gameObj1:pongBall, gameObj2:leftPaddle, collisionFunc:bounce});
    gameObjectHandler.createCollisionInteraction({gameObj1:pongBall, gameObj2:rightPaddle, collisionFunc:bounce});

    leftPaddle.setPosition({x:50, y:calculateBottomScreenY(leftPaddle)/2});
    rightPaddle.setPosition({x:calculateEndScreenX(rightPaddle)-50, y:calculateBottomScreenY(rightPaddle)/2});
    resetPongball();
}

function resetPongball()
{
    pongBall.setPosition({x:calculateEndScreenX(pongBall)/2, y:calculateBottomScreenY(pongBall)/2});
    pongBall.speedX = Math.random()*10;
    // pongBall.speedY = Math.random()*10;
}

function calculateBottomScreenY(gameObj)
{
    return (displayHandler.height-gameObj.height)
}
function calculateEndScreenX(gameObj)
{
    return (displayHandler.width-gameObj.width)
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

function gameLoop()
{
    displayHandler.clearAll();
    gameObjectHandler.positionUpdateAll();
    gameObjectHandler.checkCollisionInteractions();
    displayHandler.drawAll();
}

gameStart();
setInterval(gameLoop, 10);  
