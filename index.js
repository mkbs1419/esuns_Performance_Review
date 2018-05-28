// File: index.js 2018-05-27
$(document).ready(function () {
    // const apiURL = "http://localhost:3000";
    const apiURL = "http://" + window.location.hostname + ":3000";

    let isLogin = sessionStorage.projectInfo;
    if (typeof (isLogin) === "undefined") {
        alert("您未登入");
        window.location = '/PR/login.html';
    } else {
        console.log("已登入");
        isLogin = JSON.parse(isLogin);

        //讀取login拋轉來的資料
        var dataJson = isLogin[1];
        // console.log("dataJson", dataJson);

        $("#project_title").text(dataJson.projectName + " - 考核登錄系統");
        $("#project_person").text("評核人員：" + dataJson.fillingPerson);

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
                $("#pieChart").text("如有問題請聯絡：");
            } else {
                projecttable = JSON.parse(sessionStorage.projecttable);
                // console.log("projecttable", projecttable);
                $("#scoreSummaryTable_actual").val(projecttable.actualMoney);
                $("#scoreSummaryTable_accumulation").text(projecttable.accumulation);
                dataJson.actualMoney = projecttable.actualMoney;
                dataJson.accumulation = projecttable.accumulation;
            }

            // prepare table data
            $.post(apiURL + "/indexdata", {
                projectName: dataJson.projectName,
                quarter: dataJson.quarter
            }, function (data, status) {
                // console.log("tabledata", data);


                if (status == "success" & data.resultList.length == dataJson.testList.length) {

                // init chart
                $('#scoreChart').attr("style", "height:300px;");

                var pieChart = echarts.init(document.getElementById('pieChart'));
                var scoreChart = echarts.init(document.getElementById('scoreChart'));

                // pieChart showLoading
                pieChart.showLoading({
                    text: '資料取得中...',
                    textStyle: {
                        fontSize: 30,
                        color: '#444'
                    },
                    effectOption: {
                        backgroundColor: 'rgba(0, 0, 0, 0)'
                    }
                });

                // scoreChart showLoading
                scoreChart.showLoading({
                    text: '資料取得中...',
                    textStyle: {
                        fontSize: 30,
                        color: '#444'
                    },
                    effectOption: {
                        backgroundColor: 'rgba(0, 0, 0, 0)'
                    }
                });

                    let nameList = [];
                    let pieData = [];
                    let moneyList = [];
                    let Base = 0;

                    for (let i = 0; i < data.resultList.length; i++) {
                        if (data.resultList[i].form1score > 75) {
                            Base = Base + data.resultList[i].form2Score;
                        }
                    }

                    // table
                    for (let i = 0; i < data.resultList.length; i++) {

                        let percentage = parseFloat(((data.resultList[i].form2Score / Base) * 100).toFixed(2));
                        if (data.resultList[i].form1score <= 75) {
                            percentage = 0;
                        }
                        let value = (percentage / 100 * dataJson.actualMoney).toFixed(0);

                        var tr = $('<tr>')
                            .append($('<td>').text(data.resultList[i].employeeName)) // 姓名
                            .append($('<td>').text(data.resultList[i].form1description)) // 績效考核成績
                            .append($('<td>').text(data.resultList[i].form2Score)) // 專案執行考核成績
                            .append($('<td>').text(percentage + '%')) // 獎金發放權重
                            .append($('<td>').text(value)) // 季獎金發放金額
                        $('#indexTable_tbody').append(tr);

                        pieEle = {
                            name: data.resultList[i].employeeName,
                            value: value
                        }

                        nameList.push(data.resultList[i].employeeName);
                        pieData.push(pieEle);
                        moneyList.push(value);
                    }

                    var pieChartOption = {
                        title: {
                            text: '季獎金發放金額',
                            subtext: dataJson.quarter,
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} 元({d}%)"
                        },
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
                            subtext: dataJson.quarter,
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} 元"
                        },
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
                    pieChart.hideLoading();
                    scoreChart.hideLoading();




                } else {
                    var tr = $('<tr>')
                        .append($('<td colspan="5" align="center">').text("尚未完成評核表格"))
                    $('#indexTable_tbody').append(tr);
                }
            });



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
            // console.log("送出 - SQL");

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

// function cleanFunction() {
//     // localStorage.clear();
//     sessionStorage.clear();
//     location.reload();
// }