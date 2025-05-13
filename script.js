// Smooth scroll function for navbar menu items
document.addEventListener('DOMContentLoaded', function() {
    // Get all anchor links in the navbar
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();
            
            // Get the target section id from href attribute
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Get the target's position relative to the viewport
                const targetPosition = targetSection.getBoundingClientRect().top;
                // Current scroll position
                const startPosition = window.pageYOffset;
                // Distance to scroll
                const distance = targetPosition;
                
                // Duration of scroll animation in milliseconds
                const duration = 1000;
                let startTime = null;
                
                // Animation function
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const scrollY = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, scrollY);
                    
                    // Continue animation if duration not reached
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                
                // Easing function - easeInOutQuad
                // t: current time, b: start value, c: change in value, d: duration
                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                // Call animation
                requestAnimationFrame(animation);
                
                // Update URL hash (optional)
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Handle mobile menu toggle
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu after clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});