var profile_index;
var dataJson;

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

    // 讀取 localstorage
    dataJson = checkLocalSave();
    var id = getQueryVariable("id");
    for (let profile_i = 0; profile_i < dataJson.testList.length; profile_i++) {
        if (dataJson.testList[profile_i].employeeId == id) {
            profile_index = profile_i;
            var profile = dataJson.testList[profile_i]
        }
    }
    console.log(profile);

    $("#employeeGroup").text("事業群：" + profile.employeeGroup);
    $("#employeeDepartment").text("部門別：" + profile.employeeDepartment);
    $("#employeeName").text("姓名：" + profile.employeeName);
    $("#employeeLevel").text("職等職級：" + profile.employeeLevel);
    $("#arriveDate").text("到職日期：" + profile.arriveDate);
    $("#regularDate").text("轉正日期：" + profile.regularDate);

    // Restore from localstorage

    // reviewDate
    if (!(profile.reviewDate.length < 10)) {
        $("#reviewDate").val(profile.reviewDate);
    }
    // radio btn
    for (let formi = 0; formi < profile.form1Score.length; formi++) {
        let scoreName = "radio_q" + (formi + 1);
        let $radios = $('input:radio[name=' + scoreName + ']');
        $radios.filter('[value=' + profile.form1Score[formi] + ']').prop('checked', true);
    }

    // badPerform
    if ( profile.form1Result[2][0] !== "" ) {
        $('input:radio[name=bad_performance]').filter('[value=' + profile.form1Result[2][0] + ']').prop('checked', true);
        $("#bad_performance2_date").val(profile.form1Result[2][1]);
    }

    // reviewNote
    $('textarea#FormControlTextarea').val(profile.reviewNote);


    $('[data-toggle="popover"]').popover();
    // click 暫存 btn
    $('[data-toggle="popover"]').on('show.bs.popover', function () {
        // output 資訊
        let reviewDate = $("#reviewDate").val();
        let scoreList = [];
        let totalScore = "";
        let rating = "";
        let badPerform = "";
        let reReview = "";
        let reviewNote = $('textarea#FormControlTextarea').val();

        $(".table-success").removeClass('table-success');
        $(".table-danger").removeClass('table-danger');

        for (let qi = 1; qi < 10; qi++) {
            let scoreName = "radio_q" + qi;
            let qScore = $('input[name=' + scoreName + ']:checked').val();

            console.log(scoreName + " / " + qScore);

            if (typeof (qScore) === "undefined") {
                $('input[name=' + scoreName + ']').closest('tr').addClass('table-danger');
                scoreList.push(0);
            } else {
                $('input[name=' + scoreName + ']:checked').closest('td').addClass('table-success');
                scoreList.push(parseInt(qScore));
                $('#q' + qi + '_score').css("font-size", "x-large").text(qScore);
            }
        }
        console.log(scoreList);

        // sum total score
        if (scoreList.indexOf(0) !== -1) {
            // console.log("未填完");
            $("#totalScore").text("資料未填完");
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


            // 考績丙
            if (rating === "丙") {
                badPerform = $("input[type='radio'][name='bad_performance']:checked").val();
                if (badPerform === "reReview") {
                    reReview = $("#bad_performance2_date").val();
                }
            }
            dataJson.testList[profile_index].form1Result = [totalScore, rating, [badPerform, reReview]];
            dataJson.testList[profile_index].formStatus[0] = true;
            $("#totalScore").text(totalScore + " " + rating);
        }
        dataJson.testList[profile_index].reviewDate = reviewDate;
        dataJson.testList[profile_index].form1Score = scoreList;
        dataJson.testList[profile_index].reviewNote = reviewNote;
        saveState("dataJson", dataJson);

        // console.log(dataJson);
    })

    // click 清空此表 btn
    // $('#sendOutModal').on('show.bs.modal', function () {
    //     console.log("clear localStorage");
    // })

});

function clearform1() {
    // localStorage.clear();
    // console.log("clearform1 FUNCTION");
    // console.log(profile_index);
    dataJson.testList[profile_index].form1Result = [0, "",[]];
    dataJson.testList[profile_index].formStatus[0] = false;
    dataJson.testList[profile_index].reviewDate = "";
    dataJson.testList[profile_index].form1Score = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    dataJson.testList[profile_index].reviewNote = "";

    saveState("dataJson", dataJson);
    location.reload();
}