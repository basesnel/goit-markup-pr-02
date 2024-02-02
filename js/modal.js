(() => {
  // referals:
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    backDrop: document.querySelector('[data-modal-backdrop]'),
    modal: document.querySelector('[data-modal]'),
  };

  // events:
  refs.openModalBtn.addEventListener('click', onToggleModal);
  refs.closeModalBtn.addEventListener('click', onToggleModal);

  addEventListener('resize', onClientResize);

  refs.backDrop.addEventListener('click', event => {
    if (event.target === event.currentTarget) onToggleModal();
  });

  // service function
  function getClientSize() {
    if (typeof window.innerWidth == 'number') {
      //Non-IE
      const width = window.innerWidth;
      const height = window.innerHeight;
      return { width, height };
    }

    if (
      document.documentElement &&
      (document.documentElement.clientWidth || document.documentElement.clientHeight)
    ) {
      //IE 6+ in 'standards compliant mode'
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      return { width, height };
    }

    // if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
    //IE 4 compatible
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    return { width, height };
    // }
  }

  // event handlers:
  function onClientResize() {
    if (refs.modal.clientHeight <= getClientSize().height) {
      refs.modal.classList.add('modal--absolute');
    } else {
      refs.modal.classList.remove('modal--absolute');
    }
  }

  function onToggleModal() {
    document.body.classList.toggle('no-scroll');
    refs.backDrop.classList.toggle('backdrop--is-hidden');

    onClientResize();
  }
})();
