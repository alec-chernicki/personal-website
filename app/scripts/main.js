'use strict';

// Initialize commonly used variables
// ----------------------------------------------------------------------
var $windowWidth = $(window).width();

var $navHeight = $('.nav-trigger').height();
var $aboutHeight = $('#about').height();
var $developerHeight = $('#developer').height();
var $designerHeight = $('#designer').height();
var $resumeHeight = $('#resume').height();
var $portfolioHeight = $('#portfolio').height();
var $contactHeight = $('#contact').height();

var $designerElementHeight = $('#browser-designer-element').height();
var $resumeElementHeight = $('#resume-element').height();
var $envelopeTopHeight = $('#envelope-top').height();

var $resumeTriggerHeight =  $('#envelope-top').height() * 1.25;

var resumeTriggerOffset = $envelopeTopHeight - $resumeElementHeight + ($resumeElementHeight / 10);


// AJAX Contact Form Submission Handler
// ----------------------------------------------------------------------
$('#contact-form').submit(function(event){

  $('.submit-button').text(' SENDING');
  $('.submit-button i').removeClass('fa-paper-plane').addClass('fa-cog').addClass('fa-spin');

  event.preventDefault();
  var postData = $(this).serializeArray();

  $.ajax({
    url: '/',
    type: 'POST',
    datatype: 'JSON',
    data: postData,
    success: function() {
      $('.submit-button').text(' SENT!');
      $('.submit-button i').removeClass('fa-cog').addClass('fa-check');
      document.getElementById('contact-form').reset();
    },
    error: function() {
      $('.submit-button').text(' ERROR SENDING');
      $('.submit-button i').removeClass('fa-cog').addClass('fa-times');
      document.getElementById('contact-form').reset();
    }
  });
});

// AJAX Resume Download Handler
// ----------------------------------------------------------------------
$('.resume-button-download').click(function() {
  $.ajax({
    url: '/resume',
    type: 'GET'
  });
});

// GSAP - Moves linear gradient behind developer-overlay (translate3D - hardware accelerated)
// ----------------------------------------------------------------------
TweenMax.to('.developer-gradient', 10, {x: $windowWidth + 600, repeat: -1, yoyo: true, ease:Linear.easeNone});

// GSAP - Animate opacity on download or linkedin button hover (opacity - hardware accelerated)
// ----------------------------------------------------------------------
$('.resume-button-download').hover(
  function() {
    TweenLite.to('.resume-gradient', 0.25, {opacity: 1, y: 0, ease: Linear.easeNone});
  },
  function() {
    TweenLite.to('.resume-gradient', 0.25, {opacity: 0, y: 0, ease: Linear.easeNone});
  }
);

$('.resume-button-linkedin').hover(
  function() {
    TweenLite.to('.resume-gradient', 0.25, {opacity: 1, y: 0, ease: Linear.easeNone});
  },
  function() {
    TweenLite.to('.resume-gradient', 0.25, {opacity: 0, y: 0, ease: Linear.easeNone});
  }
);

// Makes all the fun js effects completely responsive, YAY FUTUREZ!
// ----------------------------------------------------------------------
var positionElements = function(callback) {
  $envelopeTopHeight = $('#envelope-top').height();
  $resumeElementHeight = $('#resume-element').height();

  // Position resume-download wrapper
  var $wrapperPosition = $envelopeTopHeight / 2 - $('#resume-download-wrapper').height() / 2;
  $('#resume-download-wrapper').css('bottom', $wrapperPosition);

  // Position envelope-bottom
  var $bottomPosition = $envelopeTopHeight - $('#envelope-bottom').height() / 3.5;
  $('#envelope-bottom').css('bottom', $bottomPosition);

  // Resize resume-trigger based on current height of the envelope
  $resumeTriggerHeight = $envelopeTopHeight *  1.25;
  $('.resume-trigger').css('height', $resumeTriggerHeight);

  // Position the resume-trigger margin based on the envelope-bottom height
  resumeTriggerOffset = $envelopeTopHeight - $resumeElementHeight + ($resumeElementHeight / 10);
  $('.resume-trigger').css('margin-bottom', resumeTriggerOffset);

  if (typeof callback === 'function') {
    callback();
  }
};

// Tests against width since iOS safari is evil and calls onOrientationChange
// ----------------------------------------------------------------------
$(window).resize(function () {
  if ($(window).width() != $windowWidth) {
    positionElements();
    responsiveParallax();
  }
});


var responsiveParallax = function() {
  if ($(window).width() <= 768) {
    developerHeaderScene.remove(true);
    designerHeaderScene.remove(true);
    resumeHeaderScene.remove(true);
    resumeHeaderScene.progress(0.5);
    designerHeaderScene.progress(0.5);
    developerHeaderScene.progress(0.5);
  }
  else {
    developerHeaderScene.addTo(headerController);
    designerHeaderScene.addTo(headerController);
    resumeHeaderScene.addTo(headerController);
  }
};

// Smooth Scrolling to all 'a' tags
// ----------------------------------------------------------------------
$('a').smoothScroll({offset: -$navHeight});

// Dynamic resize of textarea based on content
// ----------------------------------------------------------------------
window.jQuery.fn.autosize = function() {
  return autosize(this);
};

$('textarea').autosize();

// Fancy responsive portfolio panel
// ----------------------------------------------------------------------

// Returns an array of items in the portfolio section
var $itemArray = $('.panel-group').children('.portfolio-item');

// Returns the correct row to append panel to
var appendItem = function(portfolioItemButton, panel) {

  // Stores the closest portfolio item object
  var $portfolioItem = portfolioItemButton.closest('.portfolio-item');

  // Calculates number of items in row by dividing window width by width of item
  var itemsInRow = Math.round($(window).width() / $($portfolioItem).width());

  // Finds the row by dividing the index of the item by the number of items in a row and rounding up
  var rowOfItem = Math.ceil(($($itemArray).index($portfolioItem) + 1) / itemsInRow);

  // Find the project correct item to append to within the item array and append the panel
  $($itemArray[itemsInRow * rowOfItem - 1]).append().after(panel);
};

// Checks if there are any open panels, if so returns ID, if not returns false
var isPanelOpen = function() {
  if ($('.panel-group').children('.open').length > 0) {
    return $('.panel-group').children('.open')
  }
  else {
    return false
  }
};

// Bind function to button click
$('.portfolio-item a').click(function() {
  // Returns panel that corresponds to the buttons data-target
  var $panel = $('.panel-group').children($(this).attr('data-target'));

  // IF: Button clicked corresponds to a panel and no panels are already open, open panel
  if (isPanelOpen() === false) {
    appendItem(this, $panel);
    $($panel).addClass('open').slideToggle(300);
  }

  // ELSE IF: Button clicked corresponds to a panel that is already open
  else if ($(isPanelOpen()).attr('id') === $($panel).attr('id')) {
    $($panel).removeClass('open').slideToggle(300);
  }

  // ELSE IF: Button clicked corresponds to a different panel and a panel is open
  else if (isPanelOpen() && $(isPanelOpen()).attr('id') !== $($panel).attr('id')) {
    appendItem(this, $panel);
    $(isPanelOpen()).removeClass('open').slideToggle(300, function() {
      $($panel).addClass('open').slideToggle(300)
    })
  }
});

// Close all open or collapsing panels on resize of window
$(window).on('resize', function () {
  $(isPanelOpen()).removeClass('open').slideToggle(300);
});

// Bind x-button to closing the open panel
$('.x-button').click(function () {
  $(isPanelOpen()).removeClass('open').slideToggle(300);
});

// ScrollMagic - Navigation
// ----------------------------------------------------------------------
var navigationController = new ScrollMagic.Controller();

// Set navbar to appear above about section
new ScrollMagic.Scene({
  triggerElement: '#about',
  triggerHook: 0,
  offset: -$navHeight,
  reverse: true
})
  .setClassToggle('.nav-trigger', 'show')
  .addTo(navigationController);

// Set scroll to "About" options
new ScrollMagic.Scene({
  triggerElement: '#about',
  offset: -($navHeight+1),
  triggerHook: 0,
  duration: $aboutHeight + $developerHeight + $designerHeight,
  reverse: true
})
  .setClassToggle('.about-link', 'highlight')
  .addTo(navigationController);

// Set scroll to "Resumé" options
new ScrollMagic.Scene({
  triggerElement: '#resume-header',
  offset: -($navHeight+1),
  triggerHook: 0,
  duration: $resumeHeight,
  reverse: true
})
  .setClassToggle('.resume-link', 'highlight')
  .addTo(navigationController);

// Set scroll to "Portfolio" options
new ScrollMagic.Scene({
  triggerElement: '#portfolio',
  offset: -($navHeight+1),
  triggerHook: 0,
  duration: $portfolioHeight,
  reverse: true
})
  .setClassToggle('.work-link', 'highlight')
  .addTo(navigationController);

// Set scroll to "Contact Me" options
new ScrollMagic.Scene({
  triggerElement: '#contact',
  offset: -($navHeight+1),
  triggerHook: 0,
  duration: $contactHeight,
  reverse: true
})
  .setClassToggle('.contact-link', 'highlight')
  .addTo(navigationController);

// ScrollMagic - Parallax Section Headers
// ----------------------------------------------------------------------

var headerController = new ScrollMagic.Controller();

var developerHeaderTweenTimeline = new TimelineMax()
  .add(TweenMax.fromTo('#about .section-header-container', 1, {y: 55}, {y: -55, ease: Linear.easeNone}));

var developerHeaderScene = new ScrollMagic.Scene({
  triggerElement: '#developer',
  triggerHook: 1,
  duration: $(window).height() - $navHeight
})
  .setTween(developerHeaderTweenTimeline)
  .addTo(headerController);

var designerHeaderTweenTimeline = new TimelineMax()
  .add(TweenMax.fromTo('#developer .section-header-container', 1, {y: 55}, {y: -55, ease: Linear.easeNone}));

var designerHeaderScene = new ScrollMagic.Scene({
  triggerElement: '#designer',
  triggerHook: 1,
  duration: $(window).height() - $navHeight
})
  .setTween(designerHeaderTweenTimeline)
  .addTo(headerController);

var resumeHeaderTweenTimeline = new TimelineMax()
  .add(TweenMax.fromTo('#resume .section-header-container', 1, {y: 55}, {y: -55, ease: Linear.easeNone}));

var resumeHeaderScene = new ScrollMagic.Scene({
  triggerElement: '#resume',
  triggerHook: 1,
  duration: $(window).height() - $navHeight
})
  .setTween(resumeHeaderTweenTimeline)
  .addTo(headerController);


// ScrollMagic - Browser wipe effect
// ----------------------------------------------------------------------
// Scene that controls the developer pin effect
var browserDeveloperController = new ScrollMagic.Controller();

var developerTweenTimeline = new TimelineMax()
  .add(TweenMax.to('#browser-developer-element', 1, {y:1000, ease:Linear.easeNone}));

new ScrollMagic.Scene({
  triggerElement: '#browser-developer-trigger',
  duration: 1000,
  offset: -$navHeight - 50,
  triggerHook: 'onLeave'
})
  .setTween(developerTweenTimeline)
  .addTo(browserDeveloperController);

// Scene that controls the designer pin effect
var browserDesignerController = new ScrollMagic.Controller();

var designerTweenTimeline = new TimelineMax()
  .add(TweenMax.to('#browser-designer-element', 1, {y:2000, ease:Linear.easeNone}));

new ScrollMagic.Scene({
  triggerElement: '#browser-designer-trigger',
  duration: 2000,
  offset: -$navHeight - 50 - $designerElementHeight,
  triggerHook: 'onLeave'
})
  .setTween(designerTweenTimeline)
  .addTo(browserDesignerController);

// Scene that controls the resume pin effect
var resumeController = new ScrollMagic.Controller();

var resumeTweenTimeline = new TimelineMax()
  .add(TweenLite.to('#resume-element', 1, {y: $resumeTriggerHeight, ease: Linear.easeNone}));

new ScrollMagic.Scene({
  triggerElement: '.resume-trigger',
  duration: $resumeTriggerHeight,
  offset: -$navHeight - 50 - $resumeElementHeight,
  triggerHook: 'onLeave'
})
  .setTween(resumeTweenTimeline)
  .addTo(resumeController);

// On document ready align elements
// ----------------------------------------------------------------------
$(document).on('ready', function() {
  positionElements(function() {
    $('#resume-element').css('top', -$resumeElementHeight);
    $('#browser-designer-element').css('top', -$designerElementHeight);
  });
  responsiveParallax();
});
