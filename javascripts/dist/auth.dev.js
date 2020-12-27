"use strict";

jQuery(document).ready(function () {
  $('#submit').on('click', function (e) {
    e.preventDefault();
    var data = {
      login: $('#login').val(),
      password: $('#password').val()
    };
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/api/auth/login'
    }).done(function (data) {
      console.log(data.ok);

      if (!data.ok) {
        $(".error").remove();
        $("h1").next().after('<span class="error">' + data.error + '</span>');
      } else {
        $(location).attr('href', '/user');
      }
    });
  });
});