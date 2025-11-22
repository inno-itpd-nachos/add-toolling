const { parse, formatters } = require("plantuml-parser");

function parsePumlToJson(pumlText) {
  const ast = parse(pumlText);                 // AST
  const jsonString = formatters.default(ast);  // строка JSON
  return JSON.parse(jsonString);               // уже нормальный объект/массив
}

module.exports = { parsePumlToJson };
