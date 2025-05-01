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


if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js")
        .then((reg) => console.log("Service Worker registered!", reg))
        .catch((err) => console.error("Service Worker registration failed:", err));
    });
  }

  // Dropdown toggle
function toggleDropdown() {
    const menu = document.getElementById('dropdown-menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const profile = document.getElementById('profile-container');
    if (!profile.contains(event.target)) {
        document.getElementById('dropdown-menu').style.display = 'none';
    }
});

// Placeholder for history
function showHistory() {
    alert("Calculation History feature coming soon!");
}

function clearHistory() {
    localStorage.removeItem('calcHistory');
    alert("History cleared!");
}

// Calculate and save to history
function calculate() {
    const display = document.getElementById('display');
    let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');

    try {
        let result = eval(expression);
        saveToHistory(`${display.value} = ${result}`);
        display.value = result;
    } catch (e) {
        display.value = "Error";
    }
}

// Save to localStorage
function saveToHistory(entry) {
    let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
    history.unshift(entry); // Add newest first
    if (history.length > 10) history.pop(); // Limit to 10 entries
    localStorage.setItem('calcHistory', JSON.stringify(history));
}

// Show calculation history
function showHistory() {
    const history = JSON.parse(localStorage.getItem('calcHistory')) || [];
    if (history.length === 0) {
        alert("No history yet.");
    } else {
        alert("Calculation History:\n\n" + history.join('\n'));
    }
}

// Clear history
function clearHistory() {
    localStorage.removeItem('calcHistory');
    alert("History cleared!");
}


// Toggle dark/light theme
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
}
