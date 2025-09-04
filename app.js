const inputBox = document.getElementById("input-box");
const buttons = document.querySelectorAll("button");

let expression = "";

function calculate(value) {
  if (value === "AC") {
    expression = "";
    inputBox.value = "0";
  } 
  else if (value === "DEL") {
    expression = expression.slice(0, -1);
    inputBox.value = expression || "0";
  } 
  else if (value === "=") {
    try {
      expression = eval(expression).toString();
      inputBox.value = expression;
    } catch {
      inputBox.value = "Error";
      expression = "";
    }
  } 
  else if (["+", "-", "*", "/", "%"].includes(value)) {
    if (/[+\-*/%]$/.test(expression)) {
      expression = expression.slice(0, -1) + value;
    } else {
      expression += value;
    }
    inputBox.value = expression;
  }
  else if (value === "x²") {
    if (expression) {
      expression = Math.pow(eval(expression), 2).toString();
      inputBox.value = expression;
    }
  }
  else if (value === "x³") {
    if (expression) {
      expression = Math.pow(eval(expression), 3).toString();
      inputBox.value = expression;
    }
  }
  else if (value === "√") {
    if (expression) {
      expression = Math.sqrt(eval(expression)).toString();
      inputBox.value = expression;
    }
  }
  else if (value === "1/x") {
    if (expression) {
      expression = (1 / eval(expression)).toString();
      inputBox.value = expression;
    }
  }
  else {
    expression += value;
    inputBox.value = expression;
  }
}

buttons.forEach(button => {
  button.addEventListener("click", e => {
    calculate(e.target.innerText);
  });
});
document.addEventListener("keydown", e => {
  if ((e.key >= "0" && e.key <= "9") || ["+", "-", "*", "/", "%", "."].includes(e.key)) {
    expression += e.key;
    inputBox.value = expression;
  }
  else if (e.key === "Enter") {
    calculate("=");
  }
  else if (e.key === "Backspace") {
    calculate("DEL");
  }
  else if (e.key === "Escape") {
    calculate("AC");
  }
});

