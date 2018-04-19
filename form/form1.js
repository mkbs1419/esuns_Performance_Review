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

    // 讀取 localstorage
    var dataJson = checkLocalSave();
    var id = getQueryVariable("id");
    for (let profile_i = 0; profile_i < dataJson.testList.length; profile_i++) {
        if (dataJson.testList[profile_i].employeeId == id) {
            var profile_index = profile_i;
            var profile = dataJson.testList[profile_i]
        }
    }
    console.log(profile);

    $("#employeeGroup").text("事業群：" + profile.employeeGroup);
    $("#employeeDepartment").text("部門別：" + profile.employeeDepartment);
    $("#employeeName").text("姓名：" + profile.employeeName);
    $("#employeeLevel").text("職等職級：" + profile.employeeLevel);
    // $("#reviewDate").text("考核日期：" + profile.reviewDate);
    $("#arriveDate").text("到職日期：" + profile.arriveDate);
    $("#regularDate").text("轉正日期：" + profile.regularDate);

    // Restore from localstorage
    // reviewDate
    if (!(profile.reviewDate.length < 10)) {
        // console.log(profile.reviewDate);
        $("#reviewDate").val(profile.reviewDate);
    }
    // radio btn
    for (let formi = 0; formi < profile.form1Score.length; formi++) {
        let scoreName = "radio_q" + (formi + 1);
        let $radios = $('input:radio[name=' + scoreName + ']');
        $radios.filter('[value=' + profile.form1Score[formi] + ']').prop('checked', true);
    }
    // reviewNote //////////////////
    $('textarea#FormControlTextarea').val(profile.reviewNote);


    $('[data-toggle="popover"]').popover();
    // click 暫存 btn
    $('[data-toggle="popover"]').on('show.bs.popover', function () {
        // output 資訊
        let reviewDate = $("#reviewDate").val();
        let scoreList = [];
        let totalScore = "";
        let rating = "";
        let reviewNote = $('textarea#FormControlTextarea').val();

        for (let qi = 1; qi < 10; qi++) {
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

        // sum total score
        if (scoreList.indexOf(0) !== -1) {
            console.log("未填完");
        } else {
            totalScore = scoreList.reduce((a, b) => a + b, 0);

            switch (true) {
                case totalScore >= 95:
                    rating = "特優";
                    break;
                case totalScore >= 90:
                    rating = "優";
                    break;
                case totalScore >= 76:
                    rating = "甲";
                    break;
                case totalScore >= 60:
                    rating = "乙";
                    break;
                default:
                    rating = "丙";
            }
            dataJson.testList[profile_index].form1Result = [totalScore, rating];
            dataJson.testList[profile_index].formStatus[0] = true;
            $("#totalScore").text(totalScore + " " + rating);
        }

        dataJson.testList[profile_index].reviewDate = reviewDate;
        dataJson.testList[profile_index].form1Score = scoreList;
        dataJson.testList[profile_index].reviewNote = reviewNote;
        saveState("dataJson", dataJson);


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