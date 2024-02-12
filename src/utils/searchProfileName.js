export function searchProfileName({ tertiaryFilters, queryId }) {
  if (!queryId) return null;

  let result = null;

  tertiaryFilters.forEach(({ id, key_name }) => {
    if (parseInt(queryId) === parseInt(id)) result = key_name;
  });

  return result;
}
