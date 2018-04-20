$(document).ready(function () {
    // console.log("bindData Loaded!");
    $("*[bind]").on('change keyup', function (e) {
        let to_bind = $(this).attr('bind');
        $("*[bind='" + to_bind + "']").html($(this).val());
        $("*[bind='" + to_bind + "']").val($(this).val());
        
        let table_expect = $("*[bind='scoreSummaryTable_expect']").val();
        let table_actual = $("*[bind='scoreSummaryTable_actual']").val();
        let table_accumulation = table_expect - table_actual;
        let table_nextseason = parseInt(table_expect) + table_accumulation;
        $("*[bind='scoreSummaryTable_accumulation']").html(table_accumulation);
        if ( isNaN(table_nextseason) ) {
            $("*[bind='scoreSummaryTable_nextseason']").html(0);
        } else {
            $("*[bind='scoreSummaryTable_nextseason']").html(table_nextseason);
        }
    })
});