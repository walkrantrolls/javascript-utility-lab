/** Return a stable array of first occurrences using Set's SameValueZero equality. */
export function unique(input) {
  if (!Array.isArray(input)) throw new TypeError('input must be an array');
  return [...new Set(input)];
}
