"use strict";

const display = document.getElementById("display");
let current = "";
let operator = "";
let previous = "";

function updateDisplay(value) {
  display.textContent = value || "0";
}

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value) || value === ".") {
      if (value === "." && current.includes(".")) return;
      current += value;
      updateDisplay(current);
    } else if (value === "AC") {
      current = "";
      previous = "";
      operator = "";
      updateDisplay("0");
    } else if (value === "+/-") {
      current = current ? String(parseFloat(current) * -1) : "";
      updateDisplay(current);
    } else if (value === "%") {
      current = current ? String(parseFloat(current) / 100) : "";
      updateDisplay(current);
    } else if (value === "=") {
      if (current && operator && previous) {
        current = String(
          eval(
            `${previous}${operator}${current}`
              .replace("×", "*")
              .replace("÷", "/")
              .replace("−", "-")
          )
        );
        operator = "";
        previous = "";
        updateDisplay(current);
      }
    } else {
      if (current) {
        if (previous && operator) {
          previous = String(
            eval(
              `${previous}${operator}${current}`
                .replace("×", "*")
                .replace("÷", "/")
                .replace("−", "-")
            )
          );
        } else {
          previous = current;
        }
        current = "";
        operator =
          value === "×"
            ? "*"
            : value === "÷"
            ? "/"
            : value === "−"
            ? "-"
            : value;
      }
    }
  });
});
