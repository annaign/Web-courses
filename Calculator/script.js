'use strict';
var maxNumLength = 9;
var calcMemory = "";
var calcText = "";
var dot = false;
var btnAct = false;
var result = null;
var number = null;
var act = null;

var maxNum = "";
for (let i = 1; i <= maxNumLength; i++) {
	maxNum = maxNum + "9";
}
maxNum = +maxNum;

function btnClear() {
	calcMemory = "";
	calcText = "";
	dot = false;
	btnAct = false;
	result = null;
	number = null;
	act = null;

	changeCalcText(calcText);
	changeCalcMemory(calcMemory);
}

function changeCalcText(str) {
	document.getElementById('js-textField').innerHTML = str;
}

function changeCalcMemory(str) {
	calcMemory = calcMemory + str;

	if (typeof result === "number") {
		document.getElementById('js-memoryField').innerHTML = calcMemory + " = " + result;
	} else {
		document.getElementById('js-memoryField').innerHTML = calcMemory + " = " + calcText;
	}
}

function btnNumber() {
	let currentSumbol = event.target.textContent;

	if (currentSumbol === '.') {
		if (!dot) {
			dot = true;
			if (calcText.length === 0) {
				currentSumbol = "0" + currentSumbol;
			}
		} else {
			return;
		}
	}

	if (calcText.length >= maxNumLength) {
		return;
	}

	btnAct = false;
	calcText = calcText + currentSumbol;

	changeCalcText(calcText);
	changeCalcMemory(currentSumbol);
}

function btnAction() {
	let currentSumbol = event.target.textContent;

	if (btnAct || calcText.length === 0) {
		return;
	}

	number = parseFloat(calcText);

	if (typeof result !== "number") {
		result = number;
	} else {
		if (!calc()) {
			return;
		}
	}

	act = currentSumbol;
	btnAct = true;
	calcText = "";
	dot = false;

	changeCalcMemory(currentSumbol);
	changeCalcText(currentSumbol);
}

function calc() {
	switch (act) {
		case "+":
			result = +(result + number).toFixed(maxNumLength - 1);
			break;
		case "−":
			result = +(result - number).toFixed(maxNumLength - 1);
			break;
		case "∗":
			result = +(result * number).toFixed(maxNumLength - 1);
			break;
		case "/":
			result = +(result / number).toFixed(maxNumLength - 1);
			break;
	}

	if (result > maxNum) {
		btnClear();
		changeCalcText("Out of range");

		return false;
	}

	if (result.toString().length > maxNumLength) {
		let temp = result.toString();
		let i = 0;
		while (temp[i] !== "." && i < temp.length) {
			i++;
		}

		result = +result.toFixed(maxNumLength - i);
	}

	return true;
}

function btnCalculate() {
	if (result === null || calcText === "") {
		return;
	}

	number = parseFloat(calcText);

	if (calc()) {
		calcText = result;

		changeCalcText(calcText);
		changeCalcMemory("");

		calcMemory = result;

		let temp = result.toString();
		let i = 0;
		while (i < temp.length) {
			if (temp[i] === ".") {
				dot = true;
				break;
			}
			i++;
		}

		btnAct = false;
		result = null;
	}

}
