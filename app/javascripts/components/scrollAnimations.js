import ScrollMagic from 'scrollmagic';

import callback    from '../utils/durationCallbacks';
import debounce    from '../utils/debounce';
import onImageLoad from '../utils/onImageLoad';

var navHeight =       $('.nav-trigger').outerHeight();
var $envelopeBottom = $('.envelope-bottom');
var $envelopeTop =    $('.envelope-top');

var scenes = {};

var controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    pushFollowers: false,
    reverse: true,
    triggerHook: 'onLeave'
  }
});

var createNavigationAnimation = function () {
  // Set navbar to appear above about section
  new ScrollMagic.Scene({
      offset: -(navHeight + 1),
      triggerElement: '#about'
    })
    .setClassToggle('.nav-trigger', 'nav-trigger-in')
    .addTo(controller);

  // Make underline appear under each link upon scrolling to section
  new ScrollMagic.Scene({
      offset: -(navHeight + 1),
      duration: callback.getAboutSectionHeight,
      triggerElement: '#about'
    })
    .setClassToggle('.about-link', 'highlight')
    .addTo(controller);

  new ScrollMagic.Scene({
      offset: -(navHeight + 1),
      duration: callback.getResumeSectionHeight,
      triggerElement: '#resume'
    })
    .setClassToggle('.resume-link', 'highlight')
    .addTo(controller);

  new ScrollMagic.Scene({
      offset: -(navHeight + 1),
      duration: callback.getContactSectionHeight,
      triggerElement: '#contact'
    })
    .setClassToggle('.contact-link', 'highlight')
    .addTo(controller);
};

var createBrowserAnimation = function () {
  onImageLoad('#browser-developer-element', function () {
    scenes.developer = new ScrollMagic.Scene({
      duration: callback.getDeveloperDuration,
      offset: -navHeight - 50,
      triggerElement: '#browser-developer-trigger'
    })
    .setPin('#browser-developer-element')
    .addTo(controller);
  });

  onImageLoad('#browser-designer-element', function() {
    scenes.designer = new ScrollMagic.Scene({
        duration: callback.getDesignerDuration,
        offset: callback.getDesignerOffset(),
        triggerElement: '#browser-designer-trigger'
      })
      .setPin('#browser-designer-element')
      .addTo(controller);
  });

  onImageLoad('#resume-element', function() {
    scenes.resume = new ScrollMagic.Scene({
        duration: callback.getResumeDuration,
        offset: callback.getResumeOffset(),
        triggerElement: '.resume-trigger'
      })
      .setPin('#resume-element')
      .addTo(controller);
  });
}

var createRecommendationAnimation = function() {
  new ScrollMagic.Scene({
      duration: callback.getRecommendationDuration,
      triggerElement: '.recommendation-trigger.left',
      offset: -navHeight - 50
    })
    .setPin('.recommendation.left')
    .addTo(controller);

  new ScrollMagic.Scene({
      duration: callback.getRecommendationDuration,
      triggerElement: '.recommendation-trigger.right',
      offset: -navHeight - 50
    })
    .setPin('.recommendation.right')
    .addTo(controller);
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
  $(window).on('load', setEnvelopeBottomPosition);
};

var init = function () {
  bindEvents();
  createNavigationAnimation();
  createBrowserAnimation();
  createRecommendationAnimation();
};

export default init;
