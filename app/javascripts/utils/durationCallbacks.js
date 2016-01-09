// Callback functions so that the durations for animations are all responsive, YAY FUTUREZ!
// ----------------------------------------------------------------------
var navHeight =        $('.nav-trigger').outerHeight();
var $designerElement = $('#browser-designer-element');
var $resumeElement =   $('#resume-element');
var $resumeTrigger =   $('.resume-trigger');

module.exports = {
  getDeveloperDuration: function() {
    return $('#browser-developer-trigger').outerHeight() + $('#browser-developer-element').outerHeight();
  },
  getDesignerDuration: function() {
    return $('#browser-designer-trigger').outerHeight() + $('#browser-designer-element').outerHeight();
  },
  getRecommendationDuration: function() {
    return $('.recommendation-trigger').outerHeight() - $('.recommendation').outerHeight();
  },
  getResumeDuration: function() {
    return $resumeTrigger.outerHeight() + ($resumeElement.outerHeight() / 60);
  },
  getDesignerOffset: function() {
    return -navHeight - 50 - $designerElement.height();
  },
  getResumeOffset: function() {
    return -navHeight - 50 - $resumeElement.outerHeight();
  },
  getAboutSectionHeight: function() {
    return $('#about').outerHeight() + $('#developer').outerHeight() + $('#designer').outerHeight() - navHeight;
  },
  getResumeSectionHeight: function() {
    return $('#resume').outerHeight() - navHeight;
  },
  getContactSectionHeight: function() {
    return $('#contact').outerHeight(true);
  }
};
