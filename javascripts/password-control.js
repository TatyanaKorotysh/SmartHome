$(document).ready(function() {
    $('.password-control').click(function() {
        if ($(this).prev().attr('type') == 'password') {
            $(this).addClass('view');
            $(this).prev().attr('type', 'text');
        } else {
            $(this).removeClass('view');
            $(this).prev().attr('type', 'password');
        }
    });
});