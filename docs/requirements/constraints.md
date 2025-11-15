# Constraints

Finally, a set of constraints on the system and its implementation were collected. These are presented in the following table.

| ID    | Constraint |
|-------|------------|
| CON-1 | Architecture models must be represented in a human‑readable text format (e.g., PlantUML) and stored in the project’s Git repository alongside the source code. |
| CON-2 | Architecture diagrams are parsed only from their text representation; binary image formats (PNG, SVG, PDF, etc.) are not considered a source of truth. |
| CON-3 | The system must allow architects to define and modify evaluation attributes (table columns, “stressors”) without changing the application code, for example via configuration or metadata. |
| CON-4 | Scoring formulas for components must be configurable by the user (architect) so that different projects can adapt the tool to their own quality models. |
| CON-5 | The MVP must work as a local tool (e.g., CLI or simple local web UI) without relying on external databases or cloud‑hosted backend services; versioning is handled primarily via Git. |
| CON-6 | The initial version of the tool focuses on component (and possibly class) diagrams; sequence and use‑case diagrams are out of scope for the MVP. |
| CON-7 | The tool should support showing differences between two versions of an architecture (at least at the level of components being added, removed or changed), but the exact visual representation of this diff may be simplified in the MVP. |
