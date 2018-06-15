'use strict';
var maxNumLength = 9;
var calcMemory = '';
var calcText = '';
var dot = false;
var btnAct = false;
var result = null;
var number = null;
var act = null;
var actTemp = null;

var maxNum = '';
for (let i = 1; i <= maxNumLength; i++) {
  maxNum = maxNum + '9';
}
maxNum = +maxNum;

function btnClear() {
  calcMemory = '';
  calcText = '0';
  dot = false;
  btnAct = false;
  result = null;
  number = null;
  act = null;
  actTemp = null;

  changeCalcText(calcText);
  changeCalcMemory(calcMemory);
}

function changeCalcText(str) {
  document.getElementById('display').innerHTML = str;
}

function changeCalcMemory(str) {
  calcMemory = calcMemory + str;

  if (typeof result === 'number') {
    document.getElementById('js-memoryField').innerHTML =
      calcMemory + ' = ' + result;
  } else {
    document.getElementById('js-memoryField').innerHTML =
      calcMemory + ' = ' + calcText;
  }
}

function btnNumber() {
  if (btnAct) {
    btnAct = false;

    number = parseFloat(calcText);
    calcText = '';
    dot = false;

    if (typeof result === 'number') {
      calc();
    } else {
      result = number;
    }

    act = actTemp;
    changeCalcMemory(act);
  }

  let currentSumbol = event.target.textContent;

  if (currentSumbol === '.') {
    if (!dot) {
      dot = true;
      if (calcText.length === 0 || calcText === '0') {
        currentSumbol = '0' + currentSumbol;
      }
    } else {
      return;
    }
  }

  if (calcText.length >= maxNumLength) {
    return;
  }

  if (calcText === '0' && currentSumbol === '0') {
    return;
  }

  if (calcText === '0') {
    calcText = currentSumbol;

    if (calcText === '.') {
      calcText = '0.';
    }
  } else {
    calcText = calcText + currentSumbol;
  }

  changeCalcMemory(currentSumbol);
  changeCalcText(calcText);
}

function btnAction() {
  btnAct = true;
  actTemp = event.target.textContent;

  changeCalcText(actTemp);
}

function calc() {
  switch (act) {
    case '+':
      result = +(result + number).toFixed(maxNumLength - 1);
      break;
    case '−':
      result = +(result - number).toFixed(maxNumLength - 1);
      break;
    case '∗':
      result = +(result * number).toFixed(maxNumLength - 1);
      break;
    case '/':
      result = +(result / number).toFixed(maxNumLength - 1);
      break;
  }

  if (result > maxNum) {
    btnClear();
    changeCalcText('Out of range');

    return false;
  }

  if (Math.abs(result).toString().length > maxNumLength) {
    let temp = Math.abs(result).toString();
    let i = 0;
    while (temp[i] !== '.' && i < temp.length) {
      i++;
    }

    result = +result.toFixed(maxNumLength - i);
  }

  return true;
}

function btnCalculate() {
  if (result === null || calcText === '') {
    return;
  }

  number = parseFloat(calcText);

  if (calc()) {
    calcText = result;

    changeCalcText(calcText);
    changeCalcMemory('');

		calcMemory = result;
		
    let temp = result.toString();
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] === '.') {
        dot = true;
        break;
      }
    }

    btnAct = false;
    result = null;
    act = null;
  }
}
