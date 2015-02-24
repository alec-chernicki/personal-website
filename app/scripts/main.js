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
//$(document).ready(function() {
//  $('html').niceScroll({
//    cursorcolor: '#373737',
//    cursoropacitymin: 0.5,
//    cursoropacitymax: 0.7,
//    scrollspeed: 0
//  });
//});

// Initialize ScrollMagic
var controller = new ScrollMagic();
// assign handler "scene" and add it to controller
var scene = new ScrollScene({
                triggerElement: '#nav-trigger',
                triggerHook: 0,
                reverse: true
                })
.setPin('#nav-element')
.addTo(controller);

scene.addIndicators();

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
      distance: 300,
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
      enable: true,
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



