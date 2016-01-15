var fadeToNextPhoto = function() {
  var $firstImage =  $('.about-photo-container > div:first');
  var $secondImage = $firstImage.next();

  var fadeTime = 800;

  $firstImage
    .stop()
    .fadeOut(fadeTime)
    .appendTo('.about-photo-container');
  $secondImage
    .stop()
    .fadeIn(fadeTime);
};

function bindEvents () {
  var timeToNextSlide = 4000;

  var aboutInterval = setInterval(fadeToNextPhoto,  timeToNextSlide);

  $(document).on('click', '.about-photo-container', function () {
    fadeToNextPhoto();
    clearInterval(aboutInterval);
    aboutInterval = setInterval(fadeToNextPhoto,  timeToNextSlide);
  });
}

function init () {
  $(".about-photo-container > div:gt(0)").hide();

  bindEvents();
}

module.exports = init;
