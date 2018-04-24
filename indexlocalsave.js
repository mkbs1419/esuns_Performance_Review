function checkLocalSave(projectInfo) {
    var localSaveDataJson = localStorage.dataJson;

    if (typeof (localSaveDataJson) === "undefined") {
        console.log("----- Load from SQL -----");
        localSaveDataJson = projectInfo;

    } else if (localSaveDataJson.projectName !== projectInfo.projectName) {
        console.log("----- Load from localStorage.dataJson -----");
        localSaveDataJson = JSON.parse(localSaveDataJson);

    } else {
        console.log("----- cover localStorage.dataJson -----");
        localSaveDataJson = JSON.parse(localSaveDataJson);
        console.log(localSaveDataJson.projectName);
        console.log(projectInfo.projectName);
        localSaveDataJson = projectInfo;
    }
    return localSaveDataJson;
}


function saveLocalState(saveName, saveValue) {
    if (typeof (Storage) !== "undefined") {
        localStorage[saveName] = JSON.stringify(saveValue);
        console.log("call saveState()");
        return true;
    } else {
        alert("此瀏覽器不支援Web Storage");
        return false;
    }
}