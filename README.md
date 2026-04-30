### About
This SPA is about hosting a website that games can be put on so users can access it without manual install or worrying about updates. Currently it only has 1 real game (pong) which I made as part of this project and an empty game to show that more than one game can be put on the website. 

### Prerequisites and launching the website
You need node.js to run this (my version is 24.13.1 as of this documentation). Simply navigate to the root directory **of this project** using cd and ls into powershell or command prompt (unsure if this works in Linux since I'm running this on Windows) and type "node websiteFileServer.js" without quotes. 

### Accessing the website

After launching it should output a link to the website that only works locally, which should be http://localhost:3000 by default. If you're connected to a network, it should output other links that can be used by devices on the same network to access the website. Please note that this website is only intended for computers, even if the website can be launched on phones. If still not accessible, type "netstat -ano" into command prompt to see which TCP/UDP ports are being used. 0.0.0.0:3000 or (privateIpAddress):3000 should be visible. If not, there may be OS security features which are interfering with it which you will have to bypass.

### Playing games on the website
You should be greeted with a GUI and see pong+the empty game. Click on pong and there will be instructions on how to play and exit it.

### Adding games to the website
Adding games to the website isn't as easy as I it should be as it includes creating a script that  imports a large amount of functions from gameLib.js, and exporting a startGame to another script which needs the file path of the game script. Then creating a loop where non-explanatory values need to be edited in order to manipulate canvas elements. Currently working on making this simpler, with the end goal of having an empty script launch a game with no objects in it but with the ability to exit, have a canvas made, etc so I only need to worry about objects in game.

### Save data
Save data for games is held in local storage, so usually no interaction is needed. However, if you change device or browser, you can export the save file object in local storage as a JSON and import it to this website later on.