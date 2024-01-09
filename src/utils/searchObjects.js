export function searchObjects(options, keyword) {
  const results = [];

  function toInfinityAndBeyond(objArr) {
    for (const obj of objArr) {
      if (typeof obj === "object") {
        if (
          "name" in obj &&
          obj.name.toLowerCase().includes(keyword.toLowerCase())
        ) {
          results.push(obj);
        }

        //and we shall recurse
        for (const key in obj) {
          if (typeof obj[key] === "object") {
            toInfinityAndBeyond([obj[key]]);
          }
        }
      }
    }
  }

  toInfinityAndBeyond(
    Array.isArray(options) ? options : Object.values(options),
  );

  return results;
}
