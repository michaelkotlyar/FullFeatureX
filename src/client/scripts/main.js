$(function() {

  const PATH = window.location.pathname.replace(/\/$/, '');

  switch (PATH) {
    case '/users/register':
    var confirmPassword = $('#registerConfirmPassword'),
    password = $('#registerPassword');
    $('input[type="password"]').on('keyup', function () {
      if (password.val() === confirmPassword.val()) {
        confirmPassword.removeClass('is-invalid');
        confirmPassword.addClass('is-valid');
      }
      else {
        confirmPassword.removeClass('is-valid');
        confirmPassword.addClass('is-invalid');
      }
    });
    break;
    // END case '/users/register'
  }

});
