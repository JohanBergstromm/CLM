$(document).ready(function() {
    navbar();
    headerFade();
    hamburgerMenu();
    // slider();
    contactForm();
    currentSection();
    initSlider();
});

function navbar() {
    var navOuterHeight = $('.main-nav').outerHeight();

    $(window).scroll(function() {
        var jobOffsetTop = $('.about').offset().top;
        var wScroll = $(window).scrollTop();

        if (wScroll > jobOffsetTop - navOuterHeight) {
            $('.main-nav').addClass('active');
        } else {
            $('.main-nav').removeClass('active');
        }
    });

    $('nav ul li a, .to-contact').click(function(e) {
        e.preventDefault();
        var sectionID = $(this).data('id');

        $('html body').animate({
            scrollTop: $('#' + sectionID).offset().top - navOuterHeight
        }, 1000)

        $('html').animate({
            scrollTop: $('#' + sectionID).offset().top - navOuterHeight
        }, 1000)
    });
}

function headerFade() {
    $('.header-logo').addClass('active');
}

function hamburgerMenu() {
    $('.hamburger').click(function() {
        var $this = $(this);

        if ($this.hasClass('active')) {
            $this.removeClass('active');
            $('.menu').stop().slideUp();
        } else {
            $this.addClass('active');
            $('.menu').stop().slideDown();
        }
    });

    $(window).click(function(e) {
        if ($(this).width() < 768 && !e.target.closest('.menu') && !e.target.closest('.hamburger')) {
            $('.menu').stop().slideUp();
            $('.hamburger').removeClass('active');
        }
    });

    $(window).resize(function() {
        if ($(this).width() > 768 && $('.menu').is(':hidden')) {
            $('.menu').removeAttr('style');
        }
    });
}

function slider() {
    var images = $('.slider .item').length;
    var sliderPos = 1;
    var lastImage = images * 100 - 100;

    $('.arrow-right, .arrow-left').click(function() {
        if ($(this).hasClass('arrow-right')) {
            if (sliderPos < images) {
                sliderPos += 1;
                $('.slider-wrapper').animate({ 'margin-left': '-=100%' });
            } else {
                sliderPos = 1;
                $('.slider-wrapper').stop().animate({ 'margin-left': '0%' });
            }
        } else {
            if (sliderPos == 1) {
                sliderPos = images;
                $('.slider-wrapper').animate({ 'margin-left': + -lastImage + '%' });
            } else {
                sliderPos -= 1;
                $('.slider-wrapper').animate({ 'margin-left': '+=100%' });
            }
        }
    });

    // Reset on window resize 
    $(window).resize(function() {
        $('.slider-wrapper').css('margin-left', '0%');
        sliderPos = 1;
    });
}

function contactForm() {
    var isEmail = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);

    $('.contact-form button').click(function(e) {
        var $emailInputVal = $('input[name=email]').val();
        var testEmail = isEmail.test($emailInputVal);

        $('.contact-form input, textarea').each(function() {
            var inputVal = $(this).val();

            if (inputVal.length === 0) {
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }

            if (testEmail === false) {
                $('input[name=email]').addClass('error');
            } else {
                $('input[name=email]').removeClass('error');
            }
        });

        if ($('.contact-form input, .contact-form textarea').hasClass('error')) {
            return;
        } else {
            e.preventDefault();
            //$.post('mail/mail.php', $(this).serialize()).then(function() {
                $('.contact-form').fadeOut();
                $('.success-message').delay(400).fadeIn();
            //}).fail(function() {
                console.log('error');
            //});
        }
    });
}

function currentSection() {
    // $('.home').addClass('active');

    // var navOuterHeight = $('.main-nav').outerHeight();
    // var home = $('#home').offset().top;
    // var about = $('#about-wrap').offset().top;
    // var jobs = $('#jobs').offset().top;
    // var contact = $('#contact').offset().top;
    // var sections = [home, about, jobs, contact];

    // for (var i = 0; i < sections.length; i++) {
    //     console.log(sections[i] - navOuterHeight);
    // }

    // $(window).scroll(function() {
    //     var wScroll = $(this).scrollTop();

    //     // if (wScroll + navOuterHeight >= home) {
    //     //     $('.main-nav li a').removeClass('active');
    //     //     $('.home').addClass('active');
    //     // } else {
    //     //     $('.home').removeClass('active');
    //     // }
    //     // if (wScroll + navOuterHeight >= about) {
    //     //     $('.main-nav li a').removeClass('active');
    //     //     $('.about').addClass('active');
    //     // } else {
    //     //     $('.about').removeClass('active');
    //     // }
    //     // if (wScroll + navOuterHeight >= jobs) {
    //     //     $('.main-nav li a').removeClass('active');
    //     //     $('.jobs').addClass('active');
    //     // } else {
    //     //     $('.jobs').removeClass('active');
    //     // }
    //     // if (wScroll + navOuterHeight >= contact) {
    //     //     $('.main-nav li a').removeClass('active');
    //     //     $('.contact').addClass('active');
    //     // } else {
    //     //     $('.contact').removeClass('active');
    //     // }
    // });
}

function initSlider() {
    $('.owl-carousel').owlCarousel({
        dots: true,
        nav: true,
        items: 1
        // navText: ['<i class="icon-left-small"></i>', '<i class="icon-right-small"></i>'],
        // navContainer: '#lgi__slider',
        // navClass: ['lgi__btn lgi__btn--prev', 'lgi__btn lgi__btn--next'],
        // responsive: {
        //     0: {
        //         items: 1,
        //     },
        //     768: {
        //         items: 2,
        //         autoWidth: false,
        //     },
        //     992: {
        //         items: 3,
        //         autoWidth: false,
        //     },
        //     1310: {
        //         items: 3,
        //         autoWidth: false,
        //         margin: 30,
        //     }
        // }
    });
}

function initMap() {
    var arboga = { lat: 59.401225, lng: 15.819261 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: arboga,
        disableDefaultUI: true,
        styles: [{
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#616161"
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#f5f5f5"
            }]
        }, {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#bdbdbd"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{
                "saturation": -15
            }, {
                "lightness": -5
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#eeeeee"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#757575"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e5e5e5"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#9e9e9e"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#757575"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dadada"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#616161"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#9e9e9e"
            }]
        }, {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e5e5e5"
            }]
        }, {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [{
                "color": "#eeeeee"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#c9c9c9"
            }]
        }, {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#9e9e9e"
            }]
        }]

    });
    var marker = new google.maps.Marker({
        position: arboga,
        map: map
    });

}