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
});