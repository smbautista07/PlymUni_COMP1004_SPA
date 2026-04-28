const fileToDownload = new Blob(["{}"],{type:"application/json"});
const linkToFile = URL.createObjectURL(fileToDownload);
const tempElement = document.createElement("a")

tempElement.href = linkToFile;

//name of downloaded file
tempElement.download = "downloadtext.json";
document.body.appendChild(tempElement);

tempElement.click();