import { throttle } from "../../../src/functions/throttle/throttle.js";

const updateScrollPosition = throttle((position) => {
  console.log("Render scroll position:", position);
}, 250);

// Simulate one fast scroll burst: only the first position is handled.
[0, 12, 28, 46, 63].forEach((position) => updateScrollPosition(position));

// A later event, after the window, runs immediately.
setTimeout(() => updateScrollPosition(91), 300);
