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

## NEXT

- App - fsm with one or more pages
- Page - fsm with one or more layers
       - a page contains the entire DOM
- Layer - fsm with zero or more menus, breadcrumbs, flows, tables and/or canvases
        - a layer has a z-index
        - a layer can be modal, interaction and tabbing is trapped within layer
          - close by hitting escape key
          - close by selecting close button
        - a layer can be non-modal, interaction and tabbing continues within page
        - vertical and horizontal alignment via Flex
- Menu - holds one or more buttons
  - Button - click to request action
    - Optional icon
    - Optional text
- Breadcrumbs - a set of crumbs
  - Crumb - a single link back up the heirarchy
    - crumbs have a seperator between them (/, |, >)
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
        - can optionally be sorted
        - can optionally be paged
- Canvas - a display of 2D and 3D elements
         - can optionally have interaction and tabbing that continues within page

- Create function to add button to a menu bar
- Spinner
  - test delay function to verify it works

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
