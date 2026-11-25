import { throttle } from "../../../src/functions/throttle/throttle.js";

let attempts = 0;
const requestReport = throttle((attempt) => {
  console.log("Report request accepted:", attempt);
}, 500);

// Simulate three quick clicks. Only the first request runs immediately.
[1, 2, 3].forEach((attempt) => requestReport(attempt));

// After the wait window, the next click runs immediately.
setTimeout(() => {
  attempts += 1;
  requestReport(attempts + 3);
}, 600);
