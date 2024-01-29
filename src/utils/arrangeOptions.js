export function arrangeOptions(options) {
  const result = {};

  options.forEach(({ element }, index) => {
    result[index + 1] = element;
  });

  return result;
}
