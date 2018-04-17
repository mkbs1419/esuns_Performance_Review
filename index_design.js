$(document).ready(function () {
    $.get('data.txt', function (dataJson) {
        console.log("Input Data: dataJson");
        console.log(dataJson);

        let form1ToDo = 0;
        let form1Done = 0;

        for (let i = 0; i < dataJson.testList.length; i++) {
            if (dataJson.testList[i].formStatus[0]) {
                form1Done++;
            } else {
                form1ToDo++;
            }
        }

        $("#form1ToDo").text("待完成：" + form1ToDo);
        $("#form1Done").text("已完成：" + form1Done);
        $("#scoreSummaryTable_quarter").text(dataJson.quarter);

        // select form1
        for (let i = 0; i < dataJson.testList.length; i++) {
            if (dataJson.testList[i].formStatus[0]) {
                $('#inlineForm1Select').append($('<option>').text(dataJson.testList[i].employeeName + "(已完成)").attr("value", dataJson.testList[i].employeeId));
            } else {
                $('#inlineForm1Select').append($('<option>').text(dataJson.testList[i].employeeName).attr("value", dataJson.testList[i].employeeId));
            }
        }

        // select form2
        for (let i = 0; i < dataJson.testGroup.length; i++) {
            if (dataJson.testGroup[i][2]) {
                $('#inlineForm2Select').append($('<option>').text(dataJson.testGroup[i][0] + "(已完成)").attr("value", dataJson.testGroup[i][1]));
            } else {
                $('#inlineForm2Select').append($('<option>').text(dataJson.testGroup[i][0]).attr("value", dataJson.testGroup[i][1]));
            }
        }



        // init chart
        // 基于准备好的dom，初始化echarts实例
        var scoreChart = echarts.init(document.getElementById('scoreChart'));

        // 指定图表的配置项和数据
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
                data: ["人員A", "人員B", "人員C", "人員D"]
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
                data: [5, 20, 36, 10]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        scoreChart.setOption(option);


    }, "json");


    // button link
    $('#form1Go').click(function () {
        var selected = $("#inlineForm1Select").val();
        console.log(selected);
        if (selected !== "請選擇...") {
            $('#inlineForm1Select').removeClass('is-invalid');
            window.open('http://localhost/PR/form/form1.html?id=' + selected);
        } else {
            // select show red
            $('#inlineForm1Select').addClass('is-invalid');
        }
    });

    $('#form2Go').click(function () {
        var selected = $("#inlineForm2Select").val();
        console.log(selected);
        if (selected !== "請選擇...") {
            $('#inlineForm2Select').removeClass('is-invalid');
            window.open('http://localhost/PR/form/form2.html?groupid=' + selected);
        } else {
            // select show red
            $('#inlineForm2Select').addClass('is-invalid');
        }
    });


});