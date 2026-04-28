import { createServer } from "node:http";
import { existsSync, constants, readFileSync } from "node:fs";
import { relative } from "node:path";
const port = 3000


const server = createServer((req,res) =>
{
    var fileToSend;
    var contentTypeHeaderValue;
    //space characters get replaced by %20 since they are encoded into URI requests, so we have to reverse that to get the original file name.
    var filePath = `.${decodeURI(req.url)}`;
    
    //initial get request only sends / rather than file name
    if (filePath == './')
    {
        filePath = "./Multi-game SPA.html";
        // filePath = "../nonProjectFile.html";
    }
    
    //convert filePath into understandable terms (can convert alternate path traversal characters into ..)
    filePath = relative("./", filePath);
    //check if .. is present. If it is, then user likely using path traversal
    if (filePath.includes(".."))
    {
        console.log(`Unauthorised resource ${filePath} access attempt`);
        res.writeHead(403);
        //prevents further processing by going to next server loop and ends request by responding to client with error code
        return res.end();
    }

    //Check if file exists
    if (!existsSync(filePath, constants.F_OK))
    {
        console.log(`Failed to access file ${filePath}`);
        res.writeHead(404);
        return res.end();
    }

    //Get file extension and set headers
    switch (getFileExtension(filePath))
    {
        case "css":
            contentTypeHeaderValue = "text/css";
        break;
        case "html":
            contentTypeHeaderValue = "text/html";
        break;
        case "js":
            contentTypeHeaderValue = "text/javascript";
        break;
        case "png":
            contentTypeHeaderValue = "image/png";
            break;
        default:
            console.error(`Unknown file type ${findFileExtension(filePath)} from ${filePath}`);
            res.writeHead(404)
            return res.end();
    }

    //Send file
    fileToSend = readFileSync(`${filePath}`);
    res.writeHead(200, {"Content-Type":contentTypeHeaderValue, "X-Content-Type-Options":"nosniff"});
    res.end(fileToSend);
})

function getFileExtension(filePath)
{
    let fileExtension;
    let indexOfLastDot;
    for (let index = filePath.length; index >= 0; index--)
    {
        if (filePath[index] == '.')
        {
            indexOfLastDot = index;
            fileExtension = filePath.substr(indexOfLastDot+1);
            return fileExtension;
        }
    }
}

server.listen(port, () => {
  console.log(`Example app listening. Go to  http://localhost:${port}`)
})
