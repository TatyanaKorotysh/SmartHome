$(document).ready(function() {

    $('.ask img').mouseover(function() {
        $(this).siblings().css('opacity', 1);
    });

    $('.ask').mouseout(function() {
        $(this).children().next().css('opacity', 0);
    });
});