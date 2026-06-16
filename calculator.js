let number = '';
let justCalculated = false;
let openBrackets = 0;


const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.js-input');
const equalButton = document.querySelector('.js-equal-button');
const clearButton = document.querySelector('.js-ac-button');
const wrongButton = document.querySelector('.js-wrong-button');
const bracketButton = document.querySelector('.js-bracket-button');


function updateDisplay(val) {
  display.textContent = val === '' ? '0' : val;
}


numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.innerText;


    if (justCalculated) {
      if ('+-×÷'.includes(value)) {
        justCalculated = false;
      } else {
        number = '';
        justCalculated = false;
      }
    }


    number += value;
    updateDisplay(number);
  });
});


equalButton.addEventListener('click', () => {
  if (number === '') return;


  try {
    const expression = number
      .replaceAll('×', '*')
      .replaceAll('÷', '/')
      .replaceAll('%', '/100');


    const result = Function('"use strict"; return (' + expression + ')')();


    if (!isFinite(result)) {
      updateDisplay('Error');
      number = '';
      return;
    }


    const rounded = parseFloat(result.toPrecision(12));
    number = String(rounded);
    updateDisplay(number);
    justCalculated = true;
  } catch {
    updateDisplay('Error');
    number = '';
  }
});


clearButton.addEventListener('click', () => {
  number = '';
  justCalculated = false;
  openBrackets = 0;
  updateDisplay('0');
});


wrongButton.addEventListener('click', () => {
  const last = number.slice(-1);
  if (last === '(') openBrackets--;
  if (last === ')') openBrackets++;
  number = number.slice(0, -1);
  updateDisplay(number);
});


bracketButton.addEventListener('click', () => {
  if (
    number === '' ||
    '+-×÷(%'.includes(number.slice(-1))
  ) {
    number += '(';
    openBrackets++;
  } else if (openBrackets > 0) {
    number += ')';
    openBrackets--;
  } else {
    number += '(';
    openBrackets++;
  }


  updateDisplay(number);
});


