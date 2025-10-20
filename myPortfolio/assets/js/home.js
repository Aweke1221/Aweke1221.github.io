// Home Page JavaScript - Consistent with Contact Page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all home page features
    initTypingEffect();
    initProfessionRotator();
    initAnimatedStats();
    initTechOrbs();
    initServiceCards();
    initNavigation();
});

// Typing Effect
function initTypingEffect() {
    const typingElement = document.querySelector('.profession-rotator');
    const texts = ['Graphics Designer', 'Web Developer', 'UI/UX Designer', 'Creative Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

// Profession Rotator
function initProfessionRotator() {
    // Already handled by typing effect
}

// Animated Stats
function initAnimatedStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const count = parseInt(entry.target.getAttribute('data-count'));
                animateCount(entry.target, 0, count, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCount(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Tech Orbs Interaction
function initTechOrbs() {
    const techOrbs = document.querySelectorAll('.tech-orb');
    
    techOrbs.forEach(orb => {
        orb.addEventListener('click', function() {
            const tech = this.getAttribute('data-tech');
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                animation: ripple 0.6s ease-out;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Show notification
            showTechNotification(tech);
        });
    });
}

function showTechNotification(tech) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = 'tech-notification';
    notification.textContent = `${tech} Skills`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        color: #333;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

// Service Cards Interaction
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });
}

// Navigation
function initNavigation() {
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.5)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.3)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });
}

// Add CSS for animations
const homeAnimations = `
@keyframes ripple {
    from { transform: scale(0); opacity: 1; }
    to { transform: scale(2); opacity: 0; }
}

@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = homeAnimations;
document.head.appendChild(styleSheet);