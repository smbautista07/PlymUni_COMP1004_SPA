"use strict";

class displayHandler
{
    static displayWidth = 960;
    static displayHeight = 540;
    

    constructor()
    {
        this.gameCanvas = document.createElement("canvas");
        this.gameCanvas.width = displayHandler.displayWidth;
        this.gameCanvas.height = displayHandler.displayHeight;
        this.gameCanvas.id = "display";
        document.body.appendChild(this.gameCanvas);
        
        this.ctx = this.gameCanvas.getContext("2d");
    }

    drawRect(rect_obj)
    {
        this.ctx.fillRect(rect_obj.x,rect_obj.y,rect_obj.width,rect_obj.height);
    }

    clearRect(rect_obj)
    {
        this.ctx.clearRect(rect_obj.x,rect_obj.y,rect_obj.width,rect_obj.height);
    }

    static getWidth()
    {
        return displayHandler.displayWidth;
    }

    static getHeight()
    {
        return displayHandler.displayHeight;
    }
}

class rectangle
{
    constructor({height, width, x, y, selfAlignment="TL", screenAlignment="TL"})
    {
        this.height = height;
        this.width = width;
        
        var xOffset = 0;
        var yOffset = 0;

        if (screenAlignment[0] == "B")
        {
            yOffset += displayHandler.getHeight() - height;
        }
        if (screenAlignment[1] == "R")
        {
            xOffset += displayHandler.getWidth() - width;
        }

        this.x = x+xOffset;
        this.y = y+yOffset;
    }


}


var pongDisplay;
var r;
function initialise()
{
    pongDisplay = new displayHandler();
    console.log(displayHandler.getWidth());
    r = new rectangle({height:20, width:20,x:0,y:0, screenAlignment:"TR"});
    
    pongDisplay.drawRect(r);

}

initialise();

