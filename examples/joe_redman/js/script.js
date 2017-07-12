$(document).ready(function() {
  // carousel item constructor function and render prototype
  var CarouselItem = function(imageName, imageIndex){
    this.imageName = imageName;
    this.imageIndex = imageIndex;
    this.el = $("<li>").addClass("back-position");
  }
  CarouselItem.prototype.render = function(){
    $("<img>").attr("src", "images/thumbnails/" + this.imageName)
      .attr("id", imagesList['full-size-images'][this.imageIndex])
      .addClass(imagesList['image-layouts'][this.imageIndex])
      .appendTo(this.el);
    this.el.append($("<p>").html(imagesList['image-descriptions'][this.imageIndex]));

    $('#photo-carousel').append(this.el);
    carousel.items.push(this);
    return this;
  }

  // collection of photos, image element models to render
  // as an image carousel that can expand/shrink
  var CarouselContainer = function(){
    this.items = [];
    this.startPosition = 1;
  }
  // renders photo collection carousel on page
  CarouselContainer.prototype.render = function() {
    for(var i = 0; i < this.count(); i++) {
      if(i === this.prevPhotoPosition()) {
        $(this.items[i].el).removeClass()
          .addClass("left-position");
      } else if (i === this.startPosition) {
        $(this.items[i].el).removeClass()
          .addClass("center-position");
      } else if (i === this.nextPhotoPosition()) {
        $(this.items[i].el).removeClass()
          .addClass("right-position");
      }
    }
    this.addEventHandlers();
    return this;
  }
  // returns total count of photo models in collection
  CarouselContainer.prototype.count = function() {
    return this.items.length;
  }
  // returns value of next photo in collection
  CarouselContainer.prototype.nextPhotoPosition = function() {
    if(this.startPosition === this.count() - 1) {
      return 0;
    }

    return this.startPosition + 1;
  }
  // returns value of previous photo in collection
  CarouselContainer.prototype.prevPhotoPosition = function() {
    if(this.startPosition === 0) {
      return this.count() - 1;
    }
    
    return this.startPosition - 1;
  }
  // lets user select next photo in collection 
  CarouselContainer.prototype.moveForward = function() {
    //removes event handlers that were attached in current position
    this.removeEventHandlers();

    if(this.count() - 1 === this.startPosition) {
      $(this.items[this.count() - 2].el).removeClass()
        .addClass("back-position");
      this.startPosition = 0;
    } else {  
      $(this.items[this.prevPhotoPosition()].el).removeClass()
        .addClass("back-position");
      this.startPosition++;
    }
    this.render();
    return this;
  }
  // lets user select previous photo oin collection
  CarouselContainer.prototype.moveBackward = function() {
    this.removeEventHandlers();

    if(this.startPosition === 0) {
      $(this.items[this.nextPhotoPosition()].el).removeClass()
        .addClass("back-position");
      this.startPosition = this.count() - 1;
    } else {  
      $(this.items[this.nextPhotoPosition()].el).removeClass()
        .addClass("back-position");
      this.startPosition--;
    }
    this.render();
    return this;
  }
  // adds event listeners so user can move carousel forward
  CarouselContainer.prototype.addEventHandlers = function() {
    $(".center-position").on("click", function() {
      if($(window).width() < 800) {
        carousel.moveForward();
      } else {
        window.open("images/" + $(this).find("img").attr("id"), "_blank");
      }
    });

    if($(window).width() < 800) {
      var description = $('#carousel .center-position p');
      $(description).css("display", "none");
      $("#carousel #carousel-item-description").empty()
        .append($("<p>").append($(description).html()))
        .append("<strong>Hi-Res Download</strong>")
        .on("click", function() {
          window.open("images/" + $('#carousel .center-position').find("img").attr("id"), "_blank");
        });
    }

    $(".left-position").on("click", function() {
      carousel.moveBackward();
    });
    $(".right-position").on("click", function() {
      carousel.moveForward();
    });
  }
  // removes event handlers -- called after an event is evoked
  CarouselContainer.prototype.removeEventHandlers = function() {
    $("#carousel #carousel-item-description").off("click");
    $(".center-position").off("click");
    $(".right-position").off("click");
    $(".left-position").off("click");
  }
  CarouselContainer.prototype.setPermanentHandlers = function() {
    $("#arrow-left").on("click", function() {
      carousel.moveBackward();
    });
    $("#arrow-right").on("click", function() {
      carousel.moveForward();
    });

    $("body").on("keydown", function(event) {
      if(event.keyCode === 39) {
        carousel.moveForward();
      } else if (event.keyCode === 37) {
        carousel.moveBackward();
      }
    });
  }
  // new photo collection / start carousel
  var carousel = new CarouselContainer();


  var $nav = $('nav');
  var $window = $(window);
  var $scrolled = $window.scrollTop();
  var $latestNews = $('.latest-news');
  var $clearViewport = $window.outerHeight();

  $latestNews.hide();
  $(".credits").hide();
  $nav.addClass("fixed-bottom").next();

  setTimeout(function() {
    $(".headline").fadeOut(3500, function() {
      $(".headline").addClass("joe-redman")
        .removeClass("headline");
      if ($(window).width() > 800) {
        $(".joe-redman").fadeIn(1000);
      }
    });
    $latestNews.fadeIn(5000);
  }, 500);

  $window.scroll(function() {
    if ( $window.scrollTop() <= 0) {
      $nav.removeClass('fixed-top').next()
        .css("padding-top", "0");
      $nav.addClass('fixed-bottom').next();
    } else if ($window.scrollTop() < $clearViewport) {
      $nav.removeClass().next()
        .css("padding-top", "0");;
    } else {
      $nav.addClass('fixed-top').next()
        .css("padding-top", "40px");
    }
    if(($nav.hasClass("fixed-bottom") && $('nav.fixed-bottom').css("width")) || ($nav.hasClass("fixed-top") && $('nav.fixed-top').css("width"))) {
      $('nav.fixed-bottom, nav.fixed-top').css("width", "100%");
    }
  });

  $window.resize(function() {
    if($window.width() < 800) {
      $(".joe-redman").css("display", "none");
      return;
    }
    $(".joe-redman").css("display", "block");
  });

  $.each(imagesList['image-thumbnails'], function(i, image) {
    var imageIndex = i;
    new CarouselItem(image, imageIndex).render();
  });

  carousel.render().setPermanentHandlers();

  //display credits section on web page
  $("#credits a, .slider-menu a").on("click", function() {
    if($(".credits").css("display") === "block") {
      $(".credits").hide();
    } else {
      $(".credits").css("display", "block");
    }
  })

  $('a[href*=#]:not([href=#])').on("click", function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 50
        }, "slow");
        return false;
      }
    }
  });

  $('#hamburger').on("click", function(e) {
    e.stopPropagation();
    if($('.page-wrapper').css("position") !== "absolute") {
      $('.page-wrapper')
        .css("width", $('.page-wrapper').width())
        .css("position", "absolute");

      $('section.content-layer').css("display", "block");

      $('.page-wrapper')
        .animate({"right": "30%"}, 
        "slow", "swing");
    }
  });

  $("body, .slider-menu a").on("click", function() {
    if($('.page-wrapper').css("position") === "absolute") {
      $('.page-wrapper').animate({"right": 0}, 
        "slow", 'swing').promise().done(function() {
        $(".page-wrapper")
          .css("width", "auto")
          .css("position", "inherit");
        $("section.content-layer").css("display", "none");
      });
    }
  });

  if($window.width() > parseInt($('.hero').css("background-size"))) {
    $('.hero, .contact-hero').css("background-size", $window.width() + "px auto");
  }
  if($window.height() > $('.hero').height()) {
    $('.hero, .contact-hero').css("height", $window.height() + "px");
  }
});