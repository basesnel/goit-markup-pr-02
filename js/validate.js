const nameRegex = /^[a-zA-Z][a-z0-9A-Z\-\s]{2,24}$/;
const phoneRegex = /^\+\d{2}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
const emailRegex = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/;

const forms = document.getElementsByClassName('jsForm');
const elName = document.getElementsByClassName('jsFieldName')[0];
const elPhone = document.getElementsByClassName('jsFieldPhone')[0];
const elEmail = document.getElementsByClassName('jsFieldEmail')[0];

const alertIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
alertIcon.setAttribute('width', '16');
alertIcon.setAttribute('height', '16');
alertIcon.setAttribute('aria-hidden', 'true');
alertIcon.classList.add('alert-icon');

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

  elField.addEventListener('input', e => {
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
  const isEmpty = opts.isEmpty;

  if (isEmpty) {
    validate(el, !isEmpty, opts, 'Your name cannot be empty');
  } else {
    const isNameValid = nameRegex.test(el.value);
    validate(
      el,
      isNameValid,
      opts,
      'Your name is incorrect: enter 3 to 25 characters and start with a letter',
      'Congratulations, your name is valid',
    );
  }
}

function validateFieldPhone(el, opts) {
  const isEmpty = opts.isEmpty || el.value === '+38 (0__) ___-__-__';

  if (isEmpty) {
    validate(el, !isEmpty, opts, 'Your phone number cannot be empty or blank');
  } else {
    const isPhoneValid = phoneRegex.test(el.value);
    validate(
      el,
      isPhoneValid,
      opts,
      'Your phone number is not correct (format is: +38 (012) 345-67-89)',
      'Congratulations, your phone number is valid',
    );
  }
}

function validateFieldEmail(el, opts) {
  const isEmpty = opts.isEmpty;

  if (isEmpty) {
    validate(el, !isEmpty, opts, 'Your email cannot be empty');
  } else {
    const isEmailValid = emailRegex.test(el.value);
    validate(
      el,
      isEmailValid,
      opts,
      'Your email is not correct',
      'Congratulations, your email is valid',
    );
  }
}

function validate(el, isValid, opts, invalidMessage, validMessage = '') {
  const removeOnly = opts?.removeOnly;
  const elField = el.closest('.field');
  const elAlert = elField.querySelector('.alert');
  const elHint = elField.querySelector('.hint');
  // const elHintIcon = elField.querySelector('.hint-icon');
  const wrap = elField.querySelector('.feedback__wrap-input');

  if (isValid && opts.live) {
    elAlert.classList.add('alert--valid');
    elAlert.classList.remove('alert--invalid');
    elAlert.innerText = validMessage;
    elHint.classList.add('hint--hidden');
    // elHintIcon.classList.add('hint-icon--hidden');
    el.removeAttribute('aria-invalid');
    addIconToMessage(wrap, 'valid');
    return true;
  } else if (!isValid && opts.live) {
    elAlert.classList.add('alert--invalid');
    elAlert.classList.remove('alert--valid');
    elAlert.innerText = invalidMessage;
    elHint.classList.add('hint--hidden');
    // elHintIcon.classList.add('hint-icon--hidden');
    el.setAttribute('aria-invalid', 'true');
    addIconToMessage(wrap, 'invalid');
    return true;
  } else if (removeOnly) {
    elHint.classList.remove('hint--hidden');
    // elHintIcon.classList.remove('hint-icon--hidden');
    elAlert.classList.remove('alert--valid');
    elAlert.classList.remove('alert--invalid');
    elAlert.innerText = '';
    addIconToMessage(wrap, 'hint');
    return false;
  }
}

function addIconToMessage(el, icon) {
  // const iconHint = `<svg class="hint-icon hint-icon--hidden" width="16" height="16" aria-hidden="true">
  //                 <use href="./images/icons.svg#alert-info"></use>
  //               </svg>`;

  const alertIconCopy = el.getElementsByClassName('alert-icon')[0]
    ? el.getElementsByClassName('alert-icon')[0]
    : alertIcon.cloneNode(true);

  switch (icon) {
    case 'hint':
      alertIconCopy.classList.remove('alert-icon--valid');
      alertIconCopy.classList.remove('alert-icon--invalid');
      alertIconCopy.classList.add('alert-icon--hint');
      alertIconCopy.innerHTML = '<use href="./images/icons.svg#alert-info"></use>';
      break;

    case 'invalid':
      alertIconCopy.classList.remove('alert-icon--valid');
      alertIconCopy.classList.remove('alert-icon--hint');
      alertIconCopy.classList.add('alert-icon--invalid');
      alertIconCopy.innerHTML = '<use href="./images/icons.svg#alert-notification"></use>';
      // console.log(el, alertIconCopy);
      break;

    case 'valid':
      alertIconCopy.classList.remove('alert-icon--invalid');
      alertIconCopy.classList.remove('alert-icon--hint');
      alertIconCopy.classList.add('alert-icon--valid');
      alertIconCopy.innerHTML = '<use href="./images/icons.svg#alert-checkmark"></use>';
      // console.log(el, alertIconCopy);
      break;

    default:
      return;
  }
  !el.contains(alertIconCopy) && el.appendChild(alertIconCopy);
}

[...forms].forEach(elForm => {
  elForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log('submit done, but nothing happens');
  });
});
