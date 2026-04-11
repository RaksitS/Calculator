const calculation = document.getElementById("calculation");
const currentInput = document.getElementById("cal-input");
const allClear = document.getElementById("ac");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const equal = document.getElementById("equal");
const deleteByOne = document.getElementById('delete');
const dot = document.getElementById("dot");

let currentOperand = "";
let previousOperand = "";
let operation = "";


function appendNumber(number) {
    currentOperand += number;
    updateDisplay();
};


function appendOperation(op) {
    if (currentOperand === "" && previousOperand === "") {
        return;
    };

    if (previousOperand !== "" && currentOperand !== "") {
        compute();
    };

    operation = op;
    previousOperand = currentOperand;
    currentOperand = "";
    updateDisplay();
}


function compute() {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if(isNaN(prev) || isNaN(current)) return;
    let result;
    switch (operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = prev / current; break;
        default: return;
    }

    currentOperand = result.toString(); 
    operation = "";                    
    previousOperand = "";
}


equal.addEventListener("click", () => {
    if (currentOperand === "" || previousOperand === "") {
        return
    };
    const formula = `${previousOperand} ${operation} ${currentOperand} =`;
    
    compute();
    currentInput.innerText = currentOperand;
    calculation.innerHTML = formula;
})


function updateDisplay() {
    if (operation !== "" && previousOperand !== "") {
        currentInput.innerText = `${previousOperand} ${operation} ${currentOperand}`;
        calculation.innerText = "";
    } else {
        currentInput.innerText = currentOperand || "0";
        calculation.innerText = "";
    }
};


allClear.addEventListener("click", () => {
    currentOperand = "";
    previousOperand = "";
    operation = "";
    updateDisplay();    
})


deleteByOne.addEventListener("click", () => {
    if (currentOperand !== "") {
        currentOperand = currentOperand.toString().slice(0, -1);
    } else if (operation !== "") {
        operation = "";
        currentOperand = previousOperand;
        previousOperand = "";
    }
    
    updateDisplay();
});

window.addEventListener('keydown', (e) => {
    console.log(e.key);
})