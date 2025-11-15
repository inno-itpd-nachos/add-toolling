# Contributing Guidelines

Thank you for contributing to the Architecture Scoring Tool. This document explains how we work as a team, how we use Git, and how to keep the project consistent and maintainable.

Our workflow is loosely inspired by [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow), adapted for weekly sprints and a small student team.

---

## Sprint cycle

We work in **weekly sprints**:

1. **Sprint planning (start of the week)**  
   - The team meets once per week.  
   - The lead creates GitHub Issues for planned work and places them on the Kanban board.  
   - Tasks are prioritized and assigned to team members for the current sprint.

2. **Execution during the week**  
   - Each team member works on assigned issues.  
   - Tasks move across board columns: `Backlog → Open → In progress → In review → Done`.  
   - If priorities change, the team adjusts issues on the board rather than working outside it.

3. **Sprint review & wrap‑up (end of the week)**  
   - The team meets again to review what was completed and what is still open.  
   - Incomplete tasks are discussed, re-estimated if needed, and either carried over or reprioritized for the next sprint.  
   - Problems and improvements are captured so we can adjust our process in the next sprint.

---
## Git workflow

### Branching rules

- The default branch is **`main`**.
- For most changes, create a short‑lived branch from `main`:
  - `feature/<short-name>` for new features  
    - e.g. `feature/plantuml-parser`
  - `bugfix/<short-name>` for bug fixes  
    - e.g. `bugfix/fix-nfr-dropdown`
  - `docs/<short-name>` for larger documentation updates  
    - e.g. `docs/add-quality-rationale`
- Very small documentation fixes (typos, minor clarifications in `.md` files) may be committed directly to `main`. All code and substantial changes should go through a pull request (PR).

### Branch protection rules

To keep `main` stable:

- Do not force-push to `main`.
- All non-trivial code and feature changes should go through a pull request.
- At least one teammate should review and approve a PR before it is merged.
- Small documentation-only changes in `.md` files may be committed directly to `main`, but contributors are encouraged to keep changes clear and focused.

### Commit message format

Use short, descriptive messages in the following form:


<type>: <short description>

Where `<type>` can be:

- `feat` – new feature
- `fix` – bug fix
- `docs` – documentation changes
- `chore` – tooling or maintenance
- `refactor` – internal refactoring without behavior change

### Git diagram (Mermaid)
gitGraph
    commit
    branch feature
    checkout feature
    commit
    checkout main
    merge feature
    commit

### Issues and pull requests

- **Issues**  
  - Every non-trivial piece of work should have an Issue.  
  - An Issue should contain:
    - A short summary
    - Context / motivation  
    - Acceptance criteria  
    - Links to relevant quality requirements or constraints (when applicable)

- **Pull Requests (PRs)**  
  - A PR should:
    - Reference the Issue it closes (for example: `Closes #23`).  
    - Briefly describe *what* changed and *why*.  
    - Mention any follow‑up work or limitations.
  - The reviewer checks:
    - That the implementation matches the Issue and acceptance criteria.  
    - That tests (if applicable) have been updated or added.  
    - That documentation and examples still make sense.

---

## Deployment

The project uses MkDocs for documentation and a simple deployment model:

- **Local / “staging”**  
  - Developers preview changes locally before opening a PR:
    - Run `mkdocs serve` from the repository root.  
    - Open the local URL shown in the terminal to verify content and navigation.

- **Production**  
  - The `main` branch represents the current “production” state.  
  - After changes are merged into `main`, documentation is built with MkDocs and published to GitHub Pages (either via a simple workflow or manually).  
  - Stakeholders access the latest version of the docs and architecture at:  
    - `https://inno-itpd-nachos.github.io/add-toolling/` (project GitHub Pages site).

This keeps deployment simple while still giving contributors a way to validate documentation locally before it goes live.

---

## License

We use the **MIT License** for this project.

**Why MIT?**

- It is short, widely understood, and permissive.  
- External contributors can freely use, modify, and share the code as long as they keep the copyright notice.  
- It is well suited for educational and open-source projects, where experimentation and reuse are encouraged.

The full license text is available in the `LICENSE` file at the repository root.

---

## GitHub Projects

We use a single GitHub Project as a Kanban board to track all work in the repository.

- **Project**: Architecture Scoring Tool Board  
  - Link: `https://github.com/inno-itpd-nachos/add-toolling/projects`

### Views and column order

The main view is a **board view** with the following column order:

1. **Backlog** – ideas and tasks not yet started.  
2. **Open** – tasks selected for the current or next sprint and ready to be picked up.  
3. **In progress** – tasks actively being worked on.  
4. **In review** – tasks waiting for review, feedback, or demo.  
5. **Done** – completed tasks.

Issues automatically appear in the correct column based on their status. During sprint planning, the team moves Issues from Backlog to Open; during the sprint, tasks flow to In progress, In review, and finally Done.

This structure:

- Mirrors our weekly sprint meetings (we review columns left‑to‑right).  
- Makes it easy for any team member or stakeholder to see current work, upcoming items, and finished tasks at a glance.

Contributors are expected to keep the board up to date by moving their Issues as they progress.