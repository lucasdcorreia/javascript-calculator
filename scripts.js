// Elements selection

const display = document.querySelector('#displayInput')
const equalsButton = document.querySelector('.igual')
const dotButton = document.querySelector('.ponto')
const numberButtons = document.querySelectorAll('.num')
const operationButtons = document.querySelectorAll('.operador')

// Global Variables

let currentOperation = "";
let operator = null;
let lastValue = "";
let calculating = false;

// Functions

function displayUpdate() {
  display.value = currentOperation;
}

function insertNumber(event) {
  if(calculating){
    currentOperation = event.target.textContent;
    calculating = false;
  } else {
    currentOperation += event.target.textContent;
  }
  displayUpdate();
}

function dotInsert() {
  if (currentOperation.indexOf(".") === -1){
    currentOperation += ".";
    displayUpdate();
  }
}

function operatorInsert(event) {
  if(!calculating){
    if(operator != null) {
      calculate()
    }
    lastValue = currentOperation;
    currentOperation = ""
  }
  operator = event.target.textContent
}

function calculate() {

  let result = null;
  const lastOperand = parseFloat(lastValue)
  const currentOperand = parseFloat(currentOperation)
  switch(operator) {
    case "+":
      result = lastOperand + currentOperand;
      break;
    case "-":
      result = lastOperand - currentOperand;
      break;
    case "*":
      result = lastOperand * currentOperand;
      break;
    case "/":
      result = lastOperand / currentOperand;
      break;
  }

  currentOperation = String(result);
  lastValue = currentOperation;
  calculating = true;
  displayUpdate();
}

// Events

numberButtons.forEach((button) => button.addEventListener("click", insertNumber))
dotButton.addEventListener("click", dotInsert)
operationButtons.forEach((button) => button.addEventListener("click", operatorInsert))
equalsButton.addEventListener("click", calculate)
