## gui.md: Graphical User Interface

### GUI Modes
- Simple HTML
- 2D/3D Canvas Overlay
- 2D Canvas Embed
- 3D Canvas Embed

### Value - What
- Text
  - Custom font
  - Infinite wrapping
  - Flex support (if possible)
  - Size, color, alignment
- Blocks
  - Margin and Padding support
- Spinner
- Button
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
  - Only uses CSS where supported across modes

### Dev Demo
- Top menu and crumbs using Simple HTML
- One or two split blocks below top menu and crumbs (use Flex)
  - Each block can display a menu/crumbs for any of the supported GUI Modes
  - Tab supported across Top menu/crumbs and each displayed block and GUI within them
