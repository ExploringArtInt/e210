## vision.md

### 2026-0928 Steps
*** Weeks 116-112 2024-0904 ***

- Facade Pattern:
  - Constraint object
    - ConstraintCheckbox object is a Constaint
    - ConstraintRadio object is a Constaint
    - ConstraintText object is a Constaint

- What are alternatives patterns in JavaScript?

- Step with a Card
  - A Step has a Card
    - A Step has a set of Entity Inputs
    - An Entity Input has:
      - a GUI element
      - a set of Constraints

    - Entity Input for Text
      - Constrain for Text must match pattern
    - Entity Input for Checkbox
      - Constrain for Checkbox must be checked
    - Entity Input for Radio set
      - Constrain for Radio Set one must be selected

- Error Message from option

 - Entity Input
  - Optional default value

  - refactor when help buttons are activated from app to gui
    - add when Entity Input active, remove when inactive
    - figure out how to activate hidden buttons
    - add scope of parentElement to activateButton

  - Help Text and Message in help button modal

  - Error Message to

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

- Card support of 2D/3D Canvas

- Header, Side, 2D/3D Canvas, Footer
- App Features
- Card Fetures
- Step Features
- Entity Input Features

*** Weeks 111-108 2024-1002 ***
- Dev Front-end
  - Table
  - DataTree
  - DataStore front-end
- Dev Back-end
  - DataStore back-end
  - Local Mongo in Node.js

*** Weeks 107-104 2024-1030 ***
- CrumbTrail - a set of one or more crumbs
  - can optionally have a dataTree
  - a crumb trail has a seperator between crumbs (/, |, >)
  - Crumb - a single link back up the heirarchy
- Retest in Safari and resolve any issues

 - Constraint Backend integration
  - Value Constraints (value): Ensuring the entity matches
    - Set of values, such as days of the week ("Monday", "Tuesday", etc.)
    - Known value stored in a SOR

  Dependency Constraints: Ensuring the entity is valid in the context of other entities, such as a return date that must be after the departure date in a travel booking.

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

- *** Complete Rebuild from Scatch***

*** Weeks 69-60 2025-0903 ***
- Simulation
  - 2D Simulator
  - 3D Simulator
  - Various simulators to support Reality Shows evaluation simulators
  - Reality Show Gamification
- Using GenAI to generate Simulator Lessons
- Using GenAI to gamify Lessons
- Retest in Safari and resolve any issues

*** Weeks 59-57 2025-0924 ***
- Reality Show Learning Format

  - Core Game Engine
    - Design and implement UI/UX system
    - Create save/load functionality
    - Create login authentication/authorization functionality
    - Develop the base game framework
    - Implement game state management

*** Weeks 56-52 2025-1029 ***
- Character Creation and Customization
  - Design character creation interface
  - Implement skill and attribute system
  - Create character backstory generator
  - Develop character appearance customization

*** Weeks 51-49 2025-1119 ***
- Show Selection and Onboarding
  - Create show selection interface
  - Implement show-specific tutorial systems
  - Design and create show introductions
  - Develop contestant profile system

*** Weeks 48-46 2025-1210 ***
- Challenge System
  - Design generic challenge framework
  - Implement show-specific challenge types
  - Create challenge difficulty scaling system
  - Develop time management mechanics for challenges

*** Weeks 45-41 2026-0114 (time for holidays) ***
- Team Dynamics
  - Implement team formation mechanics
  - Create team communication system
  - Develop team conflict resolution mechanics
  - Design and implement team performance metrics

*** Weeks 40-38 2026-0204 ***
- Judging and Evaluation System
  - Create AI judge behavior system
  - Implement human judge personality traits
  - Develop scoring and ranking system
  - Create feedback and critique generation system

*** Weeks 37-35 2026-0225 ***
- Player Skills and Growth
  - Implement skill progression system
  - Create learning and practice mechanics
  - Develop mentorship and coaching system
  - Design and implement specialty skill trees for each show

*** Weeks 34-32 2026-0318 ***
- Load Show-Specific Data
  - Design flexible data structure for show-specific information
  - Implement data loading system for show details
  - Create content management system for show-specific challenges
  - Develop dynamic UI adaptation based on loaded show data

*** Weeks 31-29 2026-0408 ***
- AI Contestants and NPCs
  - Design AI contestant behavior system
  - Implement NPC interaction mechanics
  - Create dynamic relationships between characters
  - Develop AI contestant skill progression

*** Weeks 28-26 2026-0429 ***
- Multiplayer and Community Features
  - Develop online multiplayer functionality
  - Create leaderboards and ranking systems
  - Implement player-vs-player challenge modes
  - Design and create community events and competitions

*** Weeks 25-23 2026-0520 ***
- Audio and Visual Production
  - Design and implement show-specific visual styles
  - Create dynamic sound effects and music system
  - Develop character voice acting system
  - Implement cutscene and storyline presentation mechanics

*** Weeks 22-20 2026-0610 ***
- Replayability and Procedural Generation
  - Create procedurally generated challenges
  - Implement dynamic difficulty adjustment
  - Develop alternate storylines and outcomes
  - Create randomized events and twists

*** Weeks 19-17 2026-0701 ***
- Analytics and Metrics
  - Implement player performance tracking
  - Create in-game analytics dashboard
  - Develop strategy suggestion system
  - Design and implement achievement system

*** Week 16 2026-0708 ***
  - Application Development (6%)

*** Week 15 2026-0715 ***
  - Security and Ethics (4%)

*** Week 14 2026-0722 ***
  - Learning (12%)

*** Week 13 2026-0728 ***
  - Business Process (9%)

*** Week 12 2026-0805 ***
  - Marketing and Sales (17%)

*** Week 11 2026-0812 ***
  - Capital Growth (11%)

*** Week 10 2026-0819 ***
  - Infrastructure (3%)

*** Week 9 2026-0826 ***
  - Life and Health (10%)

*** Week 8 2026-0902 ***
  - Custom Production (10%)

*** Week 7 2026-0909 ***
  - Logistics (12%)

*** Weeks 6-1 -Launch 2026-1028 ***
  - Final Testing

Launch Goals
 - Scalable infrastructure
 - Partner with 7 Global Church Networks
 - LLM Chat to assist teachers
 - Volunteer support staff to assist LLM Chat
