;(function() {


	var faq = {

		outerBlocks: $(".faq_block-outer"),
		showBlocks: 3,
		blocksWrapper: $(".faq_blocks"),
		blocks: $(".faq_block"),
		more: $(".faq_more"),
		answers: $(".faq_answer-wrapper"),
		answerHeights: [],
		prepare: function() {
			$.each(faq.outerBlocks, function(index, item) {
				var answer = $(item).find(".faq_answer-wrapper");
				faq.answerHeights.push(answer.height());
				answer.css("height", "0");
				if (index >= faq.showBlocks)
					$(item).fadeOut();
			});
		},
		showMore: function() {
			$(".faq_block-outer:gt(" + (faq.showBlocks-1) + ")").fadeIn(300, function() {
				faq.more.fadeOut();
			});
		},
		hideAnswers: function() {
			faq.answers.css("height", 0);
			faq.outerBlocks.removeClass("faq_active");
		},
		blockClick: function() {
			if (this.className.search("active") !== -1){
				faq.hideAnswers();
				return false
			}
			faq.hideAnswers();
			var index = $(this).index();
			var answer = $($(this).find(".faq_answer-wrapper"));
			var answerHeight = faq.answerHeights[index];
			answer.css("height", answerHeight + "px");
			$(this).addClass("faq_active");
		},
		listen: function() {
			this.prepare();
			this.outerBlocks.on("click", this.blockClick);
			this.more.on("click", this.showMore);
			this.outerBlocks[0].click();
		},
	}

	faq.listen();


})()