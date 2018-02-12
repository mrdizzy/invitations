$(function() {
	$('select').change(function(id) {
		var delivery=		$('select[name="' + "delivery" + '"] option:selected').val()
		var size=		$('select[name="' + "size" + '"] option:selected').val()
		var frame=		$('select[name="' + "frame" + '"] option:selected').val()
		var monogram=		$('select[name="' + "monogram" + '"] option:selected').val()
		
		var total = 0;
		var item = ""
		
		if(size == "A4") {
			item = item + "A4 "
			total = total + 19.99
		} else {
			total = total + 14.99
			item = item + "A5 "
		}
		
		if(frame == "black") {
			item = item + "with black frame"
			total = total + 5
		} else if (frame == "white") {
			item = item + "with white frame"
			total = total + 5
		} else {
			item = item + "with no frame"
		}
		
		if(monogram == "yes_monogram") {
			item = item + ", custom monogram"
			total = total + 8
		}
		
		if(delivery == "express") {
			item = item + " and express delivery"
			total = total + 10
		} else{
			total = total + 2.95
			item = item + " and standard delivery"
		}
		
		total = total.toFixed(2)
		$('#paypal_item').val(item)
		$('#paypal_amount').val(total)
		
	})
})