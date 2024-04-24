const phoneEl = document.querySelector('#phone');

const mc = '_';

const maskTypes = [
  {
    name: 'I format',
    format: `+38 (0${mc}${mc}) ${mc}${mc}${mc}-${mc}${mc}-${mc}${mc}`,
  },
  {
    name: 'II format',
    format: `+${mc}-${mc}${mc}${mc}-${mc}${mc}${mc}-${mc}${mc}${mc}${mc}`,
  },
  {
    name: 'III format',
    format: `${mc}${mc}${mc}-${mc}${mc}${mc}${mc}`,
  },
  {
    name: 'US international format',
    format: `+1 (${mc}${mc}${mc}) ${mc}${mc}${mc}-${mc}${mc}${mc}${mc}`,
  },
  {
    name: 'US local format',
    format: `(${mc}${mc}${mc}) ${mc}${mc}${mc}-${mc}${mc}${mc}${mc}`,
  },
  {
    name: 'UK international format',
    format: `+44 ${mc}${mc}${mc}${mc}-${mc}${mc}${mc}-${mc}${mc}${mc}`,
  },
  {
    name: 'UK local format',
    format: `${mc}${mc}${mc} ${mc}${mc}${mc}${mc} ${mc}${mc}${mc}${mc}`,
  },
  {
    name: 'UK E.164 format',
    format: `+${mc}${mc}${mc}${mc}${mc}${mc}${mc}${mc}${mc}${mc}${mc}${mc}`,
  },
  {
    name: 'Australian International format',
    format: `+61 ${mc}${mc}${mc}-${mc}${mc}${mc}-${mc}${mc}${mc}`,
  },
  {
    name: 'French International format',
    format: `+33 ${mc}-${mc}${mc}-${mc}${mc}-${mc}${mc}-${mc}${mc}`,
  },
  {
    name: 'German International format',
    format: `+49 ${mc}${mc}-${mc}${mc}${mc}${mc}-${mc}${mc}${mc}${mc}${mc}`,
  },
  {
    name: 'Brazilian International format',
    format: `+55 ${mc}${mc}-${mc}${mc}${mc}${mc}${mc}-${mc}${mc}${mc}${mc}`,
  },
  {
    name: 'Experimental format',
    format: `+38 (0${mc}${mc}) - ${mc}${mc}${mc} - ${mc}${mc} - ${mc}${mc}`,
  },
  {
    name: 'international call to Kyiv',
    format: `+38 44 ${mc}${mc}${mc}-${mc}${mc}-${mc}${mc}`,
  },
  {
    name: 'international call to Odesa',
    format: `+38 48 ${mc}${mc}${mc}-${mc}${mc}-${mc}${mc}`,
  },
  {
    name: 'Belgium',
    format: `+32 4${mc}${mc} ${mc}${mc} ${mc}${mc} ${mc}${mc}`,
  },
  {
    name: 'Brazil mobile',
    format: `+55 ${mc}${mc} 9${mc}${mc}${mc}${mc}-${mc}${mc}${mc}${mc}`,
  },
];

const maskType = maskTypes[12].format;
// const maskType = maskTypes[0].format;

phoneInput(phoneEl, maskType);

function phoneInput(el, phoneMask) {
  const { caretPositions, leftMargins, rightMargins } = getPositions(maskType, mc);

  el.onkeydown = e => handlePhoneKey(e, el, caretPositions, rightMargins, leftMargins);

  el.addEventListener('input', e => {
    setPhoneMask(e, e.target, caretPositions, rightMargins, leftMargins);
  });

  el.addEventListener('focus', e => {
    handlePhoneFocus(e.target, phoneMask, caretPositions);
  });

  el.addEventListener('blur', e => {
    handlePhoneBlur(e.target, phoneMask);
  });

  el.addEventListener('click', e => {
    handlePhoneClick(e.target, caretPositions);
  });
}

function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') || key == 'Tab' || key == 'Enter';
}

function handlePhoneKey(e, el, caretPositions, rightMargins, leftMargins) {
  const idxOfPosition = caretPositions.indexOf(el.selectionStart);
  const countOfPositions = caretPositions.length;
  const caretPosition = el.selectionStart;

  if (e.key === 'ArrowRight') {
    if (!!~idxOfPosition) {
      if (idxOfPosition === countOfPositions - 1) {
        setCaretPosition(el, caretPositions[0]);
      } else {
        setCaretPosition(el, caretPositions[idxOfPosition + 1]);
      }
    }
  }

  if (e.key === 'ArrowLeft') {
    if (!!~idxOfPosition) {
      if (idxOfPosition === 0) {
        setCaretPosition(el, caretPositions[countOfPositions - 1]);
      } else {
        setCaretPosition(el, caretPositions[idxOfPosition - 1]);
      }
    }
  }

  if (e.key === 'Delete') {
    editPhoneNumber(mc, caretPosition, caretPositions, rightMargins, leftMargins);
  }

  if (e.key === 'Backspace') {
    editPhoneNumber(mc, caretPosition, caretPositions, rightMargins, leftMargins, true);
  }

  return checkPhoneKey(e.key);
}

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

function handlePhoneFocus(el, maskType, caretPositions) {
  setTimeout(() => {
    if (!el.value.length) {
      el.value = maskType;
      setCaretPosition(el, caretPositions[0]);
      return;
    }
    setCaretPosition(el, caretPositions[0]);
  }, 100);
}

function handlePhoneBlur(el, maskType) {
  setTimeout(() => {
    if (el.value === maskType) {
      el.value = '';
    }
  }, 100);
}

function handlePhoneClick(el, caretPositions) {
  setTimeout(() => {
    if (el.value.length) {
      const caretPosition = el.selectionStart;
      if (caretPositions.includes(caretPosition)) {
        return;
      }
      const foundPosition = binarySearch(caretPosition, caretPositions);
      setCaretPosition(el, foundPosition);
    }
  }, 100);
}

function binarySearch(elem, positions) {
  if (elem < positions[0]) {
    return positions[0];
  }

  let idxFirst = 0;
  let idxLast = positions.length - 1;
  let idxMiddle = Number.parseInt(idxLast / 2);

  while (idxFirst < idxLast) {
    if (elem < positions[idxMiddle]) {
      if (idxLast === idxMiddle) {
        break;
      }
      idxLast = idxMiddle;
    } else {
      if (idxFirst === idxMiddle) {
        break;
      }
      idxFirst = idxMiddle;
    }
    idxMiddle = Number.parseInt((idxLast + idxFirst) / 2);
  }

  const left = Math.abs(positions[idxMiddle] - elem);
  const right = Math.abs(positions[idxMiddle + 1] - elem);

  return left <= right ? positions[idxMiddle] : positions[idxMiddle + 1];
}

function setPhoneMask(e, el, caretPositions, rightMargins, leftMargins) {
  const pressedKey = e.data;
  const caretPosition = el.selectionStart;

  if (/^([0-9])$/.test(pressedKey)) {
    editPhoneNumber(pressedKey, caretPosition, caretPositions, rightMargins, leftMargins);
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
        changePhoneValue(phoneEl, mc);
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
      changePhoneValue(phoneEl, mc);
      setCaretPosition(phoneEl, caretPositions[length - 2]);
    }
  }
}
