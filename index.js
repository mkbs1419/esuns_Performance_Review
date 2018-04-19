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
        //money
    }

    $("#form1ToDo").text("待完成：" + form1ToDo);
    $("#form1Done").text("已完成：" + form1Done);
    $("#scoreSummaryTable_quarter").text(dataJson.quarter);

    if (form1ToDo === 0) {
        $("#form2check1").text("一般員工考績表」已全部完成！");
        $("#form2check2").text("「專案執行績效考核」可開始填寫");
        $('#form2Go').prop('disabled', false);
    }
    if (form2ToDo === 0) {
        $("#form2check2").text("「專案執行績效考核」已完成！");
    }

    // select form1
    for (let i = 0; i < dataJson.testList.length; i++) {
        if (dataJson.testList[i].formStatus[0]) {
            $('#inlineForm1Select').append($('<option>').text(dataJson.testList[i].employeeName + "(已完成)").attr("value", dataJson.testList[i].employeeId));
        } else {
            $('#inlineForm1Select').append($('<option>').text(dataJson.testList[i].employeeName).attr("value", dataJson.testList[i].employeeId));
        }
    }

    console.log(nameList);

    // for () {}

    // init chart
    var scoreChart = echarts.init(document.getElementById('scoreChart'));

    var option = {
        title: {
            text: '季獎金發放金額'
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
            data: [5, 15, 6, 10]
        }]
    };
    scoreChart.setOption(option);
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