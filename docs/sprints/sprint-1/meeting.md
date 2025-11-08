# C2

## Summarizing team communication on 4 November

Discussion of task allocation and project planning. The goal of the meeting was to
assign owners for various tasks and set deadlines.
Discussion topics
- Task allocation: Dmitrii Batalov proposed distributing project tasks,
including review preparation, repository creation, and documentation. Aizat
Murtazin agreed to take C1, and Gleb — R1. Marat took responsibility for
the strategic plan and the tactics plan.
- Deadlines: Task timelines were discussed; in particular, tasks labeled “1”
and “A2” should be completed by the 8th, and some by the 5th.
- Project management: Dmitrii Batalov proposed using Kanban for project
management and discussed the need for documentation and
communications. Gleb and Marat discussed the possibility of changing tasks
during project execution.
- Architecture and documentation: Dmitrii Batalov noted that the project’s
architecture is simple and does not require databases, apart from the version
control system. Aizat Murtazin offered to take Quality Requirements, and
Dmitrii — the architecture.
- Meeting planning: Aizat Murtazin suggested holding a meeting on
Thursday evening or on Friday before the project submission to discuss the
results. Dmitrii Batalov agreed and noted that such a discussion would be
useful.
Summarizing team communication with customer on 7 November
- Goal: validate functional and quality requirements, review early UI/UX, and
align on a minimal, buildable MVP for the architecture scoring tool.
- Evaluation matrix: use a Components × NFRs table; scoring is tri-state per
component and attribute (−1, 0, +1) to indicate worsened, neutral, or
improved impact; compute category scores by simple
aggregation/averaging; the customer will share exact formulas.
- Data source: ideally auto-extract components/relations from PlantUML; for
MVP, manual entry is acceptable with the option to upload and version
UML files.
- Visualization: show differences between versions and highlight
added/removed/changed components; keep numeric scoring, and consider a 
later visual diff; a simple text diff is acceptable first, with richer graphics as
a “nice to have.”
- Versioning: adopt linear versioning per uploaded UML (v1, v2, v3) for
MVP; Git integration and semantic versioning can come later; timeline and
multi-project features are not required initially.
- Product form: MVP can be a local tool/web app working against local files;
do not over-engineer multi-user features; later, consider repository-backed
workflows.
- Alternative UI approach: propose a VS Code extension (wrapper around a
diagram editor) with in-place scoring via popups; the customer welcomes a
first installable plugin as a viable path alongside the web UI.
- Process/expectations: use Kanban; aim for early deployability (Docker
Compose acceptable) and deliver something that runs as soon as possible,
even “Hello World,” to reduce delivery risk.
- Next steps: refine Figma to emphasize the version selector and the scoring
table; finalize minimal features for MVP; customer to send scoring formulas
via Telegram.

KeyPoint: VScode extension is good idea

URL for team meeting:
https://ithelp.ktalk.ru/recordings/TTQ3W4yBWbK65dRPZv8W

Transcription of meeting with customer: [transcription](./transcription.txt)