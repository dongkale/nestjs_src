$(document).ready(function () {
  // Login Button
  const btnSignIn = $('#btnSignIn');
  btnSignIn.on('click', (e) => {
    e.preventDefault();
    window.location = '/dashboard';
  });
});
