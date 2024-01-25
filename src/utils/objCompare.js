export function objCompare({ source, sink }) {
  //same reference case
  if (source === sink) return true;

  const sourceKeys = Object.keys(source);
  const sinkKeys = Object.keys(sink);

  if (sourceKeys.length !== sinkKeys.length) return false;

  //checks for values in order
  for (let i = 0; i < sourceKeys.length; i++) {
    const sourceValue = source[sourceKeys[i]];
    const sinkValue = sink[sinkKeys[i]];

    //also checks for empty value
    if (sinkValue === "") return true;

    //TODO: can i clean this up?
    if (typeof sourceValue === "string" && typeof sinkValue === "string") {
      if (sourceValue.toLowerCase() !== sinkValue.toLowerCase()) {
        return false;
      }
    } else if (sourceValue !== sinkValue) {
      return false;
    }
  }

  return true;
}
