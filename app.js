const inputBox = document.getElementById("input-box");
const buttons = document.querySelectorAll(".buttons button, .trig-buttons button");
const trigContainer = document.querySelector(".trig-buttons");
const toggleTrigBtn = document.querySelector(".toggle-trig");

let expression = "";
let justCalculated = false; 
let mode = "DEG"; 

function toRadians(val) {
  return (val * Math.PI) / 180;
}

function calculate(value) {
  if (value === "AC") {
    expression = "";
    inputBox.value = "0";
    justCalculated = false;
  } 
  else if (value === "DEL") {
    expression = expression.slice(0, -1);
    inputBox.value = expression || "0";
  } 
  else if (value === "=") {
    try {
      expression = eval(expression).toString();
      inputBox.value = expression;
      justCalculated = true;
    } catch {
      inputBox.value = "Error";
      expression = "";
      justCalculated = false;
    }
  } 
  else if (["+", "-", "*", "/", "%"].includes(value)) {
    if (/[+\-*/%]$/.test(expression)) {
      expression = expression.slice(0, -1) + value;
    } else {
      expression += value;
    }
    inputBox.value = expression;
    justCalculated = false;
  }
  else if (value === "x²") {
    if (expression) {
      expression = Math.pow(eval(expression), 2).toString();
      inputBox.value = expression;
      justCalculated = true;
    }
  }
  else if (value === "x³") {
    if (expression) {
      expression = Math.pow(eval(expression), 3).toString();
      inputBox.value = expression;
      justCalculated = true;
    }
  }
  else if (value === "√") {
    if (expression) {
      expression = Math.sqrt(eval(expression)).toString();
      inputBox.value = expression;
      justCalculated = true;
    }
  }
  else if (value === "1/x") {
    if (expression) {
      expression = (1 / eval(expression)).toString();
      inputBox.value = expression;
      justCalculated = true;
    }
  }
  else if (value === "sin") {
    if (expression) {
      let val = eval(expression);
      let radians = (mode === "DEG") ? toRadians(val) : val;
      expression = Math.sin(radians).toString();
      inputBox.value = expression;
      justCalculated = true;
    }
  }
  else if (value === "cos") {
    if (expression) {
      let val = eval(expression);
      let radians = (mode === "DEG") ? toRadians(val) : val;
      expression = Math.cos(radians).toString();
      inputBox.value = expression;
      justCalculated = true;
    }
  }
  else if (value === "tan") {
    if (expression) {
      let val = eval(expression);
      let radians = (mode === "DEG") ? toRadians(val) : val;
      expression = Math.tan(radians).toString();
      inputBox.value = expression;
      justCalculated = true;
    }
  }
  else if (value === "DEG" || value === "RAD") {
    mode = (mode === "DEG") ? "RAD" : "DEG"; 
    document.querySelector(".mode").innerText = mode;
  }
  else {
    if (justCalculated) {
      expression = "";
      justCalculated = false;
    }
    expression += value;
    inputBox.value = expression;
  }
}


toggleTrigBtn.addEventListener("click", () => {
  trigContainer.classList.toggle("hidden");
});


buttons.forEach(button => {
  button.addEventListener("click", e => {
    const val = e.target.innerText;
    if (val !== "Trig") {  
      calculate(val);
    }
  });
});


document.addEventListener("keydown", e => {
  if ((e.key >= "0" && e.key <= "9") || ["+", "-", "*", "/", "%", "."].includes(e.key)) {
    if (justCalculated) {
      expression = "";
      justCalculated = false;
    }
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
