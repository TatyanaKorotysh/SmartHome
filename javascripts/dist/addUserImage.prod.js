"use strict";function addUserImage(e){$.ajax({url:"user/"+e,contentType:"application/json",method:"POST",success:function(e){console.log(e),$("#device div").remove();var i="";e.forEach(function(e){i+="<div id='"+e.id+"' class='device ","0"==e.condition?i+="off":i+="on",i+="'> <div class='device ","0"==e.condition?i+="imgOFF":i+="imgON",i+="'> </div>",i+="<h3>"+e.login+"</h3>",i+="<p>"+e.type+"</p>",i+="<p>"+e.room+"</p>",i+="<a href='/edit/:"+e.id+"'>Редактировать устройство</a>",i+="<a href='' class='deleteDevice' data-id="+e.id+">Удалить устройство</a>",i+="</div>"}),console.log(i),$("#device").append(i)}})}jQuery(document).ready(function(){$("body").on("click",".addImage",function(){var e=$(this).data("");console.log(e)})});