// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const viewportHeight = window.innerHeight;
            const sectionHeight = target.offsetHeight;
            
            // For About section, ensure entire section from title to button is visible
            if (target.id === 'about') {
                const sectionTop = target.getBoundingClientRect().top + window.pageYOffset;
                const sectionBottom = sectionTop + sectionHeight;
                const availableHeight = viewportHeight - headerOffset;
                
                // Scroll to show the entire section from top (title) to bottom (button)
                // If section fits, center it; otherwise show from top
                if (sectionHeight <= availableHeight) {
                    // Section fits - center it
                    const scrollTo = sectionTop - headerOffset - (viewportHeight - sectionHeight) / 2;
                    window.scrollTo({
                        top: Math.max(0, scrollTo),
                        behavior: 'smooth'
                    });
                } else {
                    // Section is taller - scroll to show from top (title visible)
                    window.scrollTo({
                        top: sectionTop - headerOffset,
                        behavior: 'smooth'
                    });
                }
            } else if (target.id === 'skills') {
                // For Skills section, center it vertically in viewport
                const sectionTop = target.offsetTop;
                const sectionHeight = target.offsetHeight;
                const availableHeight = viewportHeight - headerOffset;
                const viewportCenter = headerOffset + (availableHeight / 2);
                
                // Calculate scroll position to center the section
                // We want the center of the section to align with the center of the available viewport
                const sectionCenter = sectionTop + (sectionHeight / 2);
                const scrollTo = sectionCenter - viewportCenter;
                
                window.scrollTo({
                    top: Math.max(0, scrollTo),
                    behavior: 'smooth'
                });
            } else {
                // For other sections, use standard scroll
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Project filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all') {
                card.classList.remove('hidden');
            } else {
                const category = card.getAttribute('data-category');
                if (category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    });
});

// Image gallery functionality
document.querySelectorAll('.project-gallery, .about-gallery').forEach(gallery => {
    const track = gallery.querySelector('.gallery-track');
    const prevBtn = gallery.querySelector('.prev-btn');
    const nextBtn = gallery.querySelector('.next-btn');
    const counter = gallery.querySelector('.photo-counter');
    const images = gallery.querySelectorAll('.gallery-img');
    
    // Track which images actually loaded successfully
    const loadedImages = [];
    let checkComplete = false;
    
    const checkAndUpdateGallery = () => {
        // Hide images that failed to load
        images.forEach((img, index) => {
            // Only hide if image has errored (not just not loaded yet)
            if (img.dataset.error === 'true') {
                img.style.display = 'none';
            }
        });
        
        // Count only visible images (not hidden with display: none)
        const visibleImages = Array.from(images).filter(img => 
            img.style.display !== 'none' && img.dataset.error !== 'true'
        );
        const totalCount = visibleImages.length;
        
        if (totalCount <= 1) {
            // Hide navigation and counter for single or no images
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            if (counter) counter.style.display = 'none';
            return;
        }
        
        // Show navigation and counter for multiple images
        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';
        if (counter) {
            counter.style.display = 'block';
            const totalPhotos = counter.querySelector('.total-photos');
            if (totalPhotos) totalPhotos.textContent = totalCount;
        }
        
        // Set up navigation only once
        if (!checkComplete) {
            setupNavigation(totalCount);
            checkComplete = true;
        }
    };
    
    const setupNavigation = (imageCount) => {
        const currentPhoto = counter.querySelector('.current-photo');
        const totalPhotos = counter.querySelector('.total-photos');
        
        let currentIndex = 0;
        if (totalPhotos) totalPhotos.textContent = imageCount;

        const updateCounter = () => {
            if (currentPhoto) currentPhoto.textContent = currentIndex + 1;
        };

        const scrollToImage = (index) => {
            // Ensure track width is calculated
            const imageWidth = track.offsetWidth || track.clientWidth;
            if (imageWidth === 0) {
                // Track not ready, try again after a short delay
                setTimeout(() => scrollToImage(index), 50);
                return;
            }
            
            // Since all images are in order in the DOM and each takes 100% width,
            // we can directly calculate scroll position: index * imageWidth
            const scrollPosition = index * imageWidth;
            
            // Set flag to prevent scroll event from interfering
            isScrollingProgrammatically = true;
            track.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            currentIndex = index;
            updateCounter();
            
            // Reset flag after scroll completes
            setTimeout(() => {
                isScrollingProgrammatically = false;
            }, 500); // Smooth scroll typically takes ~300-400ms
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    scrollToImage(currentIndex - 1);
                } else {
                    scrollToImage(imageCount - 1);
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < imageCount - 1) {
                    scrollToImage(currentIndex + 1);
                } else {
                    scrollToImage(0);
                }
            });
        }

        // Update counter on scroll with debouncing
        let scrollTimeout;
        let isScrollingProgrammatically = false;
        
        track.addEventListener('scroll', () => {
            // Ignore scroll events during programmatic scrolling
            if (isScrollingProgrammatically) return;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const imageWidth = track.offsetWidth;
                if (imageWidth === 0) return; // Track not ready yet
                
                // Calculate which image is currently visible based on scroll position
                // Since images are in order and each is 100% width, this is straightforward
                const scrollPosition = track.scrollLeft;
                const newIndex = Math.round(scrollPosition / imageWidth);
                
                // Clamp to valid range
                const clampedIndex = Math.max(0, Math.min(newIndex, imageCount - 1));
                
                if (clampedIndex !== currentIndex) {
                    currentIndex = clampedIndex;
                    updateCounter();
                }
            }, 50); // Debounce scroll events
        });

        // Initialize counter
        updateCounter();
    };
    
    // Initially hide everything
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (counter) counter.style.display = 'none';
    
    // Check each image
    images.forEach((img, index) => {
        // Check if already loaded
        if (img.complete && img.naturalHeight !== 0) {
            loadedImages.push(index);
        } else {
            // Wait for load or error
            img.addEventListener('load', () => {
                if (img.naturalHeight !== 0) {
                    if (!loadedImages.includes(index)) {
                        loadedImages.push(index);
                    }
                    checkAndUpdateGallery();
                }
            });
            
            img.addEventListener('error', () => {
                // Image failed to load, mark it and hide it
                img.dataset.error = 'true';
                img.style.display = 'none';
                checkAndUpdateGallery();
            });
        }
    });
    
    // Check after a short delay for images that loaded before event listeners
    setTimeout(() => {
        images.forEach((img, index) => {
            if (img.complete && img.naturalHeight !== 0 && !loadedImages.includes(index)) {
                loadedImages.push(index);
            }
        });
        checkAndUpdateGallery();
    }, 100);
    
    // Force layout recalculation to ensure first images display properly
    const forceLayout = () => {
        if (track && track.offsetWidth > 0) {
            // Trigger a reflow to ensure images are properly sized
            void track.offsetWidth;
        }
    };
    
    // Wait for first few images to load, then ensure layout
    let layoutChecked = false;
    const checkLayout = () => {
        if (!layoutChecked && loadedImages.length >= Math.min(3, images.length)) {
            setTimeout(forceLayout, 50);
            layoutChecked = true;
        }
    };
    
    // Check layout when first images load
    images.forEach((img, index) => {
        if (index < 3) { // First 3 images
            if (img.complete) {
                checkLayout();
            } else {
                img.addEventListener('load', checkLayout, { once: true });
            }
        }
    });
    
    // Also check after initial timeout
    setTimeout(checkLayout, 200);
});

// "View My Work" button scrolls to projects
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            const headerOffset = 80;
            const elementPosition = projectsSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Update active nav link on scroll
const sections = document.querySelectorAll('.section, .footer');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// About gallery vertical alignment helper
const updateAboutGalleryAlignment = () => {
    const gallery = document.querySelector('.about-gallery');
    const aboutText = document.querySelector('.about-text');
    const bioText = document.querySelector('.bio-text');

    if (!gallery || !aboutText || !bioText) return;

    const isMobile = window.matchMedia('(max-width: 968px)').matches;
    if (isMobile) {
        gallery.style.setProperty('--about-gallery-offset', '0px');
        return;
    }

    const extraHeight = aboutText.offsetHeight - bioText.offsetHeight;
    const offset = extraHeight > 0 ? -(extraHeight / 2) : 0;
    gallery.style.setProperty('--about-gallery-offset', `${offset}px`);
};

window.addEventListener('load', () => {
    updateAboutGalleryAlignment();
});

window.addEventListener('resize', () => {
    requestAnimationFrame(updateAboutGalleryAlignment);
});

