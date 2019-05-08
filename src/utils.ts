import typeCheck from "@konata9/typecheck.js";

function formatSnakeToCamel(snake: string): string {
  if (!snake) {
    throw new Error("input can not be null value");
  }

  if (typeCheck(snake) !== "string") {
    throw new Error("input must be string type");
  }

  return snake
    .split("_")
    .filter(str => !!str)
    .map((str, index) =>
      index > 0 ? str[0].toUpperCase() + str.slice(1) : str
    )
    .join("");
}

function formatCamelToSnake(camel: string): string {
  if (!camel) {
    throw new Error("input can not be null value");
  }

  if (typeCheck(camel) !== "string") {
    throw new Error("input must be string type");
  }

  const camelStr = camel[0].toLowerCase() + camel.slice(1);
  const matches: Array<string> = camelStr.match(/[A-Z]/g) || [];
  let snake: string = camelStr;
  matches.forEach(word => {
    snake = snake.replace(word, `_${word.toLowerCase()}`);
  });
  return snake;
}

export { formatSnakeToCamel, formatCamelToSnake };
