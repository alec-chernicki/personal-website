'use strict';

jQuery(function($) {
  // Initialize commonly used variables as jQuery objects
  // ----------------------------------------------------------------------
  var $root = $('html, body');
  var $submitButton = $('.submit-button');
  var $submitIcon = $('.submit-button i');
  var $submitText = $('.submit-button span');
  var $designerElement = $('#browser-designer-element');
  var $resumeElement = $('#resume-element');
  var $envelopeBottom = $('.envelope-bottom');
  var $envelopeTop = $('.envelope-top');
  var $hamburger = $('.js-navbar-hamburger');

  var navHeight = $('.nav-trigger').outerHeight();

  var $resumeTrigger = $('.resume-trigger');

  var designerScene;
  var resumeScene;

  // TODO: This is really gross but can't find a way to do it in pure CSS right now
  var setEnvelopeBottomPosition = function() {
    $envelopeBottom.css('bottom', $envelopeTop.height() - $envelopeBottom.height() / 2.6);
  };

  // Callback functions so that the durations for animations are all responsive, YAY FUTUREZ!
  // ----------------------------------------------------------------------
  var getDeveloperDuration = function() {
    return $('#browser-developer-trigger').outerHeight() + $('#browser-developer-element').outerHeight();
  };

  var getDesignerDuration = function() {
    return $('#browser-designer-trigger').outerHeight() + $('#browser-designer-element').outerHeight();
  };

  var getResumeDuration = function() {
    return $resumeTrigger.outerHeight() + ($resumeElement.outerHeight() / 60);
  };

  var getDesignerOffset = function() {
    return -navHeight - 50 - $designerElement.height();
  };

  var getResumeOffset = function() {
    return -navHeight - 50 - $resumeElement.outerHeight();
  };

  var getRecommendationDuration = function() {
    return $('.recommendation-trigger').outerHeight() - $('.recommendation').outerHeight();
  };

  var getResumeSectionHeight = function() {
    return $('#resume').outerHeight() - navHeight;
  };

  var getAboutSectionHeight = function() {
    return $('#about').outerHeight() + $('#developer').outerHeight() + $('#designer').outerHeight() - navHeight;
  };

  var getContactSectionHeight = function() {
    return $('#contact').outerHeight(true);
  };

  // ScrollMagic - Navigation
  // ----------------------------------------------------------------------s
  var navigationController = new ScrollMagic.Controller({
    globalSceneOptions: {
      offset: -(navHeight + 1),
      pushFollowers: false,
      reverse: true,
      triggerHook: 0
    }
  });

  // Set navbar to appear above about section
  new ScrollMagic.Scene({
      triggerElement: '#about'
    })
    .setClassToggle('.nav-trigger', 'nav-trigger-in')
    .addTo(navigationController);

  // Make underline appear under each link upon scrolling to section
  new ScrollMagic.Scene({
      duration: getAboutSectionHeight,
      triggerElement: '#about'
    })
    .setClassToggle('.about-link', 'highlight')
    .addTo(navigationController);

  new ScrollMagic.Scene({
      duration: getResumeSectionHeight,
      triggerElement: '#resume'
    })
    .setClassToggle('.resume-link', 'highlight')
    .addTo(navigationController);

  new ScrollMagic.Scene({
      duration: getContactSectionHeight,
      triggerElement: '#contact'
    })
    .setClassToggle('.contact-link', 'highlight')
    .addTo(navigationController);


  // ScrollMagic - Browser wipe effect
  // ----------------------------------------------------------------------
  var pinController = new ScrollMagic.Controller({
    globalSceneOptions: {
      pushFollowers: false,
      reverse: true,
      triggerHook: 'onLeave'
    }
  });

  $('#browser-designer-element').one('load', function() {
    // build scene
    new ScrollMagic.Scene({
        duration: getDeveloperDuration,
        offset: -navHeight - 50,
        triggerElement: '#browser-developer-trigger'
      })
      .setPin('#browser-developer-element')
      .addTo(pinController);
  }).each(function() {
    if (this.complete || /*for IE 10-*/ $(this).height() > 0) {
      $(this).load();
    }
  });

  $('#browser-designer-element').one('load', function() {
    // build scene
    designerScene = new ScrollMagic.Scene({
        duration: getDesignerDuration,
        offset: getDesignerOffset(),
        triggerElement: '#browser-designer-trigger'
      })
      .setPin('#browser-designer-element')
      .addTo(pinController);
  }).each(function() {
    if (this.complete || /*for IE 10-*/ $(this).height() > 0) {
      $(this).load();
    }
  });

  $('#resume-element').one('load', function() {
    // build scene
    resumeScene = new ScrollMagic.Scene({
        duration: getResumeDuration,
        offset: getResumeOffset(),
        triggerElement: '.resume-trigger'
      })
      .setPin('#resume-element')
      .addTo(pinController);
  }).each(function() {
    if (this.complete || $(this).height() > 0) {
      $(this).load();
    }
  });

  //ScrollMagic - Recommendation Pins
  //----------------------------------------------------------------------
  var bindRecommendationPins= function() {
    var recommendationController = new ScrollMagic.Controller({
      globalSceneOptions: {
        duration: getRecommendationDuration,
        offset: -navHeight - 50,
        pushFollowers: false,
        reverse: true,
        triggerHook: 'onLeave'
      }
    });

    new ScrollMagic.Scene({
        triggerElement: '.recommendation-trigger.left',
        tweenChanges: false
      })
      .setPin('.recommendation.left')
      .addTo(recommendationController);

    new ScrollMagic.Scene({
        triggerElement: '.recommendation-trigger.right',
        tweenChanges: false
      })
      .setPin('.recommendation.right')
      .tweenChanges(true)
      .addTo(recommendationController);
  }

  // Debounce for resize event, savin' dat memory
  // ----------------------------------------------------------------------
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  $(window).on('resize',
    debounce(function() {
      resumeScene.offset(getResumeOffset());
      designerScene.offset(getDesignerOffset());
      setEnvelopeBottomPosition();
      $('.js-mobile-links').one().stop().fadeOut();
      $hamburger.removeClass('active');
    }, 60)
  );

  // AJAX Contact Form Submission Handler
  // ----------------------------------------------------------------------

  var resetForm = function() {
    $submitIcon.removeClass().addClass('fa fa-paper-plane');
    $submitButton.prop('disabled', false);
    $submitText.text(' SEND MESSAGE');
    $('textarea').height('initial');
    document.getElementById('contact-form').reset();
  };


  $('#contact-form').submit(function(e) {
    e.preventDefault();

    $submitButton.prop('disabled', true);
    $submitIcon.removeClass().addClass('fa fa-spin fa-cog');
    $submitText.text(' SENDING');

    var postData = $(this).serializeArray();

    $.ajax({
      url: '/',
      type: 'POST',
      data: postData,
      success: function() {
        $submitIcon.removeClass().addClass('fa fa-check');
        $submitText.text(' SENT!');
        setTimeout(resetForm, 3000);
      },
      error: function() {
        $submitIcon.removeClass().addClass('fa fa-times');
        $submitText.text(' ERROR SENDING');
        setTimeout(resetForm, 3000);
      }
    });
  });

  // AJAX Resume Download Handler
  // ----------------------------------------------------------------------
  $(document).on('click', '.resume-button-download', function() {
    $.ajax({
      url: '/resume',
      type: 'GET'
    });
  });

  // Smooth Scrolling to all 'a' tags
  // ----------------------------------------------------------------------
  $('.about-link, .resume-link, .contact-link, .js-get-started, .js-brand-name').click(function() {
    var href = $.attr(this, 'href');

    $root.stop().animate({
      scrollTop: $(href).offset().top - navHeight
    }, 1500);

    return false;
  });

  $('html, body').bind('scroll mousedown DOMMouseScroll mousewheel keyup touchstart', function(e) {
    if (e.which > 0 || e.type === 'mousedown' || e.type === 'mousewheel' || e.type === 'touchstart') {
      $root.stop();
    }
  });

  // Dynamic resize of textarea based on content
  // ----------------------------------------------------------------------
  autosize($('textarea'));

  // About slideshow
  // ----------------------------------------------------------------------
  $(".about-photo-container > div:gt(0)").hide();

  var fadeToNextPhoto = function() {
    $('.about-photo-container > div:first')
      .stop()
      .fadeOut(1000)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo('.about-photo-container');
  };

  var aboutInterval = setInterval(fadeToNextPhoto,  5000);

  $(document).on('click', '.about-photo-container', function () {
    fadeToNextPhoto();
    clearInterval(aboutInterval);
    aboutInterval = setInterval(fadeToNextPhoto,  5000);
  });

  // Navigation
  // ----------------------------------------------------------------------
  function toggleMobileMenu () {
    if($(window).width() < 768) {
      $hamburger.toggleClass('active');
      $('.js-mobile-links').stop().fadeToggle(300, 'linear');
    }
  };

  $('.js-navbar-hamburger, .js-mobile-links a').click(toggleMobileMenu);

  // On document ready initialize independent elements
  // ----------------------------------------------------------------------
  $(document).ready(function() {
    bindRecommendationPins();
  });

  $(window).load(function() {
    $('.quote').dotdotdot({
      after: 'a.readmore',
      height: 210,
      watch: 'window'
    });

    setEnvelopeBottomPosition();
  });
});
