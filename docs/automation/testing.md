## Unit tests

Unit tests currently cover the PlantUML parsing logic.

- **Location**: `tests/plantuml/parsePumlToJson.test.js`
- **Naming convention**: unit test files use the `.test.js` / `.test.ts` suffix (for example, `parsePumlToJson.test.js`).
- **Run unit tests**:  
```npm run test:unit```
- **Coverage report**:  
```npm run test:unit```
This command also generates a text coverage report in the console.

- **Minimum coverage thresholds**: configured in `jest.config.js` using `coverageThreshold`.  
For now, the threshold is set to 30% for `src/plantuml/parsePumlToJson.js` (statements, branches, functions, and lines).

We use the text coverage report because it is easy to read locally and in CI logs without opening separate HTML files.  
The initial 30% threshold is a low‑risk starting point for a previously untested module; for core business logic (such as parsing, analysis, and estimation) we plan to raise coverage towards 80%+ as the codebase stabilizes.


### Selected modules for unit testing (current iteration)

- `src/plantuml/parsePumlToJson.js` — core PlantUML parsing logic with high impact on all further analysis and estimation features.  

Two additional critical modules (analysis and estimation) will be added in the next iterations and covered with unit tests using the same Jest setup and coverage thresholds.
