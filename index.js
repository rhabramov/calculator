// Set the GLOBAL variables that will be used throughout the code
let display;
let operator_pressed = false;
let previous_number = 0;
let current_operation;

// Function that runs when the page is loaded
function loadPage() {
    // Set the display to be 0
    display = 0;
    document.getElementById("display").value = "0";

    // Create functions for each of the number buttons
    let number_buttons = document.querySelectorAll('.number_button');
    number_buttons.forEach(function(number_button) {
        number_button.addEventListener('click', function() {
            let number = number_button.innerHTML;
            add_number_to_display(number);
      });
    });

    // Create functions for each of the calculate buttons
    let operator_buttons = document.querySelectorAll('.operator_button');
    operator_buttons.forEach(function(operator_button) {
        operator_button.addEventListener('click', function() {
            let operation = operator_button.innerHTML;
            operator_clicked(operation);
      });
    });

    // Create a function for when the equal button is clicked
    let equal_button = document.querySelector(".equal_button");
    equal_button.addEventListener('click', function() {
        equal_button_clicked();
    });
}

// Basic arithmetic function
function add(num_1, num_2) {
    return num_1 + num_2;
}

function subtract(num_1, num_2) {
    return num_1 - num_2;
}

function multiply(num_1, num_2) {
    return num_1 * num_2;
}

function divide(num_1, num_2) {
    return num_1 / num_2;
}

// 'Operate' function
function operate(operator, num_1, num_2) {
    // Do the operation
    let result = window[operator](parseInt(num_1), parseInt(num_2));

    // Updat the display text and the display value
    display = result;
    document.getElementById("display").value = display;
}

// Function to concatenate a number to the current display 
function add_number_to_display(append_to_display) {
    if (display == "0" || operator_pressed) {
        display = append_to_display;
        operator_pressed = false;
    } else {
        display = display + '' + append_to_display;
    }
    document.getElementById("display").value = display;
}

// Function when an operator is clicked
function operator_clicked(operation) {

    console.log("operation is: ", operation);

    if (operator_pressed == false) { // This is the first time an operator was pressed
        previous_number = parseInt(display);
        operator_pressed = true;

        switch (operation) {
            case "+": current_operation = "add"; break;
            case "-": current_operation = "subtract"; break;
            case "x": current_operation = "multiply"; break;
            case "/": current_operation = "divide"; break;
        }
    } else { // This is NOT the first time an operator was pressed e.g., the equal button was not applied
        // Do the calculation and display it
        let result = window[current_operation](parseInt(previous_number), parseInt(display));
        display = result;

        // Set the new previous number to the the new display
        previous_number = parseInt(display);
        
        // Keep the operator pressed to be true
        operator_pressed = true;

        switch (operation) {
            case "+": current_operation = "add"; break;
            case "-": current_operation = "subtract"; break;
            case "x": current_operation = "multiply"; break;
            case "/": current_operation = "divide"; break;
        }
    }
}

// Function when the equal button is clicked
function equal_button_clicked() {
    operate(current_operation, previous_number, display);
    current_operation = "";
    operator_pressed = false;
}

// Function to clear the calculator
function clearDisplay() {
    display = 0;
    operator_pressed = false;
    previous_number = 0;
    current_operation = "";
    document.getElementById("display").value = display;
}

// Function to backspace one thing from the display
function backspace() {
    // Make sure it is a string
    display = display + "";

    if (display.length == 1) { // If it is just one number set it to 0
        display = 0;
    } else { // If it longer than one number, remove the last one
        let temporary_display = display.substring(0, display.length - 1);
        display = temporary_display;
    }
    document.getElementById("display").value = display;
}


// Add keyboard support
document.addEventListener('keydown', function(e){

    switch (e.key) {
        case "1": add_number_to_display(1); break;
        case "2": add_number_to_display(2); break;
        case "3": add_number_to_display(3); break;
        case "4": add_number_to_display(4); break;
        case "5": add_number_to_display(5); break;
        case "6": add_number_to_display(6); break;
        case "7": add_number_to_display(7); break;
        case "8": add_number_to_display(8); break;
        case "9": add_number_to_display(9); break;
        case "0": add_number_to_display(0); break;
        case "+": 
            current_operation = "add"; 
            previous_number = parseInt(display);
            operator_pressed = true;
            break;
        case "-": 
            current_operation = "subtract"; 
            previous_number = parseInt(display);
            operator_pressed = true;
            break;
        case "*": 
            current_operation = "multiply"; 
            previous_number = parseInt(display);
            operator_pressed = true;
            break;
        case "/": 
            current_operation = "divide"; 
            previous_number = parseInt(display);
            operator_pressed = true;
            break;
        case "=": 
            equal_button_clicked();
            break;
        case "Enter":
            equal_button_clicked();
            break;
        case "Escape":
            clearDisplay();
            break;
        case "Backspace":
            backspace();
            break;
    }
 })