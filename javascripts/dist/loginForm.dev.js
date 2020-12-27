"use strict";

$(document).ready(function () {
  $('.password-control').click(function () {
    if ($('#password').attr('type') == 'password') {
      $(this).addClass('view');
      $('#password').attr('type', 'text');
    } else {
      $(this).removeClass('view');
      $('#password').attr('type', 'password');
    }
  });
});