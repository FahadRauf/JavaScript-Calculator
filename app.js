const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".keys");
const display = document.querySelector(".display");

const calculate = (n1, op, n2) => {
  let result = "";
  if (op === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  }
  if (op === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  }
  if (op === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  }
  if (op === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }
  return result;
};

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    if (!action) {
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKey = "number";
    }
    if (action === "decimal") {
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (previousKeyType === "operator") {
        display.textContent = "0.";
      }

      calculator.dataset.previousKeyType = "decimal";
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      key.classList.add(".depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
    }

    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }

      display.textContent = 0;
      calculator.dataset.previousKeyType = "clear";
    }

    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      display.textContent = calculate(firstValue, operator, secondValue);
      calculator.dataset.previousKeyType = "calculate";
    }
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove(".depressed")
    );
  }
});
