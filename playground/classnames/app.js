import classNames from "../../src/functions/classnames/classnames.js";

const controls = Object.fromEntries(["primary", "loading", "disabled", "wide"].map((id) => [id, document.querySelector("#" + id)]));
const preview = document.querySelector("#preview-button");
const output = document.querySelector("#class-string");

function updateButton() {
  const classes = classNames("demo-button", {
    "demo-button--primary": controls.primary.checked,
    "is-loading": controls.loading.checked,
    "is-disabled": controls.disabled.checked,
    "is-wide": controls.wide.checked,
  });
  preview.className = classes;
  preview.disabled = controls.disabled.checked || controls.loading.checked;
  preview.innerHTML = controls.loading.checked ? '<span class="spinner" aria-hidden="true"></span> Saving…' : "Save changes";
  output.textContent = classes;
}

Object.values(controls).forEach((control) => control.addEventListener("change", updateButton));
updateButton();
