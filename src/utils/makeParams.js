export function makeParams(obj) {
  // Filter out keys that have null values or empty arrays
  const filteredObj = Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) =>
        value !== null && (Array.isArray(value) ? value.length !== 0 : true),
    ),
  );

  return new URLSearchParams(filteredObj);
}
