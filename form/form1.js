$(document).ready(function () {
    var profile = {};

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

    // function getKeyByValue(object, value) {
    //     return Object.keys(object).find(key => object[key] === value);
    // }

    //讀取data
    var dataJson = checkLocalSave();
    var id = getQueryVariable("id");
    for (let i = 0; i < dataJson.testList.length; i++) {
        if (dataJson.testList[i].employeeId == id) {
            var profile = dataJson.testList[i]
        }
    }
    console.log(profile);
    // value="2013-01-08"

    $("#employeeGroup").text("事業群：" + profile.employeeGroup);
    $("#employeeDepartment").text("部門別：" + profile.employeeDepartment);
    $("#employeeName").text("姓名：" + profile.employeeName);
    $("#employeeLevel").text("職等職級：" + profile.employeeLevel);
    // $("#reviewDate").text("考核日期：" + profile.reviewDate);
    $("#arriveDate").text("到職日期：" + profile.arriveDate);
    $("#regularDate").text("轉正日期：" + profile.regularDate);

    if (!(profile.reviewDate.length < 10)) {
        console.log(profile.reviewDate);
        $("#reviewDate").val(profile.reviewDate);
    }



    $('[data-toggle="popover"]').popover();
    // click 暫存 btn
    $('[data-toggle="popover"]').on('show.bs.popover', function () {

        let reviewDate = $("#reviewDate").val();
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

        console.log(reviewDate);
        console.log(scoreList);
        saveState(profile);
    })

    // click 送出資料 btn
    $('#sendOutModal').on('show.bs.modal', function () {
        localStorage.clear();
        console.log("clear localStorage");
    })


    // console.log(testProfileData);

    // if (submitCheck) {
    //     $('input[name=' + scoreName + ']').addClass("disabled");
    // } else

});