// ===================================
// LOCKSMITH GRAND JUNCTION - JAVASCRIPT
// Mobile Navigation & Form Handling
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE NAVIGATION =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a navigation link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission for demo
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // In a production environment, you would send this data to a server
            // For now, we'll just simulate a successful submission
            console.log('Form submitted with data:', data);
            
            // Hide the form
            contactForm.style.display = 'none';
            
            // Show success message
            formSuccess.style.display = 'block';
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Optional: Reset form after a delay (if you want to allow resubmission)
            setTimeout(function() {
                contactForm.reset();
            }, 1000);
        });
    }
    
    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            
            // Only apply smooth scroll if target exists
            if (targetId !== '#' && document.querySelector(targetId)) {
                event.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                const offsetTop = targetElement.offsetTop - 80; // Account for sticky nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== CLICK-TO-CALL TRACKING (Optional Analytics) =====
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone clicks for analytics
            console.log('Phone link clicked:', this.getAttribute('href'));
            
            // You can add Google Analytics or other tracking here
            // Example: gtag('event', 'click', { 'event_category': 'phone', 'event_label': '970-610-1313' });
        });
    });
    
    // ===== STICKY CALL BUTTON VISIBILITY =====
    const stickyCallBtn = document.querySelector('.sticky-call-btn');
    
    if (stickyCallBtn) {
        // Show/hide sticky button based on scroll position
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Show button after scrolling down 300px
            if (scrollTop > 300) {
                stickyCallBtn.style.opacity = '1';
                stickyCallBtn.style.pointerEvents = 'auto';
            } else {
                stickyCallBtn.style.opacity = '0.8';
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Track sticky button clicks
        stickyCallBtn.addEventListener('click', function() {
            console.log('Sticky call button clicked');
            // Add tracking code here if needed
        });
    }
    
    // ===== FORM VALIDATION ENHANCEMENT =====
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    
    formInputs.forEach(input => {
        // Add visual feedback on focus
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            
            // Basic validation feedback
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#c41e3a';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
        
        // Real-time validation for email
        if (input.type === 'email') {
            input.addEventListener('input', function() {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailPattern.test(this.value)) {
                    this.style.borderColor = '#c41e3a';
                } else {
                    this.style.borderColor = '#2c5f7f';
                }
            });
        }
        
        // Real-time validation for phone
        if (input.type === 'tel') {
            input.addEventListener('input', function() {
                // Format phone number as user types
                let value = this.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.length <= 3) {
                        this.value = value;
                    } else if (value.length <= 6) {
                        this.value = value.slice(0, 3) + '-' + value.slice(3);
                    } else {
                        this.value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
                    }
                }
            });
        }
    });
    
    // ===== LAZY LOADING FOR IMAGES =====
    const images = document.querySelectorAll('img[src*="placeholder"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Image would normally be loaded here
                    // For placeholders, we just ensure they're visible
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // ===== ACCESSIBILITY ENHANCEMENTS =====
    // Trap focus within mobile menu when open
    if (navMenu) {
        navMenu.addEventListener('keydown', function(event) {
            if (!navMenu.classList.contains('active')) return;
            
            const focusableElements = navMenu.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            // Tab key
            if (event.key === 'Tab') {
                if (event.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        event.preventDefault();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        event.preventDefault();
                    }
                }
            }
            
            // Escape key to close menu
            if (event.key === 'Escape') {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.focus();
            }
        });
    }
    
    // ===== CONSOLE MESSAGE =====
    console.log('%cLocksmith Grand Junction', 'font-size: 20px; font-weight: bold; color: #d4a017;');
    console.log('%cWebsite by Clipper Web Design', 'font-size: 12px; color: #2c5f7f;');
    console.log('%c24/7 Emergency Service: 970-610-1313', 'font-size: 14px; font-weight: bold; color: #c41e3a;');
    
});

// ===== UTILITY FUNCTIONS =====

/**
 * Debounce function to limit how often a function can fire
 * Useful for scroll and resize events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 * Useful for animation triggers
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Format phone number
 * Takes a 10-digit string and returns formatted phone number
 */
function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

/**
 * Validate email address
 * Returns true if email is valid format
 */
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
