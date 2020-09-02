$(document).ready(() => {
  (function ($) {
    jQuery.validator.addMethod('answercheck', function (value, element) {
      return this.optional(element) || /^\bcat\b$/.test(value);
    }, 'type the correct answer -_-');

    // validate contactForm form
    $(() => {
      $('#contactForm').validate({
        rules: {
          name: {
            required: true,
            minlength: 2,
          },
          subject: {
            required: true,
            minlength: 4,
          },
          number: {
            required: true,
            minlength: 5,
          },
          email: {
            required: true,
            email: true,
          },
          message: {
            required: true,
            minlength: 20,
          },
        },
        messages: {
          name: {
            required: 'Please enter a name',
            minlength: 'your name must consist of at least 2 characters',
          },
          subject: {
            required: 'Please enter a subject',
            minlength: 'your subject must consist of at least 4 characters',
          },
          number: {
            required: 'Please enter your number',
            minlength: 'your Number must consist of at least 5 characters',
          },
          email: {
            required: 'Please enter an email',
          },
          message: {
            required: 'Please enter a message',
            minlength: 'thats all? really?',
          },
        },
        submitHandler(form) {
          $(form).ajaxSubmit({
            type: 'POST',
            data: $(form).serialize(),
            url: 'contact_process.php',
            success() {
              $('#contactForm :input').attr('disabled', 'disabled');
              $('#contactForm').fadeTo('slow', 1, function () {
                $(this).find(':input').attr('disabled', 'disabled');
                $(this).find('label').css('cursor', 'default');
                $('#success').fadeIn();
                $('.modal').modal('hide');
		                	$('#success').modal('show');
              });
            },
            error() {
              $('#contactForm').fadeTo('slow', 1, () => {
                $('#error').fadeIn();
                $('.modal').modal('hide');
		                	$('#error').modal('show');
              });
            },
          });
        },
      });
    });
  }(jQuery));
});
