$(function() {
	$('#form_sample').submit(function(e) {
		e.preventDefault();
		$('#error_address').addClass("hidden");
		$('#error_name').addClass("hidden");
		$('#error_postcode').addClass("hidden");
		$('#error_email').addClass("hidden");

		var message = {
			address: $('#address').val(),
			postcode: $('#postcode').val(),
			name: $('#name').val(),
			email: $('#email').val(),
			template: 'sample'
		}

		var postcode_regex = /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/gi;
		var postcode = message.postcode.match(postcode_regex);

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

		if (message.address && postcode && message.name && message.email) {

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
	})
})