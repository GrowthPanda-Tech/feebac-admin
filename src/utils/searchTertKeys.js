export function searchTertKeys({ tertKeys, filterId }) {
  if (!filterId) {
    return [{ id: 0, name: null }];
  }

  for (const key of tertKeys) {
    const { id, options } = key;
    if (id === filterId) {
      return options;
    }
  }
}
