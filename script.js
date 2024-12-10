// Seletores
const display = document.getElementById("calc-display");
const historyContainer = document.getElementById("history-container");
const historyList = document.getElementById("history-list");

let currentInput = ""; // Armazena o número ou operação atual
let operation = "";    // Armazena a operação selecionada
let firstOperand = null; // Primeiro número da operação
let history = [];      // Histórico de operações

// Função para adicionar número ao display
function appendNumber(number) {
    currentInput += number;
    updateDisplay(currentInput);
}

// Função para escolher uma operação
function chooseOperation(op) {
    if (currentInput === "") return; // Não faça nada se o input estiver vazio
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
        operation = op;
        currentInput = "";
    } else if (operation) {
        calculate(); // Calcula caso já tenha uma operação pendente
        operation = op;
    }
}

// Função para calcular o resultado
function calculate() {
    if (firstOperand === null || currentInput === "" || !operation) return;
    let secondOperand = parseFloat(currentInput);
    let result;

    switch (operation) {
        case "+":
            result = firstOperand + secondOperand;
            break;
        case "-":
            result = firstOperand - secondOperand;
            break;
        case "*":
            result = firstOperand * secondOperand;
            break;
        case "/":
            result = secondOperand !== 0 ? firstOperand / secondOperand : "Erro";
            break;
        default:
            return;
    }

    if (result !== "Erro") {
        addToHistory(`${firstOperand} ${operation} ${secondOperand} = ${result}`);
        firstOperand = result; // Permite operações encadeadas
    } else {
        firstOperand = null;
    }
    operation = "";
    currentInput = "";
    updateDisplay(result);
}

// Função para calcular a raiz quadrada
function calculateSquareRoot() {
    if (currentInput === "") return;
    let number = parseFloat(currentInput);
    let result = number >= 0 ? Math.sqrt(number) : "Erro";
    if (result !== "Erro") {
        addToHistory(`√${number} = ${result}`);
    }
    updateDisplay(result);
    currentInput = "";
    firstOperand = null;
}

// Função para limpar o display
function clearDisplay() {
    currentInput = "";
    firstOperand = null;
    operation = "";
    updateDisplay("0");
}

// Função para atualizar o display
function updateDisplay(value) {
    display.value = value;
}

// Função para adicionar operação ao histórico
function addToHistory(entry) {
    history.push(entry);
    const listItem = document.createElement("li");
    listItem.textContent = entry;
    historyList.appendChild(listItem);
}

// Função para mostrar ou esconder o histórico
function showHistory() {
    if (historyContainer.style.display === "block") {
        historyContainer.style.display = "none";
    } else {
        historyContainer.style.display = "block";
    }
}
