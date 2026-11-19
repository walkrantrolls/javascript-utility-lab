import classNames from "../../../src/functions/classnames/classnames.js";

const buttonClass = classNames("button", "button--primary", {
  "is-loading": false,
  "is-disabled": false,
  "button--wide": true,
});

console.log(buttonClass); // button button--primary button--wide
