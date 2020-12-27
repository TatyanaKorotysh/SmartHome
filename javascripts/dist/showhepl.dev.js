"use strict";

$(document).ready(function () {
  $('.ask img').mouseover(function () {
    $(this).siblings().css('opacity', 1);
  });
  $('.ask').mouseout(function () {
    $(this).children().next().css('opacity', 0);
  });
  $('.password-control').click(function () {
    if ($(this).prev().attr('type') == 'password') {
      $(this).addClass('view');
      $(this).prev().attr('type', 'text');
    } else {
      $(this).removeClass('view');
      $(this).prev().attr('type', 'password');
    }
  });
});