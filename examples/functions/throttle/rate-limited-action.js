import { throttle } from "../../../src/functions/throttle/throttle.js";

const requestReport = throttle((requestId) => {
  console.log("Report request accepted:", requestId);
}, 500);

// The first request runs now; the next two are ignored.
requestReport("first");
requestReport("repeat 1");
requestReport("repeat 2");

// After the wait window, another request runs immediately.
setTimeout(() => requestReport("after wait"), 600);
