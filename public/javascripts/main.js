$(document).ready(function() {
  var navHeight = $('#nav-trigger').innerHeight();

// Initialize Isotope
  var $isotopeContainer = $('#isotope');
  $isotopeContainer.isotope({
    // options
    itemSelector: '.item',
    layoutMode: 'fitRows'
  });

// Initialize auto-resize of textarea element
  window.jQuery.fn.autosize = function() {
    return autosize(this);
  };
  $('.message').autosize();

// Initializes smooth scrolling to all a tags
  $('a').smoothScroll({offset: -navHeight});

// Initialize ScrollMagic
  var controller = new ScrollMagic.Controller();

  var navigationScene = new ScrollMagic.Scene({
    triggerElement: '#nav-trigger',
    triggerHook: 0,
    reverse: true
  })
    .setPin('#nav-element');

  var navigationAboutScene = new ScrollMagic.Scene({
    triggerElement: '#about',
    offset: -navHeight,
    triggerHook: 0,
    duration: $('#about').innerHeight() +
    $('.developer').innerHeight() +
    $('.designer').innerHeight(), reverse: true
  })
    .setClassToggle('.about-link', 'highlight');

  var navigationWorkScene = new ScrollMagic.Scene({
    triggerElement: '#work',
    offset: -navHeight,
    triggerHook: 0,
    duration: $('#work').innerHeight() + $('#portfolio').innerHeight() + navHeight,
    reverse: true
  })
    .setClassToggle('.work-link', 'highlight');

  var navigationContactScene = new ScrollMagic.Scene({
    triggerElement: '.recommendations',
    offset: -navHeight,
    triggerHook: 0,
    duration: $('.recommendations').innerHeight() + $('.contact').innerHeight + $('footer').innerHeight(),
    reverse: true
  })
    .setClassToggle('.contact-link', 'highlight');

  var developerScene = new ScrollMagic.Scene({
    triggerElement: '#browser-developer-trigger',
    triggerHook: 0,
    reverse: true
  })
    .setPin('#browser-developer-element');

  var designerScene = new ScrollMagic.Scene({
    triggerElement: '#browser-designer-trigger',
    triggerHook: 0,
    reverse: true
  })
    .setPin('#browser-designer-element');

  controller.addScene([
    navigationScene,

    navigationAboutScene,
    navigationWorkScene,
    navigationContactScene,

    developerScene,
    designerScene
  ]);

  console.log('FINISHED');
});
