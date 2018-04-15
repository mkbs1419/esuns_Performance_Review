$(document).ready(function () {
    var testProfileData = {
        "quarter": "第一季度(Q1:106.12~107.03)",
        "fillingPerson": "測試人員A",
        "fillingDate": "2018/04/16",
        "test_list": ["AAA", "BBB", "CCC"]
    };

    $("#quarter").text(testProfileData.quarter);
    $("#fillingPerson").text("考核人：" + testProfileData.fillingPerson);
    $("#fillingDate").text("填表日期：" + testProfileData.fillingDate);


    // table 1
    var tr = $('<tr>')
    .append( $('<td>').text( testProfileData.test_list[0] ) )
    .append( $('<td>').text( "test_order" ) )
    .append( $('<td>').text( testProfileData.test_list[0] ) )


    

        // .addClass('table table-bordered table-hover tablestyle')
        // .html("<thead><tr><th>考核人員</th><th>表現排序</th><th>表現拙劣← 表現優異程度 →表現優異</th></tr></thead>")
        
        
        
        
        
        // for( i=0; i<testProfileData.test_list.length; i++){
            // var row = $('<td>').text(testProfileData.test_list[i])

            // table1.append(row);
        // }




    // var table = $('<table>').addClass('foo');
    // for(i=0; i<3; i++){
    //     var row = $('<tr>').addClass('bar').text('result ' + i);
    //     table.append(row);
    // }

    // $('#here_table').append(table);

    $('#here_tbody').append(tr);



    $('[data-toggle="popover"]').popover();

    console.log("OK");
    console.log(testProfileData);





    function makerow(){

    }

});