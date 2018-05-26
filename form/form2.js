var dataPackage = {};
var unid = "";
$(document).ready(function () {
    const questionLength = 5;
    const apiURL = "http://localhost:3000";

    let isLogin = sessionStorage.projectInfo;
    if (typeof (isLogin) === "undefined") {
        alert("您未登入");
        window.location = '/PR/login.html';
    } else {
        console.log("已登入");
        isLogin = JSON.parse(isLogin);

        //讀取login拋轉來的資料
        var dataJson = isLogin[1];
        console.log("dataJson", dataJson);

        //請求完成明細
        let listWords = "[";
        for (let li = 0; li < dataJson.testListName.length; li++) {
            listWords = listWords + "\"" + dataJson.testListName[li][0] + "\","
        }
        listWords = listWords.slice(0, -1);
        listWords = listWords + "]";



        // 填入頁面資料
        $("#quarter").text(dataJson.quarter);
        $("#fillingPerson").text("考核人：" + dataJson.fillingPerson);
        // TODO 填表日期 fillingDate

        // 產生各table內容
        // table 1
        for (let i = 0; i < dataJson.testListName.length; i++) {
            var tr = $('<tr>')
                .append($('<td>').text(dataJson.testListName[i][1])).addClass("nameBlock")
                .append($('<td>').html(orderrow(1, i)))
                .append($('<td>').html(scorerow(1, i)))
                .append($('<td>').attr("id", makeIDrow("perform", 1, i)))
                .append($('<td>').attr("id", makeIDrow("total", 1, i)))
            $('#q1_tbody').append(tr);
        }

        // table 2
        for (let i = 0; i < dataJson.testListName.length; i++) {
            var tr = $('<tr>')
                .append($('<td>').text(dataJson.testListName[i][1])).addClass("nameBlock")
                .append($('<td>').html(orderrow(2, i)))
                .append($('<td>').html(scorerow(2, i)))
                .append($('<td>').attr("id", makeIDrow("perform", 2, i)))
                .append($('<td>').attr("id", makeIDrow("total", 2, i)))
            $('#q2_tbody').append(tr);
        }

        // table 3
        for (let i = 0; i < dataJson.testListName.length; i++) {
            var tr = $('<tr>')
                .append($('<td>').text(dataJson.testListName[i][1])).addClass("nameBlock")
                .append($('<td>').html(orderrow(3, i)))
                .append($('<td>').html(scorerow(3, i)))
                .append($('<td>').attr("id", makeIDrow("perform", 3, i)))
                .append($('<td>').attr("id", makeIDrow("total", 3, i)))
            $('#q3_tbody').append(tr);
        }

        // table 4
        for (let i = 0; i < dataJson.testListName.length; i++) {
            var tr = $('<tr>')
                .append($('<td>').text(dataJson.testListName[i][1])).addClass("nameBlock")
                .append($('<td>').html(orderrow(4, i)))
                .append($('<td>').html(scorerow(4, i)))
                .append($('<td>').attr("id", makeIDrow("perform", 4, i)))
                .append($('<td>').attr("id", makeIDrow("total", 4, i)))
            $('#q4_tbody').append(tr);
        }

        // table 5
        for (let i = 0; i < dataJson.testListName.length; i++) {
            var tr = $('<tr>')
                .append($('<td>').text(dataJson.testListName[i][1])).addClass("nameBlock")
                .append($('<td>').html(orderrow(5, i)))
                .append($('<td>').html(scorerow(5, i)))
                .append($('<td>').attr("id", makeIDrow("perform", 5, i)))
                .append($('<td>').attr("id", makeIDrow("total", 5, i)))
            $('#q5_tbody').append(tr);
        }

        // if 暫存
        unid = dataJson.projectName + dataJson.quarter;
        let form2SessionlSave = sessionStorage[unid];
        if (typeof (form2SessionlSave) === "undefined") {
            console.log("檢查 - 沒有暫存");
        } else {
            form2SessionlSave = JSON.parse(form2SessionlSave);
            console.log("檢查 - 有暫存", "form2SessionlSave:", form2SessionlSave);

            // restore 暫存
            // fillingDate
            if (!(dataJson.reviewDate < 10)) {
                // console.log(profile.reviewDate);
                $("#fillingDate").val(form2SessionlSave.reviewDate);
            }

            // select / radio btn
            for (let qi = 1; qi < questionLength + 1; qi++) {
                // console.log("Q" + qi);
                for (let pi = 0; pi < form2SessionlSave.testListName.length; pi++) {
                    let id = "select_q" + qi + "_p" + pi;
                    let scoreName = "radio_q" + qi + "_p" + pi;
                    // order
                    $('#' + id).val(form2SessionlSave.scoreRow[form2SessionlSave.testListName[pi][0]].orderList[qi - 1]);

                    let $radios = $('input:radio[name=' + scoreName + ']');
                    $radios.filter('[value=' + form2SessionlSave.scoreRow[form2SessionlSave.testListName[pi][0]].scoreList[qi - 1] + ']').prop('checked', true);
                }
            }
        }



        // 暫存 btn
        $('[data-toggle="popover"]').popover();
        $('[data-toggle="popover"]').on('show.bs.popover', function () {
            console.log("存檔 - form2");

            // output 資訊
            let form2FillingDate = $("#fillingDate").val();
            let scoreRow = {};

            // Get name / order / score
            let name = "";
            let order = "";
            let score = "";

            let formComplete = true;

            for (let pi = 0; pi < dataJson.testListName.length; pi++) {
                name = dataJson.testListName[pi][0];
                scoreRow[name] = {};
                scoreRow[name].orderList = [];
                scoreRow[name].scoreList = [];
                scoreRow[name].totalList = [];
            }

            for (let qi = 1; qi < questionLength + 1; qi++) {
                // console.log("Q" + qi);

                for (let pi = 0; pi < dataJson.testListName.length; pi++) {
                    name = dataJson.testListName[pi][0];

                    let id = "select_q" + qi + "_p" + pi;
                    order = $('#' + id).val();

                    let scoreName = "radio_q" + qi + "_p" + pi;
                    score = $('input[name=' + scoreName + ']:checked').val();
                    let idVal = $('input[name=' + scoreName + ']:checked').attr("id");

                    // console.log(name + "/" + order + "/" + score);

                    if (order === "0") {
                        $('#' + id).closest('td').addClass('table-danger');
                        scoreRow[name].orderList.push("0");
                        formComplete = false;
                    } else {
                        $('#' + id).closest('td').removeClass('table-danger');
                        scoreRow[name].orderList.push(order);
                        let performID = makeIDrow("perform", qi, pi);
                        $("#" + performID).text(order);
                    }

                    if (typeof (score) === "undefined") {
                        $('input[name=' + scoreName + ']').closest('td').addClass('table-danger');
                        scoreRow[name].scoreList.push(0);
                        scoreRow[name].totalList.push(0);
                        formComplete = false;
                    } else {
                        $('label[for=' + idVal + ']').addClass("text-success");
                        $('input[name=' + scoreName + ']').closest('td').removeClass('table-danger');
                        let totalID = makeIDrow("total", qi, pi);
                        let totalScore = order * score;
                        $("#" + totalID).text(totalScore);
                        scoreRow[name].scoreList.push(parseInt(score));
                        scoreRow[name].totalList.push(parseInt(totalScore));
                    }
                }
            }

            // // check order duplicate
            // console.log("scoreRow", scoreRow);

            // let scoreRowLength = Object.keys(form2SessionlSave.scoreRow).length;

            // for (let oi = 0; oi < questionLength; oi++) {
            //     console.log("-------------");
            //     let checkValueList = [];
            //     for (key in scoreRow) {
            //         checkValueList.push(form2SessionlSave.scoreRow[key].orderList[oi]);
            //     }


            //     // checkValueList = ["1", "2", "3", "4"]
            //     console.log(checkValueList);

            //     let checkValue = checkValueList[0];

            //     // for (let qi = 0; qi < scoreRowLength; qi++) {
            //         for (let ii = 1; ii < checkValueList.length; ii++) {
            //             console.log("比較 ", checkValue, " 與 ", checkValueList[ii]);
            //             if (checkValue === checkValueList[ii]) {
            //                 console.log(checkValue, " = ", checkValueList[ii]);
            //             }
            //         }
            //         checkValue = checkValueList[oi+1]
            //     // }
            //     // for (let ii = 1; ii < checkValueList.length; ii++) {
            //     //     console.log(ii);
            //     // }
            // }

            dataPackage.unid = ":" + dataJson.projectName + ":" + dataJson.quarter;
            dataPackage.projectName = dataJson.projectName;
            dataPackage.quarter = dataJson.quarter;
            dataPackage.reviewDate = form2FillingDate;
            dataPackage.scoreRow = scoreRow;
            dataPackage.testListName = dataJson.testListName;

            dataPackage.complete = formComplete;

            console.log("dataPackage", dataPackage);
            sessionStorage[unid] = JSON.stringify(dataPackage)

            // if 資料完整
            if (formComplete) {
                $('#sendToSQL').prop('disabled', false);
            }

        })

        $("#sendToSQL").click(function () {
            console.log("送出 - SQL");

            let sendScoreRow = dataPackage.scoreRow;
            let size = Object.keys(sendScoreRow).length;
            let checkSize = 0;

            for (key in sendScoreRow) {
                console.log("處理 - ", key);

                // 轉換 orderList
                let orderWords = "[";
                for (let li = 0; li < sendScoreRow[key].orderList.length; li++) {
                    orderWords = orderWords + "\"" + sendScoreRow[key].orderList[li] + "\","
                }
                orderWords = orderWords.slice(0, -1);
                orderWords = orderWords + "]";

                // 轉換 scoreList
                let scoreWords = "[";
                for (let li = 0; li < sendScoreRow[key].scoreList.length; li++) {
                    scoreWords = scoreWords + "\"" + sendScoreRow[key].scoreList[li] + "\","
                }
                scoreWords = scoreWords.slice(0, -1);
                scoreWords = scoreWords + "]";

                // 轉換 totalList
                let totalWords = "[";
                for (let li = 0; li < sendScoreRow[key].totalList.length; li++) {
                    totalWords = totalWords + "\"" + sendScoreRow[key].totalList[li] + "\","
                }
                totalWords = totalWords.slice(0, -1);
                totalWords = totalWords + "]";

                console.log(orderWords);
                console.log(scoreWords);
                console.log(totalWords);

                // sen to SQL
                $.post(apiURL + "/form2data", {
                        unid: dataPackage.unid,
                        projectName: dataPackage.projectName,
                        quarter: dataPackage.quarter,
                        reviewDate: dataPackage.reviewDate,
                        employeeId: key,
                        orderList: orderWords,
                        scoreList: scoreWords,
                        totalList: totalWords
                    },
                    function (data, status) {
                        // console.log(data);
                        checkSize++;
                        if (data && size === checkSize) {
                            console.log(size + " / " + checkSize);
                            alert("送出完成，將導回主頁面。");
                            window.location = '/PR/index.html';
                        }               
                    });

            } // key end

            $('#sendToSQL').prop('disabled', true);
        });

    }



    function orderrow(question_index, person_index) {
        let id = "select_q" + question_index + "_p" + person_index;
        let orderrow = "<select class=\"form-control\" id=" + id + ">";
        let pin = "";

        for (order_i = 0; order_i < dataJson.testListName.length + 1; order_i++) {
            if (order_i == 0) {
                pin = "<option value='0'>--請選擇--</option>";
            } else if (order_i == 1) {
                pin = "<option value='" + dataJson.testListName.length + "'>" + order_i + "(表現優異)</option>";
            } else if (order_i == dataJson.testListName.length) {
                pin = "<option value='1'>" + order_i + "(表現拙劣)</option>";
            } else {
                pin = "<option value='" + (dataJson.testListName.length - order_i + 1) + "'>" + order_i + "</option>";
            }
            orderrow = orderrow + pin;
        }
        orderrow = orderrow + "</select>";
        return orderrow;
    };

    function scorerow(question_index, person_index) {
        let scorerow = "";
        let name = "radio_q" + question_index + "_p" + person_index;
        for (score_i = 1; score_i < 11; score_i++) {
            let id = "q" + question_index + "_p" + person_index + "_" + score_i;
            let pin = "<input class=\"radioBtnLabel\" type=\"radio\" name=" + name + " id=" + id + " value=" + score_i + "><label class=\"radioBtnLabel\" for=" + id + ">" + score_i + "</label>"
            scorerow = scorerow + pin
        }
        return scorerow;
    };

    function makeIDrow(id, question_index, person_index) {
        let makeIDrow = "";
        let idName = id + "_q" + question_index + "_p" + person_index;
        return idName;
        // console.log(idName);
    };
});

function clearform2() {
    sessionStorage.removeItem(unid);
    location.reload();
}