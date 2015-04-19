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

  // TODO: This series of if else statements is extremely inefficient
  // Working on an algorithm to handle this instead
  // Using this now so that I can actually finish this website, will refactor at a later time.

  // Functions return correct index that project info should be appended after based on screen size.
  function largePortfolio (index) {
    console.log(index);
    if (index >= 0 && index <=3) {
      return 3
    }
    else if (index >= 4 && index <= 11) {
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
    else if (index >= 6 && index <= 11) {
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
  $('#x-button').click(function () {
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
    if ($('.panel-group').children('.open').attr('id') != undefined &&
        $panelId ==  '#' + $('.panel-group').children('.open').attr('id')) {

      console.log('first case fired');
      $('.panel-group').children('.open').removeClass('open').slideToggle(300);

    }

    // If button click is different panel, close prev panel and open new one
    else if ($('.panel-group').children().hasClass('open')) {

      $('.panel-group').children('.open').removeClass('open').slideToggle(300, function () {

        console.log($(this).closest('.portfolio-item'));
        // Find the index of the current clicked item within the item array object
        $($itemArray[calculateAppendPosition($(this).closest('.portfolio-item'))])

          // Append the following object after the given item in returned index position
          .append().after($projectInfo);

        $($panelId).addClass('open').slideToggle();
      });
    }

    // If no panels are open, just open the panel.
    else {
      console.log('third case fired');
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

  // Smooth Scrolling to all 'a' tags
  // ----------------------------------------------
  $('a').smoothScroll({offset: -navHeight});

  // ScrollMagic - Navigation
  // ----------------------------------------------
  var navigationController = new ScrollMagic.Controller();

  // Set navbar to appear above #about section
  new ScrollMagic.Scene({
    triggerElement: '#about',
    triggerHook: 0,
    offset: -navHeight,
    reverse: true
  })
    .setClassToggle('.nav-trigger', 'visible')
    .addTo(navigationController);

  // Set scroll to "About" options
  new ScrollMagic.Scene({
    triggerElement: '#about',
    offset: -(navHeight+1),
    triggerHook: 0,
    duration: $('#about').height() * 2 +
    $('#developer').height() +
    $('#designer').height(),
    reverse: true
  })
    .setClassToggle('.about-link', 'highlight')
    .addTo(navigationController);

  // Set scroll to "Portfolio" options
  new ScrollMagic.Scene({
    triggerElement: '#portfolio',
    offset: -(navHeight+1),
    triggerHook: 0,
    duration: $('#portfolio').height() -
    $('#contact').height(),
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


  // ScrollMagic - Browser wipe effect
  // ----------------------------------------------

  // Scene that controls the developer browser effect
  var browserDeveloperController = new ScrollMagic.Controller();

  var developerTweenTimeline = new TimelineMax()
    .add(TweenMax.to('.browser-developer-container', 1, {height: '0', ease:Linear.easeNone}));

  new ScrollMagic.Scene({
    triggerElement: '#developer',
    // Sets speed of wipe dynamically based on browser height
    duration: $('#browser-developer-trigger').height(),
    offset: -navHeight,
    triggerHook: 'onLeave'
  })
    .setTween(developerTweenTimeline)
    .addIndicators()
    .addTo(browserDeveloperController);

  // Scene that controls the designer browser effect
  var browserDesignerController = new ScrollMagic.Controller();

  var designerTweenTimeline = new TimelineMax()
    .add(TweenMax.to('.browser-designer-container', 1, {height: 800, ease:Linear.easeNone}));

  new ScrollMagic.Scene({
    triggerElement: '#developer',
    // Sets speed of wipe dynamically based on browser height
    duration: $('.browser-developer-container').height(),
    offset: $('#designer').height() - $('.browser-designer-container').height(),
    triggerHook: 'onEnter'
  })
    .setTween(designerTweenTimeline)
    .addIndicators()
    .addTo(browserDesignerController);

});

