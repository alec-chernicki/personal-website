$(window).load(function() {
  $('#pre-load').fadeOut();
});


$(document).ready(function() {
  // Created variable so that offsetting based on navigation height will be more DRY
  var navHeight = $('.nav-trigger').innerHeight();

  // Dynamic resize of textarea based on content
  // ----------------------------------------------
  window.jQuery.fn.autosize = function() {
    return autosize(this);
  };
  $('textarea').autosize();

  // Fancy responsive portfolio panel
  // ----------------------------------------------

  // Returns an array of items in the portfolio section
  var $itemArray = $('.panel-group').children('.item');

  // TODO: This series of if else statements is extremely inefficient
  // Working on an algorithm to handle this instead
  // Using this now so that I can actually finish this website, will refactor at a later time.

  // Functions return correct index that project info should be appended after based on screen size.
  function largePortfolio (index) {
    console.log(index);
    if (index >= 0 && index <=3) {
      return 3
    }
    else if (index >= 4 && index <= 12) {
      return 7
    }
  }

  function mediumPortfolio (index) {
    console.log(index);
    if (index >= 0 && index <= 2) {
      return 2
    }
    else if (index >= 3 && index <= 5) {
      return 5
    }
    else if (index >= 6 && index <= 8) {
      return 8
    }
  }

  function smallPortfolio (index) {
    console.log(index);
    if (index >= 0 && index <= 1) {
      return 1
    }
    else if (index >= 2 && index <= 3) {
      return 3
    }
    else if (index >= 4 && index <= 5) {
      return 5
    }
    else if (index >= 6 && index <= 7) {
      return 7
    }
    else if (index >= 8 && index <= 11) {
      return 9
    }
  }

  function extraSmallPortfolio (index) {
    console.log(index);
    return index
  }

  // Finds screen size and calls correct function
  function calculateAppendPosition(item) {
    if ($(window).width() > 1280) {
      return largePortfolio($(item).index());
    }
    else if ($(window).width() > 1024) {
      return mediumPortfolio($(item).index());
    }
    else if ($(window).width() > 768) {
      return smallPortfolio($(item).index());
    }
    else if ($(window).width() > 320) {
      return extraSmallPortfolio($(item).index());
    }
  }

  // Bind function to button click
  $('.item a').click(function() {

    // Get data attribute of current button
    var $panelId = $(this).attr('data-target');
    // Returns correct panel that matches the associated button
    var $projectInfo = $('.panel-group').children($panelId);

    // Only append if there isn't a panel currently open or toggling
    if (!$('.panel-group').children().hasClass('in') && !$('.panel-group').children().hasClass('collapsing')) {

      // Find the index of the current clicked item within the item array object
      $($itemArray[calculateAppendPosition($(this).closest('.item'))])
        // Append the following object after the given item in returned index position
        .append().after($projectInfo);
    }
  });

  // Close all open or collapsing panels on resize of window
  $(window).on('resize', function () {
    $('.panel-group').children('.in').collapse('hide');
    $('.panel-group').children('.collapsing').collapse('hide')
  });

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
    .add(TweenMax.to('.browser-designer-container', 1, {height: 700, ease:Linear.easeNone}));

  new ScrollMagic.Scene({
    triggerElement: '#browser-designer-trigger',
    // Sets speed of wipe dynamically based on browser height
    duration: $('.browser-developer-container').height(),
    offset: -$('#browser-developer-container').height(),
    triggerHook: 'onEnter'
  })
    .setTween(designerTweenTimeline)
    .addIndicators()
    .addTo(browserDesignerController);

});

