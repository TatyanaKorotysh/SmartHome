"use strict";jQuery(document).ready(function(){$("#Save").on("click",function(e){e.preventDefault();var o={password:$("#password").val(),confirm:$("#confirm").val(),phone:$("#phone").val(),email:$("#email").val()};$.ajax({type:"POST",data:JSON.stringify(o),contentType:"application/json",url:"/api/auth/user"}).done(function(e){console.log(e.ok),e.ok?($(".error").remove(),$("#submit").before('<span class="error">Данные умпешно обновлены</span>')):($(".error").remove(),$("#submit").before('<span class="error">'+e.error+"</span>"))})}),$("#Cancel").on("click",function(e){e.preventDefault(),$.ajax({type:"POST",contentType:"application/json",url:"user/"}).done(function(e){$("#password").val(e.password),$("#confirm").val(e.password),$("#phone").val(e.phone),$("#email").val(e.email)})})});