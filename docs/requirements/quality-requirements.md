# Quality Requirements

## Table of Contents

1. [Priority Matrix](#priority-matrix)
2. [Performance](#performance)
   - [QAS001 - Extension Activation Time](#qas001)
   - [QAS002 - PlantUML Parsing Speed](#qas002)
3. [Usability](#usability)
   - [QAS003 - Matrix Evaluation Efficiency](#qas003)
   - [QAS006 - Interface Clarity](#qas006)
4. [Functional Suitability](#functional-suitability)
   - [QAS004 - Correct Component Extraction](#qas004)
   - [QAS008 - NFR Customization](#qas008)
5. [Reliability](#reliability)
   - [QAS005 - Data Persistence](#qas005)
   - [QAS007 - Dynamic File Update Handling](#qas007)
   - [QAS009 - Error Handling and Recovery](#qas009)
6. [Maintainability](#maintainability)
   - [QAS010 - Parser Modularity](#qas010)
7. [Compatibility](#compatibility)
   - [QAS011 - VSCode Version Support](#qas011)
8. [Security](#security)
   - [QAS012 - Project Data Isolation](#qas012)
9. [Portability](#portability)
   - [QAS013 - Cross-Platform Compatibility](#qas013)
10. [Version Management](#version-management)
    - [QAS014 - Version Comparison via Git](#qas014)
    - [QAS015 - Quality Change Calculation](#qas015)
    - [QAS016 - Version Timeline Visualization](#qas016)

## Priority Matrix

| QAS ID | Quality Attribute | Priority | Business Value | Technical Feasibility | Rationale |
|--------|------------------|----------|----------------|----------------------|-----------|
| QAS001 | Performance | High | High | High | User experience core |
| QAS002 | Performance | High | High | Medium | Core functionality |
| QAS003 | Usability | High | High | High | Primary user workflow |
| QAS004 | Functional Suitability | High | High | Medium | Data accuracy critical |
| QAS005 | Reliability | High | High | High | Data loss prevention |
| QAS006 | Usability | Medium | Medium | High | Improves adoption |
| QAS007 | Reliability | Medium | Medium | Medium | File change detection |
| QAS008 | Functional Suitability | High | High | High | Project customization |
| QAS009 | Reliability | Medium | High | Medium | Stability and resilience |
| QAS010 | Maintainability | Low | Low | High | Future extensibility |
| QAS011 | Compatibility | Medium | Medium | High | Broad platform support |
| QAS012 | Security | High | High | High | Data protection |
| QAS013 | Portability | Medium | Medium | High | Multi-OS support |
| QAS014 | Functional Suitability | High | High | Medium | Version analysis critical |
| QAS015 | Functional Suitability | High | High | Medium | Quality metrics core feature |
| QAS016 | Usability | Medium | Medium | Medium | Trend visualization |

---
### Quality Attribute Scenario Priority Rationale

#### High Priority Scenarios

- **QAS001 – Extension Activation Time**  
  Fast activation is critical for user experience: architects open diagrams frequently during design sessions, and long startup times would make the tool unusable in daily work.

- **QAS002 – PlantUML Component Parsing Speed**  
  Parsing speed directly affects the feedback loop when architects modify diagrams. Slow parsing would block the main workflow of “change diagram → see updated matrix”.

- **QAS003 – Matrix Evaluation Efficiency**  
  Filling the matrix is the primary user task. If this interaction is slow or clumsy, users will avoid the tool regardless of how powerful the analysis is.

- **QAS004 – Correct Component Extraction**  
  The core promise of the tool is to reflect the architecture as it is defined in the diagram. Wrong or incomplete extraction would invalidate all further analysis and quality scoring.

- **QAS005 – Data Persistence and Recovery**  
  Losing evaluation data is unacceptable: architects invest significant time filling the matrix. Reliable persistence is critical for trust in the tool.

- **QAS008 – NFR Customization**  
  Different projects and teams work with different sets of quality attributes (“stressors”). The customer explicitly requested configurable attributes, so being able to add and remove NFRs is essential for adoption.

- **QAS012 – Project Data Isolation**  
  The tool operates on local project workspaces. Mixing data between projects would be a serious security and confidentiality concern, especially when multiple teams and repositories are involved.

- **QAS014 – Version Comparison via Git**  
  Comparing architecture versions is one of the main goals of the tool and a key differentiator. Without reliable version comparison, the “architecture evolution” concept cannot be demonstrated.

- **QAS015 – Quality Change Calculation**  
  Stakeholders want not only to see structural changes but also to understand how quality attributes improve or degrade between versions. Calculating and visualizing quality deltas per NFR is central to the project’s value.

#### Medium Priority Scenarios

- **QAS006 – Interface Clarity and Intuitiveness**  
  A clear UI is important for adoption, but the target users are software architects who are willing to tolerate a slightly rough UI in an MVP as long as core functionality works.

- **QAS007 – Dynamic File Update Handling**  
  Automatic updates on file save improve usability, but in early versions manual refresh could be an acceptable workaround if needed.

- **QAS009 – Error Handling and Recovery**  
  Robust error handling improves stability and user trust, but basic protection against crashes is already covered by higher-priority scenarios.

- **QAS011 – VSCode Version Support**  
  Supporting several VSCode versions is useful, but the main focus is on functionality rather than broad marketplace coverage in the first iterations.

- **QAS013 – Cross-Platform Compatibility**  
  Multi-OS support is important for the team, but initial development can focus on one or two primary platforms and expand later.

- **QAS016 – Version Timeline Visualization**  
  Visual timeline of quality over many versions is valuable, but it builds on top of version comparison and quality change calculation. It can be added after the core diff and scoring features are stable.

#### Low Priority Scenarios

- **QAS010 – Parser Modularity**  
  Parser extensibility is important for long-term evolution (supporting new diagram formats), but the customer is currently focused on PlantUML and component diagrams. A clean design should not block future extension, but implementing multiple parsers is not needed for the MVP.

## Performance

### QAS001

#### Extension Activation Time

**Source of stimulus:** Software architect  
**Stimulus:** Opens a `.puml` file in VSCode  
**Environment:** Normal operation, workspace contains 10-50 files, system has 8GB RAM  
**Artifact:** VSCode Extension activation system  
**Response:** Extension activates and displays webview panel with UI ready for interaction  
**Response Measure:** Activation time < 300 milliseconds

#### QAST001-1

When opening `architecture.puml` file in a workspace with 30 files on a computer with 8GB RAM and Intel i5 processor, the extension activates and the webview panel displays the empty Evolution Matrix UI in less than 300 milliseconds.

#### QAST001-2

When switching between multiple `.puml` files in rapid succession (3 files in 10 seconds), each file's webview activates and displays within 300ms without freezing VSCode.

---

### QAS002

#### PlantUML Component Parsing Speed

**Source of stimulus:** Extension system  
**Stimulus:** User opens `.puml` file containing architectural components  
**Environment:** File contains 10-30 components (typical microservices architecture), parsing triggered on file open/save  
**Artifact:** PlantUML Parser module  
**Response:** Components are extracted and displayed as rows in Evolution matrix  
**Response Measure:** Parsing time < 1 second for 25 components, < 2 seconds for 50 components

#### QAST002-1

A PlantUML file containing 25 components (component, service, microservice, class elements) is parsed and all 25 components appear as rows in the Evolution matrix in less than 1 second.

#### QAST002-2

A PlantUML file containing 50 components is parsed and rendered in less than 2 seconds.

#### QAST002-3

A PlantUML file containing syntax errors on line 15 is parsed with error message "Unable to parse PlantUML: syntax error at line 15" displayed to user without extension crash.

---

## Usability

### QAS003

#### Matrix Evaluation Efficiency

**Source of stimulus:** Software architect  
**Stimulus:** Needs to evaluate how each component impacts NFRs (non-functional requirements)  
**Environment:** Working with Evolution matrix interface in webview panel  
**Artifact:** Matrix UI with dropdown menus and cells  
**Response:** User selects impact values (-1, 0, +1) from dropdown for each cell  
**Response Measure:** Time to fill complete matrix 15x8 < 5 minutes with all dropdowns responsive

#### QAST003-1

An architect can fill a matrix of 15 components × 8 NFRs (120 cells) with values (-1, 0, +1) using dropdown menus in less than 5 minutes on typical hardware.

#### QAST003-2

When clicking on a matrix cell, the dropdown menu opens in less than 50 milliseconds, and value selection is applied instantly (< 100ms) with visual feedback.

#### QAST003-3

A single dropdown action (click → select → confirm) takes less than 200 milliseconds total, allowing rapid consecutive evaluations.

---

### QAS006

#### Interface Clarity and Intuitiveness

**Source of stimulus:** New user  
**Stimulus:** First time using the extension  
**Environment:** Opens any `.puml` file and sees webview panel UI  
**Artifact:** Webview UI design and layout  
**Response:** User understands how to fill the matrix without reading documentation  
**Response Measure:** 80% of new users can begin matrix evaluation within 2 minutes

#### QAST006-1

A new user opens the extension UI for the first time and can identify: (1) list of components, (2) list of NFRs, (3) matrix cells with dropdowns, (4) how to select values, without referencing any documentation - all within 2 minutes.

#### QAST006-2

UI contains clear labels: "Components" for rows, "Quality Attributes" for columns, dropdown shows options "-1 (Degrades)", "0 (Neutral)", "+1 (Improves)" with icons or color coding.

---

## Functional Suitability

### QAS004

#### Correct Component Extraction

**Source of stimulus:** PlantUML file content  
**Stimulus:** File contains various element types: components, classes, interfaces, services, microservices  
**Environment:** PlantUML parsing phase  
**Artifact:** Parser module  
**Response:** System extracts only architectural components and ignores relationships, attributes, and styling  
**Response Measure:** Parsing accuracy = 100%, no false positives/negatives

#### QAST004-1

A PlantUML file containing 10 components, 5 interfaces, 20 relationships, and 15 attribute definitions is parsed with exactly 15 elements extracted as matrix rows (components + interfaces), relationships and attributes are ignored.

#### QAST004-2

If a PlantUML file contains only relationships and no components (e.g., empty diagram), extension displays message "No components found in diagram" instead of empty matrix or error.

#### QAST004-3

PlantUML file with various naming conventions (`API_Gateway`, `api-gateway`, `apiGateway`, `ApiGateway`) all parse correctly and display with original names preserved.

---

### QAS008

#### NFR (Non-Functional Requirements) Customization

**Source of stimulus:** Software architect  
**Stimulus:** Wants to add/remove NFRs specific to project (e.g., add "Compliance", remove "Scalability")  
**Environment:** Extension settings or configuration UI  
**Artifact:** Settings manager and matrix UI  
**Response:** User can modify NFR columns through settings, changes apply immediately to matrix  
**Response Measure:** Changes apply without VSCode restart, new columns appear within 2 seconds

#### QAST008-1

User adds new NFR "Scalability" through VSCode settings (command palette or settings UI), new column appears in matrix as a new header with empty cells for all components, all within 2 seconds, no reload needed.

#### QAST008-2

User removes NFR "Performance" from settings, corresponding column disappears from matrix display within 2 seconds.

#### QAST008-3

System maintains at least 4 default NFRs: Usability, Performance, Security, Maintainability, and allows user to add/remove unlimited custom NFRs.

---

## Reliability

### QAS005

#### Data Persistence and Recovery

**Source of stimulus:** User interaction  
**Stimulus:** User fills matrix with evaluations and closes VSCode or file  
**Environment:** Workspace storage, any time user closes application  
**Artifact:** Storage manager and persistence layer  
**Response:** All matrix evaluation data is saved to workspace storage and restored when file/workspace reopens  
**Response Measure:** 100% of data recovery, no loss of evaluations

#### QAST005-1

After filling a 15×8 matrix (120 cells) with diverse values, closing VSCode, and reopening the same workspace, all 120 cell values are restored exactly as they were saved.

#### QAST005-2

Data for different `.puml` files (e.g., `frontend.puml` and `backend.puml`) are stored and retrieved separately - evaluations for one file do not affect another file's data.

#### QAST005-3

If VSCode crashes unexpectedly while user is editing, upon restart, the last saved state of the matrix is recovered from auto-save mechanism.

---

### QAS007

#### Dynamic File Update Handling

**Source of stimulus:** User action  
**Stimulus:** User edits `.puml` file (adds/removes components), saves file with Ctrl+S  
**Environment:** VSCode with open webview panel showing active Evolution matrix  
**Artifact:** File watcher and parser  
**Response:** Matrix automatically updates to reflect changes: new components shown as new rows (highlighted in green), removed components marked as deleted (highlighted in red or hidden)  
**Response Measure:** File changes detected and reflected in matrix within 2 seconds, no data loss

#### QAST007-1

User adds 2 new components to `.puml` file, saves (Ctrl+S), new components appear as new rows in matrix highlighted in green within 2 seconds.

#### QAST007-2

User removes 1 component from `.puml` file and saves, corresponding matrix row is marked as "removed" (visually distinct) or hidden, but evaluation history for that component is preserved for version comparison.

#### QAST007-3

When component is removed from file but user had evaluations for it, system prompts "Component 'X' removed. Discard evaluations?" allowing user to archive or delete the row.

---

### QAS009

#### Error Handling and Recovery

**Source of stimulus:** System  
**Stimulus:** Unexpected error occurs (invalid PlantUML, file corruption, out of memory, filesystem error)  
**Environment:** Normal extension operation  
**Artifact:** Error handler and recovery mechanism  
**Response:** Extension displays user-friendly error message and remains operational (no crash)  
**Response Measure:** 0 unrecoverable crashes from malformed user data

#### QAST009-1

User opens extremely large PlantUML file (10MB or 1000+ components), extension detects file size, shows warning "File is very large (10MB). Parsing may be slow. Continue?" with Cancel option, and handles user choice gracefully.

#### QAST009-2

PlantUML file contains invalid syntax causing parser exception, user sees error message "PlantUML Parse Error: Unexpected token at line 42. Please fix the file and save again." Extension remains responsive and usable for other files.

#### QAST009-3

If workspace storage becomes unavailable (permissions issue, disk full), extension displays warning "Unable to save data: workspace storage unavailable" but continues operating in memory, attempting to save again on next change.

---

## Maintainability

### QAS010

#### Parser Modularity

**Source of stimulus:** Development team  
**Stimulus:** Need to add support for new diagram format (e.g., Mermaid, UML, ArchiMate)  
**Environment:** Codebase architecture  
**Artifact:** Parser module structure  
**Response:** New parser can be added as separate module without modifying UI, storage, or core logic  
**Response Measure:** Adding new parser format requires < 200 lines of new code and no changes to existing components

#### QAST010-1

Adding Mermaid diagram support requires only creating a new `MermaidParser.ts` class implementing `IParser` interface, without modifications to `MatrixUI.ts`, `StorageManager.ts`, or `ExtensionCore.ts`.

#### QAST010-2

New parser follows existing interface contract so it integrates automatically with file watcher - system detects `.mmd` files and routes to `MermaidParser` without additional glue code.

---

## Compatibility

### QAS011

#### VSCode Version Support

**Source of stimulus:** VSCode marketplace and users  
**Stimulus:** User installs extension on their VSCode version  
**Environment:** Various VSCode versions across user base  
**Artifact:** Extension codebase and compatibility layer  
**Response:** Extension functions identically on current and 2 previous major VSCode versions  
**Response Measure:** Support for VSCode versions N, N-1, N-2 (e.g., 1.94, 1.93, 1.92)

#### QAST011-1

Extension installs and operates without errors on VSCode versions 1.92, 1.93, and 1.94, with all features working identically across versions.

#### QAST011-2

If newer VSCode version deprecates an API used by extension, extension gracefully falls back to alternate API or displays user-friendly message instead of crashing.

---

## Security

### QAS012

#### Project Data Isolation

**Source of stimulus:** User  
**Stimulus:** Works with multiple projects in different VSCode workspaces  
**Environment:** Multiple workspace folders open simultaneously or sequentially  
**Artifact:** Storage and data management system  
**Response:** Data from one project/workspace is completely isolated and inaccessible from other workspaces  
**Response Measure:** 100% data isolation between workspaces, zero cross-contamination

#### QAST012-1

User works on project A in workspace A, switches to project B in workspace B, matrix for project A shows completely different data than matrix for project B - no overlap or data leakage.

#### QAST012-2

Even if two `.puml` files have identical names (`architecture.puml`) in different workspaces, their evaluation data is stored separately and does not interfere.

#### QAST012-3

User cannot access another user's workspace data through extension - data is stored in user-specific VSCode storage with OS-level file permissions enforced.

---

## Portability

### QAS013

#### Cross-Platform Compatibility

**Source of stimulus:** Users on different operating systems  
**Stimulus:** User installs extension on their platform  
**Environment:** Windows, macOS, Linux systems  
**Artifact:** Extension codebase and dependencies  
**Response:** Extension functions identically across all supported platforms with no platform-specific code visible to user  
**Response Measure:** 100% feature parity across Windows 10+, macOS 12+, Ubuntu 22.04+

#### QAST013-1

PlantUML parsing, matrix rendering, data persistence, and file watching work identically on Windows 10, macOS 13, and Ubuntu 22.04 with no visual or functional differences.

#### QAST013-2

File paths are handled correctly using platform-independent path separators - code uses `path.join()` or similar, not hardcoded `/` or `\`.

#### QAST013-3

Extension dependencies (Node.js libraries, native modules) are cross-platform or have platform-specific build configurations that build correctly on all supported OS.

---

## Version Management

### QAS014

#### Version Comparison via Git

**Source of stimulus:** Software architect  
**Stimulus:** Opens version comparison panel and selects two commits from Git history  
**Environment:** VSCode workspace with Git repository initialized, containing multiple commits with changes to `.puml` file  
**Artifact:** Version comparison engine, Git integration layer, diff calculator  
**Response:** System displays diff showing which components were added, removed, or modified between selected versions, with component-level comparison  
**Response Measure:** Version diff displayed within 2 seconds for repositories up to 100 commits

#### QAST014-1

User selects commit v1 (containing 10 components: ServiceA, ServiceB...ServiceJ) and commit v2 (containing 12 components: ServiceA, ServiceB...ServiceJ, ServiceK, ServiceL), system displays diff "2 new components added (ServiceK, ServiceL), 0 removed, 0 modified" with visual highlighting within 2 seconds.

#### QAST014-2

When comparing two versions, for components that existed in both versions, evaluation scores (matrix values) for each NFR are displayed side-by-side for direct comparison (V1 value vs V2 value).

#### QAST014-3

If one of the selected commits does not have saved evaluations for the `.puml` file, system displays "No evaluations found for version X" and prompts user to select another commit or start fresh comparison.

---

### QAS015

#### Quality Change Calculation

**Source of stimulus:** System calculation engine  
**Stimulus:** User compares evaluations between two versions of diagram  
**Environment:** Both versions have complete or partial evaluations filled in matrix  
**Artifact:** Calculation engine, formula processor, visualization layer  
**Response:** System calculates quality change for each NFR category using formula: (sum_new - sum_old) / num_components and displays result as numeric value and visual indicator (bar chart, arrows, color coding)  
**Response Measure:** Calculation displayed as visual chart/graph within 1 second showing improvement or degradation per NFR category

#### QAST015-1

Version 1 has total evaluation score for "Performance" NFR = 15 points (10 components × average 1.5), Version 2 = 18 points. System calculates change = (18-15)/10 = +0.3 and displays "+0.3 improvement for Performance" with green indicator and up arrow.

#### QAST015-2

Chart displays all 4 default NFR categories (Usability, Performance, Security, Maintainability) with change scores: green bars/values for positive changes, red for negative, gray for neutral (0 change).

#### QAST015-3

Calculation formula handles edge cases: if Version 1 has 10 components and Version 2 has 12 components (2 new), formula uses the higher count (12) as denominator, or displays "Component count changed: 10→12, calculation uses latest count".

---

### QAS016

#### Version Timeline Visualization

**Source of stimulus:** Software architect  
**Stimulus:** Wants to see evolution of architecture quality over multiple versions and commits  
**Environment:** Multiple versions exist in Git history with evaluation data  
**Artifact:** Timeline visualization UI, data aggregation layer  
**Response:** System displays timeline showing all commits chronologically with quality score data point for each version, allowing user to hover/click for details and trends  
**Response Measure:** Timeline displays all versions with quality metrics, interactive elements respond within 100ms

#### QAST016-1

Timeline shows 5 commits in Git history (2024-01-15, 2024-01-20, 2024-02-01, 2024-02-10, 2024-02-15) with data points on a graph showing average quality score progression, user can hover over data point to see detailed metrics (component count, scores per NFR).

#### QAST016-2

Timeline allows user to click on any data point to jump to that version's detailed view, showing the exact matrix state and component list for that commit.

#### QAST016-3

Timeline visualizes trend lines for each NFR category, allowing user to identify which quality attributes are improving/degrading over time (e.g., "Performance improving, Security degrading").

---

## Summary

- **Total Quality Attributes:** 16
- **Total Test Cases:** 27
- **High Priority Requirements:** 9 (QAS001, QAS002, QAS003, QAS004, QAS005,QAS008, QAS012, QAS014, QAS015)
- **Medium Priority Requirements:** 6 (QAS006, QAS007, QAS009, QAS011, QAS013, QAS016)
- **Low Priority Requirements:** 1 (QAS010)


