# Changelog

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
  - Sprint reports and meeting notes (Sprint 0, 1, 2)
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


