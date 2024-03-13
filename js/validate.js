const forms = document.getElementsByClassName('js-speaker-form');

function validateField({ elField, validateFn }) {
  let touched = false;

  elField.addEventListener('change', e => {
    // mark it as touched so that on blur it shows the error.
    touched = true;
  });

  elField.addEventListener('keyup', e => {
    // remove any error on keyup if existent
    validateFn(e.target, { removeOnly: true });
  });

  elField.addEventListener('blur', e => {
    if (!touched) return;
    // show error if touched
    validateFn(e.target, { live: true });
  });
}

function validate(el, isValid, errorMessage, opts) {
  const removeOnly = opts?.removeOnly;
  const elField = el.closest('.field');
  const elError = elField.querySelector('.field-error');

  if (isValid && !opts.addOnly) {
    elField.classList.remove('isInvalid');
    elError.innerText = '';
    el.removeAttribute('aria-invalid');
    return true;
  } else if (!removeOnly) {
    elField.classList.add('isInvalid');
    elError.innerText = errorMessage;
    el.setAttribute('aria-invalid', 'true');
    return false;
  }
}

[...forms].forEach(elForm => {
  elForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log('submit done, but nothing happens');
  });
});
