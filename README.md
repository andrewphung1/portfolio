# Portfolio Website

A modern, responsive portfolio website for showcasing mechanical engineering and EECS projects. Built to match the Figma design with clean aesthetics and smooth interactions.

## Project Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Interactive functionality
├── README.md          # This file
└── images/
    ├── portrait.jpg   # Your professional portrait (square, recommended: 400x400px)
    ├── working.jpg    # Photo of you working on a project (recommended: 800x600px)
    └── projects/
        ├── chess-1.jpg    # Project images (recommended: 1200x900px)
        ├── chess-2.jpg
        ├── robot-1.jpg
        ├── robot-2.jpg
```

## Getting Started

1. **Add Your Images**:
   - Replace `images/portrait.jpg` with your professional portrait photo
   - Replace `images/working.jpg` with a photo of you working on a project
   - Add your project images to `images/projects/` folder
   - Update image filenames in `index.html` to match your actual image files

2. **Customize Content**:
   - Update the bio text in the "About Me" section
   - Modify skills lists to match your expertise
   - Replace project descriptions with your actual projects
   - Update project links (GitHub, Live Demo) with your actual URLs
   - Change contact information in the footer

3. **Update Personal Information**:
   - Replace "Andrew Phung" with your name throughout the file
   - Update email address in the footer
   - Add your GitHub and LinkedIn profile URLs

4. **Project Categories**:
   - Set `data-category="mechanical"` for mechanical engineering projects
   - Set `data-category="product"` for product/software projects
   - Projects can be filtered using the filter buttons