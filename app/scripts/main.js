'use strict';

// Define number of columns

//var columnWidth = function () {
//  var w = $container.width();
//  var columnNum = 1;
//
//  if (w > 1200) {
//    columnNum = 100;
//  } else if (w > 900) {
//    columnNum = 300;
//  } else if (w > 600) {
//    columnNum = 200;
//  } else if (w > 300) {
//    columnNum = 100;
//  }
//
//  return columnNum;
//};

var $container = $('#isotope');

// init
$container.isotope({
  // options
  itemSelector: '.item',
  layoutMode: 'fitRows'
});

// Implements auto-resize of textarea element
$('.message').autosize();

// Implements nicescroll

$(document).ready(function() {
  $('html').niceScroll({
    cursorcolor: '#373737',
    cursoropacitymin: 0.5,
    cursoropacitymax: 0.7
  });
});


// Particle.js implementation

particlesJS('developer-particles', {
  particles: {
    color: '#606467',
    color_random: false,
    shape: 'circle', // "circle", "edge" or "triangle"
    opacity: {
      opacity: 3,
      anim: {
        enable: false,
        speed: 1.5,
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
      color: '#43474B',
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
