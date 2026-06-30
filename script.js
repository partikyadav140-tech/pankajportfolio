/**
 * SCRIPT.JS - PORTFOLIO INTERACTIVE LOGIC
 * Organized into modular self-contained modules for clarity.
 * Comments are detailed to assist with code explanations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all portfolio modules
    initThemeManager();
    initMobileNav();
    initScrollProgressAndHeader();
    initTypingAnimation();
    initIntersectionObservers();
    initContactFormValidation();
    initScrollToTop();
    updateFooterYear();
    initContactTabs();
    initAutoSliders();
});

/* =========================================================================
   1. THEME MANAGER (LIGHT/DARK MODE TOGGLE)
   Controls theme switching and saves the user preference to localStorage.
   ========================================================================= */
function initThemeManager() {
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check if user has a preference saved in localStorage, default to system preference if not
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark');
        themeIcon.className = 'fa-regular fa-sun'; // Show sun icon in dark mode
    } else {
        document.body.classList.remove('dark');
        themeIcon.className = 'fa-regular fa-moon'; // Show moon icon in light mode
    }

    // Toggle click event
    themeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        
        // Swap icons and save state to localStorage
        if (isDark) {
            themeIcon.className = 'fa-regular fa-sun';
            localStorage.setItem('portfolio-theme', 'dark');
        } else {
            themeIcon.className = 'fa-regular fa-moon';
            localStorage.setItem('portfolio-theme', 'light');
        }
    });
}

/* =========================================================================
   2. MOBILE NAVIGATION CONTROLLER
   Toggles mobile menu overlay drawer and animates hamburger icon lines.
   ========================================================================= */
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu visibility
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active-menu');
        navToggle.classList.toggle('open-menu');
        
        // Disable body scroll when drawer is open to prevent background scrolling
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile drawer when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active-menu');
            navToggle.classList.remove('open-menu');
            document.body.style.overflow = '';
        });
    });
}

/* =========================================================================
   3. STICKY HEADER & SCROLL PROGRESS LINE INDICATOR
   Applies scroll indicators and header scroll shadow triggers.
   ========================================================================= */
function initScrollProgressAndHeader() {
    const header = document.getElementById('header');
    const progressLine = document.getElementById('scroll-progress-line');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // 1. Calculate percentage scrolled
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressLine.style.width = `${scrollPercent}%`;

        // 2. Add sticky shadow layout to header when scrolled past 20px
        if (scrollTop > 20) {
            header.style.boxShadow = '0 10px 30px var(--shadow-color)';
        } else {
            header.style.boxShadow = '';
        }
    });
}

/* =========================================================================
   4. TYPING TEXT ANIMATION
   Uses basic JavaScript timing loops to simulate text typing.
   ========================================================================= */
function initTypingAnimation() {
    const typingSpan = document.getElementById('typing-text');
    if (!typingSpan) return;

    // List of words to cycle through
    const words = ["Student & Developer", "Web Designer", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Milliseconds per character

    function typeLoop() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            // Add character
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // Handle word completion state transitions
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end of the word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Move to next word
            typingSpeed = 500; // Short pause before starting new word
        }

        setTimeout(typeLoop, typingSpeed);
    }

    // Start loop
    setTimeout(typeLoop, 500);
}

/* =========================================================================
   5. INTERSECTION OBSERVERS (SCROLL SPY, REVEALS, & SKILLS BARS)
   Uses Intersection Observer API for modern performance-friendly triggers.
   ========================================================================= */
function initIntersectionObservers() {
    
    // --- 5A. ACTIVE NAVIGATION LINK scrollspy ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const scrollSpyOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the middle of screen
        threshold: 0
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, scrollSpyOptions);

    sections.forEach(section => scrollSpyObserver.observe(section));


    // --- 5B. GENERAL SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Trigger slightly before element enters viewport
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Once element is shown, unobserve it to conserve cycles
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(element => revealObserver.observe(element));


    // --- 5C. SKILLS PROGRESS BAR FILL TRIGGERS ---
    const skillsSection = document.getElementById('skills');
    const skillFills = document.querySelectorAll('.skill-bar-fill');

    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Populate progress bar width from HTML data attribute
                    skillFills.forEach(fill => {
                        const targetWidth = fill.getAttribute('data-width');
                        fill.style.width = targetWidth;
                    });
                    // Run only once when skills section enters viewport
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        skillsObserver.observe(skillsSection);
    }
}

/* =========================================================================
   6. CONTACT FORM CLIENT-SIDE VALIDATION
   Performs live visual feedback and triggers success banners.
   ========================================================================= */
function initContactFormValidation() {
    const form = document.getElementById('contact-form');
    const successBanner = document.getElementById('form-success-banner');
    
    if (!form) return;

    // Field query handles
    const fields = [
        { id: 'form-name', validator: val => val.trim().length >= 2 },
        { id: 'form-email', validator: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) },
        { id: 'form-subject', validator: val => val.trim().length >= 4 },
        { id: 'form-message', validator: val => val.trim().length >= 15 }
    ];

    // Track live input changes to remove error indicator red borders once corrected
    fields.forEach(field => {
        const inputEl = document.getElementById(field.id);
        if (inputEl) {
            inputEl.addEventListener('input', () => {
                const groupEl = inputEl.closest('.form-group');
                if (field.validator(inputEl.value)) {
                    groupEl.classList.remove('invalid-field');
                }
            });
        }
    });

    // Form submission validation intercept
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop native navigation submit reload
        
        let isFormValid = true;

        fields.forEach(field => {
            const inputEl = document.getElementById(field.id);
            const groupEl = inputEl.closest('.form-group');
            const isValid = field.validator(inputEl.value);

            if (!isValid) {
                groupEl.classList.add('invalid-field');
                isFormValid = false;
            } else {
                groupEl.classList.remove('invalid-field');
            }
        });

        // Trigger success sequence on valid form data
        if (isFormValid) {
            showFormSuccess();
        }
    });

    function showFormSuccess() {
        // 1. Hide form elements with transition
        form.style.opacity = '0';
        form.style.pointerEvents = 'none';

        // 2. Show Success Banner
        successBanner.classList.add('show-banner');

        // 3. Reset all form inputs
        form.reset();

        // 4. Auto revert dashboard banner after 5 seconds
        setTimeout(() => {
            successBanner.classList.remove('show-banner');
            form.style.opacity = '1';
            form.style.pointerEvents = 'auto';
        }, 5000);
    }
}

/* =========================================================================
   7. SCROLL TO TOP FLOATING ACTION BUTTON
   Monitors page scrolls to reveal button, and triggers smooth animations.
   ========================================================================= */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-to-top');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        // Show button if window is scrolled past 400px height
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('show-scroll');
        } else {
            scrollTopBtn.classList.remove('show-scroll');
        }
    });

    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* =========================================================================
   8. FOOTER LEGAL TIMESTAMP AUTO-UPDATE
   Ensures the copyright year stays relevant.
   ========================================================================= */
function updateFooterYear() {
    const yearSpan = document.getElementById('footer-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/* =========================================================================
   9. CONTACT TAB SWITCHER
   Toggles between contact details card and contact form card.
   ========================================================================= */
function initContactTabs() {
    // Only initialize tabs on mobile devices (width <= 768px)
    if (window.innerWidth > 768) return;

    const tabBtns = document.querySelectorAll('.contact-tab-btn');
    const detailsPanel = document.getElementById('contact-details-panel');
    const formPanel = document.getElementById('contact-form-panel');

    if (!detailsPanel || !formPanel) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active-tab'));
            btn.classList.add('active-tab');

            const target = btn.getAttribute('data-target');
            if (target === 'details') {
                detailsPanel.classList.add('active-panel');
                formPanel.classList.remove('active-panel');
            } else {
                formPanel.classList.add('active-panel');
                detailsPanel.classList.remove('active-panel');
            }
        });
    });
}

/* =========================================================================
   10. HORIZONTAL AUTO-SCROLL SLIDERS
   Auto scrolls projects, skills, and education cards horizontally every 2 seconds.
   ========================================================================= */
function initAutoSliders() {
    // Only setup auto scrolling on mobile devices (width <= 768px)
    if (window.innerWidth <= 768) {
        setupSlider('projects-slider', 'projects-dots', 2000);
        setupSlider('skills-slider', 'skills-dots', 2000);
        setupSlider('education-slider', 'education-dots', 2000);
    }
}

function setupSlider(sliderId, dotsId, intervalTime) {
    const slider = document.getElementById(sliderId);
    const dotsContainer = document.getElementById(dotsId);
    if (!slider || !dotsContainer) return;

    // Filter to only include the actual slider cards (ignores comment nodes & display:none timeline-lines)
    const slides = Array.from(slider.children).filter(child => {
        return child.classList.contains('project-card') || 
               child.classList.contains('skills-box') || 
               child.classList.contains('timeline-item');
    });
    const numSlides = slides.length;
    const dots = dotsContainer.querySelectorAll('.dot');
    let currentSlide = 0;
    let timer;

    function goToSlide(index) {
        currentSlide = index;
        const slideWidth = slider.clientWidth;
        slider.scrollTo({
            left: index * (slideWidth + 32), // Add gap spacing (2rem = 32px)
            behavior: 'smooth'
        });
        
        // Update dot indicators
        dots.forEach((dot, idx) => {
            if (idx === index) {
                dot.classList.add('active-dot');
            } else {
                dot.classList.remove('active-dot');
            }
        });
    }

    function nextSlide() {
        let nextIdx = (currentSlide + 1) % numSlides;
        goToSlide(nextIdx);
    }

    function startTimer() {
        timer = setInterval(nextSlide, intervalTime);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    startTimer();

    // Pause auto-play on hover (only for devices that support mouse pointer hovers)
    if (window.matchMedia('(hover: hover)').matches) {
        slider.addEventListener('mouseenter', stopTimer);
        slider.addEventListener('mouseleave', startTimer);
    }

    // Support dot click switching
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            goToSlide(idx);
            stopTimer();
            startTimer();
        });
    });

    // Recalculate slide scroll on window resizing
    window.addEventListener('resize', () => {
        goToSlide(currentSlide);
    });
}
