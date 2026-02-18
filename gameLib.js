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

export {displayHandler, gameObjectHandler, textGameObj, rectangle, inputHandler}