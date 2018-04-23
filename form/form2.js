$(document).ready(function () {
    const questionLength = 5;
    // 讀取 localstorage
    var dataJson = checkLocalSave();


    let testNameList = [];
    for (list_i = 0; list_i < dataJson.testList.length; list_i++) {
        testNameList.push(dataJson.testList[list_i].employeeName);
    }

    console.log(dataJson);

    const testListLength = testNameList.length;

    // table 1
    for (let i = 0; i < testListLength; i++) {
        var tr = $('<tr>')
            .append($('<td>').text(testNameList[i])).addClass("nameBlock")
            .append($('<td>').html(orderrow(1, i)))
            .append($('<td>').html(scorerow(1, i)))
            .append($('<td>').attr("id", makeIDrow("perform", 1, i)))
            .append($('<td>').attr("id", makeIDrow("total", 1, i)))
        $('#q1_tbody').append(tr);
    }

    // table 2
    for (let i = 0; i < testListLength; i++) {
        var tr = $('<tr>')
            .append($('<td>').text(testNameList[i])).addClass("nameBlock")
            .append($('<td>').html(orderrow(2, i)))
            .append($('<td>').html(scorerow(2, i)))
            .append($('<td>').attr("id", makeIDrow("perform", 2, i)))
            .append($('<td>').attr("id", makeIDrow("total", 2, i)))
        $('#q2_tbody').append(tr);
    }

    // table 3
    for (let i = 0; i < testListLength; i++) {
        var tr = $('<tr>')
            .append($('<td>').text(testNameList[i])).addClass("nameBlock")
            .append($('<td>').html(orderrow(3, i)))
            .append($('<td>').html(scorerow(3, i)))
            .append($('<td>').attr("id", makeIDrow("perform", 3, i)))
            .append($('<td>').attr("id", makeIDrow("total", 3, i)))
        $('#q3_tbody').append(tr);
    }

    // table 4
    for (let i = 0; i < testListLength; i++) {
        var tr = $('<tr>')
            .append($('<td>').text(testNameList[i])).addClass("nameBlock")
            .append($('<td>').html(orderrow(4, i)))
            .append($('<td>').html(scorerow(4, i)))
            .append($('<td>').attr("id", makeIDrow("perform", 4, i)))
            .append($('<td>').attr("id", makeIDrow("total", 4, i)))
        $('#q4_tbody').append(tr);
    }

    // table 5
    for (let i = 0; i < testListLength; i++) {
        var tr = $('<tr>')
            .append($('<td>').text(testNameList[i])).addClass("nameBlock")
            .append($('<td>').html(orderrow(5, i)))
            .append($('<td>').html(scorerow(5, i)))
            .append($('<td>').attr("id", makeIDrow("perform", 5, i)))
            .append($('<td>').attr("id", makeIDrow("total", 5, i)))
        $('#q5_tbody').append(tr);
    }

    // Restore from localstorage
    $("#quarter").text(dataJson.quarter);
    $("#fillingPerson").text("考核人：" + dataJson.fillingPerson);
    // fillingDate
    if (!(dataJson.form2FillingDate < 10)) {
        // console.log(profile.reviewDate);
        $("#fillingDate").val(dataJson.form2FillingDate);
    }
    // select / radio btn  // BUG: table 1 警示顏色錯誤
    for (let qi = 1; qi < questionLength + 1; qi++) {
        // console.log("Q" + qi);

        for (let pi = 0; pi < testListLength; pi++) {
            let id = "select_q" + qi + "_p" + pi;
            let scoreName = "radio_q" + qi + "_p" + pi;
            $('#' + id).val(dataJson.testList[pi].form2Score.orderList[qi - 1]);

            let $radios = $('input:radio[name=' + scoreName + ']');
            $radios.filter('[value=' + dataJson.testList[pi].form2Score.scoreList[qi - 1] + ']').prop('checked', true);
        }
    }


    $('[data-toggle="popover"]').popover();
    // click 暫存 btn
    $('[data-toggle="popover"]').on('show.bs.popover', function () {
        // output 資訊
        let form2FillingDate = $("#fillingDate").val();
        let scoreRow = {};

        // Get name / order / score
        let name = "";
        let order = "";
        let score = "";

        for (let pi = 0; pi < testNameList.length; pi++) {
            name = testNameList[pi];
            scoreRow[name] = {};
            scoreRow[name].orderList = [];
            scoreRow[name].scoreList = [];
            scoreRow[name].totalList = [];
        }

        for (let qi = 1; qi < questionLength + 1; qi++) {
            // console.log("Q" + qi);

            for (let pi = 0; pi < testListLength; pi++) {
                name = testNameList[pi];

                let id = "select_q" + qi + "_p" + pi;
                order = $('#' + id).val();

                let scoreName = "radio_q" + qi + "_p" + pi;
                score = $('input[name=' + scoreName + ']:checked').val();
                let idVal = $('input[name=' + scoreName + ']:checked').attr("id");

                // console.log(name + "/" + order + "/" + score);

                if (order === "0") {
                    $('#' + id).closest('td').addClass('table-danger');
                    scoreRow[name].orderList.push("0");
                } else {
                    $('#' + id).closest('td').removeClass('table-danger');
                    scoreRow[name].orderList.push(order);
                    let performID = makeIDrow("perform", qi, pi);
                    $("#" + performID).text(order);
                }

                if (typeof (score) === "undefined") {
                    $('input[name=' + scoreName + ']').closest('td').addClass('table-danger');
                    scoreRow[name].scoreList.push(0);
                } else {
                    $('label[for=' + idVal + ']').addClass("text-success");
                    $('input[name=' + scoreName + ']').closest('td').removeClass('table-danger');
                    let totalID = makeIDrow("total", qi, pi);
                    let totalScore = order * score;
                    $("#" + totalID).text(totalScore);
                    scoreRow[name].scoreList.push(parseInt(score));
                    scoreRow[name].totalList.push(parseInt(totalScore));
                }


                dataJson.testList[pi].form2Score = scoreRow[name];

            }
            // console.log("--------------");
        }
        console.log(scoreRow);

        // form check
        for (let pi = 0; pi < testNameList.length; pi++) {
            let orderListCheck = scoreRow[testNameList[pi]].orderList.indexOf("0");
            let scoreListCheck = scoreRow[testNameList[pi]].scoreList.indexOf(0);
            if (orderListCheck == -1 && scoreListCheck == -1) {
                // console.log("formcheck OK");
                dataJson.testList[pi].formStatus[1] = true;
            }
        }

        dataJson.form2FillingDate = form2FillingDate;
        saveState("dataJson", dataJson);
    })


    function orderrow(question_index, person_index) {
        let id = "select_q" + question_index + "_p" + person_index;
        let orderrow = "<select class=\"form-control\" id=" + id + ">";
        let pin = "";

        for (order_i = 0; order_i < testListLength + 1; order_i++) {
            if (order_i == 0) {
                pin = "<option value='0'>--請選擇--</option>";
            } else if (order_i == 1) {
                pin = "<option value='" + testListLength + "'>" + order_i + "(表現拙劣)</option>";
            } else if (order_i == testListLength) {
                pin = "<option value='1'>" + order_i + "(表現優異)</option>";
            } else {
                pin = "<option value='" + (testListLength - order_i + 1) + "'>" + order_i + "</option>";
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
    // localStorage.clear();
    // location.reload();
    console.log("clearform2 FUNCTION");
}