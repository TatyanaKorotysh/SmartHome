$(document).ready(function() {
    $('#nav-icon').click(function() {
        $(this).toggleClass('open');
    });
});

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}