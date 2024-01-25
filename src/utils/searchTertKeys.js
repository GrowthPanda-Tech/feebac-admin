export function searchTertKeys({ tertKeys, filterName }) {
  if (!filterName) {
    return [{ id: 0, name: null }];
  }

  for (const key of tertKeys) {
    const { key_name, options } = key;
    if (key_name === filterName) {
      return options;
    }
  }
}
