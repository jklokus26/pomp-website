// ===== Announcement Banner Rotation =====
const announcementItems = document.querySelectorAll('.announcement-item');
let currentAnnouncementIndex = 0;

function rotateAnnouncements() {
    // Defensive check: ensure announcement items exist
    if (!announcementItems || announcementItems.length === 0) {
        console.warn('No announcement items found for rotation');
        return;
    }

    try {
        // Remove active class from current announcement
        announcementItems[currentAnnouncementIndex].classList.remove('active');

        // Move to next announcement
        currentAnnouncementIndex = (currentAnnouncementIndex + 1) % announcementItems.length;

        // Add active class to next announcement
        announcementItems[currentAnnouncementIndex].classList.add('active');
    } catch (error) {
        console.error('Error rotating announcements:', error);
    }
}

// Rotate announcements every 4.5 seconds (only if multiple announcements exist)
if (announcementItems && announcementItems.length > 1) {
    setInterval(rotateAnnouncements, 4500);
}

// ===== Navigation Functionality =====
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Defensive check: ensure required navigation elements exist
if (!nav || !navToggle || !navMenu) {
    console.error('Required navigation elements not found');
} else {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        try {
            const isActive = navMenu.classList.toggle('active');

            // Update ARIA attribute for accessibility
            navToggle.setAttribute('aria-expanded', isActive);

            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (spans.length >= 3) {
                if (isActive) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        } catch (error) {
            console.error('Error toggling navigation menu:', error);
        }
    });
}

// Dropdown functionality for all dropdowns
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const dropdowns = document.querySelectorAll('.dropdown');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        // Only prevent default if not on mobile (where we want normal navigation)
        if (window.innerWidth > 768) {
            e.preventDefault();
        }
        
        // Toggle aria-expanded for accessibility
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
    });
});

// Close mobile menu when clicking a link
if (navLinks && navMenu && navToggle) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            try {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');

                const spans = navToggle.querySelectorAll('span');
                if (spans.length >= 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            } catch (error) {
                console.error('Error closing mobile menu:', error);
            }
        });
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

// Add scroll effect to navigation
let lastScroll = 0;

if (nav) {
    window.addEventListener('scroll', () => {
        try {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        } catch (error) {
            console.error('Error handling scroll effect:', error);
        }
    }, { passive: true });
}

// ===== Smooth Scroll with Offset =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        try {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement && nav) {
                const navHeight = nav.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        } catch (error) {
            console.error('Error during smooth scroll:', error);
        }
    });
});

// ===== Newsletter Form Handling =====
// Note: Newsletter subscription is handled by embedded Substack iframe
// This section is reserved for future custom form implementation if needed

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
document.querySelectorAll('section').forEach(section => {
    // Skip hero section - it should be immediately visible without scroll-triggered animation
    if (section.classList.contains('hero')) {
        return;
    }
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// ===== Active Section Highlighting in Nav =====
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation, { passive: true });

// ===== Performance: Lazy Loading Images =====
// Native lazy loading is supported, but provide fallback for older browsers
if (!('loading' in HTMLImageElement.prototype)) {
    // Fallback for browsers that don't support native lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    // Add Subresource Integrity (SRI) for security
    script.integrity = 'sha384-RqDRHKZp0kZiyGC+AAoaItaIJhdM5HsrN6A0+z9y2AMLPX6MAbGMHdY7RfQfV9wE';
    script.crossOrigin = 'anonymous';
    // Handle script load errors
    script.onerror = () => {
        console.error('Failed to load lazysizes library from CDN');
    };
    document.body.appendChild(script);
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state
    highlightNavigation();

    // Add fade-in to hero section immediately
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }

    // Slow down hero video playback by 15%
    const heroVideo = document.querySelector('.hero-background-video');
    if (heroVideo) {
        heroVideo.playbackRate = 0.85; // 15% slower than normal speed
    }

    // Website initialized successfully
});

// ===== Analytics (Placeholder) =====
// In production, you would initialize analytics here:
// gtag('config', 'GA_MEASUREMENT_ID');
// or
// analytics.page();

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitButton = document.getElementById('contactSubmit');

// Web3Forms configuration
const RECAPTCHA_SITE_KEY = '6LfPwQssAAAAAM-0Qyt-7bG6tUAqY_jgZuvuC49n';

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        // Validation
        if (!name || !email || !message) {
            showStatus('Please fill in all required fields.', 'error');
            return false;
        }

        // Email validation
        if (!validateEmail(email)) {
            showStatus('Please enter a valid email address.', 'error');
            return false;
        }

        setLoadingState(true);

        try {
            // Submit to Web3Forms
            const formData = new FormData(contactForm);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                showStatus('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showStatus('Oops! There was a problem submitting your form. Please try again.', 'error');
                console.error('Web3Forms error:', result);
            }
        } catch (error) {
            showStatus('Oops! There was a problem submitting your form. Please try again.', 'error');
            console.error('Form submission error:', error);
        } finally {
            setLoadingState(false);
        }
    });
}

/**
 * Show status message
 */
function showStatus(message, type) {
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.className = `form-status show ${type}`;

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formStatus.classList.remove('show');
        }, 5000);
    }
}

/**
 * Set loading state for submit button
 */
function setLoadingState(isLoading) {
    if (!submitButton) return;

    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');

    if (isLoading) {
        submitButton.disabled = true;
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline-flex';
    } else {
        submitButton.disabled = false;
        if (btnText) btnText.style.display = 'inline-flex';
        if (btnLoading) btnLoading.style.display = 'none';
    }
}

/**
 * Email validation helper
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Real-time email validation feedback
 */
const emailInput = document.getElementById('contact-email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        if (email && !validateEmail(email)) {
            this.style.borderColor = 'rgba(239, 68, 68, 0.8)';
        } else {
            this.style.borderColor = '';
        }
    });

    emailInput.addEventListener('input', function() {
        // Reset border color when user starts typing
        this.style.borderColor = '';
    });
}
