;(function() {

		var loaderHide = function() {
		// ready handle
		var loader = $(".loader");
			if(loader.length)
				loader.fadeOut();
		}

	var checkScrolled = function() {
		if (document.documentElement.scrollTop > 0){
			var elements = $(".header .wow");
			elements.removeClass("wow");
			elements.addClass("animated");
			elements.css({"visibility": "visible", "animation-name": ""})
			elements.removeClass("wow");
		}
	}

	var firstClickShow = function() {
		setTimeout(function() {
			$($(".nav_name")[1]).click();
		}, 2500);
	}


	window.onload = function() {

		loaderHide();

		checkScrolled();
		
		new WOW().init();

		$("[data-scroll]").on("click", function() {
			var to = $(this).attr("data-scroll");
			if($(this).attr("data-offset"))
				var offset = parseInt($(this).attr("data-offset"));
			else if($(this).attr("data-offset-obj"))
				var offset = $($(this).attr("data-offset-obj")).height() - 1;
			$("html, body").animate({"scrollTop": $(to).offset().top - offset}, "slow");
		})

		firstClickShow();

	}


})()