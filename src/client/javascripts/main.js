$(function() {

  const PATH = window.location.pathname;

  if (PATH === '/users/register') {
    $('#registerPassword, #registerConfirmPassword').on('keyup', function () {
      if ($('#registerPassword').val() === $('#registerConfirmPassword').val()) {
        $('#registerConfirmPassword').removeClass('is-invalid');
        $('#registerConfirmPassword').addClass('is-valid');
      }
      else {
        $('#registerConfirmPassword').removeClass('is-valid');
        $('#registerConfirmPassword').addClass('is-invalid');
      }
    });
  }

});
