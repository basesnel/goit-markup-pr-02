// Phone-input initialization:
const phoneInput = document.querySelector('#tel');

phoneInput.addEventListener('keydown', e => {
  console.log(e.target.value.length);

  if (!e.target.value.length) e.target.value = '+38 (___) ___-__-__';

  // process event only key is a number
});

// //Функция маски инпута
// function setMask(event) {
//   //Задаем в переменную нажатую клавишу
//   let pressedKey;
//   //Условие, проверяющее нажатую клавишу
//   event.keyCode && pressedKey === event.keyCode;
//   //Задаем в переменную позицию в инпуте, с которой будет доступен ввод цифр
//   let numberPos = this.selectionStart;
//   //Устанавливаем возможность ввода цифр с третьей позиции
//   if (numberPos < 3) {
//     event.preventDefault();
//   }
//   //Задаем внешний вид маски инпута
//   let maskType = '+38 (___) ___-__-__',
//     i = 0,
//     //Проверка и замена value инпута по буквенно
//     replaceValue = maskType.replace(/\D/g, ''),
//     prevValue = this.value.replace(/\D/g, ''),
//     currentValue = maskType.replace(/[_\d]/g, a => {
//       return i < prevValue.length ? prevValue.charAt(i++) || replaceValue.charAt(i) : a;
//     });
//   //Защита от стирания первых двух цифр (+7)
//   i = currentValue.indexOf('_');
//   if (i != -1) {
//     i < 5 && (i = 3);
//     currentValue = currentValue.slice(0, i);
//   }
//   //Регулярное выражение для проверки value инпута
//   let reg = maskType
//     .substr(0, this.value.length)
//     .replace(/_+/g, function (a) {
//       return '\\d{1,' + a.length + '}';
//     })
//     .replace(/[+()]/g, '\\$&');
//   reg = new RegExp('^' + reg + '$');
//   //Проверка содержимого инпута на регулярное выражение, длинну и нажимаемые клавиши
//   if (!reg.test(this.value) || this.value.length < 5 || (pressedKey > 47 && pressedKey < 58)) {
//     this.value = currentValue;
//   } else if (event.type === 'blur' && this.value.length < 5) {
//     this.value = '';
//   }

//   // Устанавливаем курсор в конец строки в инпуте, если при нажатии кнопки он стоит не в конце
//   phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
// }

//Запуск функции setMask через обработчик событий
// phoneInput.addEventListener('phoneInput', setMask, false);
// phoneInput.addEventListener('focus', setMask, false);
// phoneInput.addEventListener('blur', setMask, false);
// phoneInput.addEventListener('keydown', setMask, false);
