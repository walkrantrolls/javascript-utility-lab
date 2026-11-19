export function classNames(...values) {
  const classes = [];

  function append(value) {
    if (!value) return;

    if (typeof value === "string" || typeof value === "number") {
      classes.push(String(value));
      return;
    }

    if (Array.isArray(value)) {
      for (const item of value) append(item);
      return;
    }

    if (typeof value === "object") {
      for (const key of Object.keys(value)) {
        if (value[key]) classes.push(key);
      }
    }
  }

  for (const value of values) append(value);
  return classes.join(" ");
}

export const classnames = classNames;
export default classNames;
