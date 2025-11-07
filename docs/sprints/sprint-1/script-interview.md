# Customer Interview Script - Sprint 1

**Date:** [To be filled]  
**Interviewer:** [To be filled]  
**Interviewee:** [To be filled]  
**Duration:** 45-60 minutes

## Introduction (5 minutes)

### Opening
- Purpose: Deep dive into specific requirements and validate assumptions from the first interview
- We'll discuss workflows, scoring mechanisms, and detailed feature requirements

### Context Recap
- From our first interview, we understand:
  - Input: Git commits containing architecture descriptions, requirements, and plantUMLs
  - Output: VSCode extension with visual representation and diffs
  - Visual diff showing changes between iterations (red/green elements)
  - Scoring formula will be provided by you

## Section 1: Workflow & Usage Scenarios

### Current Workflow
1. **How do you currently document architecture?**
   - What tools do you use? (PlantUML, other UML tools, text documents?)
   - Do you have an concrete example? We might try to draw smt you would like to see?
   - Where do you store architecture documentation? (Git, wiki, documents?)
   - How often do you update architecture documentation?

2. **Architecture evolution process:**
   - How do you track changes in architecture over time?
   - Who is involved in architecture decisions?

3. **Review and evaluation:**
   - How do you currently evaluate architecture quality?
   - Who reviews architecture? (Team leads, architects, stakeholders?)
   - What criteria do you use for evaluation?

## Section 2: Scoring & Evaluation

### Scoring Formula Details
6. **Evolution theory matrix:**
   - Can you provide more details about the matrix structure?
   - What are the specific non-functional requirements (NFRs) you want to evaluate?
   - What are the typical components you evaluate?
   - How do you currently calculate scores? (Manual spreadsheet, custom tool?)

7. **Scoring formula:**
   - Are there thresholds for "good" vs "bad" scores?
   - How should scores be visualized? (Heatmap, numbers, color coding?)

8. **Component evaluation:**
   - How do you link NFRs to specific components in UML?
   - Are there dependencies between components that affect scoring?
   - Do you evaluate relationships between components?

### Strong and Weak Spots
9. **Visualization of results:**
   - How should we highlight strong spots? (Green, bold, checkmarks?)
   - How should we highlight weak spots? (Red, warnings, specific indicators?)
   - Should there be recommendations or suggestions for improvement?

## Section 3: PlantUML & UML Details (10 minutes)

### PlantUML Usage
10. **Current PlantUML usage:**
    - What types of UML diagrams do you use? (Component, sequence, class, deployment?)
    - What PlantUML features do you use most? (Stereotypes, notes, relationships?)
    - Are there specific PlantUML patterns or conventions you follow?

11. **Parser requirements:**
    - What information from PlantUML is critical for scoring?
    - Do you use custom PlantUML extensions or plugins?
    - Are there specific PlantUML elements that must be preserved?

12. **Alternatives**
    - Do you consider alternatives? (Archi, Excalidraw, Curser diagram builders, etc)
    - What do like / dislike about them

### Visual Editor
12. **Editing capabilities:**
    - Do you want to edit UML directly in VSCode, or just view?
    - If editing, what level of editing? (Full editor, or just annotations/notes?)
    - Should changes sync back to PlantUML files automatically?

## Section 4: Version Control & Diff

### Git Integration
13. **Version control workflow:**
    We need strategy to find things to compare
    - How are architecture files organized in your git repository?
    - Do you have a specific branch strategy for architecture changes?
    - Are architecture files in a dedicated directory or scattered?

14. **Diff visualization:**
    We need strategy on how to compare
    - What level of detail do you need in diffs?
    - Should we show:
      - Component additions/removals?
      - Relationship changes?
      - Attribute/property changes?
      - NFR linkage changes?
    - How should we handle renamed components?

15. **Diff use cases:**
    - When would you use the diff feature? (Code reviews, architecture reviews, retrospectives?)
    - Who would review these diffs?

## Section 5: NFR Management (5 minutes)

### Non-Functional Requirements
<!-- 16. **NFR management:**

    - How do you currently manage NFRs? (Documents, tools, spreadsheets?)
    - What NFRs are most important to you? (Performance, scalability, security, maintainability, etc.)
    - Do NFRs change over time, or are they relatively stable? -->

17. **Linking NFRs to components:**
interesting!
    - How do you currently link NFRs to components?
    - Are there multiple NFRs per component?
    - Do you track NFR satisfaction over time?

## Section 6: Additional Features & Priorities

### Feature Priorities
<!-- 18. **Must-have vs nice-to-have:**
    - Which features are absolutely critical for MVP?
    - What can wait for later versions?
    - Are there features we haven't discussed that you need? -->

19. **Integration needs:**
    - Do you need integration with other tools? (Jira, Confluence, documentation tools?)
    - Are there export/import requirements? (PDF, images, other formats?)

### Constraints & Preferences
20. **Technical constraints:**
    - Any performance requirements? (Large diagrams, many components?)
    - Any security or privacy requirements?
    - Any accessibility requirements?

21. **User experience:**
    - What would make this tool a "delight" to use?
    - What would make you stop using it?
    - Any specific UI/UX preferences?

## Section 7: Validation & Closing (5 minutes)

### Validation
22. **Assumptions check:**
    - VSCode extension is the right format - still agree?
    - PlantUML is the right format - still agree?
    - Git integration is sufficient - any other VCS needs?

23. **Success criteria:**
    - What would make this project successful for you?
    - How would you measure success?
    - What would adoption look like in your team/organization?

### Next Steps
24. **Follow-up:**
    - Can we reach out with clarifying questions?
    - Would you be available for a demo/prototype review?
    - Any additional stakeholders we should talk to?

## Closing
- Thank you for your time and detailed feedback
- We'll synthesize this information and share a summary
- Next steps: [To be determined]

---

## Notes Section

### Key Takeaways
- [To be filled during interview]

### Action Items
- [To be filled during interview]

### Questions for Follow-up
- [To be filled during interview]

