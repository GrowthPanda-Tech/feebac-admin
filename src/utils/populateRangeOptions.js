export function populateRangeOptions(min, max) {
  const options = [];

  for (let i = min; i <= max; i++) {
    options.push(i);
  }

  return options;
}
