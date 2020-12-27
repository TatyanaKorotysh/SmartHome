var time = 2000;

jQuery(document).ready(function() {

    $('#left').css("margin-top", "-1000px");
    $('#left').css("opacity", "0");
    $("#left").animate({
        "margin-top": "+=1000px",
        opacity: "1"
    }, time / 2, function() {});

    $('#right').css("margin-bottom", "-1000px");
    $('#right').css("opacity", "0");
    $("#right").animate({
        "margin-bottom": "+=1000px",
        opacity: "1"
    }, time / 2, function() {});

    $("body").click(function(e) {
        if (e.pageY > 70) {
            //alert(e.pageX + " , " + e.pageY);
            $(this).append('<img src="/images/cercle.png" class="img">');
            $(this).children().last().css("left", e.pageX - 5);
            $(this).children().last().css("top", e.pageY - 5);
            $(this).children().last().animate({
                left: '-=75',
                top: '-=75',
                width: '+=150px',
                opacity: "0"
            }, time, function() {});
            setTimeout(function() {
                $(this).children().first().remove();
            }, time);
        }
    })
});