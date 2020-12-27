jQuery(document).ready(function() {
    $('#Save').on('click', function(e) {
        e.preventDefault();
        var data = {
            password: $('#password').val(),
            confirm: $('#confirm').val(),
            phone: $('#phone').val(),
            email: $('#email').val()
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/auth/user'
        }).done(function(data) {
            console.log(data.ok);
            if (!data.ok) {
                $(".error").remove();
                $("#submit").before('<span class="error">' + data.error + '</span>');
            } else {
                $(".error").remove();
                $("#submit").before('<span class="ok">' + data.mess + '</span>');
            }
        });
    });

    $('#Cancel').on('click', function(e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'user/'
        }).done(function(data) {
            $("#password").val(data.password);
            $("#confirm").val(data.password);
            $("#phone").val(data.phone);
            $("#email").val(data.email);
        });
    });
});