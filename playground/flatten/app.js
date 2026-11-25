import flatten from "../../src/arrays/flatten/flatten.js";

const input = document.querySelector("#array-input");
const depthSelect = document.querySelector("#depth");
const result = document.querySelector("#result");
const resultCount = document.querySelector("#result-count");
const summary = document.querySelector("#summary");
const trace = document.querySelector("#trace");

function describeTraversal(values, depth) {
  const steps = [];
  function visit(items, remaining, path) {
    let index = 0;
    for (const item of items) {
      const itemPath = path + "[" + index + "]";
      if (Array.isArray(item) && remaining > 0) {
        steps.push({ action: "Expand", detail: itemPath + " is a nested array with " + item.length + " item(s)." });
        visit(item, remaining === Infinity ? Infinity : remaining - 1, itemPath);
      } else {
        steps.push({ action: "Append", detail: itemPath + " contributes " + JSON.stringify(item) + " to the result." });
      }
      index += 1;
    }
  }
  visit(values, depth, "$");
  return steps;
}

function render() {
  try {
    const values = JSON.parse(input.value);
    if (!Array.isArray(values)) throw new TypeError("Input must be a JSON array.");
    const depth = depthSelect.value === "Infinity" ? Infinity : Number(depthSelect.value);
    const flattened = flatten(values, depth);
    result.textContent = JSON.stringify(flattened, null, 2);
    resultCount.textContent = flattened.length + (flattened.length === 1 ? " value" : " values");
    summary.textContent = "The selected depth returns " + flattened.length + " values for the category filter.";
    trace.replaceChildren(...describeTraversal(values, depth).map((step, index) => {
      const item = document.createElement("li");
      const label = document.createElement("b");
      label.textContent = String(index + 1).padStart(2, "0") + " · " + step.action + " · ";
      item.append(label, document.createTextNode(step.detail));
      return item;
    }));
  } catch (error) {
    result.textContent = error.message;
    resultCount.textContent = "Invalid input";
    summary.textContent = "Enter a valid JSON array to continue.";
    trace.replaceChildren();
  }
}

input.addEventListener("input", render);
depthSelect.addEventListener("change", render);
render();
