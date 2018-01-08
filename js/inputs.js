;(function() {


	var inputs = {
		items: $(".input_action"),
		phones: $(".input[name=phone]"),
		required: $(".input[required]"),
		patterns: {
			mail: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
			phone:  /\+7 \(\d{3}\) \d{3}\ \d{2}\ \d{2}/,
			name: /[\s\S]{2,}/
		},
		focus: function() {
			var pl = $(this).data("placeholder");
			if (this.value == pl)
				this.value = "";
		},
		blur: function() {
			var pl = $(this).data("placeholder");
			if (this.value.trim() == "")
				this.value = pl;
		},
		checkPattern: function() {
			var val = this.value.trim();
			var pl = $(this).data("placeholder");
			var name = this.name;
			var pattern = inputs.patterns[name];
			
			if (val == pl) {
				return false
			}

			if (pattern){
				var checked = pattern.test(val);
				return (!this.required && (val == "" || checked) || checked);
			}
			else {
				return true;
			}
		},
		requiredBlur: function() {
			var checked = inputs.checkPattern.call(this);
			var cls = checked ? "success" : "error";
			$(this).parent().removeClass("success error").addClass(cls);
		},
		requiredKeyUp: function() {
			if($(this).parent()[0].className.search("error") !== -1){
				inputs.requiredBlur.call(this);
			}
		},
		phonesHandle: function() {
			inputs.phones.mask("+7 (999) 999 99 99")
		},
		checkAllRequired: function(form) {
			var items = $(form).find("input[required]");
			$.each(items, function(index, item) {
				inputs.requiredBlur.call(item);
			});
		},
		listen: function() {
			this.items.on("focus", this.focus);
			this.items.on("blur", this.blur);
			this.required.on("blur", this.requiredBlur);
			this.required.on("keyup", this.requiredKeyUp);
			this.phonesHandle();

		}
	}

	var forms = {
		popup: $(".popup"),
		fon: $(".popup_fon"),
		showButtons: $(".show_popup"),
		hideButtons: $(".popup_cross, .popup_fon"),
		buttons: $("form .button"),
		handle: function() {
			var form = $(this).parents("form");
			inputs.checkAllRequired(form);
			var valid = forms.validate(form);
			if(valid){
				forms.send(form);
				forms.hide();
			}
		},
		send: function(form) {
			var data = $(form).serialize();
			$.ajax({
				type: "POST",
				url: "/mail.php",
				data: data,
				success: function(r) {
					console.log(r);
				}
			})
		},
		hide: function() {
			forms.popup.fadeOut();
			forms.fon.fadeOut();
		},
		show: function() {
			forms.popup.fadeIn();
			forms.fon.fadeIn();
		},
		validate: function(form) {
			var inputs = $(form).find("input");
			var valid = true;
			$.each(inputs, function(index, item) {
				var parent = $(item).parent()[0];
				if (parent.className.search("error") !== -1 || item.value.trim()==""){
					valid = false;
					return
				}
			});
			return valid;
		},
		listen: function() {
			this.buttons.on("click", this.handle);
			this.showButtons.on("click", this.show);
			this.hideButtons.on("click", this.hide);
		}
	}

	inputs.listen();
	forms.listen();


})()