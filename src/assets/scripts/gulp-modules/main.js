$('.js-main-slider').slick({
   	arrows: false,
   	dots: true,
    fade: true,
    cssEase: 'linear'
});

$('.js-products-slider').slick({
	arrows: false,
   	dots: false,
   	slidesToShow: 3,
   	responsive: [
   	  {
   	    breakpoint: 992,
   	    settings: {
   	      slidesToShow: 2,
   	    }
   	  },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
          }
        }
   	]
});

$('.js-arrow-prev').click(function () {
	$('.js-products-slider').slick('slickPrev');
})
$('.js-arrow-next').click(function () {
	$('.js-products-slider').slick('slickNext');
});

if($(window).width() < 767) {
   $('.js-gallery-products').slick({
         arrows: false,
   });
}

$('.js-arrow-menu-prev').click(function () {
   $('.js-gallery-products').slick('slickPrev');
})
$('.js-arrow-menu-next').click(function () {
   $('.js-gallery-products').slick('slickNext');
});



