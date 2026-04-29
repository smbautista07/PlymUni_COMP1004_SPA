addEventListener("DOMContentLoaded", wt)
const r = new FileReader();
var result;

function wt()
{
    var saveFileInput = document.getElementById("selectFile");
    
    saveFileInput.addEventListener("change", handleSaveFile);
}

function handleSaveFile()
{
    //reference to file user has put into input element
    var [f] = this.files;
    
    //Adds an event listener which reads the result when a file is fully loaded
    r.addEventListener("load", readJSONFileResult);
    

    //Starts loading the file chosen by user 
    r.readAsText(f);
    
    // result.addEventListener("change", removeAllEventListeners);
}

function readJSONFileResult(event)
{
    result = JSON.parse(r.result);
    console.log(result);
    //After reading the event listener is removed
    r.removeEventListener("load", readJSONFileResult);
}