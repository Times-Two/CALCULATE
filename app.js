// CALCULATOR PROGRAM

const display = document.getElementById("display");

const operators = ['+', '-', '×', '÷'];

function appendToDisplay(input) {
    const lastChar = display.value.slice(-1);

    console.log(`Button Pressed: ${input}`);
    console.log(`Last Character on Display: ${lastChar}`);
    
    // If it's an operator, replace the last operator
    if (operators.includes(input)) {
        if (operators.includes(lastChar)) {
            // Replace the last operator with the new one
            display.value = display.value.slice(0, -1) + input;
            console.log(`Replaced operator. New Display: ${display.value}`);
            return;
        }
    }

    if (input === '.') {
        // Prevent multiple decimals in one number
        let parts = display.value.split(/[+\-×÷]/);
        let lastPart = parts[parts.length - 1];
        if (lastPart.includes('.')) {
            return; // Already has a decimal
        }
    }

    display.value += input;
    console.log(`New Display: ${display.value}`);
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace × with * and ÷ with / for real calculation
        const expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        display.value = eval(expression);
        console.log(`Calculation Result: ${display.value}`);
    }
    catch(error) {
        display.value = "ERROR.....";
        console.error(error);
    }
}

function percentage() {
    if(display.value !== "") {
        display.value = parseFloat(display.value) / 100;
    }
}

function squareRoot() {
    if(display.value !== "") {
        display.value = Math.sqrt(parseFloat(display.value));
    }
}

function square() {
    if(display.value !== "") {
        display.value = Math.pow(parseFloat(display.value), 2);
    }
}

function inverse() {
    if(display.value !== "" && parseFloat(display.value) !== 0) {
        display.value = 1 / parseFloat(display.value);
    }
}
