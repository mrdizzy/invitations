$(function() {		var videoView = Backbone.View.extend({
			isMobile: function() {
				if($('body').width() < 1200) {
					return "mobile"
				}
			},
			initialize: function() {

				var that = this;

				this.render();
				this.$video = this.$('video');
				this.dom_video = this.$('video')[0];

				this.$video.on("playing", function(e) {
        			 that.$el.trigger('playing');
				})
				this.$video.on("pause", function(e) {
        			 that.$el.trigger('pause');
				})

				$(window).scroll(function() {
			    	if (that.$video.is(":in-viewport") && that.dom_video.paused) {
						that.dom_video.play();
			    } else if (!that.$video.is(":in-viewport") && !that.dom_video.paused) {
			    	that.dom_video.pause();
			    }
			})

			},
			events: {
				"click .video_play": "playVideo",
				"click .video_pause": "pauseVideo",
				"playing": "hidePlay",
				"pause": "hidePause"
			},
			playVideo: function() {
				this.dom_video.play();
			},
			pauseVideo: function() {
				this.dom_video.pause();
			},
			hidePlay: function() {
				this.$('.video_play').hide();
				this.$('.video_pause').show();
			},
			hidePause: function() {
				this.$('.video_pause').hide();
				this.$('.video_play').show();
			},
			render: function() {
				var resolution = "high"
				if(this.isMobile()) {
					var resolution = "low"
				}
				var video = this.$('video')
				video.attr("src", video.attr("src") + resolution + ".mp4")

				video.after('<div class="width_50 mobile_width_90 centred"><img src="/images/furniture/play.svg" class="video_play hover_opacity padding_top_small right centred w50px" /><img src="/images/furniture/pause.svg" style="display:none;" class="w50px video_pause hover_opacity right padding_top_small"/></div>')
				return this
			}
		})
		var MainView = Backbone.View.extend({
			el: $('body'),
			initialize: function() {
				this.render();
			},
			render: function() {
				$('.video').each(function() {
				 var	vv = new videoView({el:this})
			    })
			}
		})

		new MainView();
		
	
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