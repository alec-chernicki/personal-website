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

var navHeight = $('#nav-trigger').innerHeight()-1;

var navigationScene = new ScrollScene({ triggerElement: '#nav-trigger', triggerHook: 0, reverse: true})
  .setPin('#nav-element');

var navigationAboutScene = new ScrollScene({ triggerElement: '#about', offset: -navHeight, triggerHook: 0, duration: $('#about').innerHeight()+$('.developer').innerHeight()+$('.designer').innerHeight(), reverse: true})
  .setClassToggle('.about-link', 'highlight');

var navigationWorkScene = new ScrollScene({ triggerElement: '#work', offset: -navHeight, triggerHook: 0, duration: $('#work').innerHeight()+$('#portfolio').innerHeight()+navHeight, reverse: true})
  .setClassToggle('.work-link', 'highlight');

var navigationContactScene = new ScrollScene({ triggerElement: '.recommendations', offset: -navHeight, triggerHook: 0, duration: $('.recommendations').innerHeight()+$('.contact').innerHeight+$('footer').innerHeight(), reverse: true})
  .setClassToggle('.contact-link', 'highlight');

var developerScene = new ScrollScene({ triggerElement: '#browser-developer-trigger', triggerHook: 0.15, reverse: true})
  .setPin('#browser-developer-element');

var designerScene = new ScrollScene({ triggerElement: '#browser-designer-trigger', triggerHook: 0.15, reverse: true})
  .setPin('#browser-designer-element');

controller.addScene([
  navigationScene,
  developerScene,
  designerScene,

  navigationAboutScene,
  navigationWorkScene,
  navigationContactScene
]);






// TODO: Need to figure out a way to DRY this plugin up
// Initialize Particle.js for "Developer" section
particlesJS('developer-particles', {
  particles: {
    color: '#384552',
    color_random: false,
    shape: 'circle', // "circle", "edge" or "triangle"
    opacity: {
      opacity: 3,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0,
        sync: false
      }
    },
    size: 2.5,
    size_random: true,
    nb: 100,
    line_linked: {
      enable_auto: true,
      distance: 350,
      //color: '#43474B',
      color: '#384552',
      opacity: 0.6,
      width: 1,
      condensed_mode: {
        enable: false,
        rotateX: 600,
        rotateY: 600
      }
    },
    anim: {
      enable: false,
      speed: 0.5
    }
  },
  interactivity: {
    enable: false,
    mouse: {
      distance: 250
    },
    detect_on: 'canvas', // "canvas" or "window"
    mode: 'grab', // "grab" of false
    line_linked: {
      opacity: 0.5
    },
    events: {
      onclick: {
        enable: true,
        mode: 'push', // "push" or "remove"
        nb: 4
      },
      onresize: {
        enable: true,
        mode: 'out', // "out" or "bounce"
        density_auto: true,
        density_area: 800 // nb_particles = particles.nb * (canvas width *  canvas height / 1000) / density_area
      }
    }
  },
  /* Retina Display Support */
  retina_detect: true
});


$('a').smoothScroll({offset: -$('#nav-trigger').innerHeight()});
