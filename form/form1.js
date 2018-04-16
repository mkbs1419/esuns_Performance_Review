$(document).ready(function () {
    var submitCheck = false;
    var testProfileData = {
        "employeeGroup": "宗陽",
        "employeeDepartment": "工程事業群",
        "employeeName": "受評人員A",
        "employeeLevel": "1",
        "reviewDate": "2017/08/01",
        "arriveDate": "2017/01/01",
        "regularDate": "2017/03/01"
    };


    $("#employeeGroup").text("事業群：" + testProfileData.employeeGroup);
    $("#employeeDepartment").text("部門別：" + testProfileData.employeeDepartment);
    $("#employeeName").text("姓名：" + testProfileData.employeeName);
    $("#employeeLevel").text("職等職級：" + testProfileData.employeeLevel);
    $("#reviewDate").text("考核日期：" + testProfileData.reviewDate);
    $("#arriveDate").text("到職日期：" + testProfileData.arriveDate);
    $("#regularDate").text("轉正日期：" + testProfileData.regularDate);


    $('[data-toggle="popover"]').popover();
    $('[data-toggle="popover"]').on('show.bs.popover', function () {
        let scoreList = [];
        for (qi = 1; qi < 10; qi++) {
            let scoreName = "radio_q" + qi;
            let qScore = $('input[name=' + scoreName + ']:checked').val();

            if ( typeof(qScore) === "undefined" ) {
                $('input[name=' + scoreName + ']').closest('tr').addClass('table-danger');
                scoreList.push( 0 );
            } else {
                $('input[name=' + scoreName + ']').closest('tr').removeClass('table-danger');
                scoreList.push( parseInt(qScore) );
            }
        }

        console.log(scoreList);
    })


    // console.log(testProfileData);

    // if (submitCheck) {
    //     $('input[name=' + scoreName + ']').addClass("disabled");
    // } else

});