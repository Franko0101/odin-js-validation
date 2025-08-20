import "./styles.css";
import { greeting } from "./template.js";
//import image from "./image.png";

console.log(greeting);

const form = document.querySelector("form");
const inputs = document.querySelectorAll(".input-row input");
const errors = document.querySelectorAll(".input-row span");

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", checkValidity(inputs[i], errors[i]));
}

function checkValidity(input, error) {
    if (input.validity.valid) {
        error.textContent = "";
        error.className = "error";
    } else {
        showError(input, error);
    }
}

function showError(input, error) {
    switch(input.getAttribute("type")) {
        case "email":
            if(input.validity.valueMissing)
                error.textContent = "Empty field";

            if(input.validity.patternMismatch)
                error.textContent = "Invalid field format";

            break;
        case "text":
            if(input.validity.valueMissing)
                error.textContent = "Empty field";

            break;
        case "password":
            if(input.validity.valueMissing)
                error.textContent = "Empty field";

            pwdMismatch(error);
            break;
    }
    error.className = "error active";
}

function pwdMismatch(error) {
    const last = inputs.length-1;
    if (inputs[last].value != inputs[last-1].value)
        error.textContent = "Password mismatch";
}

form.addEventListener("submit", (e) => {
    let submit = true;
    e.preventDefault();
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].validity.valid) {
            showError(inputs[i], errors[i]);
            submit = false;
        } else {
            submit = submit && true;
        }
    }
    if (submit) {
        console.log("Good Job, all data is correct");
    }
})