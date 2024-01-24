export function revertOptions(options) {
  const revert = [];

  options.forEach((option) => {
    if (Array.isArray(option.element)) {
      const update = { ...option, element: option.element[0] };
      revert.push(update);
      return;
    }

    revert.push(option);
  });

  return revert;
}
