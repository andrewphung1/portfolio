# PRD: About Me Section Vertical Alignment Fix

## Problem Statement
The "About Me" section currently displays a headshot image on the left and text content on the right, but they are not vertically centered relative to each other. The visual centerlines of the image and text block do not align, creating an unbalanced, unprofessional appearance.

## Goals
- Align the vertical center of the image gallery with the vertical center of the text block
- Maintain responsive design (stacked on mobile, side-by-side on desktop)
- Ensure clean, professional appearance consistent with portfolio design

## Requirements

### Functional Requirements
1. **Desktop Layout (>968px)**
   - Two-column layout: image gallery on left, text on right
   - Vertical centers of both elements must align on the same horizontal line
   - Equal column widths (50/50 split)
   - Adequate spacing between columns (3rem gap)

2. **Mobile Layout (≤968px)**
   - Stacked layout: image above text
   - Both elements centered horizontally
   - Reasonable vertical spacing between elements

3. **Visual Requirements**
   - No overlapping elements
   - No unintended large gaps
   - Consistent margins and padding
   - Maintain existing styling (colors, typography, borders)

### Technical Requirements
1. Use CSS Grid or Flexbox for reliable centering
2. Ensure alignment is based on the actual content height, not container height
3. Gallery navigation buttons and counter should not affect alignment
4. Must work with dynamic content (text can vary in length)

## Acceptance Criteria
- ✅ On desktop: Horizontal line through image midpoint = horizontal line through text midpoint
- ✅ On mobile: Layout stacks cleanly with proper spacing
- ✅ No layout bugs (overlapping, gaps, misalignment)
- ✅ Maintains existing responsive breakpoints
- ✅ Works with current gallery functionality (navigation, counter)

## Implementation Approach
- Rebuild CSS for `.about-content` using CSS Grid with `align-items: center`
- Ensure gallery container and text container are direct grid children
- Remove any conflicting flex/alignment properties
- Test with varying text lengths to ensure stability

