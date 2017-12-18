$('#sample_slides').slidesjs({
	width:1300,
	height:916,
	navigation: { active: false },
	pagination: false,

        // Do something awesome!
        // Passes start slide number
      callback: {
      	loaded: function() {
      		$('#loading').hide()
      	}
      }
})
