$(function() {
	$("#slides").slidesjs({
		width: 2000,
		height: 1409,
		effect: {
			fade: {
				speed: 600, // [number] Speed in milliseconds of the fade animation.
				crossfade: true // [boolean] Cross-fade the transition.
			}
		},
		pagination: {
			active: false
		},
		navigation: {
			active: false,
			effect: "fade"
		},
		play: {
			active: true, // shows the play/pause buttons, we hide these but we need them on the page so that the cloudzoom callback functions can stop and start the slideshow when zooming in/out
			auto: true,
			interval: 2500,
			restartDelay: 2500,
			pauseOnHover: true
		},
		callback: {
			loaded: function(n) {
				CloudZoom.quickStart();
			}
		}
	})
	var slidesTimeout;
	$('#slides img').bind('cloudzoom_start_zoom', function() {
		clearTimeout(slidesTimeout)
		$('.slidesjs-stop').click();
	})
	$('#slides img').bind('cloudzoom_end_zoom', function() {
		slidesTimeout = setTimeout(function() {

			$('.slidesjs-play').click();

		}, 2500)
	});

	// Javascript for playing responsive video
	var videoView = Backbone.View.extend({
		ismob: function() {
			if ($('body').width() < 1200) {
				return "mob"
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
				}
				else if (!that.$video.is(":in-viewport") && !that.dom_video.paused) {
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
			if (this.ismob()) {
				var resolution = "low"
			}
			var video = this.$('video')
			video.attr("src", video.attr("src") + resolution + ".mp4")

			video.after('<div class="width_50 mob_width_90 centred"><img src="/images/furniture/play.svg" class="video_play padding_top_small right centred w50px" /><img src="/images/furniture/pause.svg" class="hidden w50px video_pause right padding_top_small"/></div>')
			return this
		}
	})
	$('.video').each(function() {
		var vv = new videoView({ el: this })
	})
})