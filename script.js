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
