import dotdotdot from 'dotdotdot';

function init () {
  $(window).load(function() {
    $('.quote').dotdotdot({
      after: 'a.readmore',
      height: 210,
      watch: 'window'
    });
  });
}

export default init;
