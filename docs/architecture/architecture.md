# Architecture Documentation: VS Code UML Architecture Estimation Extension

## Table of Contents

1. [Interactive Prototype](#interactive-prototype)
2. [Context Diagram](#context-diagram)
3. [Use Case Diagram](#use-case-diagram)
4. [Component Diagram](#component-diagram)
5. [Sequence Diagrams](#sequence-diagrams)
6. [Assets and Diagrams](#assets-and-diagrams)

---


## Context Diagram

![Context Diagram](./assets/context-diagram.png)

### System Context

The **UML Architecture Estimation Extension** operates within the Visual Studio Code ecosystem and interacts with several external actors and systems:

### External Actors

1. **Software Developer (Primary User)**
   - Role: Creates UML diagrams and requests architecture estimations
   - Interactions: Installs extensions, creates diagrams, triggers estimation analysis
   - Goals: Understand project complexity, estimate development effort, identify architectural risks

2. **Excalidraw Extension**
   - Role: Provides diagramming capabilities within VS Code
   - Interactions: Allows users to create and save .excalidraw files
   - Technology: Third-party VS Code extension

3. **File System**
   - Role: Stores diagram files and configuration
   - Interactions: Read diagram files, write estimation reports, store user preferences
   - Format: .excalidraw JSON files

4. **VS Code Extension API**
   - Role: Provides extension host environment and UI capabilities
   - Interactions: Register commands, create webviews, access workspace files
   - Technology: VS Code Extension Host

5. **Project Repository**
   - Role: Contains the codebase and architecture diagrams
   - Interactions: Source of diagram files, destination for reports
   - Technology: Git-based version control

### System Boundaries

- **Inside**: Diagram parser, estimation engine, analysis algorithms, result renderer
- **Outside**: Excalidraw editor, VS Code core, file storage, external configuration

---

## Use Case Diagram

![Use Case Diagram](./assets/use-case-diagram.png)

### Actors

1. **Developer (Primary Actor)**
   - Interacts directly with the extension
   - Creates diagrams and requests estimations
   - Reviews and exports results

2. **Project Manager (Secondary Actor)**
   - Reviews estimation reports
   - Uses data for project planning
   - Exports results for stakeholders

3. **Excalidraw Extension (System Actor)**
   - Provides diagram creation interface
   - Generates .excalidraw file format
   - Integrates with VS Code

4. **VS Code Platform (System Actor)**
   - Hosts the extension
   - Provides UI and command palette
   - Manages extension lifecycle

### Use Cases

**Primary Use Cases:**

1. **UC-01: Install Extension**
   - Actor: Developer
   - Description: Developer installs the extension from VS Code Marketplace
   - Preconditions: VS Code is installed
   - Postconditions: Extension is active and ready to use

2. **UC-02: Create Architecture Diagram**
   - Actor: Developer, Excalidraw Extension
   - Description: Developer uses Excalidraw to create UML diagrams (class, component, sequence)
   - Preconditions: Excalidraw extension is installed
   - Postconditions: Diagram file (.excalidraw) is saved in workspace

3. **UC-03: Select Diagram File**
   - Actor: Developer
   - Description: Developer selects one or more diagram files for analysis
   - Preconditions: At least one .excalidraw file exists in workspace
   - Postconditions: Files are queued for parsing

4. **UC-04: Parse Diagram**
   - Actor: System
   - Description: Extension parses .excalidraw JSON to extract UML elements
   - Preconditions: Valid diagram file is selected
   - Postconditions: Structured diagram data is available for analysis

5. **UC-05: Generate Estimation**
   - Actor: Developer
   - Description: System analyzes diagram and produces architecture estimations
   - Preconditions: Diagram is successfully parsed
   - Postconditions: Estimation results are displayed
   - Estimates include:
     - Component complexity scores
     - Integration points count
     - Estimated development effort (story points/hours)
     - Risk assessment
     - Architectural patterns detected

6. **UC-06: View Estimation Results**
   - Actor: Developer, Project Manager
   - Description: User reviews detailed estimation report in webview panel
   - Preconditions: Estimation is completed
   - Postconditions: User understands project scope

7. **UC-07: Export Estimation Report**
   - Actor: Developer, Project Manager
   - Description: Export results as PDF, Markdown, or JSON
   - Preconditions: Estimation results exist
   - Postconditions: Report file is saved to specified location

8. **UC-08: Configure Estimation Rules**
   - Actor: Developer
   - Description: Customize complexity weights and estimation formulas
   - Preconditions: Extension is installed
   - Postconditions: Custom rules are persisted

**Secondary Use Cases:**

9. **UC-09: Validate Diagram Syntax**
   - Actor: System
   - Description: Check if diagram follows valid UML conventions
   - Preconditions: Diagram file is loaded
   - Postconditions: Validation errors/warnings are reported

10. **UC-10: Compare Multiple Diagrams**
    - Actor: Developer
    - Description: Analyze multiple diagram versions to track architecture evolution
    - Preconditions: Multiple diagram files exist
    - Postconditions: Comparison report is generated

---

## Component Diagram

![Component Diagram](./assets/component-diagram.png)

### Components and Their Responsibilities

#### Presentation Layer

1. **Extension Activator**
   - **Responsibility**: Entry point for the extension; handles activation events
   - **Key Functions**:
     - Register extension with VS Code
     - Initialize services and dependencies
     - Subscribe to workspace events
     - Handle activation events (e.g., `onCommand`, `onView`)
   - **Dependencies**: VS Code Extension API, Command Handler
   - **Technology**: TypeScript, VS Code Extension API

2. **Command Handler**
   - **Responsibility**: Processes user commands and coordinates workflows
   - **Key Functions**:
     - Register commands (`extension.estimateArchitecture`, etc.)
     - Validate user input
     - Orchestrate service calls
     - Handle errors and user feedback
   - **Dependencies**: Parser, Webview Manager, Status Bar
   - **Patterns**: Command Pattern, Facade Pattern

3. **Webview Manager**
   - **Responsibility**: Manages the estimation results panel and UI rendering
   - **Key Functions**:
     - Create and dispose webviews
     - Render HTML/CSS/JavaScript for results display
     - Handle webview messages (user interactions)
     - Update results dynamically
   - **Dependencies**: VS Code Webview API, Report Generator
   - **Technology**: React/Vue for webview content, VS Code Webview API

4. **Status Bar UI**
   - **Responsibility**: Displays extension status and quick actions in VS Code status bar
   - **Key Functions**:
     - Show parsing progress
     - Display estimation summary
     - Provide quick access to commands
   - **Dependencies**: VS Code Status Bar API
   - **Technology**: VS Code UI API

#### Business Logic Layer

5. **Diagram Parser**
   - **Responsibility**: Parses Excalidraw JSON files and extracts UML elements
   - **Key Functions**:
     - Load and parse .excalidraw JSON format
     - Identify UML element types (classes, components, actors, relations)
     - Extract properties (names, attributes, methods, stereotypes)
     - Build structured diagram model
     - Handle parsing errors gracefully
   - **Dependencies**: File System Handler
   - **Input**: Excalidraw JSON
   - **Output**: Structured diagram model (classes, relationships, annotations)
   - **Technology**: TypeScript, JSON parser
   - **Algorithms**: Shape recognition, text extraction, relationship inference

6. **UML Analyzer**
   - **Responsibility**: Analyzes parsed diagram structure and identifies architectural patterns
   - **Key Functions**:
     - Detect architectural patterns (MVC, Layered, Microservices, etc.)
     - Calculate component dependencies and coupling
     - Identify integration points and interfaces
     - Analyze inheritance hierarchies
     - Detect cyclic dependencies
     - Calculate metrics (cohesion, coupling, depth)
   - **Dependencies**: Parser, Validation Service
   - **Output**: Analysis metrics and pattern identification
   - **Algorithms**: Graph analysis, pattern matching, metrics calculation

7. **Estimation Engine**
   - **Responsibility**: Generates effort and complexity estimations based on analysis
   - **Key Functions**:
     - Calculate component complexity scores
     - Estimate development effort (story points, hours)
     - Assess architectural risks
     - Generate effort distribution by component
     - Apply customizable estimation formulas
   - **Dependencies**: Analyzer, Configuration Manager
   - **Input**: Analysis metrics
   - **Output**: Estimation report (complexity scores, effort, risks)
   - **Formulas**:
     - Complexity = f(components, relationships, depth, patterns)
     - Effort = Complexity × Complexity Weights × Team Velocity
     - Risk = f(coupling, cyclic dependencies, anti-patterns)

8. **Validation Service**
   - **Responsibility**: Validates diagram syntax and semantic correctness
   - **Key Functions**:
     - Check UML syntax compliance
     - Validate relationship rules (e.g., inheritance, composition)
     - Detect semantic errors (e.g., orphan components)
     - Generate validation warnings and errors
   - **Dependencies**: Configuration Manager (validation rules)
   - **Output**: Validation report with errors/warnings
   - **Rules**: UML 2.5 specification compliance

9. **Configuration Manager**
   - **Responsibility**: Manages user settings and estimation rules
   - **Key Functions**:
     - Load/save user preferences
     - Manage complexity weights
     - Store custom estimation formulas
     - Provide default configurations
     - Validate configuration schemas
   - **Dependencies**: File System Handler
   - **Storage**: `.vscode/settings.json`, workspace configuration
   - **Settings**:
     - Complexity weights (per UML element type)
     - Effort estimation formulas
     - Validation rules
     - Export formats

#### Data Access Layer

10. **File System Handler**
    - **Responsibility**: Handles all file I/O operations
    - **Key Functions**:
      - Read .excalidraw files
      - Write estimation reports (Markdown, JSON, PDF)
      - Scan workspace for diagram files
      - Watch for file changes
      - Handle file system errors
    - **Dependencies**: VS Code Workspace API, Node.js fs module
    - **Supported Formats**: .excalidraw, .json, .md, .pdf

11. **Cache Manager**
    - **Responsibility**: Caches parsed diagrams and analysis results for performance
    - **Key Functions**:
      - Cache parsed diagram models
      - Cache analysis results
      - Invalidate cache on file changes
      - Manage cache size and TTL
    - **Storage**: In-memory cache (Map/LRU)
    - **Optimization**: Reduces parsing time for large diagrams

12. **Report Generator**
    - **Responsibility**: Generates estimation reports in various formats
    - **Key Functions**:
      - Render Markdown reports
      - Generate JSON exports
      - Create PDF documents
      - Format charts and visualizations
      - Apply report templates
    - **Dependencies**: File System Handler, Estimation Engine
    - **Output Formats**:
      - Markdown (human-readable)
      - JSON (machine-readable, API integration)
      - PDF (shareable, printable)
    - **Technology**: Markdown-it, PDFKit, Chart.js

### Component Interaction Flow

```
User Command → Command Handler → Parser → Analyzer → Estimator → Report Generator → Webview Manager → User
                                    ↓         ↓          ↓
                              Validator  ConfigManager  Cache
                                    ↓
                              FileHandler → Excalidraw Files
```

### Design Patterns Used

- **Facade Pattern**: Command Handler abstracts complex subsystem interactions
- **Strategy Pattern**: Estimation Engine supports pluggable estimation strategies
- **Observer Pattern**: File System Handler watches for diagram file changes
- **Factory Pattern**: Report Generator creates different report formats
- **Singleton Pattern**: Configuration Manager, Cache Manager
- **Command Pattern**: Command Handler for user actions

---

## Sequence Diagrams

### User Story 1: Generate Architecture Estimation

![Sequence Diagram - User Story 1](./assets/sequence-user-story-1.png)

**Title**: Developer generates estimation from an existing diagram file

**Actors**: Developer, Extension

**Preconditions**: 
- Extension is installed
- At least one .excalidraw diagram exists in workspace

**Postconditions**:
- Estimation results are displayed in webview
- Developer can review complexity scores, effort estimates, and risks
- Report can be exported if needed

---

### User Story 2: Export Estimation Report

![Sequence Diagram - User Story 2](./assets/sequence-user-story-2.png)

**Title**: Project Manager exports estimation report for stakeholders

**Actors**: Project Manager, Extension

**Preconditions**: 
- Estimation has been generated
- Results are displayed in webview

**Postconditions**:
- PDF report is saved to specified location
- Report contains complete estimation details with visualizations
- Project Manager can share with stakeholders

---

### Quality Attribute Scenario 1: Performance - Large Diagram Parsing

![Sequence Diagram - Performance Quality Scenario](./assets/sequence-quality-performance.png)

**Quality Attribute**: Performance

**Scenario**: System efficiently parses and analyzes a large diagram with 100+ components

**Stimulus**: Developer selects a complex diagram file (500 KB, 100+ components)

**Environment**: Normal operation, VS Code running on standard developer machine

**Response**: System parses and generates estimation within acceptable time

**Measure**: 
- Parsing completes in < 2 seconds
- Analysis completes in < 3 seconds
- Total time to results < 5 seconds
- UI remains responsive

**Postconditions**:
- Large diagram is processed efficiently
- User experience remains smooth
- Results accuracy is not compromised

---

### Quality Attribute Scenario 2: Usability - First-Time User Experience

![Sequence Diagram - Usability Quality Scenario](./assets/sequence-quality-usability.png)

**Quality Attribute**: Usability

**Scenario**: First-time user successfully generates their first estimation without external help

**Stimulus**: New user installs extension and wants to analyze a diagram

**Environment**: Fresh VS Code installation, user has basic VS Code knowledge

**Response**: System guides user through the process with clear instructions

**Measure**:
- User completes first estimation in < 5 minutes
- No need to read external documentation
- User understands results without confusion
- < 2 support requests per 100 new users

**Postconditions**:
- User successfully completes first estimation
- User understands basic features and workflow
- User confidence increased
- Lower support burden

---

## Architectural Decisions

### ADR-01: Use PlantUML for Component Diagrams
**Decision**: Use PlantUML text format for component diagrams in documentation  
**Rationale**: Version-controllable, easy to update, widely supported  
**Alternatives Considered**: Draw.io, Lucidchart, Mermaid  
**Consequences**: Requires PlantUML installation for rendering, but enables better collaboration

### ADR-02: Parser Strategy - JSON-based Excalidraw Format
**Decision**: Parse Excalidraw's native JSON format rather than converting to standard UML  
**Rationale**: Direct access to shape data, no conversion loss, faster processing  
**Alternatives Considered**: Convert to XMI, use visual recognition  
**Consequences**: Tightly coupled to Excalidraw format, may need updates if format changes

### ADR-03: Estimation Algorithm - Weighted Complexity Scoring
**Decision**: Use configurable weighted scoring based on component count, relationships, and patterns  
**Rationale**: Flexible, transparent, customizable per team  
**Alternatives Considered**: AI-based estimation, historical data regression  
**Consequences**: Requires initial calibration, may not fit all project types

### ADR-04: Results Display - Webview Panel
**Decision**: Display results in VS Code webview panel with rich visualizations  
**Rationale**: Better UX than text output, supports charts and interactive elements  
**Alternatives Considered**: Output channel, sidebar view, separate window  
**Consequences**: More complex implementation, requires webview security considerations

---

## Design decisions

This section describes the most relevant design decisions that shaped the current architecture of the Architecture Scoring Tool.

| Driver(s)                          | Decision                                                        | Rationale                                                                                                                                              | Discarded alternatives                                                                                   |
|-----------------------------------|-----------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| CON-1, CON-2, QAS002, QAS004      | Represent architecture as text-based diagrams (PlantUML) stored in Git | Keeps architecture “as code”: diagrams are human-readable, version-controlled, and easy to parse and diff; enables automation and integration with existing dev workflows. | Graphical diagram editors producing only images (e.g. draw.io PNGs) – hard to diff, parse, and maintain in Git. |
| CON-5, QAS001, QAS007, QAS013     | Deliver the tool as a local IDE extension / CLI rather than a standalone cloud service | Architects can run the tool directly on their machines without extra infrastructure; simplifies setup for the course project and avoids backend/DB operations. | Full SaaS web application with hosted backend and database – higher operational complexity and not needed for MVP. |
| QAS003, QAS004, QAS007           | Automatically extract components from diagrams instead of manual entry | Reduces manual work for architects and ensures the scoring matrix always reflects the actual architecture model defined in the diagram text.            | Manual matrix editing in spreadsheets or static forms – error-prone and quickly diverges from the real architecture. |
| CON-3, CON-4, QAS003, QAS008, QAS015 | Make evaluation attributes (“stressors”) and scoring formulas configurable by the user | Different teams use different quality models; configuration allows reuse of the tool across projects without code changes and supports experimentation. | Hard-coded set of NFR attributes and fixed scoring formula – would require code changes for every new project or quality model. |
| CON-5, CON-7, QAS014, QAS016     | Use Git history as the primary source of architecture versions and comparisons | Git already stores all text diagrams; leveraging it avoids a separate versioning database and aligns with “Architecture as Code” and course constraints. | Custom version database or external configuration store – more moving parts, additional persistence to design and operate. |
