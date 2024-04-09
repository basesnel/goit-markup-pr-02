// Phone-input initialization:
const phoneEl = document.querySelector('#phone');

phoneEl.addEventListener('keydown', e => setPhoneMask(e));
phoneEl.addEventListener('focus', handlePhoneFocus);
phoneEl.addEventListener('blur', handlePhoneBlur);

const maskChar = '_';
const caretPositions = [6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const rightMargins = [8, 13, 16, 19];
const leftMargins = [10, 14, 17, 6];
const maskType = `+38 (0${maskChar}${maskChar}) ${maskChar}${maskChar}${maskChar}-${maskChar}${maskChar}-${maskChar}${maskChar}`;
const caretPositions2 = getPositions(maskType, maskChar);
console.log(caretPositions, caretPositions2);

function getPositions(str, char) {
  const positions = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) positions.push(i);
  }
  return positions;
}

function handlePhoneFocus() {
  setTimeout(() => {
    if (!phoneEl.value.length) {
      phoneEl.value = maskType;
      setCaretPosition(phoneEl, caretPositions[0]);
    }
  }, 100);
}

function handlePhoneBlur() {
  setTimeout(() => {
    if (phoneEl.value === maskType) {
      phoneEl.value = '';
    }
  }, 100);
}

function setPhoneMask(e) {
  e.preventDefault(); // this prevent validation on input-phone. Try to fix it

  const pressedKey = e.key;
  const idxOfPosition = caretPositions.indexOf(phoneEl.selectionStart);
  const countOfPositions = caretPositions.length;

  if (pressedKey === 'Delete') {
    let caretPosition = phoneEl.selectionStart;
    editPhoneNumber(maskChar, caretPosition);
  }

  if (pressedKey === 'Backspace') {
    let caretPosition = phoneEl.selectionStart;
    editPhoneNumber(maskChar, caretPosition, true);
  }

  if (/^([0-9])$/.test(pressedKey)) {
    let caretPosition = phoneEl.selectionStart;
    editPhoneNumber(pressedKey, caretPosition);
  }

  if (pressedKey === 'ArrowRight') {
    if (!!~idxOfPosition) {
      if (idxOfPosition === countOfPositions - 1) {
        setCaretPosition(phoneEl, caretPositions[0]);
      } else {
        setCaretPosition(phoneEl, caretPositions[idxOfPosition + 1]);
      }
    }
  }

  if (pressedKey === 'ArrowLeft') {
    if (!!~idxOfPosition) {
      if (idxOfPosition === 0) {
        setCaretPosition(phoneEl, caretPositions[countOfPositions - 1]);
      } else {
        setCaretPosition(phoneEl, caretPositions[idxOfPosition - 1]);
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

function editPhoneNumber(pressedKey, caretPosition, backspace = false) {
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
