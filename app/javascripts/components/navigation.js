import debounce from '../utils/debounce'

var $hamburger = $('.js-navbar-hamburger');

function toggleMobileMenu () {
  if($(window).width() < 768) {
    $hamburger.toggleClass('active');
    $('.js-mobile-links').stop().fadeToggle(300, 'linear');
  }
};

var debouncedEvents = debounce(function () {
  $('.js-mobile-links').one().stop().fadeOut();
  $hamburger.removeClass('active');
}, 60);

function bindEvents () {
  $('.js-navbar-hamburger, .js-mobile-links a').click(toggleMobileMenu);
  $(window).on('resize', debouncedEvents);
}

function init () {
  bindEvents();
}

export default init;
