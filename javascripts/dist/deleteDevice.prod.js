"use strict";function DeleteDevice(c){$.ajax({url:"devices/"+c,contentType:"application/json",method:"DELETE",success:function(e){console.log(e),$("#"+c).remove()}})}jQuery(document).ready(function(){$("body").on("click",".deleteDevice",function(){DeleteDevice($(this).data("id"))})});