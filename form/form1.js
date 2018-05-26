var id = getQueryVariable("id");
var dataPackage = {};

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

$(document).ready(function () {
    const apiURL = "http://localhost:3000";

    let isLogin = sessionStorage.projectInfo;
    if (typeof (isLogin) === "undefined") {
        alert("您未登入");
        window.location = '/PR/login.html';
    } else {
        console.log("已登入");
        isLogin = JSON.parse(isLogin);

        // 讀取login拋轉來的資料
        var dataJson = isLogin[1];
        console.log("dataJson", dataJson);

        // 讀取SQL資料 與 填入頁面資料
        $.get(apiURL + "/employeeinfo/" + id, function (data, status) {
            console.log("data", data);
            $("#employeeGroup").text("事業群：" + data.employeeGroup);
            $("#employeeDepartment").text("部門別：" + data.employeeDepartment);
            $("#employeeName").text("姓名：" + data.employeeName);
            $("#employeeTitle").text("職務名稱：" + data.employeeTitle);
            $("#employeeLevel").text("職等職級：" + data.employeeLevel);
            $("#arriveDate").text("到職日期：" + data.arriveDate);
            $("#regularDate").text("轉正日期：" + data.regularDate);

            // if 暫存
            let form1SessionlSave = sessionStorage[id];
            if (typeof (form1SessionlSave) === "undefined") {
                console.log("檢查 - 沒有暫存");
            } else {
                form1SessionlSave = JSON.parse(form1SessionlSave);
                console.log("檢查 - 有暫存", form1SessionlSave);

                // restore 暫存
                // reviewDate
                if (!(form1SessionlSave.reviewDate.length < 10)) {
                    $("#reviewDate").val(form1SessionlSave.reviewDate);
                }

                // radio btn
                for (let formi = 0; formi < form1SessionlSave.scoreList.length; formi++) {
                    let scoreName = "radio_q" + (formi + 1);
                    let $radios = $('input:radio[name=' + scoreName + ']');
                    $radios.filter('[value=' + form1SessionlSave.scoreList[formi] + ']').prop('checked', true);
                }

                // badPerform
                if (form1SessionlSave.form1Result[2][0] !== "") {
                    $('input:radio[name=bad_performance]').filter('[value=' + form1SessionlSave.form1Result[2][0] + ']').prop('checked', true);
                    $("#bad_performance2_date").val(form1SessionlSave.form1Result[2][1]);
                }

                // reviewNote
                $('textarea#FormControlTextarea').val(form1SessionlSave.reviewNote);

            }

        });

        // 存檔 btn
        $('[data-toggle="popover"]').popover();
        $('[data-toggle="popover"]').on('show.bs.popover', function () {
            console.log("存檔 - form1");

            // output 資訊
            let reviewDate = $("#reviewDate").val();
            let scoreList = [];
            let totalScore = "";
            let rating = "";
            let badPerform = "";
            let reReview = "";
            let reviewNote = $('textarea#FormControlTextarea').val();
            let formComplete = false;

            $(".table-success").removeClass('table-success');
            $(".table-danger").removeClass('table-danger');

            for (let qi = 1; qi < 10; qi++) {
                let scoreName = "radio_q" + qi;
                let qScore = $('input[name=' + scoreName + ']:checked').val();

                // console.log(scoreName + " / " + qScore);

                if (typeof (qScore) === "undefined") {
                    $('input[name=' + scoreName + ']').closest('tr').addClass('table-danger');
                    scoreList.push(0);
                } else {
                    $('input[name=' + scoreName + ']:checked').closest('td').addClass('table-success');
                    scoreList.push(parseInt(qScore));
                    $('#q' + qi + '_score').css("font-size", "x-large").text(qScore);
                }
            }
            console.log("scoreList", scoreList);

            // 加總分
            if (scoreList.indexOf(0) !== -1) {
                $("#totalScore").text("資料未填完");
            } else {
                formComplete = true;
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
                $("#totalScore").text(totalScore + " " + rating);
            }


            dataPackage.unid = id+":"+dataJson.projectName+":"+dataJson.quarter;
            dataPackage.projectName = dataJson.projectName;
            dataPackage.quarter = dataJson.quarter;
            dataPackage.reviewDate = reviewDate;
            dataPackage.scoreList = scoreList;
            dataPackage.form1Result = [totalScore, rating, [badPerform, reReview]];
            dataPackage.reviewNote = reviewNote;
            dataPackage.complete = formComplete;

            console.log(dataPackage);
            sessionStorage[id] = JSON.stringify(dataPackage)

            // if 資料完整
            if (formComplete) {
                $('#sendToSQL').prop('disabled', false);
            }
        })


        $("#saveindex").click(function () {
            console.log("送出 - SQL");

            let scoreWords = "[";
            for (let li = 0; li < dataPackage.scoreList.length; li++) {
                scoreWords = scoreWords + "\"" + dataPackage.scoreList[li] + "\","
            }
            scoreWords = scoreWords.slice(0, -1);
            scoreWords = scoreWords + "]";

            let form1BadWords = "[";
            for (let li = 0; li < dataPackage.form1Result[2].length; li++) {
                form1BadWords = form1BadWords + "\"" + dataPackage.form1Result[2][li] + "\","
            }
            form1BadWords = form1BadWords.slice(0, -1);
            form1BadWords = form1BadWords + "]";

            dataPackage.form1Result[2] = form1BadWords;
            let form1ResultWords = "[";
            for (let li = 0; li < dataPackage.form1Result.length; li++) {
                form1ResultWords = form1ResultWords + "\"" + dataPackage.form1Result[li] + "\","
            }
            form1ResultWords = form1ResultWords.slice(0, -1);
            form1ResultWords = form1ResultWords + "]";
            console.log("form1ResultWords", form1ResultWords);

            console.log(dataPackage.unid);

            $.post(apiURL + "/form1data/" + id, {
                    // employeeId: dataPackage.employeeId,
                    unid: dataPackage.unid,
                    projectName: dataPackage.projectName,
                    quarter: dataPackage.quarter,
                    reviewDate: dataPackage.reviewDate,
                    scoreList: scoreWords,
                    form1Result: form1ResultWords,
                    reviewNote: dataPackage.reviewNote
                },
                function (data, status) {
                    if (data) {
                        alert("送出完成，將導回主頁面。");
                        window.location = '/PR/index.html';
                    } else {
                        alert("送出失敗，請再操作一遍。");
                    }                    
                });
            $('#sendToSQL').prop('disabled', true);
        });

        ////////////////////////////////
    }
});



function clearform1() {
    sessionStorage.removeItem(id);
    location.reload();
}