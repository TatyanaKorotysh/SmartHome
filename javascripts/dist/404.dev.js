"use strict";

var time = 1000;
jQuery(document).ready(function () {
  $('#left').css("padding-right", "1000px");
  $('main').css("opacity", "0");
  $("main").animate({
    "padding-top": "-=10",
    opacity: "1"
  }, time, function () {});
});