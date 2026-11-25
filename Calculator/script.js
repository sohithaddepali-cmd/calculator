
const input = document.getElementById("input");
const result = document.getElementById("result");
const buttons = document.querySelectorAll("button");

let expression = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "C") {
            expression = "";
            input.textContent = "";
            result.textContent = "0";
            return;
        }

        if (value === "DEL") {
            expression = expression.slice(0, -1);
            input.textContent = expression;
            calculate();
            return;
        }

        if (value === "=") {
            calculate(true);
            return;
        }

        const operators = ["+", "−", "×", "÷"];

        if (operators.includes(value)) {
            if (expression === "" && value !== "−") return;

            if (operators.includes(expression.slice(-1))) {
                expression = expression.slice(0, -1);
            }

            expression += value;
        } else if (value === ".") {
            const currentNumber = expression.split(/[+−×÷]/).pop();

            if (currentNumber.includes(".")) return;

            expression += value;
        } else {
            expression += value;
        }

        input.textContent = expression;
        calculate();
    });
});

function calculate(finalAnswer = false) {
    try {
        if (!expression || /[+−×÷.]$/.test(expression)) {
            result.textContent = "0";
            return;
        }

        let formatted = expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-");

        // Allow only calculator characters.
        if (!/^[0-9+\-*/. ]+$/.test(formatted)) {
            throw new Error("Invalid input");
        }

        // Evaluate the arithmetic expression.
        let answer = Function('"use strict"; return (' + formatted + ')')();

        if (!Number.isFinite(answer)) {
            throw new Error("Cannot divide by zero");
        }

        result.textContent = Number(answer.toFixed(8));

        if (finalAnswer) {
            expression = String(Number(answer.toFixed(8)));
            input.textContent = expression;
        }

    } catch (error) {
        result.textContent = finalAnswer ? "Error" : "0";
    }
}
