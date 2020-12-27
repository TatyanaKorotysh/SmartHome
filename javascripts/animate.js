var time = 1000;
var max = true;
var min = true;

jQuery(document).ready(function() {

    start();
    $(document).mouseover(function() {
        start();
    });

    $('header').css("top", "-70px");
    $("header").animate({
        top: "+=70"
    }, time, function() {});

    $('main').css("padding-top", "200px");
    $('main').css("opacity", "0");
    $("main").animate({
        "padding-top": "-=105",
        opacity: "1"
    }, time, function() {});
});

function animateOff() {
    $("#nav-icon").removeClass('open');
    $(".topnav").removeClass('responsive');

    $("nav").animate({
        left: "-350"
    }, time, function() {});

    $("nav #add").animate({
        left: "-=350"
    }, time, function() {});

    $("header").animate({
        top: "-=70"
    }, time, function() {});

    $("main").animate({
        "padding-top": "+=200",
        opacity: "0"
    }, time, function() {});


}

function link(link) {
    animateOff();
    setTimeout(function() {
        location.href = link;
    }, time);
}

function start() {
    if ($(document).width() > 950 && max) {
        $('nav').css("left", "-350px");
        $("nav").animate({
            left: "0"
        }, time, function() {});

        $('nav #add').css("left", "-200px");
        $("nav #add").animate({
            left: "150"
        }, time, function() {});

        $('nav').css("left", "300px");
        max = false;
        min = true;
    }
    if ($(document).width() < 950 && min) {
        $('nav').css("left", "-350px");
        $("nav").animate({
            left: "-330"
        }, time, function() {});
        min = false;
        max = true;

        $(document).on("mousemove", function(event) {
            if (event.pageX < 20 && event.pageY > 70) {
                $("nav").animate({
                    left: "0"
                }, 0, function() {});

                $("nav #add").animate({
                    left: "150"
                }, 0, function() {});
            }
            if (event.pageX > 350 && event.pageY > 70 && !min) {
                $("nav").animate({
                    left: "-330"
                }, 0, function() {});


                $("nav #add").animate({
                    left: "-330"
                }, 0, function() {});
            }
            return;
        });
    }
}