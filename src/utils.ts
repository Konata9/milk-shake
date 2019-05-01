import typeCheck from "@konata9/typecheck.js";

function snakeToCamel(snake: string): string {
  if (!snake) {
    throw new Error("input can not be null value");
  }

  if (typeCheck(snake) !== "string") {
    throw new Error("input must be string type");
  }

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
  if (!camel) {
    throw new Error("input can not be null value");
  }

  if (typeCheck(camel) !== "string") {
    throw new Error("input must be string type");
  }

  const matches: Array<string> = camel.match(/[A-Z]/g) || [];
  let snake: string = "";
  matches.forEach(
    (word: string): void => {
      snake = camel.replace(word, `_${word.toLocaleLowerCase()}`);
    }
  );
  return snake;
}

export { snakeToCamel, camelToSnake };
