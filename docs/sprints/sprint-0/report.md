# Report

## Alternatives research

- [Enterprise Architect (Sparx Systems)](https://sparxsystems.com/)
- [ArchiMate Tool](https://www.archimatetool.com/)
- [DOORS](https://www.ibm.com/products/requirements-management)
- [Papyrus](https://eclipse.dev/papyrus/)


| Attribute / Tool      | ArchiMate (e.g., Archi)                                   | Sparx Systems Enterprise Architect (EA)                   | IBM DOORS                                                 | Papyrus (Eclipse)                                         |
| :-------------------- | :-------------------------------------------------------- | :-------------------------------------------------------- | :-------------------------------------------------------- | :-------------------------------------------------------- |
| **Integration with GitHub** | - Not direct, file-based (XML).                        <br>- Can save models as XML files that can be versioned in Git. <br>- Limited direct integration for model changes. | - Good. Can integrate with Git/SVN for versioning model files (EAPX, QEA). <br>- Some direct features for commit/push. | - Limited direct integration.                               <br>- Primarily document-centric. <br>- Can export data that could theoretically be versioned. | - Good. Being Eclipse-based, integrates well with EGit (Eclipse Git Integration). <br>- Models (UML/SysML) are file-based (XMI) and can be versioned. |
| **Version Control System** | - External VCS (Git, SVN) for model files (XML).       <br>- No built-in VCS beyond standard file system. | - Excellent built-in VCS capabilities (baselines, diffing, merging within EA). <br>- Can connect to external VCS (Git, SVN, TFS). | - Strong internal versioning/baselining for requirements and documents. <br>- Less focused on *model* versioning. | - Relies on external VCS (Git, SVN) for XMI files. <br>- Eclipse history and local file history. |
| **Architecture Diff** | - Limited built-in diffing. <br>- External diff tools for XML files might show changes, but not architecturally meaningful. <br>- Some plugins might offer basic diffs. | - Very strong. Built-in model diffing, comparison, and merging features. <br>- Can compare baselines or different branches of the model. | - Strong diffing for requirement documents and attributes. <br>- Not designed for architectural model diffing. | - Good. Eclipse's compare editor works well for XMI files, but architectural meaning requires understanding XMI. <br>- Some plugins provide graphical diffs for UML/SysML. |
| **ADD Workflow Support** | - Indirect. ArchiMate models can represent architectural elements. <br>- NFRs can be modeled as principles or requirements linked to elements. <br>- No direct "evaluation matrix" tool, but can be simulated. | - Moderate to Strong. <br>- Can model architecture using UML/SysML. <br>- NFRs can be managed as requirements and linked to model elements. <br>- Custom scripts/add-ins can create evaluation matrices. | - Weak for direct architectural design/evaluation.           <br>- Primarily for requirements management. <br>- NFRs are well-managed, but linking to architecture for evaluation is manual/external. | - Moderate. <br>- Supports UML/SysML for architectural design. <br>- NFRs can be modeled and linked. <br>- Extensible nature allows for custom plugins to build ADD-like evaluation. |
| **Cost**              | - **Free/Open Source** (Archi). <br>- Other ArchiMate tools vary. | - **Commercial**, medium-to-high cost (per user license). <br>- Offers various editions. | - **Commercial**, high cost. <br>- Enterprise-grade licensing. | - **Free/Open Source** (Eclipse Public License). <br>- Development and support can incur costs. |
| **Best Fit for the Problem** | - **Moderate.** Good for defining static architecture and NFRs, but the "evolution matrix" and diffing (beyond file-level) would be manual or require significant customization/scripting. | - **Strong.** Excellent for architectural modeling, NFR management, and built-in diff/versioning. Closest to a commercial off-the-shelf solution for parts of your problem. Custom scripting would be needed for your specific "evolution matrix" logic. | - **Weak.** While NFRs are its strength, it lacks the architectural modeling and evaluation features you need. Not suitable for the core "evolution matrix" or PlantUML diff. | - **Moderate to Strong.** Provides a robust platform for modeling. The open-source and extensible nature means you *could* build your exact "evolution matrix" and PlantUML diffing as a plugin, but it would be a significant development effort. |

## Requirements

**Functional Requirements**

- FR1. PlantUML parser
- FR2. NFR management system
- FR3. Architecture scoring based on UML and NFR linked to cases
- FR4. Visual viewer of UML and visual editor
- FR5. Visual diff in UML and architecture based on some version control system (git in case of VSCode extension)
- FR6. Version control system (in case of web service)

**Nonfunctional Requirements**

- NFR1. Availability: VSCode extension / Web interface
- NFR2. Visualization of architecture
- NFR3. Ease of architecture modification
