'use strict';

const numbers = Array.from(document.querySelectorAll('.numbers'));
const dot = document.querySelector('.dot');
const operations = Array.from(document.querySelectorAll('.operation'));
const equal = document.querySelector('.equal-container');
const display = document.querySelector('.display');
const cancel = document.querySelector('.cancel');

const displayContent = (element) => {
    element === '' ? display.textContent = '' : display.textContent += element.textContent;
}

let result = NaN;
function checkResult(item) {
    if (Number.isNaN(result) && display.textContent !== 'ERROR') {
        displayContent(item);
    } else {
        displayContent('');
        displayContent(item);
        result = NaN;
    }
}

numbers.forEach(item => item.addEventListener('click', () => checkResult(item)));
operations.forEach(item => item.addEventListener('click', () => checkResult(item)));
cancel.addEventListener('click', () => displayContent(''));

const opArray = (array) => {
    return array.filter(item => !(parseFloat(item) >= 0)).filter(item => item !== '.');
}

const multiSplit = (element, separator) => {
    let tempChar = separator[0];
    for (let i = 1; i < separator.length; i += 1) {
        element = element.split(separator[i]).join(tempChar);
    }
    element = element.split(tempChar);
    return element;
}

const symbols = ['+', '-', 'x', '÷'];
const numberArray = (text) => {
    let numbers = multiSplit(text, symbols);
    numbers = numbers.map(item => parseFloat(item));
    return numbers;
}

const resultCount = (num, op) => {
    let result = num[0];
    for (let i = 1; i < num.length; i += 1) {
        if (op[i - 1] === '+') {
            result = result + num[i];
        } else if (op[i - 1] === '-') {
            result = result - num[i];
        } else if (op[i - 1] === 'x') {
            result = result * num[i];
        } else {
            result = result / num[i];
        };
    }
    return result;
}

const resultDisplay = (numbers, operation, result) => {
    if (Number.isNaN(result) || [...display.textContent].filter(item => (item === '.')).length > 1) {
        display.textContent = 'ERROR';
    } else {
        display.textContent = resultCount(numbers, operation);

    }
}

equal.addEventListener('click', () => {
    const operation = opArray([...display.textContent]);
    const nums = numberArray(display.textContent);
    result = resultCount(nums, operation);
    resultDisplay(nums, operation, result);
});
