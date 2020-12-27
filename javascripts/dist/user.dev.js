/*jQuery(document).ready(function() {
    $("body").on("click", "#Save", function() {
        saveChange(1);
    });
    $("body").on("click", "#Cancel", function() {
        saveChange(0);
    });
});

function saveChange(flag) {
    $.ajax({
        url: "user/" + flag,
        contentType: "application/json",
        method: "POST",
        success: function(user) {
            if (typeof user == "string") {
                alert(user);
            } else {
                alert(user);
            }
        }
    })
}*/
"use strict";