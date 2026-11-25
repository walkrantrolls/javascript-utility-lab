import { throttle } from "../../src/functions/throttle/throttle.js";

const waitInput = document.querySelector("#wait");
const waitLabel = document.querySelector("#wait-label");
const requestButton = document.querySelector("#request");
const resetButton = document.querySelector("#reset");
const status = document.querySelector("#status");
const clicksOutput = document.querySelector("#clicks");
const sentOutput = document.querySelector("#sent");
const ignoredOutput = document.querySelector("#ignored");
const waitValueOutput = document.querySelector("#wait-value");
const lastRunOutput = document.querySelector("#last-run");
const lastArgsOutput = document.querySelector("#last-args");

let clicks = 0;
let requestsSent = 0;
let ignoredClicks = 0;
let releaseTimer = null;
let throttledRequest;

function render() {
  clicksOutput.textContent = String(clicks);
  sentOutput.textContent = String(requestsSent);
  ignoredOutput.textContent = String(ignoredClicks);
  waitValueOutput.textContent = Number(waitInput.value).toLocaleString();
  waitLabel.textContent = Number(waitInput.value).toLocaleString() + " ms";
}

function configureThrottle() {
  if (releaseTimer !== null) clearTimeout(releaseTimer);
  releaseTimer = null;
  status.classList.remove("cooldown");
  status.textContent = "Ready for the next request";
  throttledRequest = throttle(function (clickNumber) {
    requestsSent += 1;
    lastRunOutput.textContent = new Date().toLocaleTimeString();
    lastArgsOutput.textContent = JSON.stringify([clickNumber]);
    status.textContent = "Request " + clickNumber + " sent immediately";
    status.classList.add("cooldown");
    releaseTimer = setTimeout(() => {
      releaseTimer = null;
      status.classList.remove("cooldown");
      status.textContent = "Ready for the next request";
    }, Number(waitInput.value));
    render();
  }, Number(waitInput.value));
  render();
}

requestButton.addEventListener("click", () => {
  clicks += 1;
  const previousRequests = requestsSent;
  throttledRequest.call({ source: "report button" }, clicks);
  if (requestsSent === previousRequests) {
    ignoredClicks += 1;
    status.textContent = "Click ignored during the wait window";
    status.classList.add("cooldown");
  }
  render();
});

waitInput.addEventListener("input", configureThrottle);
resetButton.addEventListener("click", () => {
  clicks = 0;
  requestsSent = 0;
  ignoredClicks = 0;
  lastRunOutput.textContent = "—";
  lastArgsOutput.textContent = "[]";
  configureThrottle();
});

configureThrottle();
