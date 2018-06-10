function checkScroll() {
    var startY = $('.navbar').height() * 2; //The point where the navbar changes in px

    if ($(window).scrollTop() > (startY + 300)) {
        $('.navbar').addClass("scrolled");
    } else {
        $('.navbar').removeClass("scrolled");
    }
}


if ($('.navbar').length > 0) {
    $(window).on("scroll load resize", function() {
        checkScroll();
    });
}


$('.home-down').click(function() {
    var shift = 100;
    $('html, body').animate({
        scrollTop: $("#aboutme").offset().top
    }, 1000);
})