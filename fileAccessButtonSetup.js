addEventListener("DOMContentLoaded", setupImportExport)
const r = new FileReader();
var result;

function setupImportExport()
{
    importSaveButtonSetup();
    exportSaveButtonSetup();
}

function importSaveButtonSetup()
{
    var saveFileInput = document.getElementById("selectFile");
    saveFileInput.addEventListener("change", handleSelectedSaveFile);
}

function handleSelectedSaveFile()
{
    //reference to file user has put into input element
    var [f] = this.files;
    
    //Adds an event listener which reads the result when a file is fully loaded
    r.addEventListener("load", saveFileToLocalHost);
    
    //Starts loading the file chosen by user 
    r.readAsText(f);
}

function saveFileToLocalHost(event)
{
    localStorage.setItem("saveFile", r.result);
    
    //console.log(localStorage.getItem("saveFile"));

    //After reading the event listener is removed
    r.removeEventListener("load", saveFileToLocalHost);
}

function exportSaveButtonSetup()
{
    var a = document.getElementById("saveExportButton");

    a.style.color = "green"

    a.onclick = () =>
    {
        const fileToDownload = new Blob([localStorage.getItem("saveFile")],{type:"application/json"});
        const linkToFile = URL.createObjectURL(fileToDownload);
        const tempElement = document.createElement("a")

        tempElement.href = linkToFile;

        //name of downloaded file
        tempElement.download = "downloadtext.json";
        document.body.appendChild(tempElement);

        tempElement.click();

    }
}
