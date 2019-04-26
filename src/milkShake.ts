function snakeToCamel(snake: string): string {
  return snake
    .split("_")
    .filter((str: string): boolean => !!str)
    .map(
      (str: string, index: number): string =>
        index > 0 ? str[0].toUpperCase() + str.slice(1) : str
    )
    .join("");
}

function camelToSnake(camel: string): string {
  const matches: Array<string> = camel.match(/[A-Z]/g) || [];
  let snake: string = "";
  matches.forEach(
    (word: string): void => {
      snake = camel.replace(word, `_${word.toLocaleLowerCase()}`);
    }
  );
  return snake;
}

export default {snakeToCamel, camelToSnake};
