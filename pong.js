"use strict";

class displayHandler
{
    static displayWidth = 960;
    static displayHeight = 540;
    static gameCanvas;
    static ctx;

    static createDisplay()
    {
        displayHandler.gameCanvas = document.createElement("canvas");
        displayHandler.gameCanvas.width = displayHandler.displayWidth;
        displayHandler.gameCanvas.height = displayHandler.displayHeight;
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
        return displayHandler.displayWidth;
    }

    static getHeight()
    {
        return displayHandler.displayHeight;
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
        // exampleFunc();

        


    }

    exampleFunc()
    {
        console.log("E");
    }


    // setPosition({x1=0, y1=0, screenAlignment1="TL"})
    // {
    //     var xOffset = 0;
    //     var yOffset = 0;
        
    //     // if (screenAlignment[0] == "B")
    //     // {
    //     //     yOffset += displayHandler.getHeight() - this.height;
    //     // }
    //     // if (screenAlignment[1] == "R")
    //     // {
    //     //     xOffset += displayHandler.getWidth() - this.width;
    //     // }
    //     this.x += x1+xOffset;
    //     this.y += y1+yOffset;
    

}


var r;
function initialise()
{
    displayHandler.createDisplay();    
    console.log(displayHandler.getWidth());
    r = new rectangle({height:20, width:20,x:0,y:0, screenAlignment:"TR"});
    
    displayHandler.drawRect(r);
}

initialise();

