
  document.addEventListener('DOMContentLoaded', function() {
    var menuNav = document.querySelector('.menu-nav');
    var ulNav = document.querySelector('.ul-nav');

    menuNav.addEventListener('click', function() {
      ulNav.classList.toggle('show');
    });
  });

