"use strict";function CheckDevice(s){$.ajax({url:"devices/"+s,contentType:"application/json",method:"POST",success:function(e){console.log(e),"0"==e?($("#"+s).children("div").removeClass("imgON").addClass("imgOFF"),$("#"+s).removeClass("on").addClass("off")):"1"==e&&($("#"+s).children("div").removeClass("imgOFF").addClass("imgON"),$("#"+s).removeClass("off").addClass("on"))}})}jQuery(document).ready(function(){$("body").on("click",".img",function(){CheckDevice($(this).parent().attr("id"))})});