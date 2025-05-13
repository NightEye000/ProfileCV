// Additional scroll animations and functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Create back to top button
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);
    
    // Get all sections for scroll spy
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    // Update scroll progress
    function updateScrollProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
        
        // Show/hide back to top button
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        
        // Highlight sections as they appear
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight * 0.75 && sectionTop > -section.offsetHeight * 0.5) {
                section.classList.add('visible');
                
                // Update active nav link (scroll spy)
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }
    
    // Back to top button click handler
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initial call to show visible sections on page load
    setTimeout(updateScrollProgress, 100);
    
    // Listen for scroll events
    window.addEventListener('scroll', updateScrollProgress);
});