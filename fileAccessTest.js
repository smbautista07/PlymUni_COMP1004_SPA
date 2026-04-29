addEventListener("DOMContentLoaded", wt)
const r = new FileReader();
var result;

function wt()
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