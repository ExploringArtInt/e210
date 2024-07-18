## gui.md: Graphical User Interface

## prompt: Create gui.js, index.html, styles.css, and gui.test.jst for HTML UI Components using CSS and Flex. Create the a button with a text label that can be any length (wraps as needed using Flex).

## prompt: See uploaded project files and compare with the files you created. I am curious if you have any comments, questions, or concerns with my changes?

## prompt: button can have custom font
## prompt: button can have SVG icon
## prompt: Button states support: Default state, Hover state, Active state, Focus state, and Disabled state.
## prompt: Buttons fit into a Flex menu at the top of the screen or optionally at the bottom of the screen.

### GUI Modes
- Solution: HTML/CSS/Flex
  - Simple HTML
  - 2D/3D Canvas Overlay
  - 2D/3D Canvas Embedded UX scope is interaction with view and objects

### Value - What
- Text
  - Custom font
  - Infinite wrapping
  - Flex support
  - Size, color, alignment
- Button
  - SVG Icon
    - ADA description of icon
  - Label
  - States
    - Default state
    - Hover state (mouse)
    - Focus state (tab)
    - Active state - TBD
    - Disabled state - TBD
- GUIDs
  - Guid 0 to 4B
  - Luid 0 to 9999

  - Create function to add menu bar to a div
  - Create function to add button to a menu bar
  - Create patterns.js
    - create FSM
  - Create app.js and app.state.js
    - create appFSM to set state
- Spinner
  - test delay function to verify it works

## NEXT
- App - fsm with one or more cards
      - an app has a router that can parse URL parameters to a Page>Card>Flow
      - an app contains the entire DOM
      - an app has a 2D light source for any 2D shadows
- Card - fsm with zero or more menus, breadcrumbs, flows, tables and/or canvases
        - a card can be active or hidden
        - a card can have a border
          - a border has a corner radius starting at 0
          - a border can have a 2D shadow
        - a card has a z-index
        - a card can be modal, interaction and tabbing is trapped within card
          - close by hitting escape key
          - close by selecting close button
        - a card can be non-modal, interaction and tabbing continues within page
        - vertical and horizontal alignment via Flex
- Menu - holds one or more buttons
  - Button - click to request action
    - Optional icon
    - Optional text
- CrumbTrail - a set of one or more crumbs
  - can optionally have a dataTree
  - a crumb trail has a seperator between crumbs (/, |, >)
  - Crumb - a single link back up the heirarchy
- Flow - fsm with one or more steps
  - Step - fsm with zero or more elements and/or buttons
    - Element
      - vertical and horizontal alignment via Flex
      - Checkbox
      - Toggle
        - Radiobox
      - Input Field
        - Label
        - Default value
        - Mask
        - Unmask Toggle
        - ADA Aria data
        - Error Indicator
        - Error Text
- Table - a display of cells in columns and rows
      - can optionally have a dataTree
      - can optionally be sorted
      - can optionally be paged
- Canvas - a display of 2D and 3D elements
         - can optionally have interaction and tabbing that continues within page
         - can optionally have a dataTree
- DataTree - a JSON data heirarchy
  - columns are attributes
  - rows are instances
  - cells are values
    - can optionally link to next level down in heirarchy
- DataStore - persists zero or more dataTrees
  - api to local Mongo using NoSQL
  - api to Google Firebase using NoSqL

### Excellence - How
- ADA Compliant
  - Tab and Select acrosss all GUIs within DOM
- Responsive for different widths and heights
- Unified Styling
  - Do not use CSS if not supported across modes
- Unified Content Scroll
  - Either no or one scroll bar displayed to access all content in DOM or Modal

## Roadmap
- Support Simple UX Contract Pattern
  - All UI elements need to be dynamic via Javascript CRUD

### Dev Demo
- Top menu and crumbs using Simple HTML
- One or two split divs
- Each div can contain one or more:
  - Div with HTML
  - Div with 2D Canvas
  - Div with 3D Canvas
- Tab supported across all interactive elements displayed in DOM, includng canvases
