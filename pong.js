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
        for (const gameObj of gameObjectHandler.gameObjects)
        {
            displayHandler.clearRect(gameObj);
        }
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
        this.keyObjectMap.set(key, currentKeyObj);
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
function initialise()
{
    displayHandler.createDisplay({width:960, height:540});    
    inputHandler.setup();

    pongBall = new rectangle({height:20, width:20});
    leftPaddle = new rectangle({height:100, width:10});
    rightPaddle = new rectangle({height:100, width:10});

    pongBall.setPosition({x:0, y:0});
    leftPaddle.setPosition({x:50, y:(displayHandler.height-leftPaddle.width)/2});
    rightPaddle.setPosition({x:displayHandler.width - rightPaddle.width-50, y:(displayHandler.height-rightPaddle.height)/2});

    inputHandler.createKeyBind({key:"KeyW", onPress:temp, onRelease:temp2} );
    inputHandler.createKeyBind({key: "KeyS", onPress:temp2, onRelease:temp});
    inputHandler.createKeyBind({key: "ArrowUp", onPress:temp3, onRelease:temp4});
    inputHandler.createKeyBind({key: "ArrowDown", onPress:temp4, onRelease:temp3});
    inputHandler.preventDefault("Tab");
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
    displayHandler.drawAll();
}

initialise();
setInterval(gameLoop, 10);  
