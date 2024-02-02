(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');
  const backdrop = document.querySelector('[data-menu-backdrop]');
  const bodyScrollLock = document.querySelector('body');
  const menuItems = document.querySelectorAll('.mob-menu__link');

  function toggleMenu() {
    const isMenuOpen = openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');
    backdrop.classList.toggle('backdrop--is-hidden');
    bodyScrollLock.classList.toggle('no-scroll');
  }

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);
  menuItems.forEach(menuItem => menuItem.addEventListener('click', toggleMenu));

  // Close the mobile menu on wider screens if the device orientation changes
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    backdrop.classList.add('backdrop--is-hidden');
    openMenuBtn.setAttribute('aria-expanded', false);
    //replace
    //bodyScrollLock.enableBodyScroll(document.body);
    bodyScrollLock.classList.remove('no-scroll');
  });
})();
