$(document).ready(function () {

    //讀取data
    var dataJson = checkLocalSave();
    console.log(dataJson);
    saveState("dataJson", dataJson)

    let form1ToDo = 0;
    let form1Done = 0;
    let form2ToDo = 0;

    let nameList = [];
    let moneyList = [];
    let pieData = [];

    for (let i = 0; i < dataJson.testList.length; i++) {
        if (dataJson.testList[i].formStatus[0]) {
            form1Done++;
        } else {
            form1ToDo++;
        }
        if (!dataJson.testList[i].formStatus[1]) {
            form2ToDo++;
        }
        nameList.push(dataJson.testList[i].employeeName);
        moneyList.push(100);
        let pieDataTemp = {};
        pieDataTemp.value = 100;
        pieDataTemp.name = dataJson.testList[i].employeeName;
        pieData.push(pieDataTemp);
    }

    $("#form1ToDo").text("待完成：" + form1ToDo);
    $("#form1Done").text("已完成：" + form1Done);
    $("#scoreSummaryTable_quarter").text(dataJson.quarter);

    if (form1ToDo === 0) {
        $("#form2check1").text("「一般員工考績表」已全部完成！");
        $("#form2check2").text("「專案執行績效考核」可開始填寫");
        $('#form2Go').prop('disabled', false);
    }
    if (form2ToDo === 0) {
        $("#form2check2").text("「專案執行績效考核」已完成！");
    }

    if (typeof (dataJson.testList[0].form2Score.totalList) !== "undefined") {

        let bonusMoney = $("*[bind='scoreSummaryTable_actual']").val();
        console.log(bonusMoney);

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
        // console.log(base);
        // console.log(Obase);
        // console.log(basetotal);

        // table
        for (let ti = 0; ti < dataJson.testList.length; ti++) {
            var tr = $('<tr>')
                .append($('<td>').text(dataJson.testList[ti].employeeName)) // 姓名
                .append($('<td>').text(dataJson.testList[ti].form1Result[1])) // 績效考核成績
                .append($('<td>').text(Obase[ti])) // 專案執行考核成績
                .append($('<td>').text(parseFloat(((base[ti] / basetotal) * 100).toFixed(2)) + '%')) // 獎金發放權重
                .append($('<td>').text("季獎金發放金額")) // 季獎金發放金額
            $('#indexTable_tbody').append(tr);
        }

        // init chart
        $('#scoreChart').attr("style", "height:300px;");
        // $('#pieChart').attr("style", "height:300px;");

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

    }

    // select form1
    for (let i = 0; i < dataJson.testList.length; i++) {
        if (dataJson.testList[i].formStatus[0]) {
            $('#inlineForm1Select').append($('<option>').text(dataJson.testList[i].employeeName + "(已完成)").attr("value", dataJson.testList[i].employeeId));
        } else {
            $('#inlineForm1Select').append($('<option>').text(dataJson.testList[i].employeeName).attr("value", dataJson.testList[i].employeeId));
        }
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
    location.reload();
}


function reloadFunction() {
    localStorage.clear();
    location.reload();
}