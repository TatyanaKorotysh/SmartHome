jQuery(document).ready(function() {
    $('#Save').on('click', function(e) {
        e.preventDefault();
        var data = {
            name: $('#name').val(),
            type: $('#type').val(),
            room: $('#room').val()
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/auth/add'
        }).done(function(data) {
            console.log(data.ok);
            if (!data.ok) {
                $(".error").remove();
                $("#device").before('<span class="error">' + data.error + '</span>');
            } else {
                $(location).attr('href', '/devices');
            }
        });
    });
});