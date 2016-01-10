import debounce from '../utils/debounce'

var $hamburger = $('.js-navbar-hamburger');

function toggleMobileMenu () {
  if($(window).width() < 768) {
    $hamburger.toggleClass('active');
    $('.js-mobile-links').stop().fadeToggle(300, 'linear');
  }
};

var debouncedEvents = debounce(function () {
  $hamburger.removeClass('active');
  $('.js-mobile-links').stop().fadeOut();
}, 60);

function bindEvents () {
  $('.js-navbar-hamburger, .js-mobile-links a').click(toggleMobileMenu);
  $(window).on('resize', debouncedEvents);
}

function init () {
  bindEvents();
}

export default init;
