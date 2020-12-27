"use strict";

jQuery(document).ready(function () {
  $("body").on("click", ".addImage", function () {
    var file = $(this).data("");
    console.log(file); //addUserImage(file);
  });
});

function addUserImage(file) {
  $.ajax({
    url: "user/" + file,
    contentType: "application/json",
    method: "POST",
    success: function success(devices) {
      console.log(devices);
      $('#device div').remove();
      var str = "";
      devices.forEach(function (element) {
        str += "<div id='" + element.id + "' class='device ";

        if (element.condition == "0") {
          str += "off";
        } else {
          str += "on";
        }

        str += "'> <div class='device ";

        if (element.condition == "0") {
          str += "imgOFF";
        } else {
          str += "imgON";
        }

        str += "'> </div>";
        str += "<h3>" + element.login + "</h3>";
        str += "<p>" + element.type + "</p>";
        str += "<p>" + element.room + "</p>";
        str += "<a href='/edit/:" + element.id + "'>Редактировать устройство</a>";
        str += "<a href='' class='deleteDevice' data-id=" + element.id + ">Удалить устройство</a>";
        str += "</div>";
      });
      console.log(str);
      $("#device").append(str);
    }
  });
}