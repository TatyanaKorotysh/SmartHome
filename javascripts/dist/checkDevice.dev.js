"use strict";

jQuery(document).ready(function () {
  $("body").on("click", ".img", function () {
    var id = $(this).parent().attr("id");
    CheckDevice(id);
  });
});

function CheckDevice(id) {
  $.ajax({
    url: "devices/" + id,
    contentType: "application/json",
    method: "POST",
    success: function success(condition) {
      console.log(condition);

      if (condition == '0') {
        $('#' + id).children('div').removeClass('imgON').addClass('imgOFF');
        $('#' + id).removeClass('on').addClass('off');
      } else {
        if (condition == '1') {
          $('#' + id).children('div').removeClass('imgOFF').addClass('imgON');
          $('#' + id).removeClass('off').addClass('on');
        }
      }
    }
  });
}