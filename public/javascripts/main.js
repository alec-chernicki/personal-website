$(document).ready(function() {
  // Created variable so that offsetting based on navigation height will be more DRY
  var navHeight = $('#nav-trigger').innerHeight();

//// Initialize Masonry Containers
//  var $container = $('#isotope');
//  var masonry = new Masonry( $container, {
//    columnWidth: '.grid-sizer',
//    itemSelector: '.item'
//  });

  // Initialize auto-resize of textarea element
  window.jQuery.fn.autosize = function() {
    return autosize(this);
  };
  $('textarea').autosize();

  // Initializes smooth scrolling to all a tags
  $('a').smoothScroll({offset: -navHeight});

  //ScrollMagic for Navigation
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

  // Set up height so that it plays nice with nav bar
  //$('#developer').height($(window).height()-navHeight);


  // ScrollMagic for awesome browser effect
  var browserController = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 'onLeave'
    }
  });

  var wipeEffect = new TimelineMax()
    .add(TweenMax.to('#designer', 1, {transform: 'translateY(0)'}));

  new ScrollMagic.Scene({
    triggerElement: '#trigger-element',
    offset: navHeight,
    duration: $(window).height()
  })
    .setTween(wipeEffect)
    .setPin('section#developer')
    .addTo(browserController);
});

