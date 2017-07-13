$(document).ready(function() {
  var $nav = $('nav');
  var $window = $(window);

  function setDynamicAnchors() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 20
        }, 'slow');
        return false;
      }
    }
  }

  function setStickyHeader() {
    function removeFixedClass() {
      $nav.removeClass('fixed').next()
        .css('padding-top','0');
    }

    if($window.width() > 600) {
      var headerHeight = $('header').outerHeight();

      $window.scroll(function() {
        if ( $window.scrollTop() > headerHeight ) {
          $nav.addClass('fixed')
            .css('top','0').next()
            .css('padding-top','50px');  
        } else {
          removeFixedClass();
        }
      });
    } else {
      $window.off('scroll');
      removeFixedClass();
    }
  }

  setStickyHeader();

  $window.resize(function() {
    setStickyHeader();
  });

  $('a[href*=#]:not([href=#])').click(setDynamicAnchors);
});
