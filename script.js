const DEFAULT_STRING = "";
const DEFAULT_VALUE = 0;
const DEFAULT_OPERATION = ""
const DEFAULT_MODE = "NEW"

let currentString = DEFAULT_STRING;
let currentValue = DEFAULT_VALUE;
let currentOperation = DEFAULT_OPERATION;
let currentMode = DEFAULT_MODE;

const displayString = document.getElementById('displayBox');
const numberBtns = document.getElementsByClassName('number');
const operatorBtns = document.getElementsByClassName('operator');
const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');

clearBtn.onclick = () => clear();
deleteBtn.onclick = () => deleteLastNumber();

function setCurrentString(newString) {
  currentString = newString;
}

function setCurrentValue(newValue) {
  currentValue = newValue;
}

function setCurrentOperation(newOperation) {
  currentOperation = newOperation;
}

function setCurrentMode(newMode) {
  currentMode = newMode;
}

function getDisplayString() {
  return displayString.innerHTML;
}

function changeDisplayString() {
  displayString.innerHTML = currentString;
}

function getValueFromNumberBtn(e) {
  if(currentMode == "NEW"){
    setCurrentString("");
    changeDisplayString();
    setCurrentMode("ADD");
  }
  let numberValue = e.target.getAttribute('value');
  let stringValue = currentString + numberValue;
  setCurrentString(stringValue);
  changeDisplayString();
}

function getValueFromOperatorBtn(e) {
  let operation = e.target.getAttribute('value');
  if(currentOperation == "" || currentOperation == "="){
      setCurrentOperation(operation);
      setCurrentValue(currentString);
      setCurrentString("");
      changeDisplayString();
      setCurrentMode("NEW");
  }else{
    let currentResult = doOperationWithCurrentValue(currentOperation, currentString);
    setCurrentOperation(operation);
    setCurrentValue(currentResult);
    setCurrentString(currentResult);
    changeDisplayString();
    setCurrentMode("NEW");
  }
} 

function doOperationWithCurrentValue(operation, value){
  let result = 0;
  if(operation == "+"){
    result = Number(currentValue) + Number(value);
  }
  if(operation == "-"){
    result = Number(currentValue) - Number(value);
  }
  if(operation == "*"){
    result = Number(currentValue) * Number(value);
  }
  if(operation == "/"){
    result = Number(currentValue) / Number(value);
  }
  return result;
}

function clear(){
  setCurrentString('');
  setCurrentValue('0');
  setCurrentOperation('');
  changeDisplayString();
}

function deleteLastNumber(){
  let string = getDisplayString();
  if(string.length > 0){
    string = string.slice(0, -1);
  }
  setCurrentString(string);
  changeDisplayString();
}


function initial() {
  for(let i = 0; i < numberBtns.length; i++){
    numberBtns[i].addEventListener("click", getValueFromNumberBtn);
  }

  for(let i = 0; i < operatorBtns.length; i++){
    operatorBtns[i].addEventListener("click", getValueFromOperatorBtn);
  }
}

window.onload = () => {
  initial();
}