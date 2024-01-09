export function makeParams(obj) {
  //filter out keys that have null values
  const filteredObj = Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== null),
  );

  return new URLSearchParams(filteredObj);
}
