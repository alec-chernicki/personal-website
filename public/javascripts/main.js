$(document).ready(function() {
  // Created variable so that offsetting based on navigation height will be more DRY
  var navHeight = $('#nav-trigger').innerHeight();

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
  var controller = new ScrollMagic.Controller();
  var navigationScene = new ScrollMagic.Scene({
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


  // ScrollMagic - Skillset wipe effect
  // ----------------------------------------------
  var browserController = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 'onLeave'
    }
  });

  var wipeEffect = new TimelineMax()
    .add(TweenMax.to('#designer', 1, {transform: 'translateY(0)'}));

  var wipeEffectScene = new ScrollMagic.Scene({
    triggerElement: '#developer',
    // Offsets the trigger to fire at end of element
    offset: ($('#developer').height() - $(window).height()),
    // Sets speed of wipe dynamically based on browser height
    duration: $(window).height()
  })
    .setTween(wipeEffect)
    .setPin('section#developer')
    .addTo(browserController);

  // ScrollMagic - Writing Effect - Developer
  // ----------------------------------------------

  function pathPrepare ($el) {
    var lineLength = $el[0].getTotalLength();
    $el.css("stroke-dasharray", lineLength);
    $el.css("stroke-dashoffset", lineLength);
  }

  var $developerWriting = $('path#developer-writing');
  var $developerDot = $('path#developer-dot');
  var $designerWriting = $('path#designer-writing');

  // prepare SVG
  pathPrepare($developerWriting);
  pathPrepare($developerDot);
  pathPrepare($designerWriting);

  // init controller
  var writingController = new ScrollMagic.Controller();

  // build tween
  var writingTween = new TimelineMax()
    .add(TweenMax.to($developerWriting, 1, {strokeDashoffset: 0, ease:Linear.easeNone}));

  // build scene
  var writingEffectScene = new ScrollMagic.Scene({
    triggerElement: "#developer",
    duration: 200,
    tweenChanges: true
  })
    .setTween(writingTween)
    .addTo(writingController);

  $(window).resize(function() {
    navigationScene.update();
  });
});

