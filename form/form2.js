$(document).ready(function () {
    var testProfileData = {
        "quarter": "第一季度(Q1:106.12~107.03)",
        "fillingPerson": "測試人員A",
        "fillingDate": "2018/04/16",
        "testList": ["受評人員A",  "受評人員B",  "受評人員C",  "受評人員D"]
    };
    var testListLength = testProfileData.testList.length;

    $("#quarter").text(testProfileData.quarter);
    $("#fillingPerson").text("考核人：" + testProfileData.fillingPerson);
    $("#fillingDate").text("填表日期：" + testProfileData.fillingDate);


    // table 1
    for ( i=0; i<testListLength; i++ ){
        var tr = $('<tr>')
        .append( $('<td>').text( testProfileData.testList[i] ) )
        .append( $('<td>').html( orderrow( 1, i ) ) )
        .append( $('<td>').html( scorerow( 1, i ) ) )
        $('#q1_tbody').append(tr);
    }

    // table 2
    for ( i=0; i<testListLength; i++ ){
        var tr = $('<tr>')
        .append( $('<td>').text( testProfileData.testList[i] ) )
        .append( $('<td>').html( orderrow( 2, i ) ) )
        .append( $('<td>').html( scorerow( 2, i ) ) )
        $('#q2_tbody').append(tr);
    }

    // table 3
    for ( i=0; i<testListLength; i++ ){
        var tr = $('<tr>')
        .append( $('<td>').text( testProfileData.testList[i] ) )
        .append( $('<td>').html( orderrow( 3, i ) ) )
        .append( $('<td>').html( scorerow( 3, i ) ) )
        $('#q3_tbody').append(tr);
    }

    // table 4
    for ( i=0; i<testListLength; i++ ){
        var tr = $('<tr>')
        .append( $('<td>').text( testProfileData.testList[i] ) )
        .append( $('<td>').html( orderrow( 4, i ) ) )
        .append( $('<td>').html( scorerow( 4, i ) ) )
        $('#q4_tbody').append(tr);
    }

    // table 5
    for ( i=0; i<testListLength; i++ ){
        var tr = $('<tr>')
        .append( $('<td>').text( testProfileData.testList[i] ) )
        .append( $('<td>').html( orderrow( 5, i ) ) )
        .append( $('<td>').html( scorerow( 5, i ) ) )
        $('#q5_tbody').append(tr);
    }


    $('[data-toggle="popover"]').popover();

    // console.log(testProfileData);


    function orderrow( question_index, person_index ){
        let id = "select_q" + question_index + "_p" + person_index;
        let orderrow = "<select class=\"form-control\" id=" + id + ">";
        let pin = "";

        for ( order_i=0; order_i<testListLength+1; order_i++ ){
            if (order_i == 0){
                pin = "<option>--請選擇--</option>";
            } else if (order_i == 1){
                pin = "<option>" + order_i + "(表現拙劣)</option>";
            } else if (order_i == testListLength){
                pin = "<option>" + order_i + "(表現優異)</option>";
            } else {
                pin = "<option>" + order_i + "</option>";
            }
            orderrow = orderrow + pin;
        }
        orderrow = orderrow + "</select>";
        return orderrow;
    };

    

    function scorerow( question_index, person_index ){
        let scorerow = "";
        let name = "radio_q" + question_index + "_p" + person_index;
        for ( score_i=1; score_i<11; score_i++ ){
            let id = "q" + question_index + "_p" + person_index + "_" + score_i;
            let pin = "<input type=\"radio\" name=" + name + " id=" + id + "><label class=\"radioBtnLabel\" for=" + id + ">" + score_i + "</label>"
            scorerow = scorerow + pin
        }
        return scorerow;
    };

});