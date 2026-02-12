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
    constructor({height, width, x, y, screenAlignment="TL"})
    {
        this.height = height;
        this.width = width;
        this.x = 0;
        this.y = 0;

        switch (screenAlignment[0])
        {
            case "T":
                break;
            case "B":
                y = displayHandler.getHeight() - this.height - y;
                break;
            default:
                console.error("Invalid screenAlignment argument");
                y = -9999;
                
        }
        switch (screenAlignment[1])
        {
            case "L":
                break;
            case "R":
                x = displayHandler.getWidth() - this.width - x;
                break;
            default:
                console.error("Invalid screenAlignment argument");
                x = -9999;
        }

        this.setPosition({x:x, y:y})
    }

    setPosition({x,y})
    {
        this.x = x;
        this.y = y;
    }
}


var pongBall;
var leftPaddle;
var rightPaddle;
function initialise()
{
    displayHandler.createDisplay({width:960, height:540});    
    console.log(displayHandler.getWidth());
    pongBall = new rectangle({height:20, width:20,x:50,y:50});
    

    leftPaddle = new rectangle({height:100, width:10, x:50, y:displayHandler.getHeight()/2});
    rightPaddle = new rectangle({height:100, width:10, x:50, y:displayHandler.getHeight()/2, screenAlignment:"TR"});

    displayHandler.drawRect(pongBall);
    displayHandler.drawRect(leftPaddle);
    displayHandler.drawRect(rightPaddle);
}

function update()
{

}



initialise();

