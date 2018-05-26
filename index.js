// TODO
// dataJson.quarter 敘述轉換
$(document).ready(function () {
    const apiURL = "http://localhost:3000";
    const bonusRate = 0.25;

    ///////////////////////////////////////////////////
    var pieChartOption;
    var scoreChartOption;

    // table data
    let base = [];
    let Obase = [];
    let basetotal = 0;
    for (let ti = 0; ti < dataJson.testList.length; ti++) {
        let totalScore = dataJson.testList[ti].form2Score.totalList.reduce((a, b) => a + b, 0);
        let projectScore = totalScore / dataJson.testList[ti].form2Score.totalList.length;
        if (dataJson.testList[ti].form1Result[1] == "丙" || dataJson.testList[ti].form1Result[1] == "乙") {
            base.push(0);
        } else {
            base.push(projectScore);
        }
        Obase.push(projectScore);
    }
    basetotal = base.reduce((a, b) => a + b, 0);


    // table
    for (let ti = 0; ti < dataJson.testList.length; ti++) {
        let percentage = parseFloat(((base[ti] / basetotal) * 100).toFixed(2));
        let value = (percentage / 100 * dataJson.actualMoney).toFixed(0);
        let pieDataTemp = {};
        moneyList.push(value);
        pieDataTemp.value = value;
        pieDataTemp.name = dataJson.testList[ti].employeeName;
        pieData.push(pieDataTemp);

        var tr = $('<tr>')
            .append($('<td>').text(dataJson.testList[ti].employeeName)) // 姓名
            .append($('<td>').text(dataJson.testList[ti].form1Result[1])) // 績效考核成績
            .append($('<td>').text(Obase[ti])) // 專案執行考核成績
            .append($('<td>').text(percentage + '%')) // 獎金發放權重
            .append($('<td>').text(value)) // 季獎金發放金額
        $('#indexTable_tbody').append(tr);
    }

    // init chart
    $('#scoreChart').attr("style", "height:300px;");

    var pieChart = echarts.init(document.getElementById('pieChart'));
    var scoreChart = echarts.init(document.getElementById('scoreChart'));

    var pieChartOption = {
        title: {
            text: '季獎金發放金額',
            subtext: dataJson.quarter,
            x: 'center'
        },
        tooltip: {},
        legend: {
            orient: 'vertical',
            left: 'left',
            data: nameList
        },
        series: [{
            name: '發放獎金',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: pieData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    var scoreChartOption = {
        title: {
            text: '季獎金發放金額',
            x: 'center'
        },
        tooltip: {},
        // legend: {
        //     data:['發放金額']
        // },
        xAxis: {},
        yAxis: {
            type: 'category',
            inverse: true,
            data: nameList
        },
        series: [{
            name: '發放金額',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    // position: "right"
                }
            },
            data: moneyList
        }]
    };
    pieChart.setOption(pieChartOption);
    scoreChart.setOption(scoreChartOption);

///////////////////////////////////////////////////



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

            //考核獎金table
            $("#scoreSummaryTable_quarter").text(dataJson.quarter);
            $("#scoreSummaryTable_exceptValue").text(dataJson.exceptValue);
            if (typeof (sessionStorage.projecttable) === "undefined") {
                $("#scoreSummaryTable_actual").val(dataJson.actualMoney);
                $("#scoreSummaryTable_accumulation").text(dataJson.accumulation);
            } else {
                projecttable = JSON.parse(sessionStorage.projecttable);
                console.log(projecttable);
                $("#scoreSummaryTable_actual").val(projecttable.actualMoney);
                $("#scoreSummaryTable_accumulation").text(projecttable.accumulation);
            }


            if (form1ToDo === 0) {
                $("#form2check1").text("「一般員工考績表」已全部完成！");
                $("#form2check2").text("「專案執行績效考核」可開始填寫");
                $('#form2Go').prop('disabled', false);
            }
            if (form2ToDo === 0) {
                $("#form2check2").text("「專案執行績效考核」已完成！");
            }
        });

        $('#calculate').click(function () {
            let exceptValue = $("#scoreSummaryTable_exceptValue").text();
            let accumulationMoney = $("#scoreSummaryTable_actual").val();
            let accumulation = exceptValue - accumulationMoney

            $("#scoreSummaryTable_accumulation").text(accumulation);
            // 判斷是否為負值
            if (accumulation < 0) {
                $("#scoreSummaryTable_accumulation").closest('tr').addClass('table-danger');
                alert("注意，超過預計發放季獎金額！")
            } else {
                $("#scoreSummaryTable_accumulation").closest('tr').removeClass('table-danger');
                $("#scoreSummaryTable_accumulation").closest('tr').addClass('table-success');
            }
        });

        $("#sendToSQL").click(function () {
            console.log("送出 - SQL");

            let accumulationMoney = $("#scoreSummaryTable_actual").val();
            let accumulation = $("#scoreSummaryTable_accumulation").text();

            $.post(apiURL + "/indexsave", {
                    projectName: dataJson.projectName,
                    actualMoney: accumulationMoney,
                    accumulation: accumulation,
                },
                function (data, status) {
                    if (data) {
                        sessionStorage["projecttable"] = JSON.stringify(data);
                        alert("送出完成。");
                        window.location = '/PR/index.html';
                    } else {
                        alert("送出失敗，請再操作一遍。");
                    }
                });
            $('#sendToSQL').prop('disabled', true);
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
    // localStorage.clear();
    sessionStorage.clear();
    location.reload();
}