
$(document).ready(function() {

    $("#new-arrival").owlCarousel({

        autoPlay: 3000, //Set AutoPlay to 3 seconds

        items : 4,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]

    });



    /*==================================
    Custom Scrollbar for Dropdown Cart
    ====================================*/
    $(".scroll-pane").mCustomScrollbar({
        advanced: {
            updateOnContentResize: true

        },

        scrollButtons: {
            enable: false
        },

        mouseWheelPixels: "200",
        theme: "dark-2"

    });


    $(".smoothscroll").mCustomScrollbar({
        advanced: {
            updateOnContentResize: true

        },

        scrollButtons: {
            enable: false
        },

        mouseWheelPixels: "100",
        theme: "dark-2"

    });

});