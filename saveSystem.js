addEventListener("DOMContentLoaded", saveButtonSetup)

function saveButtonSetup()
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

