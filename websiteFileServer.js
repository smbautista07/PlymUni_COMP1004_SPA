import { createServer } from "node:http";
import { readFileSync } from "node:fs";
const port = 3000


const server = createServer((req,res) =>
{
    var fileToSend;
    var contentTypeHeaderValue;

    //replace %20 with spaces
    var fileName = decodeURI(req.url);

    //initial get request only sends / rather than file name
    if (fileName == '/')
    {
        fileName = "Multi-game SPA.html";
    }

    let fileType = findFileExtension(fileName);

    switch (fileType)
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
        default:
            console.log(`idk file type ${fileType} from ${fileName}`);
    }

    fileToSend = readFileSync(`./${fileName}`, "utf-8");
    res.writeHead(200, {"Content-Type":contentTypeHeaderValue, "X-Content-Type-Options":"sniff"});

    res.end(fileToSend);
})

function findFileExtension(fileName)
{
    let fileExtension;
    let indexOfLastDot;
    for (let index = fileName.length; index >= 0; index--)
    {
        if (fileName[index] == '.')
        {
            indexOfLastDot = index;
            fileExtension = fileName.substr(indexOfLastDot+1);
            return fileExtension;
        }
    }
}

server.listen(port, () => {
  console.log(`Example app listening. Go to  http://localhost:${port}`)
})
