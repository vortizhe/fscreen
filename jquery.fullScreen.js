var fScreen = {

  // Config data
  data: {
    fs_API: false,
    is_full_screen: false,
    $el: null
  },

  // Methods
  detectSupport : function () {
    var d = document;
    if (
    	d.fullscreenEnabled ||
    	d.webkitFullscreenEnabled ||
    	d.mozFullScreenEnabled ||
    	d.msFullscreenEnabled
    ) {
      this.data.fs_API = true;
      // this.data.fs_API = false; // debug
    }
  },

  toggle : function ( $el ) {
    if (this.data.is_full_screen) {
      this.exit();
    } else {
      this.element( $el );
    }
  },

  // Opens an element in fullScreen API
  element: function ( $el ) {
    // Launch only there is not another element on full screen

    if (!this.data.is_full_screen) {
      if (!$el instanceof jQuery) $el = $($el);
      this.data.$el = $el;

      // Is fullscreen API supportted?
      if (this.data.fs_API) {
        var el = this.data.$el[0];
        if (el.requestFullscreen) {
        	el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
        	el.webkitRequestFullscreen();
        } else if (el.mozRequestFullScreen) {
        	el.mozRequestFullScreen();
        } else if (el.msRequestFullscreen) {
        	el.msRequestFullscreen();
        }
      } else {
        // Launch fancybox fallback
        this.fallBack( this.data.$el );
      }
      this.data.is_full_screen = true;
    }
  },

  // Exit fullscreen mode / close fnacybox
  exit: function() {
    if (this.data.is_full_screen) {
      if (this.data.fs_API) {
        var d = document;
        if (d.exitFullscreen) {
        	d.exitFullscreen();
        } else if (d.webkitExitFullscreen) {
        	d.webkitExitFullscreen();
        } else if (d.mozCancelFullScreen) {
        	d.mozCancelFullScreen();
        } else if (d.msExitFullscreen) {
        	d.msExitFullscreen();
        }
      } else {
        this.exitFallBack();
      }
      this.data.is_full_screen = false;
      this.data.$el = null;
    }
  },

  // What to do when fullScreen API not available
  // We use fancyBox ;)
  fallBack: function( $el ) {
    // Sample callback
    // $.fancybox({
    //   'scrolling': 'no',
    //   'content': $el.clone()
    // });
  },

  // Custom exit for fallback
  // Override from outside
  exitFallBack: function () {
    // Nothing here
  }

};

// Detect on definition
fScreen.detectSupport();
