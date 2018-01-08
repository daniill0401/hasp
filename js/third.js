;(function() {

	var windowHeight = document.documentElement.clientHeight || $(window).height();

	var third = {
		wrapper: $(".third_blocks"),
		top: $(".third_blocks").offset().top,
		typesWrapper: $(".third_block-1 .third_block-content"),
		descWrapper: $(".third_block-2 .third_block-content"),
		whenWrapper: $(".third_block-4 .third_block-content"),
		whenItems: $(".third_when"),
		currentWhen: "after",
		typesItems: $(".third_type"),
		more: $(".third_more"),
		marginTypes: {1300: 6, 1100: 3}, // the biggest margin in em between active and last type item
		activeType: 0,
		// active: {type: 3, beforeAfter: "before" },
		statesClasses: ["first_state", "second_state", "third_state"],
		currentState: 0,
		showOffset: 200,
		shown: false,
		activated: false,
		types: ["Предприятия общественного питания", "Оптовые поставщики", "Транспортные компании", "Предприятия по переработке", "Фермерские хозяйства", "Производители сельхозкультур"],
		afters: [
				["рост прибыли за счет минимизации расходов", "экономия электроэнергии и затрат на обслуживание оборудования", "повышение качества сырья и готовой продукции", "уменьшение издержек, вызванных списанием сырья", "высококвалифицированный штат сотрудников", "своевременные поставки сырья от проверенных поставщиков", "соблюдение стандартов сервиса", "повышение репутации компании", "юридическая и финансовая безопасность"],
				["автоматизация деятельности компании", "увеличение конкурентоспособности", "рост прибыли за счет минимизации расходов", "высококвалифицированный штат сотрудников", "юридическая и финансовая безопасность", "расширение рынков сбыта"],
				["регулярные рейсы и своевременные поставки продукции", "соответствие требованиям, нормативам, стандартам, характерным для отрасли", "оптимизация бизнес-процессов", "минимальные риски возникновения нештатных ситуаций", "высококвалифицированный штат сотрудников", "расширение рынков сбыта", "повышение репутации компании", "юридическая и финансовая безопасность"],
				["запуск новых линий производства", "рост прибыли за счет минимизации расходов", "расширение ассортимента выпускаемой продукции", "рост инвестиционной привлекательности", "повышение качества готовой продукции", "уменьшение издержек, вызванных списанием сырья", "полный контроль производственных циклов", "высококвалифицированный штат сотрудников", "юридическая и финансовая безопасность"],
				["соответствие требованиям, нормативам, стандартам, характерным для отрасли", "расширение рынков сбыта", "рост прибыли за счет минимизации расходов", "расширение ассортимента выпускаемой продукции", "увеличение доверия потребителей", "рост инвестиционной привлекательности", "высококвалифицированный штат сотрудников", "повышение качества готовой продукции", "юридическая и финансовая безопасность"],
				["повышение качества готовой продукции", "оптимальная загрузка и запуск новых линий производства", "уменьшение издержек, вызванных списанием сырья", "полный контроль производственных циклов", "рост прибыли за счет минимизации расходов", "оптимизация бизнес-процессов, эффективное управление ресурсами", "юридическая и финансовая безопасность", "рост инвестиционной привлекательности", "высококвалифицированный штат сотрудников"]],
		befores: [
				["несоответствие требованиям Роспотребнадзора (TP ТС 021/2011 «О безопасности пищевой продукции»)", "крупные штрафы, финансовые убытки", "несоблюдение правил производства продукции", "нарушение товарного соседства", "работа с недобросовестными поставщиками", "несоответствие оборудования для хранения сырья", "отсутствие медицинских книжек у работников", "административная ответственность"],
				["отсутствие маркировки продукции, деклараций соответствия", "несоответствие требованиям Роспотребнадзора (TP ТС 021/2011 «О безопасностищевой продукции»)", "несоблюдение правил производства продукции", "административная ответственность", "наличие продукции несоответствующего качества", "крупные штрафы, финансовые убытки"],
				["несоблюдение требований и условий перевозки и хранения пищевой продукции", "крупные штрафы, финансовые убытки", "отсутствие измерительного оборудования в транспортных средствах", "административная ответственность", "неквалифицированные водители", "отсутствие контроля процесса транспортировки"],
				["несоблюдение условий хранения сырья и готовой продукции", "несоответствие требованиям Роспотребнадзора (TP ТС 021/2011 «О безопасности пищевой продукции»)", "крупные штрафы, финансовые убытки", "простои, вызванные поломкой оборудования", "перегрузка/недозагрузка производственных линий", "отсутствие входного контроля сырья", "перекрестное использование производственных линий", "работа с недобросовестными поставщиками", "административная ответственность"],
				["отсутствие качественных удобрений, кормов, медикаментов", "несоблюдение условий хранения сырья и готовой продукции", "несоответствие требованиям Роспотребнадзора (TP ТС 021/2011 «О безопасности пищевой продукции»)", "использование низкоквалифицированной рабочей силы", "крупные штрафы, финансовые убытки", "отсутствие контроля за процессами производства", "административная ответственность"],
				["нарушение стандартов производства и технологических процессов", "несоответствие требованиям Роспотребнадзора (TP ТС 021/2011 «О безопасности пищевой продукции»)", "отсутствие входного контроля сырья", "крупные штрафы, финансовые убытки", "перегрузка/недозагрузка производственных линий", "несоблюдение условий хранения сырья и готовой продукции", "работа с недобросовестными поставщиками", "административная ответственность"]
			],
		prepare: function() {
			// var typeIndex = third.activeType;
			// var type = third.types[typeIndex];
			// var afters = third.afters[typeIndex];
			// var befores = third.befores[typeIndex];
			third.insertTypes();
			third.setMarginTypes();
		},
		insertTypes: function() {
			third.types.forEach(function(item) {
				third.typesWrapper.append("<p class='third_type'><img class='third_type-cross' src='img/third_cross-blue.png'><span class='third_type-text'>" + item + "</span></p>");
			})
		},
		getMargin: function() {
			var width = $(window).width();
			var biggest = 0;
			for (var i in third.marginTypes){
				if (width > i){
					biggest = third.marginTypes[i];
				}
				else {
					break;
				}
			}
			return biggest
		},
		setMarginTypes: function() {
			var bM = third.getMargin();
			var typeItems = $(".third_type");
			var l = typeItems.length;
			// var centerIndex = Math.ceil(l/2);
			var centerIndex = Math.ceil(l/2)-1;
			var aboveMargin = bM/centerIndex;
			// var belowMargin = bM/(l-centerIndex-1);
			var belowMargin = bM/(l-centerIndex);

			$.each(typeItems, function(index, item) {
				if (index < centerIndex) {
					var marginLeft = Math.abs(centerIndex-index)*aboveMargin + "em";
				}
				else if (index > centerIndex) {
					var marginLeft = Math.abs(centerIndex-index)*belowMargin + "em";
				}
				else {
					return
				}
				$(item).css("margin-left", marginLeft)
			});
		},
		changeState: function(stateIndex) {
			var stateClass = third.statesClasses[stateIndex];
			var currentClass = third.statesClasses[third.currentState];
			third.wrapper.removeClass(currentClass);
			third.wrapper.addClass(stateClass);
			third.currentState = stateIndex;
		},
		changeDescs: function(afters=true) {
			var delay = 0;
			var that = this;
			console.log(third.currentWhen);
			if (third.currentWhen == 'before')
				afters = false
			if (third.currentState == 2){
				third.changeState(1);
				delay = 700;
			}
			setTimeout(function() {
				if (afters)
					var descs = third.afters[third.activeType];
				else
					var descs = third.befores[third.activeType];
				console.log(descs, third.activeType);
				third.descWrapper.html("");
				descs.forEach(function(item, index) {
					var animationDelay = .3 + index/10 + "s";
					third.descWrapper.append("<p class='third_desc animated fadeInLeft' style='animation-delay: "+animationDelay+"'><span class='third_desc-number'>" + (index < 9 ? "0" : "") + (index + 1) + "</span><span class='third_desc-item'>" + item + "</span> </p>")
				});
				// third.moreReload();
				third.changeState(2);
			}, delay);
		},
		moreReload: function() {
			third.more.removeClass("animated");
			third.more.fadeOut(100, function() {
				third.more.addClass("animated");
				setTimeout(function() {
					third.more.fadeIn();
				}, 1000)
			})
			// setTimeout(function() {
			// }, 100);
		},
		typeClick: function() {
			third.activeType = $(this).index();
			third.setActiveType();
			third.changeDescs();
		},
		setActiveType: function() {
			$(".third_type").removeClass("type_active");
			$($(".third_type")[third.activeType]).addClass("type_active");
		},
		whenClick: function() {
			var when = $(this).attr("data-when");
			console.log(when);
			third.currentWhen = when;
			if (!third.activated){
				third.setActiveType()
				third.activated = true;
			}
			if (when == 'before'){
				third.whenWrapper.removeClass("after_active");
				third.whenWrapper.addClass("before_active");
				third.changeDescs(false)
			}
			else{
				third.whenWrapper.removeClass("before_active");
				third.whenWrapper.addClass("after_active");
				third.changeDescs()
			}
			$(".third_caption-text").fadeOut(300, function() {
				$(".third_caption-text").text($(".third_caption-text").data(when));
				$(".third_caption-text").fadeIn(700);
			})
		},
		checkScrolled: function(e) {
			if (third.shown)
				return true
			var top = window.scrollY || document.documentElement.scrollTop;
			if (top + windowHeight - third.showOffset >= third.top) {
				third.changeState(1);
				third.shown = true;
			}
		},
		listen: function() {
			this.prepare();
			this.typesWrapper.delegate(".third_type", "click", this.typeClick);
			this.checkScrolled();
			this.whenItems.on("click", this.whenClick);
			if ("onscroll" in document)
				document.addEventListener("scroll", third.checkScrolled);
			else if ("onwheel" in document)
				$("html, body").on("wheel", this.checkScrolled);
		}

	}

	third.listen();


})()