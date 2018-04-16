$(document).ready(function () {
    $.get('data.txt', function (dataJson) {
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

        // select form1
        for (let i = 0; i < dataJson.testList.length; i++) {
            if (dataJson.testList[i].formStatus[0]) {
                $('#inlineForm1Select').append($('<option>').text(dataJson.testList[i].employeeName + "(已完成)").attr("value", dataJson.testList[i].employeeId));
            } else {
                $('#inlineForm1Select').append($('<option>').text(dataJson.testList[i].employeeName).attr("value", dataJson.testList[i].employeeId));
            }
        }

        // // select form2
        // for (let i = 0; i < dataJson.testList.length; i++) {
        //     console.log( dataJson );
        //     if (dataJson.testList[i].formStatus[0]) {
        //         $('#inlineForm2Select').append($('<option>').text(dataJson.testList[i].employeeName + "(已完成)").attr("value", dataJson.testList[i].employeeId));
        //     } else {
        //         $('#inlineForm2Select').append($('<option>').text(dataJson.testList[i].employeeName).attr("value", dataJson.testList[i].employeeId));
        //     }
        // }





    }, "json");

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
            window.open('http://localhost/PR/form/form2.html?id=' + selected);
        } else {
            // select show red
            $('#inlineForm2Select').addClass('is-invalid');
        }
    });


});