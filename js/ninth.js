;(function() {

	var ninth = {
		descs: [
			"Опыт работы экспертов с 1987 года",
			"Личный менеджер, личный консультант",
			"Индивидуальный расчет стоимости за услуги",
			"Оптимальное соотношение цена-качество",
			"Сопровождение и отчетность на каждом этапе",
			"Прозрачная и расширенная аналитика",
			// "Подготовка к проверкам Роспотребнадзора, Россельхознадзора, ЦГИП",
			// "До 9 экспертов на клиента.",
			// "Обучение внутренних аудиторов",
			// "Поддержка 24/7",
			// "Аудит второй стороны (ваших поставщиков)",
			// "Проведение медицинских осмотров"
			],
		items: [],
		paused: false,
		desc: $(".ninth_right-title"),
		arrows: $(".ninth_arrow"),
		circleBig: $(".ninth_circle"),
		trueActive: 1,
		circleItems: $(".ninth_circle-item"),
		collectItems: function() {
			var garbageItems = $(".ninth_garbage-item");
			$.each(garbageItems, function(index, item) {
				ninth.items.push({icon: $(item).attr("data-icon"), iconActive: $(item).attr("data-icon-active"), desc: $(item).attr("data-desc")})
			});
		},
		prepareIcons: function() {
			var items = ninth.items;
			$.each(ninth.circleItems, function(index, item) {
				var desc = items[index]["desc"];
				var icon = items[index]["icon"];
				var iconActive = items[index]["iconActive"];
				$(item).attr("data-desc", desc);
				$(item).find(".ninth_circle-icon").css("background-image", "url(" + icon + ")")
				$(item).find(".ninth_circle-icon-active").css("background-image", "url(" + iconActive + ")")
			})
		},
		circleClick: function() {
			var l = ninth.circleItems.length;
			var index = parseInt($(this).attr("data-index")) - 1;
			var vary = ninth.trueActive - index;
			var absVary = Math.abs(vary);
			if (index <= 1 && ninth.trueActive >= l-2){
				// vary = absVary > 1 ? -2 : -1;
				vary = ninth.trueActive - l;
				// vary = -1;
			}
			if (index == l-1 && ninth.trueActive <= 1){
				// vary = absVary > 1 ? 2 : 1;
				vary = 1;
			}
			var absVary = Math.abs(vary);
			var sign = vary/absVary;
			var attempt = 0;
			while (absVary > 0){
				setTimeout(function() {
					ninth.circleTurn(sign);
				}, attempt*500);
				absVary--;
				attempt++;
			}
		},
		setActiveCircle: function() {
			ninth.circleItems.removeClass("circle_active");
			console.log(ninth.trueActive);
			$(ninth.circleItems[ninth.trueActive]).addClass("circle_active");
		},
		changeDesc: function() {
			ninth.desc.fadeOut(300, function() {
				ninth.desc.html(ninth.items[ninth.trueActive]["desc"]);
				ninth.desc.fadeIn();
			});
		},
		circleTurn: function(sign) {
			if(ninth.paused)
				return false
			else
				ninth.paused = true
			var l = ninth.circleItems.length;
			ninth.trueActive = (ninth.trueActive - sign) == -1 ? l - 1 : (ninth.trueActive - sign) % l;
			if (ninth.circleBig[0].style.transform)
				var currentRotate = parseInt(ninth.circleBig[0].style.transform.match(/rotate\((.?\d+)deg\)/)[1])
			else currentRotate = 0
			var newRotate = currentRotate - (360/l) * sign;
			ninth.circleBig.css("transform", "rotate(" + newRotate + "deg)")
			ninth.circleItems.css("transform", "rotate(" + (-newRotate) + "deg)")
			ninth.setActiveCircle();
			ninth.changeDesc();
			setTimeout(function() {
				ninth.paused = false;
			}, 500);
		},
		circleWheel: function(e) {
			e.preventDefault();
			var event = e.originalEvent;
			var delta = event.deltaY;
			ninth.circleTurn(delta/Math.abs(delta));
		},
		arrowClick: function() {
			var sign = $(this).attr("data-where");
			ninth.circleTurn(sign);
		},
		prepare: function() {
			ninth.collectItems();
			ninth.prepareIcons();
		},
		listen: function() {
			this.circleItems.on("click", this.circleClick);
			this.arrows.on("click", this.arrowClick);
			if ("onwheel" in document){
				this.circleBig.on("wheel", this.circleWheel);
			}
			this.prepare();
			setTimeout(function() {
				ninth.circleTurn(1)
			}, 1000);
		}
	}

	ninth.listen();


})()