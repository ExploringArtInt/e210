## vision.md

### 2026-0928 Steps
*** Weeks 116-112 2024-0904 ***

- create gui radio group and fix ADA issues

- refact content.js
  - From
    - step
    - entityInput
    - card
  - To
    - Step has a Card
    - Step has a set of entityInputs
      - an entityInput is displayed on the Step's Card

- refactorConstraint to use Composite Pattern
  - constraintCheckbox is a leaf
  - constraintRadioGroup is a leaf
  - constraintText is a leaf

- refactor Entity Input to use Composite Pattern
  - entityInputText is a leaf
    - is constructed with a guiInputText
    - Optional constraint for Text must match pattern
  - entityInputCheckbox is a leaf
    - is constructed with a guiInputCheckbox
    - Optional constraint for Checkbox must be checked
  - entityInputRadioGroup is a leaf
    - is constructed with a guiInputRadioGroup
    - Optional constraint for Radio Group one must be selected

  - refactor guiInput into Entity Input
    - guiInputCheckbox is part of entityInputCheckbox
    - guiInputRadioGroup is part of entityInputRadioGroup
    - guiInputText is part of entityInputText

- An Entity Input
  - can be contructed with Default Value

  - Error Message from option

- Entity Input
  - refactor when help buttons are activated from app to gui
    - add when Entity Input active, remove when inactive
    - figure out how to activate hidden buttons
    - add scope of parentElement to activateButton

- Help Text and Message in help button modal

- Input Password
  - toggle visible
  - Mask
    - all
    - up to last 4
    - 2nd and up to character (e.g. "@")
  - Unmask Checkbox
    - Checkbox
    - Eye open and closed
      - build to use anywhere in card
    - Toggle switch
      - build to use anywhere in card

  - Card Modal
    - Help message, click out to continue
    - Required checkbox and confirm or cancel, no clickout

*** Weeks 111-108 2024-1002 ***
- Card Composite Pattern
  - root
    - Card Component (root)
  - leaves
    - Card 2D Header (leaf)
    - Card 2D Step (leaf)
    - Card 2D Modal (leaf)
    - Card 2D Controls (leaf)
    - Card 2D Canvas (leaf)
    - Card 3D Canvas (leaf)
    - Card 2D Footer (leaf)
  - branch
    - Card Composite (branch)

- A Step
  - can have a Card added to it
  - can have a set of Entity Inputs added to it

- App Features
- Card Fetures
- Step Features
- Entity Input Features

- Dev Front-end
  - Card Component leaves
    - Card 2D DataTable (leaf)
    - Card 2D DataTree (leaf)
    - Card 2D DataStore front-end (leaf)
- Dev Back-end
  - DataStore back-end
  - Local Mongo in Node.js

*** Weeks 107-104 2024-1030 ***
- GUI Menu
  - CrumbTrail - a set of one or more crumbs
  - can optionally have a dataTree
  - a crumb trail has a seperator between crumbs (/, |, >)
  - Crumb - a single link back up the heirarchy
- Retest in Safari and resolve any issues

- Constraint Backend integration
  - Value Constraints (value): Ensuring the entity matches
  - Set of values, such as days of the week ("Monday", "Tuesday", etc.)
  - Known value stored in a SOR

  Dependency Constraints: Ensuring the entity is valid in the context of other entities, such as a return date that must be after the departure date.

- A Constraint can be
  - Front-end (field level error)
  - Back-end (step level error)

- In addition to gui (HTML/DOM devices), Entity Constraints can be used to support various device channels (mobile, SMS, chat, 3D-UX)

*** Weeks 103-99 2024-1204 ***
- Simple, safe, and free Cloud integrations
  - AWS
  - GCP
  - Azure
- Authenication - Who
- Authorization - What
  - Roles
    - OAuth integration
    - A role has a set of Intents

*** Weeks 98-90 2025-0205 ***
- Flow
  - FSM (Started, Completed, Cancelled, Saved, Resume, Reset)

- Intent
  - Pattern: Entity to Intent Orchestrator (E2I0) pattern
    - Similar patterns: Command, Command Query Responsibility Segregration (CQRS), Backend for Frontend (BFF)
    - Similar Frameworks: Flux (machine learning written in Julia)
  - How it works:
    - User indictes their Intent in the front-end
      - Menus in a GUI, Text input in a SMS or Chat
    - Back-end verifies the User has the authority to perform that Intent
    - Back-end makes request to front-end to gather Intent Entities required to perform that Intent
      - Intent Entities
        - Only exist on the back-end
        - Entity Inputs are gathered in the front-end
        - Both front-end and back-end confirm Entity Inputs meet Constraints before Intent Entity is updated with Entity Input value
      - Simple UX Contract
        - In a Card display a Flow
        - A Flow has one or more Steps
        - A Step has a GUI Form with one or more Entity Inputs
        - An Entity Input has
          - None or one Info Section
          - A GUI Input Elements (e.g., Text, Checkbox)
          - Zero or many Constraints

  - Business Process
    - An intent has one and only one Business Process or can an Intent belong to many Business Process?
  - Set of Sub-intents
    - Pay Amount Owed requires ability to See Amount Owed
  - Set of Intent Entities
    - Intent Entities have Constraints
      - These are validation rules that define the criteria  the extracted entity must meet to be considered valid.
      - Constraints ensure that the data is accurate, appropriate, and usable for the intended Business Process.

- Business Process
  - Auth flow
  - Maker/Checker flow
  - Registration/Login/FUIP flows

*** Weeks 89-80 2025-0416 ***
- xAPI 2.0 Support
  - RESTful JSON actor verb object
  - xAPI Gamification and Simulation Lession
  - xAPI Import
  - xAPI Export
  - Using GenAI to generate xAPI Lessions
- Dashboards integrating with xAPI
  - xAPI Hello World in Moodle
  - xAPI Hello World in Drupal
- Training
  - Lesson flow
  - CRUD Roles
  - CRUD User
  - CRUD Content
    - Certificate
    - Course
    - Lesson
    - Flow
    - Steps

*** Weeks 79-75 2025-0521 ***
- Analytical Reporting
  - User/Credential report
  - Global Cities report

*** Weeks 74-70 2025-0625 ***
- Before rebuild
  - All green unit tests for coverage and completeness
  - All green functional tests for coverage and completeness
  - Generate Gherkin User Stories from code
  - Generate Epics from User Stories
  - Generate Journeys from Epics

- *** Complete Rebuild from Testing Foundation ***
  - Rebuilt to align to existing unit and functional tests
    - Only fix existing defects, no refactoring interfaces or test

- *** Complete Rebuild from Agile Scope ***
  - Rebuild code and tests, freedom to refactor and innovate within Agile scope
    - Rebuild based on Journeys, Epics, and Stories

- *** Complete Rebuild from Scatch***
  - Rebuild code and tests, freedom to refactor and innovate without limits

- After rebuild
  - All green unit tests for coverage and completeness
  - All green functional tests for coverage and completeness

*** Weeks (TBD 3 WEEKS) ***
- 2D Simulator
  - Various simulators to support Reality Shows evaluation simulators
- Using GenAI to generate Simulator Lessons

*** Weeks (TBD 3 WEEKS) ***
- 3D Simulator
  - Various simulators to support Reality Shows evaluation simulators
- Using GenAI to generate Simulator Lessons

*** Weeks (TBD 3 WEEKS) ***
- Reality Show Gamification
  - Using GenAI to gamify Lessons
- Retest in Safari and resolve any issues

*** Weeks (TBD 3 WEEKS) ***
- Reality Show Learning Format

  - Core Game Engine
    - Design and implement UI/UX system
    - Create save/load functionality
    - Create login authentication/authorization functionality
    - Develop the base game framework
    - Implement game state management

*** Weeks (TBD 3 WEEKS) ***
- Character Creation and Customization
  - Design character creation interface
  - Implement skill and attribute system
  - Create character backstory generator
  - Develop character appearance customization

*** Weeks (TBD 3 WEEKS) ***
- Show Selection and Onboarding
  - Create show selection interface
  - Implement show-specific tutorial systems
  - Design and create show introductions
  - Develop contestant profile system

*** Weeks (TBD 3 WEEKS) ***
- Challenge System
  - Design generic challenge framework
  - Implement show-specific challenge types
  - Create challenge difficulty scaling system
  - Develop time management mechanics for challenges

*** Weeks (TBD 3 WEEKS) ***
- Team Dynamics
  - Implement team formation mechanics
  - Create team communication system
  - Develop team conflict resolution mechanics
  - Design and implement team performance metrics

*** Weeks (TBD 3 WEEKS) ***
- Judging and Evaluation System
  - Create AI judge behavior system
  - Implement human judge personality traits
  - Develop scoring and ranking system
  - Create feedback and critique generation system

*** Weeks (TBD 3 WEEKS) ***
- Player Skills and Growth
  - Implement skill progression system
  - Create learning and practice mechanics
  - Develop mentorship and coaching system
  - Design and implement specialty skill trees for each show

*** Weeks (TBD 3 WEEKS) ***
- Load Show-Specific Data
  - Design flexible data structure for show-specific information
  - Implement data loading system for show details
  - Create content management system for show-specific challenges
  - Develop dynamic UI adaptation based on loaded show data

*** Weeks (TBD 3 WEEKS) ***
- AI Contestants and NPCs
  - Design AI contestant behavior system
  - Implement NPC interaction mechanics
  - Create dynamic relationships between characters
  - Develop AI contestant skill progression

*** Weeks (TBD 3 WEEKS) ***
- Multiplayer and Community Features
  - Develop online multiplayer functionality
  - Create leaderboards and ranking systems
  - Implement player-vs-player challenge modes
  - Design and create community events and competitions

*** Weeks (TBD 3 WEEKS) ***
- Audio and Visual Production
  - Design and implement show-specific visual styles
  - Create dynamic sound effects and music system
  - Develop character voice acting system
  - Implement cutscene and storyline presentation mechanics

*** Weeks (TBD 3 WEEKS) ***
- Replayability and Procedural Generation
  - Create procedurally generated challenges
  - Implement dynamic difficulty adjustment
  - Develop alternate storylines and outcomes
  - Create randomized events and twists

*** Weeks (TBD 3 WEEKS) ***
- Analytics and Metrics
  - Implement player performance tracking
  - Create in-game analytics dashboard
  - Develop strategy suggestion system
  - Design and implement achievement system

*** Weeks (TBD 4 WEEKS) ***
- Before rebuild
  - All green unit tests for coverage and completeness
  - All green functional tests for coverage and completeness
  - Generate Gherkin User Stories from code
  - Generate Epics from User Stories
  - Generate Journeys from Epics

- *** Complete Rebuild from Testing Foundation ***
  - Rebuilt to align to existing unit and functional tests
    - Only fix existing defects, no refactoring interfaces or test

- *** Complete Rebuild from Agile Scope ***
  - Rebuild code and tests, freedom to refactor and innovate within Agile scope
    - Rebuild based on Journeys, Epics, and Stories

- *** Complete Rebuild from Scatch***
  - Rebuild code and tests, freedom to refactor and innovate without limits

- After rebuild
  - All green unit tests for coverage and completeness
  - All green functional tests for coverage and completeness

*** Week (TBD 4 WEEKS) ***
  - Application Development (6%)

*** Week (TBD 2 WEEKS) ***
  - Security and Ethics (4%)

*** Week (TBD 2 WEEKS) ***
  - Learning (12%)

*** Week (TBD 2 WEEKS) ***
  - Business Process (9%)

*** Week (TBD 2 WEEKS) ***
  - Marketing and Sales (17%)

*** Week (TBD 2 WEEKS) ***
  - Capital Growth (11%)

*** Week (TBD 2 WEEKS) ***
  - Infrastructure (3%)

*** Week (TBD 2 WEEKS) ***
  - Life and Health (10%)

*** Week (TBD 2 WEEKS) ***
  - Custom Production (10%)

*** Week (TBD 2 WEEKS) ***
  - Logistics (12%)

*** Weeks 6-1 -Launch 2026-1028 ***
  - Final Testing

Launch Goals
 - Scalable infrastructure
 - Partner with 7 Global Church Networks
 - LLM Chat to assist teachers
 - Volunteer support staff to assist LLM Chat
