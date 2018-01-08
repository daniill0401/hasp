$(document).ready(function() {

var sliderImage = $('.contant_image');
var sliderDesc = $('.slider_desc');

	function rotateCircle(){
		var that = this;
		$('.slide_wrapper').animate({opacity : "0"}, 100, function() {
				sliderImage.css("animation-name", "");
				sliderDesc.css("animation-name", "");
				sliderImage.css("animation-delay", "0s");
				sliderDesc.css("animation-delay", "0s");
				sliderImage.removeClass("fadeInUp");
				sliderDesc.removeClass("fadeInUp");
				var newSrc = $(that).attr("data-src");
				var newDesc = $(that).attr("data-desc");
				var img = new Image();
				img.onload = function() {
					sliderImage.css("background-image", "url(" + newSrc + ")")
					sliderDesc.html(newDesc);
					$('.nav_name').removeClass('active');
					$(that).addClass('active');
					sliderImage.css("animation-name", "fadeInUp");
					sliderDesc.css("animation-name", "fadeInUp");
					$('.slide_wrapper').animate({opacity : "1"}, 300);
				}
				img.src = newSrc;
		})
	}

	$('.nav_name').on('click', rotateCircle);

})