// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1200,
//         adaptiveHeight: true,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg" alt="prev"/></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg" alt="next"/></button>'
//     });
// });

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    nav: false,
    controls: false,
    speed: 1200
});

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
})


// Tabs and description catalog items
$(document).ready(function () {
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    // $('.catalog-item__link').each(function (i){
    //     $(this).on('click', function (e){
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     });
    // });

    // $('.catalog-item__link-back').each(function (i){
    //     $(this).on('click', function (e){
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     });
    // });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__details').eq(i).toggleClass('catalog-item__details_active');
            });
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__link-back');

    // Modal

    $('[data-modal="consultation"]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__desc').text($('.catalog-item__title').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    // Validate Forms

    // $('#consultation-form').validate();

    // $('#consultation form').validate({
    //     rules: {
    //         name: {
    //             required: true,
    //             minlength: 2
    //         },
    //         phone: "required",
    //         email: {
    //             required: true,
    //             email: true
    //         }
    //     },
    //     messages: {
    //         name: {
    //             required: "Введите ваше имя!",
    //             minlength: jQuery.validator.format("Имя должно состоять из минимум {0} символов!")
    //         },
    //         phone: "Введите номер телефона для связи с вами!",
    //         email: {
    //             required: "На нужена ваша почта, чтобы связаться с вами!",
    //             email: "Правильный формат почты: name@domain.com"
    //         }
    //     }
    // });

    // $('#order form').validate();

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Введите ваше имя!",
                    minlength: jQuery.validator.format("Имя должно состоять из минимум {0} символов!")
                },
                phone: "Введите номер телефона для связи с вами!",
                email: {
                    required: "На нужена ваша почта, чтобы связаться с вами!",
                    email: "Правильный формат почты: name@domain.com"
                }
            }
        });
    }

    validateForms('#consultation form');
    validateForms('#consultation-form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //Smooth scroll and page up

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1200) {
            $('.pageup').fadeIn('slow');
        } else {
           $('.pageup').fadeOut();
        }

    });

    $("a[href^='#']").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    // $("a").on('click', function(event) {
    //
    //     // Make sure this.hash has a value before overriding default behavior
    //     if (this.hash !== "") {
    //         // Prevent default anchor click behavior
    //         event.preventDefault();
    //
    //         // Store hash
    //         var hash = this.hash;
    //
    //         // Using jQuery's animate() method to add smooth page scroll
    //         // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    //         $('html, body').animate({
    //             scrollTop: $(hash).offset().top
    //         }, 800, function(){
    //
    //             // Add hash (#) to URL when done scrolling (default click behavior)
    //             window.location.hash = hash;
    //         });
    //     } // End if
    // });
});

