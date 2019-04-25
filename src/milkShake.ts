function snakeToCamel(snake: string): string {
  return snake
    .split("_")
    .filter((str) => !!str)
    .map((str, index) =>
      index > 0 ? str[0].toUpperCase() + str.slice(1) : str
    )
    .join("");
}

function camelToSnake(camel: string): string {
  return "";
}
