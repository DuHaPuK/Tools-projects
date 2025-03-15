/*
  Задача, которую надо доделать: 
      5. Логика сохранение всех истории расчетов и стирание после нажатие на кнопку стереть именно в этой вкладке показа истории.
      4.3.1 После нажатие ровно, добавлять историю вычисление в отдельную переменную(память) и только после этого очищать временную историю.
      6.1 Если стоят скобки, то сначало вычислять то что находится в скобах.
      6.1 Так как ответ выводится сразу после набора чисел, то нужно учитывать порядок вычисление примера (сначала умножение и деление, затем сложение и вычитание). ( Я думаю надо
      будет постоянно обновлять )
      А еще должна так же учитывать скобки, и количество поставленные скобок, то есть вычисляла именно сначала скобки по порядоку, и только потом все остальное,
      хотя остальное тоже надо учиывать, как умножение как и сложение( тоже есть порядок).
      ---
      Еще когда вычитаешь больше чем первое число, то расчет не идет дальше .. Будто на минус не уходит
      

*/

const calculator = document.querySelector(".calculator");
let tempHistory = [];
let answer = "";
let tempNumber = "";
let typeOperation;
let comma;
let bracket = false;
let calcAnswer;
let calcAnswercopy;

/* Отслеживание клика по кнопкам */

calculator.addEventListener("click", (event) => {
  let target = event.target;
  if (target.classList.contains("calculator__actions__col")) {
    const data = target.dataset.type;
    getTypeDefinition(data);
    renderHistory(tempHistory);
    comma = checkHasDot(tempHistory);
    if (tempHistory.length > 0) {
      bracket = checkHasBracket(tempHistory);
    }
    let arrForCalc = updateExpression(tempHistory);
    calcAnswer = tempCalcAnswer(arrForCalc);
    renderAnswer(calcAnswer, calcAnswercopy);
  }
});

/* Вывод ошибки на дисплее */

function showMessage() {
  let message = document.querySelector(".error-msg");
  message.classList.add("show");

  setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
}

/* Отслеживание определенных нажатых кнопок и их дальнейшие действие. */

function getTypeDefinition(data) {
  if (data >= 0) {
    typeOperation = "number";
    tempNumber = tempNumber + data;
    tempHistory.push(data);
  } else if (
    ["+", "-", "*", "/", "%"].includes(data) &&
    typeOperation === "number"
  ) {
    if (["+", "-", "*", "/"].includes(tempHistory[tempHistory.length - 1])) {
      tempHistory.splice(-1);
      tempHistory.push(data);
    }else {
      tempNumber = "";
      tempHistory.push(data);
    }
  } else if (data === "clear") {
    typeOperation = "clear";
    tempHistory = [];
    calcAnswercopy = "0";
    bracket = false;
    tempNumber = "";
  } else if (data === "delete") {
    tempNumber = tempNumber.slice(0, -1);
    tempHistory.splice(-1);
  } else if (data === ".") {
    if (!/\./.test(tempNumber) && !comma) {
      if (tempNumber) {
        tempNumber = tempNumber + data;
        tempHistory.push(data);
      } else {
        tempNumber = "0.";
        tempHistory.push(tempNumber);
      }
    }
  } else if (data === "=") {
    if(typeOperation === "equals") {
      return;
    }
    calcAnswercopy = calcAnswer;
    typeOperation = "equals";
    tempHistory = [];
    bracket = false;
  } else if (data === "bracket") {
    let rigthBracket = ")";
    let leftBracket = "(";

    if (bracket === false || typeOperation === "clear") {
      if (
        tempHistory[tempHistory.length - 1] === ")" ||
        (["+", "-", "*", "/", "%"].includes(
          tempHistory[tempHistory.length - 1]
        ) === false &&
          tempHistory.length > 0)
      ) {
        showMessage();
        return;
      }
      data = leftBracket;
      tempHistory.push(data);
    } else {
      data = rigthBracket;
      tempHistory.push(data);
    }
  }
}

/* Определение наличие запятой в последнем числе массива, возрат булевое значение */

function checkHasDot(arr) {
  if (arr.length === 0) return false;

  let lastNumber = "";

  for (let i = arr.length - 1; i >= 0; i--) {
    if (/\d/.test(arr[i]) || arr[i] === ".") {
      lastNumber = lastNumber + arr[i];
    } else {
      break;
    }
  }
  return lastNumber.includes(".");
}

/* Опредление наличие скобки и какой скобки , возврат булевое значение. */

function checkHasBracket(arr) {
  if (arr.length > 0) {
    for (let i = arr.length - 1; i >= 0; --i) {
      if (arr[i] === "(") {
        return true;
      } else if (arr[i] === ")") {
        return false;
      }
    }
    return false;
  }
}

/* Определение нажатых кнопок клавиатурой */

/* Отрисовка истории расчета на дисплее*/

function renderHistory(arr) {
  const historyDisplay = document.querySelector(
    ".calculator__display__history"
  );
  let htmlElements = "";
  arr.forEach((item) => {
    if (item >= 0 || item === "." || item === "(" || item === ")") {
      htmlElements = htmlElements + `<span>${item}</span>`;
    } else if (["+", "-", "*", "/", "%"].includes(item)) {
      item = item === "/" ? "÷" : item === "*" ? "×" : item;
      htmlElements = htmlElements + `<strong> ${item} </strong>`;
    }
  });
  historyDisplay.innerHTML = htmlElements;
}

/* Отрисовка ответа */

function renderAnswer(meaning, meaningCopy) {
  const answerDisplay = document.querySelector(".calculator__display__answer");

  if (meaningCopy >= 0 && meaning === 0 ) {
    if (meaningCopy === undefined) {
      meaningCopy = 0;
      answerDisplay.innerHTML = meaningCopy;
    }
    answerDisplay.innerHTML = meaningCopy;
  } else if (meaning >= 0 || Number.isNaN(meaning)) {
    if (Number.isNaN(meaning)) {
      meaning = 0;
      answerDisplay.innerHTML = meaning;
    } else {
      answerDisplay.innerHTML = meaning;
    }
  }
}

/* Вычисление */

function tempCalcAnswer(arr) {
  let total = 0;
  arr.forEach((item, index) => {
    item = parseFloat(item);
    if (index === 0) {
      total = item;
    } else if (index - 2 >= 0) {
      let prevItem = arr[index - 1];
      if (prevItem === "+") {
        total = total + item;
      } else if (prevItem === "-") {
        total = total - item;
      } else if (prevItem === "*") {
        total = total * item;
      } else if (prevItem === "/") {
        total = total / item;
      }
    }
  });
  return total;
}

/* Сортирует массив для дальнейших вычислений */

function updateExpression(arr) {
  let result = [];
  let bufferNum = "";

  arr.forEach((item, index) => {
    if (!isNaN(item) || item === ".") {
      bufferNum = bufferNum + item;
    } else {
      if (bufferNum) {
        result.push(bufferNum);
        bufferNum = "";
      }
      result.push(item);
    }
  });

  if (bufferNum) {
    result.push(bufferNum);
  }
  return result;
}

