$(document).ready(function() {
    $('nav #room').click(function() {
        if ($(this).next().css("display") == "none") {
            $(this).next().css("display", "block");
            $(this).children().css("transform", "rotate(180deg)");
        } else {
            $(this).next().css("display", "none");
            $(this).children().css("transform", "rotate(0deg)");
        }
        $('nav #func').next().css("display", "none");
        $('nav #func').children().css("transform", "rotate(0deg)");
    });

    $('nav #func').click(function() {
        if ($(this).next().css("display") == "none") {
            $(this).next().css("display", "block");
            $(this).children().css("transform", "rotate(180deg)");
        } else {
            $(this).next().css("display", "none");
            $(this).children().css("transform", "rotate(0deg)");
        }
        $('nav #room').next().css("display", "none");
        $('nav #room').children().css("transform", "rotate(0deg)");
    });
});