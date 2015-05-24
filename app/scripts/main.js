'use strict';

// Initialize commonly used variables
var $windowWidth = $(window).width;

var $navHeight = $('.nav-trigger').height();
var $aboutHeight = $('.about').height();
var $developerHeight = $('#developer').height();
var $designerHeight = $('#designer').height();
var $resumeHeight = $('#resume').height();
var $portfolioHeight = $('#portfolio').height();
var $contactHeight = $('#contact').height();

var $designerElementHeight = $('#browser-designer-element').height();
var $resumeElementHeight = $('#resume-element').height();
 //AJAX Contact Form Submission Handler
//----------------------------------------------
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

//AJAX Resume Download Handler
//----------------------------------------------
$('.resume-button-download').click(function() {
  $.ajax({
    url: '/resume',
    type: 'GET'
  });
});


// Positioning function
//----------------------------------------------
var positionElements = function() {
  var envelopeHeight = $('#envelope-top').height();

  // Position resume-download wrapper
  var wrapperPosition = envelopeHeight / 2 - $('#resume-download-wrapper').height() / 2;
  $('#resume-download-wrapper').css('bottom', wrapperPosition);

  // Position envelope-bottom
  var bottomPosition = envelopeHeight - $('#envelope-bottom').height() / 3.5;
  $('#envelope-bottom').css('bottom', bottomPosition);

  // Resize resume-trigger based on current height of the envelope
  var triggerHeight = envelopeHeight *  1.1;
  $('.resume-trigger').css('height', triggerHeight);

  // Position the resume-trigger margin based on the envelope-bottom height
  var resumeTriggerOffset = $('#envelope-bottom').height() * 2.25;
  $('.resume-trigger').css('margin-bottom', resumeTriggerOffset);
};

positionElements();

// Make all these fun js effects completely responsive! YAY FUTUREZ!
//----------------------------------------------
$(window).resize(function () {
  $windowWidth = $(window).width;
  console.log($windowWidth);

  positionElements();
});

// Smooth Scrolling to all 'a' tags
// ----------------------------------------------
$('a').smoothScroll({offset: -$navHeight});

// GSAP - Animate opacity on download or linkedin button hover
//----------------------------------------------
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

// GSAP - Moves linear gradient behind developer-overlay (translate3D)
//----------------------------------------------
TweenMax.to('.developer-gradient', 12, {x: $windowWidth, y: 0, repeat: -1, yoyo: true, ease:Linear.easeNone});

// Dynamic resize of textarea based on content
// ----------------------------------------------
window.jQuery.fn.autosize = function() {
  return autosize(this);
};
$('textarea').autosize();

// Fancy responsive portfolio panel
// ----------------------------------------------
// TODO: Working on more efficient algorithm for all of this

// Functions return correct index that project info should be appended after based on screen size.
function largePortfolio (index) {
  console.log(index);
  if (index >= 0 && index <=3) {
    return 3;
  }
  else if (index >= 4 && index <= 11) {
    return 7;
  }
}

function mediumPortfolio (index) {
  console.log(index);
  if (index >= 0 && index <= 2) {
    return 2;
  }
  else if (index >= 3 && index <= 5) {
    return 5;
  }
  else if (index >= 6 && index <= 11) {
    return 8;
  }
}

function smallPortfolio (index) {
  console.log(index);
  if (index >= 0 && index <= 1) {
    return 1;
  }
  else if (index >= 2 && index <= 3) {
    return 3;
  }
  else if (index >= 4 && index <= 5) {
    return 5;
  }
  else if (index >= 6 && index <= 7) {
    return 7;
  }
  else if (index >= 8 && index <= 11) {
    return 9;
  }
}

function extraSmallPortfolio (index) {
  console.log(index);
  return index;
}

// Finds screen size and calls correct function
function calculateAppendPosition(item) {
  if ($(window).width() > 1280) {
    return largePortfolio($(item).index('.portfolio-item'));
  }
  else if ($(window).width() > 1024) {
    return mediumPortfolio($(item).index('.portfolio-item'));
  }
  else if ($(window).width() > 768) {
    return smallPortfolio($(item).index('.portfolio-item'));
  }
  else if ($(window).width() > 320) {
    return extraSmallPortfolio($(item).index('.portfolio-item'));
  }
}

// When user clicks x button close open panel
$('.x-button').click(function () {
  $('.panel-group').children('.open').removeClass('open').slideToggle(300);
});

// Bind function to button click
$('.portfolio-item a').click(function() {
  // Returns an array of items in the portfolio section
  var $itemArray = $('.panel-group').children('.portfolio-item');

  // Get data attribute of current button
  var $panelId = $(this).attr('data-target');

  // Returns correct panel that matches the associated button
  var $projectInfo = $('.panel-group').children($panelId);

  // If button click is current open panel, close open panel
  if ($('.panel-group').children('.open').attr('id') !== undefined &&
    $panelId ===  '#' + $('.panel-group').children('.open').attr('id')) {

    $('.panel-group').children('.open').removeClass('open').slideToggle(300);

  }

  // If button click is different panel, close prev panel and open new one
  else if ($('.panel-group').children().hasClass('open')) {

    $('.panel-group').children('.open').removeClass('open').slideToggle(300, function () {

      // Find the index of the current clicked item within the item array object
      $($itemArray[calculateAppendPosition($(this).closest('.portfolio-item'))])

        // Append the following object after the given item in returned index position
        .append().after($projectInfo);

      $($panelId).addClass('open').slideToggle();
    });
  }

  // If no panels are open, just open the panel.
  else {
    // Find the index of the current clicked item within the item array object
    $($itemArray[calculateAppendPosition($(this).closest('.portfolio-item'))])
      // Append the following object after the given item in returned index position
      .append().after($projectInfo);

    $($panelId).slideToggle(function () {
      $(this).addClass('open');
    });
  }
});

// Close all open or collapsing panels on resize of window
$(window).on('resize', function () {
  $('.panel-group').children('.open').removeClass('open').slideToggle(300);
});

// ScrollMagic - Navigation
// ----------------------------------------------
var navigationController = new ScrollMagic.Controller();

// Set navbar to appear above about section
new ScrollMagic.Scene({
  triggerElement: '.about',
  triggerHook: 0,
  offset: -$navHeight,
  reverse: true
})
  .setClassToggle('.nav-trigger', 'show')
  .addTo(navigationController);

// Set scroll to "About" options
new ScrollMagic.Scene({
  triggerElement: '.about',
  offset: -($navHeight+1),
  triggerHook: 0,
  duration: $aboutHeight * 2 + $developerHeight + $designerHeight,
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


// ScrollMagic - Browser wipe effect
// ----------------------------------------------

// Scene that controls the developer browser effect
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

// Scene that controls the designer browser effect
var browserDesignerController = new ScrollMagic.Controller();

var designerTweenTimeline = new TimelineMax()
  .add(TweenMax.to('#browser-designer-element', 1, {y:2000, ease:Linear.easeNone}));

new ScrollMagic.Scene({
  triggerElement: '#browser-designer-trigger',
  duration: 2000,
  offset: -$navHeight - 50 - $('#browser-designer-element').height(),
  triggerHook: 'onLeave'
})
  .setTween(designerTweenTimeline)
  .addTo(browserDesignerController);

// Scene that controls the resume wipe effect
var resumeController = new ScrollMagic.Controller();

var resumeTweenTimeline = new TimelineMax()
  .add(TweenLite.to('#resume-element', 1, {y: $('.resume-trigger').height(), ease: Linear.easeNone}));

new ScrollMagic.Scene({
  triggerElement: '.resume-trigger',
  duration: $('.resume-trigger').height(),
  offset: -$navHeight - 50 - $resumeElementHeight,
  triggerHook: 'onLeave'
})
  .setTween(resumeTweenTimeline)
  .addTo(resumeController);

/* This is super janky but there's a bug where the trigger of the element
   ignores the original css:top style, if you set the top property AFTER
   the js kicks in it fixes it, ugh so gross tho
 */

$(document).on('ready', function() {
  $('#browser-designer-element').css('top', -$designerElementHeight);
  $('#resume-element').css('top', -$resumeElementHeight);
});

