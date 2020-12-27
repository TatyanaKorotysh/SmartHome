jQuery(document).ready(function() {
    $('.star.rating').on('click', function() {
        $(this).parent().attr('data-stars', $(this).data('rating'));
    });
});