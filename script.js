// DOM Elements
const themeBtn = document.getElementById('theme-btn');
const body = document.body;
const linkItems = document.querySelectorAll('.link-item');

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.updateThemeIcon();
        themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        this.updateThemeIcon();
        localStorage.setItem('theme', this.currentTheme);
        
        // Add animation class
        body.style.transition = 'all 0.3s ease';
    }

    applyTheme(theme) {
        if (theme === 'light') {
            body.setAttribute('data-theme', 'light');
        } else {
            body.removeAttribute('data-theme');
        }
    }

    updateThemeIcon() {
        const icon = themeBtn.querySelector('i');
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}



// Link Analytics (placeholder for tracking)
class LinkTracker {
    constructor() {
        this.init();
    }

    init() {
        linkItems.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                this.trackClick(link, index);
            });
        });
    }

    trackClick(link, index) {
        const linkText = link.querySelector('span').textContent;
        console.log(`Link clicked: ${linkText} (Index: ${index})`);
        
        // Add click animation
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = '';
        }, 150);

        // Here you could add analytics tracking
        // Example: gtag('event', 'click', { event_category: 'Link', event_label: linkText });
    }
}

// Profile Image Management
class ProfileManager {
    constructor() {
        this.profileImg = document.getElementById('profile-img');
        this.init();
    }

    init() {
        // Handle missing profile image
        this.profileImg.addEventListener('error', () => {
            this.setDefaultImage();
        });

        // Add hover effects
        this.profileImg.addEventListener('mouseenter', () => {
            this.addHoverEffect();
        });

        this.profileImg.addEventListener('mouseleave', () => {
            this.removeHoverEffect();
        });
    }

    setDefaultImage() {
        // Create a default avatar with initials
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');

        // Draw background gradient
        const gradient = ctx.createLinearGradient(0, 0, 200, 200);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 200, 200);

        // Draw initials
        ctx.fillStyle = 'white';
        ctx.font = 'bold 80px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('YN', 100, 100);

        this.profileImg.src = canvas.toDataURL();
    }

    addHoverEffect() {
        this.profileImg.style.filter = 'brightness(1.1) saturate(1.2)';
    }

    removeHoverEffect() {
        this.profileImg.style.filter = '';
    }
}

// Utility Functions
class Utils {


    static setupKeyboardNavigation() {
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    static setupAccessibility() {
        // Add ARIA labels and improve accessibility
        linkItems.forEach((link, index) => {
            link.setAttribute('tabindex', '0');
            link.setAttribute('role', 'button');
            
            // Add keyboard enter support
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                }
            });
        });
    }

    static addSmoothScrolling() {
        // Smooth scrolling for any anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}



// App Initialization
class LinkTreeApp {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all components
        new ThemeManager();
        new LinkTracker();
        new ProfileManager();

        // Setup utilities
        Utils.setupKeyboardNavigation();
        Utils.setupAccessibility();
        Utils.addSmoothScrolling();

        // Add custom CSS for keyboard navigation
        this.addKeyboardNavigationStyles();

        console.log('LinkTree app initialized successfully!');
    }

    addKeyboardNavigationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-navigation *:focus {
                outline: 2px solid var(--accent-color) !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LinkTreeApp();
    
    // Initialize AOS (Animate On Scroll) for sequential link loading
    AOS.init({
        duration: 600,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });
});



