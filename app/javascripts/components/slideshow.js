var fadeToNextPhoto = function() {
  var $firstImage = $('.about-photo-container > div:first');
  var $secondImage = $firstImage.next();
  var fadeTime = 700;

  $firstImage
    .stop()
    .fadeOut(fadeTime)
    .appendTo('.about-photo-container');
  $secondImage
    .stop()
    .fadeIn(fadeTime);
};

function bindEvents () {
  var aboutInterval = setInterval(fadeToNextPhoto,  5000);

  $(document).on('click', '.about-photo-container', function () {
    fadeToNextPhoto();
    clearInterval(aboutInterval);
    aboutInterval = setInterval(fadeToNextPhoto,  5000);
  });
}

function init () {
  $(".about-photo-container > div:gt(0)").hide();

  bindEvents();
}

module.exports = init;
