@@include('./libs.js');

(function ($) {
	var loader = function () {
		$(".loader-wrap").delay(2500).fadeOut(500);
	};
	loader()

	const wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
		live: true
	});

	function sayHi() {
	  wow.init();
	}

	setTimeout(sayHi, 2500);


	// валидация формы 
	$('.main-form__input').on('focus', function () {
		$(this).parent().addClass('js-input-focus');
	}).blur(function () {
		if ($(this).val() === '') {
			$(this).parent().removeClass('js-input-focus');
		}
	});

	$('#js-call-form').on('submit', function (e) {
		event.preventDefault();
		var parent = e.target;
		ajax_form(parent);
	});

	$('#js-form-contact').on('submit', function (e) {
		event.preventDefault();
		var parent = e.target;
		ajax_form(parent);
	}); 

	$('#js-form-pay').on('submit', function (e) {
		event.preventDefault();
		var parent = e.target;
		ajax_form(parent);
	});

	$('#js-form-applay1').on('submit', function (e) {
		event.preventDefault();
		var parent = e.target;
		ajax_form(parent);
	});

	$('#js-form-applay2').on('submit', function (e) {
		event.preventDefault();
		var parent = e.target;
		ajax_form(parent);
	});   

	function ajax_form(e) {
		event.preventDefault();
		var err = [];
		let serverAnsver = {};
		var rulesPattern = {
			email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
			tel: /^\+38\(\d{3}\)\d{7}$/
		};
		var validatorMethods = {
			empty: function (el) {
				return (el === '') ? true : false;
			},
			pattern: function (el, pattern) {
				return pattern.test(el);
			},
			contains: function (el1, el2) {
				return (el1 == el2) ? false : true;
			},
			check: function (el) {
				return (el.checked) ? false : true;
			},
			max: function (el) {
				return (el.length > 5) ? true : false;
			}
		}
		var removeAnimationClass = function (selector, classAnimation) {
			selector.addClass(classAnimation);
			selector.on("animationend", function () {
				selector.removeClass(classAnimation);
			});
		}
		var pushError = function (key) {
			err.push(key);
		}
		var showError = function (key) {
			var errorMessage = $(this).next().data("errormessage"); // добавляем в input сообщение об ошибке из dataAttr и class
			var inputText = $(this).next().find('.main-form__text');
			($(this).closest('.main-form-block').hasClass('js-input-focus')) ? removeAnimationClass(inputText, 'shake-focus'): removeAnimationClass(inputText, 'shake')

			inputText.text(errorMessage);
			$(this).addClass('js-no-valid');
			pushError(key)
		}
		var showDefaultMessage = function () {
			var defaultMessage = $(this).next().data("defaultmessage"); // при клике на input убираем сообщение и class
			$(this).next().find('.main-form__text').text(defaultMessage);

			$(this).removeClass('js-no-valid');
		}
		var str = $("#" + e.id).serialize();
		//var x = document.forms[e.id]["name"].value;
		//var y = document.forms[e.id]["tel"].value;
		//	console.log(str);


		var errors = true; // по умолчанию ошибок в форме нет
		$(e).find('.main-form__input-requaired').each(function () {
			var rule = $(this).data("rule").split(' ');
			if ($(this).data("patterns") != undefined) {
				var pattern = $(this).data("patterns").split(' ');
			}
			if ($(this).data("compare") != undefined) {
				var compare = $(this).data("compare").split(' ');
			}

			rule.forEach((el) => {


				switch (el) {
					case 'pattern':
						pattern.forEach((elPat) => {
							errors = !validatorMethods[el]($.trim($(this).val()), rulesPattern[elPat]);
							if (errors) showError.call($(this), elPat);
						});
						break;
					case 'contains':
						var compareElemOne = $('#' + compare[0]).val();
						var compareElemTwo = $('#' + compare[1]).val();
						errors = validatorMethods[el](compareElemOne, compareElemTwo);
						if (errors) showError.call($(this), el);
						break;
					case 'check':
						errors = validatorMethods[el]($(this)[0]);
						if (errors) showError.call($(this), el);
						break;
					default:
						errors = validatorMethods[el]($.trim($(this).val()));
						if (errors) showError.call($(this), el);
				}
			})

			$(".main-form__input").on("mouseup", showDefaultMessage);

		});
		if (err.length == 0) {
			// get(str, "./static/val.php", true, (data) => {
			// 	serverAnsver = data.error;
			// 	for (let key in serverAnsver) {
			// 		showErrorMessage.call(e, key, serverAnsver[key])
			// 	};

			// 	if (serverAnsver.length == 0) {
			// 		get(str, "./static/val.php", true, () => {
						$.ajax({
								method: "POST",
								url: "./static/val.php",
								data: str+='&action=app',
								beforeSend: function () {
									$(e).find('button.js-main-form__button').text('Отправка...') // замена текста в кнопке при отправке
									$('body').css('cursor', 'wait')
								},
								error: function () {
									$(e).find('button.js-main-form__button').text('Ошибка отправки!'); // замена текста в кнопке при отправке в случае
								}
							})
							.done(function (msg) {
								$('.form-succses').addClass('form-succses-active');
								$(e).find('.main-form__input-requaired').each(function (el) {
									$(this).val('');
									showDefaultMessage.call($(this));
								});
								$(e).find('.main-form-block.requaired').removeClass('js-input-focus');
								$('body').css('cursor', 'default');
								//location.replace('/message/');
								$(e).find('button.js-main-form__button').text('Отправить');
							});
			// 		});
			// 	}
			// });

		}

		function showErrorMessage(elem, text) {
			const element = $(this).find(`[data-type="${elem}"] .main-form__text`);
			const inp = element.closest('.requaired').find('.main-form__input-requaired');
			inp.addClass('js-no-valid');
			removeAnimationClass(element, 'shake-focus')
			element.text(text);
		}
	}


	function get(sand, url, parse, callback) {
		$.ajax({
			url: url,
			type: 'post',
			data: sand,
			global: false,
			async: true,
			success: function (data) {
				var data = (parse) ? JSON.parse(data) : data
				callback(data)
			},
			error: function (jqXHR, status, errorThrown) {
				console.log('ОШИБКА AJAX запроса: ' + status, jqXHR);
			}
		});
	}

	// POPUP FORMS
	function initPopup(elem) {
		$(elem).magnificPopup({
			type: 'inline',
			preloader: false,
			removalDelay: 500,
			callbacks: {
				open: function () {
					$('.js-close-btn').on('click', function (event) {
						event.preventDefault();
						$.magnificPopup.close();
					});
				},
				beforeOpen: function () {
					this.st.mainClass = this.st.el.attr('data-effect');
				}
			},
			midClick: true
		});
	}

	initPopup('.js-call-form-popup');
	initPopup('.js-item1');
	initPopup('.js-item2');
	initPopup('.js-item3');
	initPopup('.js-item4');

	//telMask
	var telMask = function () {
		jQuery(function ($) {
			$.mask.definitions['#'] = '[0-9]';
			$.mask.definitions['9'] = '';
			$(".inputtelmask").mask("+(38) ### ###-##-##", {
			placeholder: "_"
			});
		});
	};
	telMask();

	//plus minus
	const number = $('.js-choose');

	number.each(function() {
	  const max_number = +$(this).attr('data-max-number');
	  const input = $(this).find('input');
	  const plus = $(this).find('.js-choose-plus');
	  const minus = $(this).find('.js-choose-minus');
	  const tr = $(this).closest('.js-tr-parent');
	  let totalPriceEl;
	  let basePriceEl;
	  let totalPrice;
	  let basePrice;
	  // console.log(input.val());

	  if (tr[0]) {
	    totalPriceEl = tr.find('.js-tr-total');
	    basePriceEl = tr.find('.js-tr-price');
	    basePrice = parseFloat(basePriceEl.text(), 2);
	  }

	  plus.on('click', function() {
	    let val = +input.val();
	    if (val >= max_number) {
	      return false;
	    } else {
	      val += 1;
	      input.val(val);
	      console.log(input.val());
	    }
	    totalPriceEl ? totalPriceEl.val((val * basePrice).toFixed(2)) : null;
	  });

	  minus.on('click', function() {
	    let val = +input.val();
	    if (val > 1) {
	      val -= 1;
	      input.val(val);
	      console.log(input.val());
	    } else {
	      return false;
	    }
	    totalPriceEl ? totalPriceEl.val((val * basePrice).toFixed(2)) : null;
	  });
	});

	//datetimepicker
	$.datetimepicker.setLocale('uk');
    // var logic1 = function( currentDateTime ){
    //     if ( currentDateTime.getDate() == new Date().getDate() ){
    //         this.setOptions({
    //             minTime: new Date()
    //         });
    //     } else
    //     {
    //         this.setOptions({
    //             minTime:'9:00'
    //         });
    //     }
    // };

    $('.datetimepicker').datetimepicker({
    	timepicker:false,
    	format:'d.m.Y',
   	});


	$('.js-btn-menu').on('click', function() {
		$('.header__menu').addClass('open');
		$('body').addClass('overflow');
	});

	$('.js-close-menu').on('click', function() {
		$('.header__menu').removeClass('open');
		$('body').addClass('overflow');
	});

	
	$('.js-basket').on('click', function () {
		$('.minicard').addClass('open');
	});
	$('.js-minicard-close').on('click', function () {
		$('.minicard').removeClass('open');
	});

	//pay
	$('.check').on('click', function () {
	    if ( $(this).is(':checked') ) {
	       var textPay =  $(this).siblings().data('pay');
	       $('.js-pay').removeClass('is-hidden');
	       $('.js-pay-link').text(textPay);
	    } else {
	    }
	})


})(jQuery);