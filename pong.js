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
        for (const obj of objectHandler.objects)
        {
            displayHandler.drawRect(obj);
        }
    }

    static clearAll()
    {
        for (const obj of objectHandler.objects)
        {
            displayHandler.clearRect(obj);
        }
    }

    static getWidth()
    {
        return displayHandler.width;
    }

    static getHeight()
    {
        return displayHandler.height;
    }
}

class rectangle
{
    constructor({height, width, x, y, screenAlignmentX="L", screenAlignmentY="T", selfAlignmentX, selfAlignmentY})
    {
        this.height = height;
        this.width = width;
        var offsetX = 0;
        var offsetY = 0;
        this.speedX = 0;
        this.speedY = 0;


        objectHandler.objects.add(this);


        if (selfAlignmentX === undefined)
        {
            selfAlignmentX = screenAlignmentX;
        } 
        if (selfAlignmentY === undefined)
        {
            selfAlignmentY = screenAlignmentY;
        } 

        switch (selfAlignmentY)
        {
            case "T":
                break;
            case "B":
                offsetY += -height;
                break;
            case "M":
                offsetY += -height/2;
                break;
            default:
                console.error("Invalid selfAlignmentY argument");
                offsetY += -9999;
        }

        switch (selfAlignmentX)
        {
            case "L":
                break;
            case "R":
                offsetX += -width;
                break;
            case "M":
                offsetX += -width/2;
                break;
            default:
                console.error("Invalid selfAlignmentX argument");
                offsetX += -9999;
        }

        switch (screenAlignmentY)
        {
            case "T":
                break;
            case "B":
                y = displayHandler.getHeight() - y;
                break;
            default:
                console.error("Invalid screenAlignment argument");
                y = -9999;
        }

        switch (screenAlignmentX)
        {
            case "L":
                break;
            case "R":
                x = displayHandler.getWidth() - x;
                break;
            default:
                console.error("Invalid screenAlignment argument");
                x = -9999;
        }

        this.setPosition({x: x+offsetX, y: y+offsetY});
    }

    setPosition({x,y})
    {
        this.x = x;
        this.y = y;
    }
}

class objectHandler
{
    static objects = new Set();
   
    static positionUpdateAll()
    {
        for (const obj of objectHandler.objects)
        {
            objectHandler.positionUpdate(obj);
        }
    }

    static positionUpdate(obj)
    {
        obj.x += obj.speedX;
        obj.y += obj.speedY;
    }
    
    static outputObj()
    {
        for (const obj of objectHandler.objects)
        {
            console.log(objectHandler.objects);
            console.log("Hello");
        }
    }
    
}

var pongBall;
var leftPaddle;
var rightPaddle;
function initialise()
{
    displayHandler.createDisplay({width:960, height:540});    
    
    pongBall = new rectangle({height:20, width:20,x:0,y:0, screenAlignmentX:"L"});
    leftPaddle = new rectangle({height:100, width:10, x:50, y:displayHandler.getHeight()/2,selfAlignmentY:"M"});
    rightPaddle = new rectangle({height:100, width:10, x:50, y:displayHandler.getHeight()/2, screenAlignmentX:"R",selfAlignmentY:"M"});

    // displayHandler.redrawAll();
    pongBall.speedX=10;
    leftPaddle.speedY=10;

    console.log("Hello");

    // objectHandler.positionUpdate(pongBall);
    // objectHandler.outputObj();
    // console.log(objectHandler.objects);
    setInterval(update, 30);
    // displayHandler.redrawAll();
}



function update()
{
    displayHandler.clearAll();
    objectHandler.positionUpdateAll();
    displayHandler.drawAll();
}

initialise();

