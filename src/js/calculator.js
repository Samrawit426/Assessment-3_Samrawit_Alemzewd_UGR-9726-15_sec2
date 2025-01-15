document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    const clearButton = document.getElementById("clear");
    const equalsButton = document.getElementById("equals");

    let currentInput = ""; // Current number input
    let operator = ""; // Current operator
    let firstOperand = null; // First operand for calculation

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.dataset.value;

            // Handle operator input
            if (["/", "*", "-", "+"].includes(value)) {
                if (currentInput) {
                    // If there's current input, calculate based on the previous operator
                    if (firstOperand === null) {
                        firstOperand = parseFloat(currentInput);
                    } else {
                        firstOperand = operate(firstOperand, parseFloat(currentInput), operator);
                    }
                    operator = value; // Set the new operator
                    currentInput = ""; // Clear current input for the next number
                } else if (firstOperand !== null) {
                    operator = value; // If no current input, just change the operator
                }
                updateDisplay();
            } else {
                currentInput += value; // Append number or decimal point
                updateDisplay();
            }
        });
    });

    equalsButton.addEventListener("click", () => {
        if (currentInput && operator) {
            // Calculate the result if there's valid input and an operator
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
            } else {
                firstOperand = operate(firstOperand, parseFloat(currentInput), operator);
            }
            display.value = firstOperand; // Show the result
            currentInput = ""; // Clear current input for a new operation
            operator = ""; // Clear the operator to allow for new input
        }
    });

    clearButton.addEventListener("click", resetCalculator);

    function resetCalculator() {
        // Clear all inputs and reset the calculator state
        currentInput = ""; // Clear current input
        operator = ""; // Clear operator
        firstOperand = null; // Reset first operand
        display.value = ""; // Clear display
    }

    function operate(a, b, op) {
        switch (op) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return b !== 0 ? a / b : "Error"; // Prevent division by zero
            default:
                return b;
        }
    }

    function updateDisplay() {
        // Show the current input and the operator for clarity
        display.value = firstOperand !== null 
            ? `${firstOperand} ${operator} ${currentInput}` 
            : currentInput;
    }
});
