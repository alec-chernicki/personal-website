$(window).load(function() {
  $('#pre-load').fadeOut();
});


$(document).ready(function() {
  // Created variable so that offsetting based on navigation height will be more DRY
  var navHeight = $('.nav-trigger').innerHeight();

//// Initialize Masonry Containers
//  var $container = $('#isotope');
//  var masonry = new Masonry( $container, {
//    columnWidth: '.grid-sizer',
//    itemSelector: '.item'
//  });

  // Dynamic resize of textarea based on content
  // ----------------------------------------------
  window.jQuery.fn.autosize = function() {
    return autosize(this);
  };
  $('textarea').autosize();

  // Smooth Scrolling to all 'a' tags
  // ----------------------------------------------
  $('a').smoothScroll({offset: -navHeight});

  // ScrollMagic - Navigation
  // ----------------------------------------------
  var navigationController = new ScrollMagic.Controller();

  // Set navbar to visible right above the about section
  var navigationScene = new ScrollMagic.Scene({
    triggerElement: '#about',
    triggerHook: 0,
    offset: -navHeight,
    reverse: true
  })
    .setClassToggle('.nav-trigger', 'visible')
    .addTo(navigationController);

  // Set scroll to "About Me" options
  new ScrollMagic.Scene({
    triggerElement: '#about',
    offset: -(navHeight+1),
    triggerHook: 0,
    duration: $('#about').height() +
    $('#developer').height() +
    $('#designer').height(),
    reverse: true
  })
    .setClassToggle('.about-link', 'highlight')
    .addTo(navigationController);

  // Set scroll to "My Work" options
  new ScrollMagic.Scene({
    triggerElement: '#work',
    offset: -(navHeight+1),
    triggerHook: 0,
    duration: $('#work').height() +
    $('#portfolio').height() -
    $('#contact').height() +
    navHeight,
    reverse: true
  })
    .setClassToggle('.work-link', 'highlight')
    .addTo(navigationController);

  // Set scroll to "Contact Me" options
  new ScrollMagic.Scene({
    triggerElement: '#contact',
    offset: -(navHeight+1),
    triggerHook: 0.5,
    duration: $('#contact').height() + $('.footer').height(),
    reverse: true
  })
    .setClassToggle('.contact-link', 'highlight')
    .addTo(navigationController);


  // ScrollMagic - Skillset wipe effect
  // ----------------------------------------------

  // Scene that controls the developer browser effect
  var browserDeveloperController = new ScrollMagic.Controller();

  var developerTweenTimeline = new TimelineMax()
    .add(TweenMax.to('.browser-developer-container', 1, {height: '0', ease:Linear.easeNone}));

  new ScrollMagic.Scene({
    triggerElement: '#browser-developer-trigger',
    // Sets speed of wipe dynamically based on browser height
    duration: $('#browser-developer-trigger').height(),
    offset: -(navHeight * 2),
    triggerHook: 'onLeave'
  })
    .setTween(developerTweenTimeline)
    .addIndicators()
    .addTo(browserDeveloperController);

  // Scene that controls the designer browser effect
  var browserDesignerController = new ScrollMagic.Controller();

  var designerTweenTimeline = new TimelineMax()
    .add(TweenMax.to('.browser-designer-container', 1, {height: 670, ease:Linear.easeNone}));

  new ScrollMagic.Scene({
    triggerElement: '#designer',
    // Sets speed of wipe dynamically based on browser height
    duration: $('.browser-developer-container').height(),
    offset: (navHeight),
    triggerHook: 'onEnter'
  })
    .setTween(designerTweenTimeline)
    .addIndicators()
    .addTo(browserDesignerController);


  // ScrollMagic - Writing Effect - Developer
  // ----------------------------------------------

  //function pathPrepare ($el) {
  //  var lineLength = $el[0].getTotalLength();
  //  $el.css("stroke-dasharray", lineLength);
  //  $el.css("stroke-dashoffset", lineLength);
  //}
  //
  //var $developerWriting = $('path#developer-writing');
  //var $developerDot = $('path#developer-dot');
  //var $designerWriting = $('path#designer-writing');
  //
  //// prepare SVG
  //pathPrepare($developerWriting);
  //pathPrepare($developerDot);
  //pathPrepare($designerWriting);
  //
  //// init controller
  //var writingController = new ScrollMagic.Controller();
  //
  //// build tween
  //var writingTween = new TimelineMax()
  //  .add(TweenMax.to($developerWriting, 1, {strokeDashoffset: 0, ease:Linear.easeNone}));
  //
  //// build scene
  //var writingEffectScene = new ScrollMagic.Scene({
  //  triggerElement: "#pin",
  //  tweenChanges: true
  //})
  //  .setTween(writingTween)
  //  .addTo(writingController);
  //
  //$(window).resize(function() {
  //  navigationScene.update();
  //});
});

