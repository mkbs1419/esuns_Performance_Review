function checkLocalSave() {
    var localSaveDataJson = localStorage.dataJson;
    // console.log(localSaveDataJson);
    if (typeof (localSaveDataJson) === "undefined") {
        console.log("----- Load from txt -----");
        localSaveDataJson = {
            "quarter": "第一季度(Q1:106.12~107.03)",
            "fillingPerson": "評核人員X",
            "form2FillingDate": "",
            "testList": [{
                    "employeeId": "testProfile_A",
                    "employeeName": "受評人員A",
                    "employeeGroup": "宗陽",
                    "employeeDepartment": "工程事業群",
                    "employeeLevel": "1",
                    "reviewDate": "",
                    "arriveDate": "2017-01-01",
                    "regularDate": "2017-03-01",
                    "formStatus": [false, false],
                    "form1Score": [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "form1Result": [0, ""],
                    "form2Score": {
                        "orderList": ["0", "0", "0", "0", "0"],
                        "scoreList": [0, 0, 0, 0, 0],
                    },
                    "reviewNote": ""
                },
                {
                    "employeeId": "testProfile_B",
                    "employeeName": "受評人員B",
                    "employeeGroup": "宗陽",
                    "employeeDepartment": "工程事業群",
                    "employeeLevel": "2",
                    "reviewDate": "",
                    "arriveDate": "2017-01-01",
                    "regularDate": "2017-03-01",
                    "formStatus": [false, false],
                    "form1Score": [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "form1Result": [0, ""],
                    "form2Score": {
                        "orderList": ["0", "0", "0", "0", "0"],
                        "scoreList": [0, 0, 0, 0, 0],
                    },
                    "reviewNote": ""
                },
                {
                    "employeeId": "testProfile_C",
                    "employeeName": "受評人員C",
                    "employeeGroup": "宗陽",
                    "employeeDepartment": "工程事業群",
                    "employeeLevel": "3",
                    "reviewDate": "",
                    "arriveDate": "2017-01-01",
                    "regularDate": "2017-03-01",
                    "formStatus": [false, false],
                    "form1Score": [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "form1Result": [0, ""],
                    "form2Score": {
                        "orderList": ["0", "0", "0", "0", "0"],
                        "scoreList": [0, 0, 0, 0, 0],
                    },
                    "reviewNote": ""
                },
                {
                    "employeeId": "testProfile_D",
                    "employeeName": "受評人員D",
                    "employeeGroup": "宗陽",
                    "employeeDepartment": "工程事業群",
                    "employeeLevel": "4",
                    "reviewDate": "",
                    "arriveDate": "2017-01-01",
                    "regularDate": "2017-03-01",
                    "formStatus": [false, false],
                    "form1Score": [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "form1Result": [0, ""],
                    "form2Score": {
                        "orderList": ["0", "0", "0", "0", "0"],
                        "scoreList": [0, 0, 0, 0, 0],
                    },
                    "reviewNote": ""
                }
            ]
        };

    } else {
        console.log("----- Load from localStorage.dataJson -----");
        localSaveDataJson = JSON.parse(localSaveDataJson);
    }
    return localSaveDataJson;
}


function saveState(saveName, saveValue) {
    if (typeof (Storage) !== "undefined") {
        localStorage[saveName] = JSON.stringify(saveValue);
        console.log("call saveState()");
        return true;
    } else {
        alert("此瀏覽器不支援Web Storage");
        return false;
    }
}