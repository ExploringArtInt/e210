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
- Blocks
  - Margin and Padding support
- Spinner
- Button
  - SVG Icon
    - ADA description of icon
  - Label
  - States
    - Default state
    - Hover state
    - Active state
    - Focus state
    - Disabled state
- Modal
  - Close by hitting escape key
  - Close by selecting close button
  - Trap tab within modal
- Crumbs
  - Crumb link
  - Crumb seperator
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

### Excellence - How
- ADA Compliant
  - Tab and Select acrosss all GUIs within DOM
- Responsive for different widths and heights
- Unified Styling
  - Do not use CSS if not supported across modes
- Unified Content Scroll
  - Either no or one scroll bar displayed to access all content in DOM or Modal


### Dev Demo
- Top menu and crumbs using Simple HTML
- One or two split divs
- Each div can contain one or more:
  - Div with HTML
  - Div with 2D Canvas
  - Div with 3D Canvas
- Tab supported across all interactive elements displayed in DOM, includng canvases
