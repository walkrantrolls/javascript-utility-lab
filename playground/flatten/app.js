import flatten from "../../src/array/flatten/flatten.js";

const scenarios = {
  categories: {
    title: "Product category tree",
    description: "Flatten nested category labels into values that can power product filters.",
    value: [
      ["electronics", ["audio", ["headphones", "speakers"]]],
      ["home", ["lighting", "furniture"]],
    ],
  },
  formFields: {
    title: "Grouped form fields",
    description: "Collect field names from nested form sections before validation or submission.",
    value: [
      ["profile", ["name", ["firstName", "lastName"]]],
      ["preferences", ["notifications", "privacy"]],
    ],
  },
  apiPages: {
    title: "Paginated API results",
    description: "Combine page-grouped product records into one list for rendering.",
    value: [
      [
        { id: "p-101", name: "Notebook" },
        { id: "p-102", name: "Pen set" },
      ],
      [{ id: "p-103", name: "Desk lamp" }],
    ],
  },
};

const input = document.querySelector("#array-input");
const scenarioSelect = document.querySelector("#scenario");
const scenarioName = document.querySelector("#scenario-name");
const scenarioDescription = document.querySelector("#scenario-description");
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
  const scenario = scenarios[scenarioSelect.value];
  scenarioName.textContent = scenario ? scenario.title : "Custom JSON array";
  scenarioDescription.textContent = scenario
    ? scenario.description
    : "Edit this JSON array to explore your own nested data.";

  try {
    const values = JSON.parse(input.value);
    if (!Array.isArray(values)) throw new TypeError("Input must be a JSON array.");
    const depth = depthSelect.value === "Infinity" ? Infinity : Number(depthSelect.value);
    const flattened = flatten(values, depth);
    result.textContent = JSON.stringify(flattened, null, 2);
    resultCount.textContent = flattened.length + (flattened.length === 1 ? " item" : " items");
    summary.textContent = "The selected depth returns " + flattened.length + " items in a new array.";
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

scenarioSelect.addEventListener("change", () => {
  const selected = scenarios[scenarioSelect.value];
  if (selected) input.value = JSON.stringify(selected.value, null, 2);
  render();
});
input.addEventListener("input", () => {
  scenarioSelect.value = "custom";
  render();
});
depthSelect.addEventListener("change", render);

input.value = JSON.stringify(scenarios.categories.value, null, 2);
render();
