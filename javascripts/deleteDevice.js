jQuery(document).ready(function() {
    $("body").on("click", ".deleteDevice", function() {
        var id = $(this).data("id");
        DeleteDevice(id);
    });
});

function DeleteDevice(id) {
    $.ajax({
        url: "devices/" + id,
        contentType: "application/json",
        method: "DELETE",
        success: function(device) {
            console.log(device);
            $('#' + id).remove();
        }
    })
}