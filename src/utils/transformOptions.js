export function transformOptions({ options, keyword, index }) {
  const transform = [];

  options.forEach((option, i) => {
    if (i !== index) {
      transform.push(option);
      return;
    }

    const transormedOption = { ...option, element: [option.element, keyword] };
    transform.push(transormedOption);
  });

  return transform;
}
