$('.js-slider-month').slick({
     slidesToShow: 1,
     slidesToScroll: 1,
     dots: false,
     infinite: true,
     arrows: false,
   });

$('.slider-month__btn-prev').on('click', function(){
   $('.js-slider-month').slick('slickPrev');
 });

 $('.slider-month__btn-next').on('click', function(){
   $('.js-slider-month').slick('slickNext');
 });

 $('.js-slider-date').slick({
      slidesToShow: 7,
      slidesToScroll: 1,
      dots: false,
      infinite: true,
      arrows: false,
      // asNavFor: '.js-gallery-project-in',
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
          }
        }
      ]
    });

 $('.slider-date__btn-prev').on('click', function(){
    $('.js-slider-date').slick('slickPrev');
  });

  $('.slider-date__btn-next').on('click', function(){
    $('.js-slider-date').slick('slickNext');
  });

  $('.slider-month__item').on('click', function(){
     var _this = $(this);
     var image = _this.data("month");
     console.log(image);
     $('.js-slider-date').slick('slickUnfilter');
     $('.js-slider-date').slick('slickFilter',   '[data-month=' + image + ']');
  });

  // $('.slider-month__item').on('click', function(){
  //   // console.log('hrll');
  //    var _this = $(this);
  //   var image = _this.data("month");
  //   console.log(image);
  //     // $('.js-slider-date').slick('slickUnfilter');
  //     $('.js-slider-date').slick('slickFilter',  '.062020');
  // });
