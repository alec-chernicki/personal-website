$(document).ready(function() {

  var navHeight = $('#nav-trigger').innerHeight();

// Initialize Masonry Containers
  var $container = $('#isotope');
  var masonry = new Masonry( $container, {
    columnWidth: '.grid-sizer',
    itemSelector: '.item'
  });

// Initialize auto-resize of textarea element
  window.jQuery.fn.autosize = function() {
    return autosize(this);
  };
  $('textarea').autosize();

// Initializes smooth scrolling to all a tags
  $('a').smoothScroll({offset: -navHeight});


//// Initialize ScrollMagic
  var controller = new ScrollMagic.Controller();

  new ScrollMagic.Scene({
    triggerElement: '#nav-trigger',
    triggerHook: 0,
    offset: 0,
    reverse: true
  })
    .setPin('#nav-element')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '#about',
    offset: -navHeight,
    triggerHook: 0,
    duration: $('#about').height() +
    $('.developer').height() +
    $('.designer').height(), reverse: true
  })
    .setClassToggle('.about-link', 'highlight')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '#work',
    offset: -navHeight,
    triggerHook: 0,
    duration: $('#work').innerHeight() + $('#portfolio').innerHeight() - $('#contact').height() + navHeight,
    reverse: true
  })
    .setClassToggle('.work-link', 'highlight')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '#contact',
    offset: -navHeight,
    triggerHook: 1,
    duration: $('#contact').height() + $('.footer').height(),
    reverse: true
  })
    .setClassToggle('.contact-link', 'highlight')
    .addTo(controller);


  var tween = new TimelineLite({
    triggerHook: 'onLeave'
  })
    .to('.designer', 1, {transform: 'translateY(0)'});

  new ScrollMagic.Scene({
    triggerElement: '.developer'
  })
    .setTween(tween)
    .setPin('.developer')
    .addTo(controller);


  var developerScene = new ScrollMagic.Scene({
    triggerElement: '#browser-developer-trigger',
    duration: 1000,
    triggerHook: 0.15,
    reverse: true
  })
    .setPin('#browser-developer-element');

  var designerScene = new ScrollMagic.Scene({
    triggerElement: '#browser-designer-trigger',
    triggerHook: 0,
    reverse: true
  })
    .setPin('.browser-designer-element');


  console.log('FINISHED');


});
