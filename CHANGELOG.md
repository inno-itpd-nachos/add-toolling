# Changelog


## [0.0.3] - Sprint 3

### Added

- Jest-based unit tests for core business logic:
  - `src/plantuml/parsePumlToJson.js` — PlantUML parsing.
  - `src/analysis/analyzeDiagram.js` — architecture analysis (metrics, isolated components, cycles).
- Jest configuration with coverage collection and per-module thresholds (≥ 30%).
- Documentation updates:
  - `docs/architecture/tech-stack.md` — Testing and Static analysis sections.
  - `docs/automation/testing.md` — unit test locations, commands, coverage setup, and selected modules.
- Continuous Integration workflow (`.github/workflows/ci-cd.yml`) with parallel `lint` and `test` jobs, coverage report, and artifact publishing.
- GitHub environments `staging` and `production` with environment-specific secrets.
- Automated deployment to staging (`deploy-staging` job) and production (`deploy-production` job with manual approval).
- Automated quality attribute scenario tests on staging (`test-staging` job) with documentation in `docs/automation/testing.md`.
- Sprint 3 documentation: TDD log (`docs/sprint-3/tdd-log.md`), review script, meeting notes, and retrospective.

### Changed

- Updated documentation to reflect the new testing, static analysis, and CI/CD setup.
- Adjusted GitHub Actions workflow to support continuous delivery to staging and production.

## [0.0.2] - Sprint 2

### Added

- VS Code extension "addtool" for architecture evaluation and ADD workflow
- Custom editor for `.addt` files with table-based interface
- Custom editor for Excalidraw files (`.excalidraw`, `.excalidraw.json`, `.excalidraw.svg`, `.excalidraw.png`)
- React-based webview for interactive table editing
- Extension commands:
  - `excalidraw.newFile` - Create new Excalidraw file
- Core extension modules:
  - Document provider for custom file types
  - Editor provider with webview integration
  - URI handler for custom protocols
  - Language support utilities
  - Table document and editor implementations
- VS Code workspace configuration (`.vscode/` directory with launch, tasks, settings)
- Build system using esbuild for extension bundling
- Vite-based build setup for webview React application
- ESLint configuration for both extension and webview code
- Unit test setup with Mocha
- Project documentation:
  - Architecture documentation with diagrams (component, context, sequence, use case)
  - Technical stack documentation
  - Quality requirements and constraints
  - Sprint reports and meeting notes in `docs/sprints` directory
  - Contributing guidelines
  - AI usage guidelines
- MkDocs-based documentation site with GitHub Pages deployment
- GitHub Actions workflow for automated Pages deployment
- Project planning and requirements documentation

### Changed

- Reorganized project structure from `projects/vscode-extension/addtool/` to `projects/addtool/`
- Moved architecture documentation into `docs/` directory
- Updated package configuration with proper dependencies

### Fixed

- Documentation images and links
- OpenGraph metadata for documentation pages

## [0.0.1] - Sprint 1

### Added

- Initial project setup
- Repository structure
- Basic documentation framework
- LICENSE file
- Initial README with project description


