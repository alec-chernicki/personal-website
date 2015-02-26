'use strict';

// Initialize Isotope
var $container = $('#isotope');
$container.isotope({
  // options
  itemSelector: '.item',
  layoutMode: 'fitRows'
});

// Initialize auto-resize of textarea element
$('.message').autosize();

// Initializes smooth scrolling to all a tags
$('a').smoothScroll({offset: -$('#nav-trigger').innerHeight()});

// Initialize NiceScoll
$(document).ready(function() {
  $('html').niceScroll({
    cursorcolor: '#373737',
    cursoropacitymin: 0.5,
    cursoropacitymax: 0.7,
    scrollspeed: 10
  });
});

// Initialize ScrollMagic
//TODO: Refactor height variables out
var controller = new ScrollMagic();
var devController = new ScrollMagic({ container: '#browser-developer-trigger' });
var desController = new ScrollMagic({ container: '.designer' });

var navHeight = $('#nav-trigger').innerHeight();

var navigationScene = new ScrollScene({ triggerElement: '#nav-trigger', triggerHook: 0, reverse: true})
  .setPin('#nav-element');

var navigationAboutScene = new ScrollScene({ triggerElement: '#about', offset: -navHeight, triggerHook: 0, duration: $('#about').innerHeight()+$('.developer').innerHeight()+$('.designer').innerHeight(), reverse: true})
  .setClassToggle('.about-link', 'highlight');

var navigationWorkScene = new ScrollScene({ triggerElement: '#work', offset: -navHeight, triggerHook: 0, duration: $('#work').innerHeight()+$('#portfolio').innerHeight()+navHeight, reverse: true})
  .setClassToggle('.work-link', 'highlight');

var navigationContactScene = new ScrollScene({ triggerElement: '.recommendations', offset: -navHeight, triggerHook: 0, duration: $('.recommendations').innerHeight()+$('.contact').innerHeight+$('footer').innerHeight(), reverse: true})
  .setClassToggle('.contact-link', 'highlight');

var developerScene = new ScrollScene({ triggerElement: '#browser-developer-trigger', triggerHook: 0, reverse: true})
  .setPin('#browser-developer-element');

var designerScene = new ScrollScene({ triggerElement: '#browser-designer-trigger', triggerHook: 0, reverse: true})
  .setPin('#browser-designer-element');

controller.addScene([
  navigationScene,

  navigationAboutScene,
  navigationWorkScene,
  navigationContactScene
]);

devController.addScene(developerScene);
desController.addScene(designerScene);
