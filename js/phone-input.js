const phoneEl = document.querySelector('#phone');

const maskChar = '_';
const maskType = `+38 (0${maskChar}${maskChar}) ${maskChar}${maskChar}${maskChar}-${maskChar}${maskChar}-${maskChar}${maskChar}`;

const positions = getPositions(maskType, maskChar);

function getPositions(str, char) {
  const length = str.length;
  const caretPositions = [];
  const leftMargins = [];
  const rightMargins = [];

  for (let i = 0; i < length; i++) {
    if (str[i] === char) {
      caretPositions.push(i);
      if (str[i - 1] !== char && caretPositions.length - 1) {
        leftMargins.push(i);
      }
      if (str[i + 1] !== char) {
        rightMargins.push(i + 1);
      }
    } else {
      if (str[i - 1] === char) {
        caretPositions.push(i);
      }
    }
  }

  if (str[length - 1] === char) {
    caretPositions.push(length);
  }

  leftMargins.push(caretPositions[0]);

  return { caretPositions, leftMargins, rightMargins };
}

fitPhoneField(phoneEl, maskType);

function fitPhoneField(el, phoneMask) {
  const caretPositions = [6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  const rightMargins = [8, 13, 16, 19];
  const leftMargins = [10, 14, 17, 6];
  // const leftMargins = [6, 10, 14, 17];

  console.log(caretPositions, positions.caretPositions);
  console.log(leftMargins, positions.leftMargins);
  console.log(rightMargins, positions.rightMargins);

  el.addEventListener('keydown', e => {
    setPhoneMask(e, e.target, caretPositions, rightMargins, leftMargins);
  });
  el.addEventListener('focus', e => {
    handlePhoneFocus(e.target, phoneMask, caretPositions);
  });
  el.addEventListener('blur', e => {
    handlePhoneBlur(e.target, phoneMask);
  });
}

function handlePhoneFocus(el, maskType, caretPositions) {
  setTimeout(() => {
    if (!el.value.length) {
      el.value = maskType;
      setCaretPosition(el, caretPositions[0]);
    }
  }, 100);
}

function handlePhoneBlur(el, maskType) {
  setTimeout(() => {
    if (el.value === maskType) {
      el.value = '';
    }
  }, 100);
}

function setPhoneMask(e, el, caretPositions, rightMargins, leftMargins) {
  e.preventDefault(); // this prevent validation on input-phone. Try to fix it

  const pressedKey = e.key;
  const idxOfPosition = caretPositions.indexOf(el.selectionStart);
  const countOfPositions = caretPositions.length;

  if (pressedKey === 'Delete') {
    let caretPosition = el.selectionStart;
    editPhoneNumber(maskChar, caretPosition, caretPositions, rightMargins, leftMargins);
  }

  if (pressedKey === 'Backspace') {
    let caretPosition = el.selectionStart;
    editPhoneNumber(maskChar, caretPosition, caretPositions, rightMargins, leftMargins, true);
  }

  if (/^([0-9])$/.test(pressedKey)) {
    let caretPosition = el.selectionStart;
    editPhoneNumber(pressedKey, caretPosition, caretPositions, rightMargins, leftMargins);
  }

  if (pressedKey === 'ArrowRight') {
    if (!!~idxOfPosition) {
      if (idxOfPosition === countOfPositions - 1) {
        setCaretPosition(el, caretPositions[0]);
      } else {
        setCaretPosition(el, caretPositions[idxOfPosition + 1]);
      }
    }
  }

  if (pressedKey === 'ArrowLeft') {
    if (!!~idxOfPosition) {
      if (idxOfPosition === 0) {
        setCaretPosition(el, caretPositions[countOfPositions - 1]);
      } else {
        setCaretPosition(el, caretPositions[idxOfPosition - 1]);
      }
    }
  }
}

function setCaretPosition(elem, caretPos) {
  if (elem != null) {
    if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.move('character', caretPos);
      range.select();
    } else {
      if (elem.selectionStart + 1) {
        elem.focus();
        elem.setSelectionRange(caretPos, caretPos);
      } else elem.focus();
    }
  }
}

function changePhoneValue(el, key) {
  const changedValue = el.value.split('');
  changedValue[el.selectionStart] = key;
  el.value = changedValue.join('');
}

function editPhoneNumber(
  pressedKey,
  caretPosition,
  caretPositions,
  rightMargins,
  leftMargins,
  backspace = false,
) {
  if (!backspace) {
    if (caretPositions.includes(caretPosition)) {
      if (!rightMargins.includes(caretPosition)) {
        changePhoneValue(phoneEl, pressedKey);
        setCaretPosition(phoneEl, caretPosition + 1);
      } else {
        const iom = rightMargins.indexOf(caretPosition);
        if (iom !== rightMargins.length - 1) {
          const iop = caretPositions.indexOf(caretPosition);
          setCaretPosition(phoneEl, caretPositions[iop + 1]);
          changePhoneValue(phoneEl, pressedKey);
          setCaretPosition(phoneEl, caretPositions[iop + 2]);
        } else {
          setCaretPosition(phoneEl, caretPositions[0]);
          changePhoneValue(phoneEl, pressedKey);
          setCaretPosition(phoneEl, caretPositions[1]);
        }
      }
    } else {
      setCaretPosition(phoneEl, caretPositions[0]);
      changePhoneValue(phoneEl, pressedKey);
      setCaretPosition(phoneEl, caretPositions[1]);
    }
  } else {
    const length = caretPositions.length;
    if (caretPositions.includes(caretPosition)) {
      if (!leftMargins.includes(caretPosition)) {
        setCaretPosition(phoneEl, caretPosition - 1);
        changePhoneValue(phoneEl, maskChar);
        setCaretPosition(phoneEl, caretPosition - 1);
      } else {
        const iom = leftMargins.indexOf(caretPosition);
        if (iom !== leftMargins.length - 1) {
          const iop = caretPositions.indexOf(caretPosition);
          setCaretPosition(phoneEl, caretPositions[iop - 2]);
          changePhoneValue(phoneEl, pressedKey);
          setCaretPosition(phoneEl, caretPositions[iop - 2]);
        } else {
          setCaretPosition(phoneEl, caretPositions[length - 2]);
          changePhoneValue(phoneEl, pressedKey);
          setCaretPosition(phoneEl, caretPositions[length - 2]);
        }
      }
    } else {
      setCaretPosition(phoneEl, caretPositions[length - 2]);
      changePhoneValue(phoneEl, maskChar);
      setCaretPosition(phoneEl, caretPositions[length - 2]);
    }
  }
}
