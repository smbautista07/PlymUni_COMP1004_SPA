addEventListener("DOMContentLoaded", localSaveSetup);


function localSaveSetup()
{
    if (!localStorage.getItem("saveFile"))
    {
        let newSaveFile = JSON.stringify({});
        
        localStorage.setItem("saveFile", newSaveFile);
        console.log("saveFile not present creating one now");
    }
}