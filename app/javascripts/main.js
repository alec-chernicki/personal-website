'use strict';

// Load all components
import initContact          from './components/contact';
import initDot              from './components/dotdotdot';
import initSmoothScroll     from './components/smoothScroll';
import initSlideshow        from './components/slideshow';
import initAutosize         from './components/autosize';
import initNavigation       from './components/navigation';
import initScrollAnimations from './components/scrollAnimations';

// This feels weird, look into better patterns
function init () {
  initAutosize();
  initContact();
  initDot();
  initNavigation();
  initScrollAnimations();
  initSlideshow();
  initSmoothScroll();
}

module.exports = init();
