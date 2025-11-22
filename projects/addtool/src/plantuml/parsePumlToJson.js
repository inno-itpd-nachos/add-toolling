const { parse } = require("plantuml-parser");

function parsePumlToJson(pumlText) {
  const result = parse(pumlText);
  return result;
}

module.exports = { parsePumlToJson };