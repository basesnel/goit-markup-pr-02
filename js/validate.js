const nameRegex = /^[a-zA-Z][a-z0-9A-Z\-\s]{2,24}$/;
const phoneRegex = /^\+\d{2}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
const emailRegex = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/;

const forms = document.getElementsByClassName('jsForm');
const elName = document.getElementsByClassName('jsFieldName')[0];
const elPhone = document.getElementsByClassName('jsFieldPhone')[0];
const elEmail = document.getElementsByClassName('jsFieldEmail')[0];

validateField({
  elField: elName,
  validateFn: validateFieldName,
});

validateField({
  elField: elPhone,
  validateFn: validateFieldPhone,
});

validateField({
  elField: elEmail,
  validateFn: validateFieldEmail,
});

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
    validateFn(e.target, { live: true, isEmpty: e.target.value === '' });
  });
}

function validateFieldName(el, opts) {
  const isEmpty = el.value === '';
  const isName = nameRegex.test(el.value);

  validate(
    el,
    isEmpty || isName,
    'Your name is incorrect: enter 3 to 25 characters and start with a letter',
    'Congratulations, your name is valid',
    opts,
  );
}

function validateFieldPhone(el, opts) {
  const isEmpty = el.value === '';
  const isPhoneValid = phoneRegex.test(el.value);

  validate(
    el,
    isEmpty || isPhoneValid,
    'Your phone number is not correct (format is: +38 (012) 345-67-89)',
    'Congratulations, your phone number is valid',
    opts,
  );
}

function validateFieldPhone(el, opts) {
  const isEmpty = el.value === '';
  const isPhoneValid = phoneRegex.test(el.value);

  validate(
    el,
    isEmpty || isPhoneValid,
    'Your phone number is not correct (format is: +38 (012) 345-67-89)',
    'Congratulations, your phone number is valid',
    opts,
  );
}

function validateFieldEmail(el, opts) {
  const isEmpty = el.value === '';
  const isEmailValid = emailRegex.test(el.value);

  validate(
    el,
    isEmpty || isEmailValid,
    'Your email is not correct',
    'Congratulations, your email is valid',
    opts,
  );
}

function validate(el, isValid, invalidMessage, validMessage, opts) {
  const removeOnly = opts?.removeOnly;
  const elField = el.closest('.field');
  const elAlert = elField.querySelector('.alert');
  const elHint = elField.querySelector('.hint');
  const elHintIcon = elField.querySelector('.hint-icon');

  if (isValid && opts.live) {
    elAlert.classList.add('alert--valid');
    elAlert.classList.remove('alert--invalid');
    elAlert.innerText = validMessage;
    opts.isEmpty ? elHint.classList.remove('hint-hidden') : elHint.classList.add('hint-hidden');
    opts.isEmpty
      ? elHintIcon.classList.remove('hint-hidden')
      : elHintIcon.classList.add('hint-hidden');
    el.removeAttribute('aria-invalid');
    return true;
  } else if (!isValid && opts.live) {
    elAlert.classList.add('alert--invalid');
    elAlert.classList.remove('alert--valid');
    opts.isEmpty ? elHint.classList.remove('hint-hidden') : elHint.classList.add('hint-hidden');
    opts.isEmpty
      ? elHintIcon.classList.remove('hint-hidden')
      : elHintIcon.classList.add('hint-hidden');
    elAlert.innerText = invalidMessage;
    el.setAttribute('aria-invalid', 'true');
    return true;
  } else if (removeOnly) {
    elHint.classList.remove('hint-hidden');
    elHintIcon.classList.remove('hint-hidden');
    elAlert.classList.remove('alert--valid');
    elAlert.classList.remove('alert--invalid');
    elAlert.innerText = '';
    return false;
  }
}

[...forms].forEach(elForm => {
  elForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log('submit done, but nothing happens');
  });
});
