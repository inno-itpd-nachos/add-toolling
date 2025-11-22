/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: "node",
    roots: ["<rootDir>/tests"],
    collectCoverage: true,
    collectCoverageFrom: [
      "src/plantuml/parsePumlToJson.{js,ts}"
    ],
    coverageThreshold: {
      "src/plantuml/parsePumlToJson.js": {
        branches: 30,
        functions: 30,
        lines: 30,
        statements: 30
      }
    }
  };
  