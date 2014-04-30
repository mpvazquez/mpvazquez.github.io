$(document).ready(function() {
  var clearHeader = $('header').outerHeight();

  $(window).scroll(function() {
    if ( $(window).scrollTop() > clearHeader ) {
      $('nav').addClass('fixed').css('top','0').next()
      .css('padding-top','50px');   
    } else {
      $('nav').removeClass('fixed').next()
      .css('padding-top','0');
    }
  });

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      console.log(target)
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 20
        }, "slow");
        return false;
      }
    }
  });
});