# Portfolio Website

A modern, responsive portfolio website for showcasing mechanical engineering and EECS projects. Built to match the Figma design with clean aesthetics and smooth interactions.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Scrolling**: Navigation with smooth scroll behavior
- **Project Filtering**: Filter projects by category (All Projects, Mechanical Work, Product Work)
- **Image Galleries**: Scrollable image galleries for each project with navigation controls
- **Modern UI**: Clean design with cyan accent color and generous white space

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
        ├── robot-1.jpg    # Project images (recommended: 1200x900px)
        ├── robot-2.jpg
        ├── robot-3.jpg
        ├── robot-4.jpg
        ├── quadcopter-1.jpg
        ├── quadcopter-2.jpg
        ├── quadcopter-3.jpg
        ├── iot-1.jpg
        ├── iot-2.jpg
        ├── iot-3.jpg
        └── iot-4.jpg
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

## Customization

### Colors
The main accent color is defined in CSS variables. To change it, modify the `--cyan` variable in `styles.css`:
```css
:root {
    --cyan: #06B6D4; /* Change this to your preferred color */
}
```

### Adding More Projects
To add a new project, copy one of the existing project card structures in `index.html` and:
1. Update the image paths
2. Modify the project title, subtitle, and description
3. Update the technology tags
4. Set the appropriate `data-category` attribute
5. Update the gallery image count in the photo counter

### Adding More Skills
Skills are organized in three columns. To add or modify skills, edit the `<ul class="skill-list">` sections in the Skills section.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

You can deploy this portfolio to:
- **GitHub Pages**: Simply push to a GitHub repository and enable Pages
- **Netlify**: Drag and drop the folder or connect your Git repository
- **Vercel**: Connect your Git repository for automatic deployments
- **Any static hosting service**: The site is pure HTML/CSS/JS with no build step required

## Notes

- All images should be optimized for web (use tools like ImageOptim or TinyPNG)
- Ensure image filenames match exactly (case-sensitive)
- The site uses smooth scrolling which requires JavaScript
- Project filtering and image galleries require JavaScript to function

## License

This portfolio template is free to use and modify for personal or commercial projects.

