export function searchFilterbyKeyName(data, query) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].key_name === query) {
      return i;
    }
  }

  return null;
}
