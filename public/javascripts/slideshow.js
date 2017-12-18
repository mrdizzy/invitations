$('#slides_next').click(function(e) {
	e.preventDefault()
	$('#sample_slides .slidesjs-next').click()
})


$('#slides_previous').click(function(e) {
	e.preventDefault()
	$('#sample_slides .slidesjs-previous').click()
})

$("#sample_slides").slidesjs({
	width: 1500,
	height: 1057,
	navigation: {
		active: true,
		effect: "fade"
	},
	pagination: {
		active: false
	},
	effect: {
		fade: {
			speed: 500,
			crossfade: false
		}
	},
	play: {
		active: false,
		auto: true,
		interval: 3000,
		effect: "fade",
	},
	callback: {
		loaded: function() {
			$('#loading_slide').hide();
		},
		complete: function(number) {
			var cp = products[number - 1];
			$('#sample_name').html(cp.clean_name)
			$('#which_sample').val(cp.clean_name)
			$('#paypal_item').val(cp.clean_name)
		}
	}
})


$(function() {
	var sendSampleView = Backbone.View.extend({
		el: $('#form_sample'),
		events: {
			"click #get_sample": "sendForm",
		},
		sendForm: function(e) {
			e.preventDefault();
			$('.error').addClass("hidden");

			var message = {
				address: $('#address').val(),
				postcode: $('#postcode').val(),
				guests: $('#guests').val(),
				name: $('#name').val(),
				email: $('#email').val(),
				template: 'sample',
				page: $('#page').val(),
				sample: $('#which_sample').val()
			}

			var postcode_regex = /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/gi;
			if (message.postcode) {
				var postcode = message.postcode.match(postcode_regex);
			}

			if (!message.address) {
				$('#error_address').removeClass("hidden")
				$('#address').css("border-color", "#81BF08").css("border-width", "2px")
			}

			if (!message.postcode) {
				$('#error_postcode').removeClass("hidden")
				$('#postcode').css("border-color", "#81BF08").css("border-width", "2px")
			}

			if (!message.name) {
				$('#error_name').removeClass("hidden")
				$('#name').css("border-color", "#81BF08").css("border-width", "2px")
			}

			if (!message.email) {
				$('#error_email').removeClass("hidden")
				$('#email').css("border-color", "#81BF08").css("border-width", "2px")
			}

			if (!message.guests) {
				$('#error_guests').removeClass("hidden")
				$('#guests').css("border-color", "#81BF08").css("border-width", "2px")
			}

			if (message.address && postcode && message.name && message.email && message.guests) {
				$('#form_sample_spinner').show();
				$.ajax({
					type: "POST",
					url: "/emails",
					data: message,
					success: function(data) {
						$('#form_sample_spinner').hide();
						$('#post_text').hide();
						$('#form_check').show();
					}
				});
			}
		}
	})

	new sendSampleView();
})