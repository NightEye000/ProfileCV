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

document.addEventListener('DOMContentLoaded', function() {
    // Function to create slider functionality
    function createSlider(sliderClass, trackClass, slideClass, prevBtnClass, nextBtnClass) {
        const slider = document.querySelector(`.${sliderClass}`);
        const track = document.querySelector(`.${trackClass}`);
        const slides = document.querySelectorAll(`.${slideClass}`);
        const prevBtn = document.querySelector(`.${prevBtnClass}`);
        const nextBtn = document.querySelector(`.${nextBtnClass}`);
        
        if (!slider || !track || slides.length === 0 || !prevBtn || !nextBtn) return;
        
        let slideWidth = slides[0].offsetWidth;
        let currentIndex = 0;
        const slidesPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
        const maxIndex = Math.max(0, slides.length - slidesPerView);
        
        // Function to update slider position
        function updateSliderPosition() {
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }
        
        // Event listeners for buttons
        prevBtn.addEventListener('click', () => {
            currentIndex = Math.max(0, currentIndex - 1);
            updateSliderPosition();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = Math.min(maxIndex, currentIndex + 1);
            updateSliderPosition();
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            slideWidth = slides[0].offsetWidth;
            updateSliderPosition();
        });
        
        // Initialize
        updateSliderPosition();
        
        // Add touch support
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            // Minimum swipe distance (in px) to register as swipe
            const swipeThreshold = 50;
            
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left - go next
                currentIndex = Math.min(maxIndex, currentIndex + 1);
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right - go prev
                currentIndex = Math.max(0, currentIndex - 1);
            }
            
            updateSliderPosition();
        }
    }
    
    // Initialize all sliders
    createSlider('nursery-slider', 'nursery-track', 'nursery-slide', 'nursery-prev', 'nursery-next');
    createSlider('tanam-slider', 'tanam-track', 'tanam-slide', 'tanam-prev', 'tanam-next');
    createSlider('pruning-slider', 'pruning-track', 'pruning-slide', 'pruning-prev', 'pruning-next');
    createSlider('janjangan-slider', 'janjangan-track', 'janjangan-slide', 'janjangan-prev', 'janjangan-next');
    createSlider('gawangan-slider', 'gawangan-track', 'gawangan-slide', 'gawangan-prev', 'gawangan-next');
    createSlider('piringan-slider', 'piringan-track', 'piringan-slide', 'piringan-prev', 'piringan-next');
});
