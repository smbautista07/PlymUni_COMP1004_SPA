"use strict";

class displayHandler
{
    constructor()
    {
        this.gameCanvas = document.createElement("canvas");
        this.gameCanvas.width = 960;
        this.gameCanvas.height = 540;
        this.gameCanvas.id = "display";
        document.body.appendChild(this.gameCanvas);
        
        this.ctx = this.gameCanvas.getContext("2d");
    }

    drawRect(rect_obj)
    {
        this.ctx.fillRect(rect_obj.x,rect_obj.y,rect_obj.width,rect_obj.height);
    }

}

class rectangle
{
    constructor({height, width, x, y})
    {
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
    }
}

var pongDisplay;
function initialise()
{
    pongDisplay = new displayHandler();
}

var r = new rectangle({height:100, x: 32, y:100, width:32});

pongDisplay.drawRect(r);