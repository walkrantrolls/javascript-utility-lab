import { throttle } from "../../src/functions/throttle/throttle.js";

const waitInput = document.querySelector("#wait");
const waitLabel = document.querySelector("#wait-label");
const burstButton = document.querySelector("#burst");
const resetButton = document.querySelector("#reset");
const scrollbox = document.querySelector("#scrollbox");
const callsOutput = document.querySelector("#calls");
const executionsOutput = document.querySelector("#executions");
const ignoredOutput = document.querySelector("#ignored");
const durationOutput = document.querySelector("#window-duration");
const timestampOutput = document.querySelector("#timestamp");
const argumentsOutput = document.querySelector("#arguments");
const contextOutput = document.querySelector("#context");
const eventLog = document.querySelector("#event-log");
const windowState = document.querySelector("#window-state");

let calls = 0;
let executions = 0;
let gateOpen = true;
let gateTimer = null;
let throttledHandler;
let recentEvents = [];

function renderMetrics() {
  callsOutput.textContent = String(calls);
  executionsOutput.textContent = String(executions);
  ignoredOutput.textContent = String(calls - executions);
  durationOutput.textContent = waitInput.value;
  waitLabel.textContent = waitInput.value + " ms";
  windowState.classList.toggle("active", !gateOpen);
  windowState.lastElementChild.textContent = gateOpen ? "Ready" : "Window active";
  eventLog.replaceChildren(...recentEvents.map(({ message, passed }) => {
    const item = document.createElement("li");
    const text = document.createElement("span");
    const status = document.createElement("b");
    text.textContent = message;
    status.textContent = passed ? "EXECUTED" : "IGNORED";
    status.className = passed ? "ran" : "ignored";
    item.append(text, status);
    return item;
  }));
  if (recentEvents.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No events yet";
    eventLog.append(item);
  }
}

function createHandler() {
  if (gateTimer !== null) clearTimeout(gateTimer);
  gateTimer = null;
  gateOpen = true;
  const wait = Number(waitInput.value);
  throttledHandler = throttle(function (position, source) {
    executions += 1;
    timestampOutput.textContent = new Date().toLocaleTimeString();
    argumentsOutput.textContent = JSON.stringify([position, source]);
    contextOutput.textContent = this.source;
  }, wait);
  renderMetrics();
}

function sendEvent(position, source) {
  calls += 1;
  const before = executions;
  throttledHandler.call({ source }, position, source);
  const passed = executions > before;
  recentEvents.unshift({
    message: source + " · position " + position,
    passed,
  });
  recentEvents = recentEvents.slice(0, 8);

  if (passed) {
    gateOpen = false;
    if (gateTimer !== null) clearTimeout(gateTimer);
    gateTimer = setTimeout(() => {
      gateTimer = null;
      gateOpen = true;
      renderMetrics();
    }, Number(waitInput.value));
  }
  renderMetrics();
}

waitInput.addEventListener("input", createHandler);
burstButton.addEventListener("click", () => {
  for (let position = 1; position <= 12; position += 1) {
    sendEvent(position, "burst");
  }
});
resetButton.addEventListener("click", () => {
  calls = 0;
  executions = 0;
  recentEvents = [];
  timestampOutput.textContent = "—";
  argumentsOutput.textContent = "[]";
  contextOutput.textContent = "—";
  scrollbox.scrollTop = 0;
  createHandler();
});
scrollbox.addEventListener("scroll", () => {
  sendEvent(scrollbox.scrollTop, "scroll");
});

createHandler();
