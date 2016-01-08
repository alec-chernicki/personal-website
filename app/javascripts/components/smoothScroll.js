// Smooth Scrolling to all 'a' tags
// ----------------------------------------------------------------------
var $root = $('html, body');
var navHeight = $('.nav-trigger').outerHeight();

var bindEvents = function () {
  $('.about-link, .resume-link, .contact-link, .js-get-started, .js-brand-name, .hero-arrow').click(function() {
    var href = $.attr(this, 'href');

    $root.stop().animate({
      scrollTop: $(href).offset().top - navHeight
    }, 1500);

    return false;
  });

  $('html, body').bind('scroll mousedown DOMMouseScroll mousewheel keyup touchstart', function(e) {
    if (e.which > 0 || e.type === 'mousedown' || e.type === 'mousewheel' || e.type === 'touchstart') {
      $root.stop();
    }
  });
};

var init = function () {
  bindEvents();
};

module.exports = init;
