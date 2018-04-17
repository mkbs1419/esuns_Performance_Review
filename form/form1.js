$(document).ready(function () {
    var submitCheck = false;

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    }
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      }

    $.get('../data.txt', function (dataJson) {
        console.log("Input Data: dataJson");
        console.log(dataJson);

        //parse link
        var id = getQueryVariable("id");
        var profile = {};
        for (let i=0; i<dataJson.testList.length; i++) {
            if (dataJson.testList[i].employeeId === id) {
                profile = dataJson.testList[i].employeeId
            }
        }
        console.log( profile );

        // $("#employeeGroup").text("事業群：" + dataJson.employeeGroup);
        // $("#employeeDepartment").text("部門別：" + dataJson.employeeDepartment);
        // $("#employeeName").text("姓名：" + dataJson.employeeName);
        // $("#employeeLevel").text("職等職級：" + dataJson.employeeLevel);
        // $("#reviewDate").text("考核日期：" + dataJson.reviewDate);
        // $("#arriveDate").text("到職日期：" + dataJson.arriveDate);
        // $("#regularDate").text("轉正日期：" + dataJson.regularDate);

    }, "json");

    // var testProfileData = {
    //     "employeeGroup": "宗陽",
    //     "employeeDepartment": "工程事業群",
    //     "employeeName": "受評人員A",
    //     "employeeLevel": "1",
    //     "reviewDate": "2017/08/01",
    //     "arriveDate": "2017/01/01",
    //     "regularDate": "2017/03/01"
    // };
    // $("#employeeGroup").text("事業群：" + testProfileData.employeeGroup);
    // $("#employeeDepartment").text("部門別：" + testProfileData.employeeDepartment);
    // $("#employeeName").text("姓名：" + testProfileData.employeeName);
    // $("#employeeLevel").text("職等職級：" + testProfileData.employeeLevel);
    // $("#reviewDate").text("考核日期：" + testProfileData.reviewDate);
    // $("#arriveDate").text("到職日期：" + testProfileData.arriveDate);
    // $("#regularDate").text("轉正日期：" + testProfileData.regularDate);


    $('[data-toggle="popover"]').popover();
    $('[data-toggle="popover"]').on('show.bs.popover', function () {
        let scoreList = [];
        for (qi = 1; qi < 10; qi++) {
            let scoreName = "radio_q" + qi;
            let qScore = $('input[name=' + scoreName + ']:checked').val();

            if (typeof (qScore) === "undefined") {
                $('input[name=' + scoreName + ']').closest('tr').addClass('table-danger');
                scoreList.push(0);
            } else {
                $('input[name=' + scoreName + ']').closest('tr').removeClass('table-danger');
                scoreList.push(parseInt(qScore));
            }
        }

        console.log(scoreList);
    })


    // console.log(testProfileData);

    // if (submitCheck) {
    //     $('input[name=' + scoreName + ']').addClass("disabled");
    // } else

});