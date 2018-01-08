;(function() {


	var tenth = {
		slickObj: undefined,
		arrows: $(".tenth_slider-arrow"),
		slickInit: function() {
			tenth.slickObj = $(".tenth_slider-inner").slick({
				slidesToShow: 3,
				arrows: false
			})
		},
		arrowClick: function() {
			if (this.className.search("left")!==-1)
				$(".tenth_slider-inner").slick("slickPrev");
			else
				$(".tenth_slider-inner").slick("slickNext");
		},
		listen: function() {
			this.slickInit();
			this.arrows.on("click", this.arrowClick);
		}
	}

	tenth.listen();


})()