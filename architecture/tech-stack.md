# Technology Stack

## Core Technologies

### Language & Runtime
- **TypeScript 5.0+**: Type safety, VS Code standard, strong tooling support
- **Node.js 18+**: Extension runtime environment (required by VS Code)

### VS Code Integration
- **VS Code Extension API 1.80+**: Commands, webviews, file system access, configuration management

---

## Frontend

### UI Framework
**React 18**
- **Why**: Component-based architecture, rich ecosystem, team familiarity
- **Use**: Estimation results panel, interactive dashboards, configuration UI
- **Alternative**: Vue 3 (simpler but smaller ecosystem)

### Styling
**VS Code Webview UI Toolkit**
- **Why**: Native VS Code look and feel, automatic theme matching (light/dark), accessibility built-in
- **Use**: Buttons, inputs, dropdowns, tabs, progress bars
- **Alternative**: Tailwind CSS (requires custom theme matching)

### Icons
**VS Code Codicons**
- **Why**: Official icon library, 400+ icons, consistent with VS Code UI
- **Use**: Status indicators, action buttons, file type icons

---

## Backend

### Parsing
**Native JSON.parse() + Streaming**
- **Why**: Fastest parser for Excalidraw JSON files, zero dependencies, handles large diagrams efficiently
- **Use**: Parse .excalidraw files, extract shapes and relationships
- **Performance**: < 2s for 100+ component diagrams

### Graph Analysis
**graphlib**
- **Why**: Battle-tested library for directed/undirected graphs, small footprint (15KB)
- **Use**: Dependency analysis, cycle detection, coupling metrics, architectural pattern detection
- **Alternative**: Custom implementation (reinventing the wheel)

### Pattern Recognition
**Custom Algorithm**
- **Why**: Domain-specific UML pattern detection, no existing library fits our needs
- **Use**: Detect MVC, Layered, Microservices, Repository patterns
- **Implementation**: Rule-based matching with configurable thresholds

### Estimation Engine
**Custom Weighted Scoring**
- **Why**: Project-specific formulas, user-configurable complexity weights and effort multipliers
- **Use**: Calculate complexity scores, estimate development effort, assess architectural risks
- **Formulas**: 
  - Complexity = f(components, relationships, depth, patterns)
  - Effort = Complexity × Weights × Team Velocity

### Caching
**lru-cache**
- **Why**: In-memory LRU cache prevents re-parsing, O(1) lookups, memory-efficient
- **Use**: Cache parsed diagrams, analysis results, pattern detection
- **Config**: Max 50 entries, 100MB limit

---

## Visualization

### Charts
**Chart.js 3.x**
- **Why**: Lightweight, easy integration with React, supports server-side rendering for PDF exports
- **Use**: Complexity charts, effort breakdown graphs, risk heatmaps
- **Alternative**: D3.js (more powerful but steeper learning curve)

### Server-Side Rendering
**Chart.js + canvas (Node.js)**
- **Why**: Same library as frontend ensures consistency, generates chart images for PDF reports
- **Use**: Embed charts in PDF exports

---

## Generator (Report Generation)

### Markdown
**markdown-it**
- **Why**: Fast, extensible, supports plugins, widely used
- **Use**: Generate Markdown reports for documentation
- **Alternative**: marked (less extensible)

### PDF
**PDFKit**
- **Why**: Pure JavaScript, no external dependencies, supports text/tables/images
- **Use**: Basic PDF reports with text and tables
- **Alternative**: Puppeteer (for complex layouts)

**Puppeteer**
- **Why**: Headless Chrome rendering, high-fidelity HTML→PDF conversion, preserves styling and charts
- **Use**: Complex PDF exports matching webview appearance
- **Trade-off**: Heavy (requires Chromium download)

---

## Testing

### Unit Testing
**Jest**
- **Why**: Most popular framework, excellent TypeScript support, built-in mocking and coverage
- **Use**: Unit tests for parsing, analysis, estimation logic
- **Coverage Target**: 80%

### Integration Testing
**VS Code Extension Test Runner**
- **Why**: Official testing framework, tests extension in real VS Code environment
- **Use**: Test extension activation, commands, webview interactions

---

## Development Tools

### Bundler
**esbuild**
- **Why**: 10-100x faster than Webpack, simple configuration, perfect for TypeScript
- **Use**: Bundle extension code, transpile TypeScript, minify for production
- **Alternative**: Webpack (slower, more complex)

### Code Quality
**ESLint + Prettier**
- **Why**: Industry standards for linting and formatting
- **Config**: 
  - `@typescript-eslint/recommended`
  - `eslint-plugin-react` for webview
  - TypeScript strict mode enabled

### CI/CD
**GitHub Actions**
- **Why**: Free for open-source, native GitHub integration, pre-built actions
- **Workflow**: Run tests, build extension, publish to marketplace

---

## Architecture Summary

```
┌─────────────────────────────────────────────────┐
│              Frontend (React)                    │
│  - Webview UI Toolkit (styling)                 │
│  - Chart.js (visualization)                      │
│  - Codicons (icons)                              │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│           Backend (TypeScript)                   │
│  - JSON Parser (Excalidraw files)               │
│  - graphlib (dependency analysis)                │
│  - Custom algorithms (pattern detection)         │
│  - Custom engine (effort estimation)             │
│  - lru-cache (performance optimization)          │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│         Generator (Report Export)                │
│  - markdown-it (Markdown reports)                │
│  - PDFKit (simple PDFs)                          │
│  - Puppeteer (complex PDFs)                      │
│  - Chart.js SSR (chart images)                   │
└──────────────────────────────────────────────────┘
```

---

## Key Dependencies

| Component | Library | Version | Size |
|-----------|---------|---------|------|
| UI Framework | React | 18.2+ | ~40KB |
| Graph Analysis | graphlib | 2.1.8 | ~15KB |
| Caching | lru-cache | 10.0+ | ~5KB |
| Charts | Chart.js | 4.4+ | ~60KB |
| Markdown | markdown-it | 13.0+ | ~35KB |
| PDF (Basic) | PDFKit | 0.13+ | ~150KB |
| PDF (Advanced) | Puppeteer | 21.0+ | ~300KB |
| Bundler | esbuild | 0.19+ | - |
| Testing | Jest | 29.6+ | - |

---

