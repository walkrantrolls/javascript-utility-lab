import { debounce } from "../../../src/functions/debounce/debounce.js";

const catalog = [
  "Wireless headphones",
  "Wireless keyboard",
  "USB-C hub",
  "Webcam",
];

function searchCatalog(query, mode) {
  const matches = catalog.filter((product) =>
    product.toLowerCase().includes(query.toLowerCase()),
  );
  console.log(`[${mode}] "${query}" → ${matches.join(", ") || "no matches"}`);
}

const debouncedSearch = debounce((query) => {
  searchCatalog(query, "debounced");
}, 250);

function handleSearchInput(query) {
  searchCatalog(query, "immediate");
  debouncedSearch(query);
}

// Simulate a user typing four characters, 100 ms apart.
["w", "wi", "wir", "wire"].forEach((query, index) => {
  setTimeout(() => handleSearchInput(query), index * 100);
});

// The immediate search runs four times; the debounced search runs once
// with the final query after the user pauses.
