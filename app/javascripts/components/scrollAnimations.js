import ScrollMagic from 'scrollmagic';

import callback    from '../utils/durationCallbacks';
import debounce    from '../utils/debounce';
import onImageLoad from '../utils/onImageLoad';

var navHeight =       $('.nav-trigger').outerHeight();
var $envelopeBottom = $('.envelope-bottom');
var $envelopeTop =    $('.envelope-top');

var scenes = {};

var createNavigationAnimation = function () {
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
      duration: callback.getAboutSectionHeight,
      triggerElement: '#about'
    })
    .setClassToggle('.about-link', 'highlight')
    .addTo(navigationController);

  new ScrollMagic.Scene({
      duration: callback.getResumeSectionHeight,
      triggerElement: '#resume'
    })
    .setClassToggle('.resume-link', 'highlight')
    .addTo(navigationController);

  new ScrollMagic.Scene({
      duration: callback.getContactSectionHeight,
      triggerElement: '#contact'
    })
    .setClassToggle('.contact-link', 'highlight')
    .addTo(navigationController);
};

var createBrowserAnimation = function () {
  var pinController = new ScrollMagic.Controller({
    globalSceneOptions: {
      pushFollowers: false,
      reverse: true,
      triggerHook: 'onLeave'
    }
  });

  onImageLoad('#browser-developer-element', function () {
    scenes.developer = new ScrollMagic.Scene({
      duration: callback.getDeveloperDuration,
      offset: -navHeight - 50,
      triggerElement: '#browser-developer-trigger'
    })
    .setPin('#browser-developer-element')
    .addTo(pinController);
  });

  onImageLoad('#browser-designer-element', function() {
    scenes.designer = new ScrollMagic.Scene({
        duration: callback.getDesignerDuration,
        offset: callback.getDesignerOffset(),
        triggerElement: '#browser-designer-trigger'
      })
      .setPin('#browser-designer-element')
      .addTo(pinController);
  });

  onImageLoad('#resume-element', function() {
    scenes.resume = new ScrollMagic.Scene({
        duration: callback.getResumeDuration,
        offset: callback.getResumeOffset(),
        triggerElement: '.resume-trigger'
      })
      .setPin('#resume-element')
      .addTo(pinController);
  });
}

var createRecommendationAnimation = function() {
  var recommendationController = new ScrollMagic.Controller({
    globalSceneOptions: {
      duration: callback.getRecommendationDuration,
      offset: -navHeight - 50,
      pushFollowers: false,
      reverse: true,
      triggerHook: 'onLeave',
      tweenChanges: false
    }
  });

  new ScrollMagic.Scene({
      triggerElement: '.recommendation-trigger.left',
    })
    .setPin('.recommendation.left')
    .addTo(recommendationController);

  new ScrollMagic.Scene({
      triggerElement: '.recommendation-trigger.right',
    })
    .setPin('.recommendation.right')
    .addTo(recommendationController);
};

// TODO: This is really gross but can't find a way to do it in pure CSS right now
var setEnvelopeBottomPosition = function() {
  $envelopeBottom.css('bottom', $envelopeTop.height() - $envelopeBottom.height() / 2.6);
};

var debouncedEvents = debounce(function () {
  scenes.resume.offset(callback.getResumeOffset());
  scenes.designer.offset(callback.getDesignerOffset());
  setEnvelopeBottomPosition();
}, 60);

var bindEvents = function () {
  $(window).on('resize', debouncedEvents);
};

var init = function () {
  bindEvents();
  createNavigationAnimation();
  createBrowserAnimation();
  createRecommendationAnimation();

  setEnvelopeBottomPosition();
};

export default init;
