"use strict";

jQuery(document).ready(function () {
  $('#Save').on('click', function (e) {
    e.preventDefault();
    var data = {
      homeLogin: $('#name').val(),
      template: $('#layout').val(),
      submit: "save"
    };
    console.log(data);
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'home/'
    }).done(function (data) {
      $(".error").remove();
      alert('dgdfg');
      $("#submit").before('<span class="ok">' + data.mess + '</span>');
    });
  });
  $('#Cancel').on('click', function (e) {
    e.preventDefault();
    var data = {
      homeLogin: $('#name').val(),
      template: $('#layout').val(),
      submit: "cancel"
    };
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'home/'
    }).done(function (data) {
      $("#name").val(data.homeLogin);
      $("#layout").selectedIndex = 0;
    });
  });
});