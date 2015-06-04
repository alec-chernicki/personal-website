'use strict';

// Initialize commonly used variables
// ----------------------------------------------------------------------
var $windowWidth = $(window).width();

// Elements
var $resumeDownloadWrapper = $('#resume-download-wrapper');
var $portfolio = $('#portfolio');
var $envelopeBottom = $('#envelope-bottom');
var $resumeTrigger = $('.resume-trigger');
var $resumeButtonDownload = $('.resume-button-download');

// Heights of elements
var $navHeight = $('.nav-trigger').outerHeight(true);
var $aboutHeight = $('#about').outerHeight(true);
var $developerHeight = $('#developer').outerHeight(true);
var $designerHeight = $('#designer').outerHeight(true);
var $resumeHeight = $('#resume').height();
var $portfolioHeight = $portfolio.outerHeight(true);
var $contactHeight = $('#contact').outerHeight(true);
var $designerElementHeight = $('#browser-designer-element').height();
var $resumeElementHeight = $('#resume-element').height();
var $envelopeTopHeight = $('#envelope-top').height();

var $resumeTriggerHeight =  $envelopeTopHeight * 1.25;

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
$resumeButtonDownload.click(function() {
  $.ajax({
    url: '/resume',
    type: 'GET'
  });
});

// GSAP - Moves linear gradient behind developer-overlay (translate3D - hardware accelerated)
// ----------------------------------------------------------------------
TweenMax.to('.developer-gradient', 10, {x: $windowWidth + 600, repeat: -1, yoyo: true, ease:Linear.easeNone});

// GSAP - Animate opacity
// ----------------------------------------------------------------------

var showResumeGradient = function() {
  return TweenLite.to('.resume-gradient', 0.25, {opacity: 1, y: 0, ease: Linear.easeNone});
};

var hideResumeGradient = function() {
  return TweenLite.to('.resume-gradient', 0.25, {opacity: 0, y: 0, ease: Linear.easeNone});
};

// GSAP - Animate opacity on download or linkedin button hover (opacity - hardware accelerated)
// ----------------------------------------------------------------------
$resumeButtonDownload.hover(function() {showResumeGradient()}, function() {hideResumeGradient()});

$('.resume-button-linkedin').hover(function() {showResumeGradient()}, function() {hideResumeGradient()});

// Makes all the fun js effects completely responsive, YAY FUTUREZ!
// ----------------------------------------------------------------------
var positionElements = function(callback) {
  $envelopeTopHeight = $('#envelope-top').height();
  $resumeElementHeight = $('#resume-element').height();

  var $wrapperPosition = $envelopeTopHeight / 2 - $resumeDownloadWrapper.height() / 2;
  $resumeDownloadWrapper.css('bottom', $wrapperPosition);

  var $bottomPosition = $envelopeTopHeight - $envelopeBottom.height() / 3.5;
  $envelopeBottom.css('bottom', $bottomPosition);

  // Resize resume-trigger based on current height of the envelope
  $resumeTriggerHeight = $envelopeTopHeight *  1.25;
  $resumeTrigger.css('height', $resumeTriggerHeight);

  // Position the resume-trigger margin based on the envelope-bottom height
  resumeTriggerOffset = $envelopeTopHeight - $resumeElementHeight + ($resumeElementHeight / 10);
  $resumeTrigger.css('margin-bottom', resumeTriggerOffset);

  if (typeof callback === 'function') {
    callback();
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
var $itemArray = $portfolio.children('.portfolio-item');

// Returns the correct row to append panel to
var appendItem = function(portfolioItemButton, panel) {

  // Stores the closest portfolio item object
  var $portfolioItem = portfolioItemButton.closest('.portfolio-item');

  // Calculates number of items in row by dividing window width by width of item
  var itemsInRow = Math.round($(window).width() / $portfolioItem.width());

  // Finds the row by dividing the index of the item by the number of items in a row and rounding up
  var rowOfItem = Math.ceil(($itemArray.index($portfolioItem) + 1) / itemsInRow);

  // Find the project correct item to append to within the item array and append the panel
  $itemArray[itemsInRow * rowOfItem - 1].append().after(panel);
};

// Checks if there are any open panels
var isPanelOpen = function() {
  var $openPanel = $portfolio.children('.open');

  // Returns ID of panel if a panel is open
  if ($openPanel.length > 0) {
    return $openPanel;
  }
  // Returns false if no panels are open
  else {
    return false;
  }
};

// Bind function to button click
$('.portfolio-item a').click(function() {
  // Returns panel that corresponds to the buttons data-target
  var $panel = $portfolio.children($(this).attr('data-target'));

  // IF: Button clicked corresponds to a panel and no panels are already open, open panel
  if (isPanelOpen() === false) {
    appendItem(this, $panel);
    $panel.addClass('open').slideToggle(300);
  }

  // ELSE IF: Button clicked corresponds to a panel that is already open
  else if (isPanelOpen().attr('id') === $panel.attr('id')) {
    $panel.removeClass('open').slideToggle(300);
  }

  // ELSE IF: Button clicked corresponds to a different panel and a panel is open
  else if (isPanelOpen() && isPanelOpen().attr('id') !== $panel.attr('id')) {
    appendItem(this, $panel);
    $(isPanelOpen()).removeClass('open').slideToggle(300, function() {
      $panel.addClass('open').slideToggle(300);
    });
  }
});

// Bind x-button to closing the open panel
$('.x-button').click(function () {
  isPanelOpen().removeClass('open').slideToggle(300);
});

// ScrollMagic - Navigation
// ----------------------------------------------------------------------
var navigationController = new ScrollMagic.Controller();
var navigationScrollMagic = function (time, element, link) {
  new ScrollMagic.Scene({
    duration: time - $navHeight,
    offset: -($navHeight+1),
    reverse: true,
    triggerHook: 0,
    triggerElement: element
  })
    .setClassToggle(link, 'highlight')
    .addTo(navigationController);
};

// Set navbar to appear above about section
new ScrollMagic.Scene({
  triggerElement: '#about',
  triggerHook: 0,
  offset: -$navHeight,
  reverse: true
})
  .setClassToggle('.nav-trigger', 'show')
  .addTo(navigationController);

// Initialize for about link
navigationScrollMagic($aboutHeight + $developerHeight + $designerHeight - $navHeight, '#about', '.about-link');
// Initialize for resume link
navigationScrollMagic($resumeHeight, '#resume-header', '.resume-link');
// Initialize for portfolio link
navigationScrollMagic($portfolioHeight, '#portfolio', '.portfolio-link');
// Initialize for contact link
navigationScrollMagic($contactHeight, '#contact', '.contact-link');

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
var responsiveParallax = function() {
  if ($(window).width() <= 768) {
    // Removes parallax animation
    designerHeaderScene.remove(true);
    developerHeaderScene.remove(true);
    resumeHeaderScene.remove(true);

    // Progresses animation to starting point
    designerHeaderScene.progress(0.5);
    developerHeaderScene.progress(0.5);
    resumeHeaderScene.progress(0.5);
  }
  else {
    // Adds parallax effect back to ScrollMagic controller
    designerHeaderScene.addTo(headerController);
    developerHeaderScene.addTo(headerController);
    resumeHeaderScene.addTo(headerController);
  }
};

$(document).on('ready', function() {
  positionElements(function() {
    $('#resume-element').css('top', -$resumeElementHeight);
    $('#browser-designer-element').css('top', -$designerElementHeight);
  });
  responsiveParallax();
});

// Tests against width since iOS safari is evil and calls onOrientationChange
// ----------------------------------------------------------------------
$(window).on('resize', function () {
  if ($(window).width() !== $windowWidth) {
    positionElements();
    responsiveParallax();

    // Close all open or collapsing panels on resize of window
    isPanelOpen().removeClass('open').slideToggle(300);
  }
});
