var $submitButton = $('.submit-button');
var $submitIcon =   $('.js-submit-icon');
var $submitText =   $('.js-submit-text');
var $contactForm =  $('#contact-form');

var showClass = 'show';
var onClass = 'on';

var resetForm = function () {
  $submitIcon.removeClass().addClass('fa fa-paper-plane');
  $submitButton.prop('disabled', false);
  $submitText.text(' SEND MESSAGE');
  $('textarea').height('initial');
  $('label').removeClass(showClass);
  $('label').removeClass(onClass);

  document.getElementById('contact-form').reset();
};

var isEmail = function (email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

var submitForm = function () {
  $submitButton.prop('disabled', true);
  $submitIcon.removeClass().addClass('fa fa-spin fa-cog');
  $submitText.text(' SENDING');

  var postData = $contactForm.serializeArray();

  $.ajax({
    url: '/',
    type: 'POST',
    data: postData,
    success: function () {
      $submitIcon.removeClass().addClass('fa fa-check');
      $submitText.text(' SENT!');
      setTimeout(resetForm, 3000);
    },
    error: function () {
      $submitIcon.removeClass().addClass('fa fa-times');
      $submitText.text(' ERROR SENDING');
      setTimeout(resetForm, 3000);
    }
  });
};

var bindEvents = function () {
  // Float Labels
  $('input').on({
    checkLabel: function () {
      var $label = $(this).prev('label');
      if (this.value != '') {
        $label.addClass(showClass);
      }
      else {
        $label.removeClass(showClass);
      }
    },
    input: function () {
      $(this).trigger('checkLabel');
    },
    focus: function () {
      $(this).prev('label').addClass(onClass);
    },
    blur: function () {
      $(this).prev('label').removeClass(onClass)
    }
  }).trigger('checkLabel');

  // Minimal form validation
  $contactForm.submit(function (e) {
    e.preventDefault();

    var $formInputs = $(this).find('input, textarea');

    $.each($formInputs, function() {
      var $el = $(this);
      var value = $el.val().trim();

      // Really gross logic, will refactor when it's not 3AM
      if (value === '') {
        $el.closest('.control').addClass('error');
      }
      else if ($el.attr('name') === 'email' && !isEmail($el.val())) {
        $el.closest('.control').addClass('error');
      }
      else {
        $el.closest('.control').removeClass('error');
      }
    });

    if ($('.control.error').length === 0){
      submitForm();
    }
  });
};

var init = function () {
  bindEvents();
}

module.exports = init;

