// TODO
// dataJson.quarter 敘述轉換
$(document).ready(function () {
    const apiURL = "http://localhost:3000";
    const bonusRate = 0.25;

    let isLogin = sessionStorage.projectInfo;
    if (typeof (isLogin) === "undefined") {
        alert("您未登入");
        window.location = '/PR/login.html';
    } else {
        console.log("已登入");
        isLogin = JSON.parse(isLogin);

        //讀取login拋轉來的資料
        var dataJson = isLogin[1];
        console.log(dataJson);

        //請求完成明細
        let listWords = "[";
        for (let li = 0; li < dataJson.testList.length; li++) {
            listWords = listWords + "\"" + dataJson.testList[li] + "\","
        }
        listWords = listWords.slice(0, -1);
        listWords = listWords + "]";

        $.post(apiURL + "/employeeinfo/all", {
            testList: listWords
        }, function (data, status) {

            // employeeId 轉 employeeName
            dataJson["testListName"] = [];
            for (let i = 0; i < dataJson.testList.length; i++) {
                for (let fi = 0; fi < data.length; fi++) {
                    if (dataJson.testList[i] === data[fi].employeeId) {
                        dataJson.testListName[i] = [data[fi].employeeId, data[fi].employeeName]
                    }
                }
            }
            isLogin[1] = dataJson;
            sessionStorage["projectInfo"] = JSON.stringify(isLogin);


            let form1ToDo = 0;
            let form1Done = 0;
            let form2ToDo = 0;

            for (let i = 0; i < data.length; i++) {
                if (data[i].form1Status) {
                    form1Done++;
                    $('#inlineForm1Select').append($('<option>').text(data[i].employeeName + "(已完成)").attr("value", data[i].employeeId));
                } else {
                    form1ToDo++;
                    $('#inlineForm1Select').append($('<option>').text(data[i].employeeName).attr("value", data[i].employeeId));
                }
                if (!data[i].form2Status) {
                    form2ToDo++;
                }
            }
            $("#form1ToDo").text("待完成：" + form1ToDo);
            $("#form1Done").text("已完成：" + form1Done);

            $("#scoreSummaryTable_quarter").text(dataJson.quarter);
            $("*[bind='scoreContractTable_expect']").text(dataJson.contractValue);
            $("*[bind='scoreSummaryTable_expect']").text(dataJson.contractValue * bonusRate);

            if (form1ToDo === 0) {
                $("#form2check1").text("「一般員工考績表」已全部完成！");
                $("#form2check2").text("「專案執行績效考核」可開始填寫");
                $('#form2Go').prop('disabled', false);
            }
            if (form2ToDo === 0) {
                $("#form2check2").text("「專案執行績效考核」已完成！");
            }



            //////////////////////////////////////
        });
    }


// button link
$('#form1Go').click(function () {
    var selected = $("#inlineForm1Select").val();
    if (selected !== "請選擇...") {
        $('#inlineForm1Select').removeClass('is-invalid');
        window.location = 'http://localhost/PR/form/form1.html?id=' + selected + '&quarter=' + dataJson.quarter + '&projectName=' + dataJson.projectName;
    } else {
        // select show red
        $('#inlineForm1Select').addClass('is-invalid');
    }
});

$('#form2Go').click(function () {
    window.location = 'http://localhost/PR/form/form2.html?quarter=' + dataJson.quarter + '&projectName=' + dataJson.projectName;
});

});




function cleanFunction() {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
}