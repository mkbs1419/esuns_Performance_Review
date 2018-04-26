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
        isLogin = JSON.parse(isLogin);

        //讀取data -> dataJson
        var dataJson = isLogin[1];
        console.log(dataJson);
        // console.log(dataJson.testList[0]);
        // console.log(typeof(dataJson.testList));
        let testList = [];
        for (let i = 0; dataJson.testList.length; i++) {
            testList.push(parseInt(dataJson.testList[i]));
        }
        console.log(testList);

        //讀取data -> dataJson
        // $.ajax({
        //     method: "POST",
        //     url: apiURL + "/employeeinfo",
        //     data: {
        //         testList: dataJson.testList
        //     },
        //     success: function (response) {
        //         console.log(response);
        //         if (response[0]) {
        //             sessionStorage["projectInfo"] = JSON.stringify(response);
        //             window.location = '/PR/index.html';
        //         } else {
        //             // alert(response[1] + '： 密碼錯誤');
        //             $('#inputPassword').addClass('is-invalid');
        //         }
        //     }
        // })




        let form1ToDo = 0;
        let form1Done = 0;
        let form2ToDo = 0;

        let nameList = [];
        let moneyList = [];
        let pieData = [];

        var pieChartOption;
        var scoreChartOption;

        // for (let i = 0; i < dataJson.testList.length; i++) {
        //     if (dataJson.testList[i].formStatus[0]) {
        //         form1Done++;
        //     } else {
        //         form1ToDo++;
        //     }
        //     if (!dataJson.testList[i].formStatus[1]) {
        //         form2ToDo++;
        //     }
        //     nameList.push(dataJson.testList[i].employeeName);
        // }
        // $("#form1ToDo").text("待完成：" + form1ToDo);
        // $("#form1Done").text("已完成：" + form1Done);
        $("#scoreSummaryTable_quarter").text(dataJson.quarter);
        $("*[bind='scoreContractTable_expect']").text(dataJson.contractValue);
        $("*[bind='scoreSummaryTable_expect']").text(dataJson.contractValue * bonusRate);





    }




});

// button link
$('#form1Go').click(function () {
    var selected = $("#inlineForm1Select").val();
    if (selected !== "請選擇...") {
        $('#inlineForm1Select').removeClass('is-invalid');
        window.open('http://localhost/PR/form/form1.html?id=' + selected);
    } else {
        // select show red
        $('#inlineForm1Select').addClass('is-invalid');
    }
});

$('#form2Go').click(function () {
    console.log("form2Go selected");
    window.open('http://localhost/PR/form/form2.html');
});


function reloadFunction() {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
}