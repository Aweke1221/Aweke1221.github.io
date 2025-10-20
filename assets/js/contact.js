// Contact Page - Updated with Social Media
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initFloatingOrbs();
    initCopyButtons();
    initQuickForm();
    initSocialLinks();
    initAnimations();
    initNavigation();
});

// Floating Orbs Interaction
function initFloatingOrbs() {
    const orbs = document.querySelectorAll('.contact-orb');
    
    orbs.forEach(orb => {
        // Click interaction
        orb.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            handleOrbClick(type, this);
        });
        
        // Mouse enter effect
        orb.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            createRippleEffect(this);
        });
        
        orb.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });
}

function handleOrbClick(type, orb) {
    switch(type) {
        case 'email':
            copyToClipboard('your.email@example.com');
            showNotification('Email copied to clipboard!');
            break;
        case 'whatsapp':
            window.open('https://wa.me/15551234567', '_blank');
            showNotification('Opening WhatsApp...');
            break;
        case 'telegram':
            window.open('https://t.me/yourusername', '_blank');
            showNotification('Opening Telegram...');
            break;
        case 'instagram':
            window.open('https://instagram.com/yourusername', '_blank');
            showNotification('Opening Instagram...');
            break;
    }
    
    // Visual feedback
    createPulseEffect(orb);
}

function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple 0.6s ease-out;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createPulseEffect(element) {
    element.style.animation = 'pulse 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = 'floatOrb 8s ease-in-out infinite';
    }, 500);
}

// Copy Buttons
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const text = this.getAttribute('data-text');
            copyToClipboard(text);
            
            // Visual feedback
            this.classList.add('copied');
            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
            
            setTimeout(() => {
                this.classList.remove('copied');
                this.innerHTML = '<i class="fas fa-copy"></i> Copy Email';
            }, 2000);
        });
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    });
}

// Quick Form
function initQuickForm() {
    const form = document.querySelector('.message-form');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = form.querySelector('.btn-text');
    const btnLoader = form.querySelector('.btn-loader');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const inputs = this.querySelectorAll('.form-input');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ff6b6b';
                isValid = false;
            } else {
                input.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }
        });
        
        if (!isValid) {
            showNotification('Please fill all fields', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Show success
            showNotification('Message sent successfully!');
            
            // Reset form
            form.reset();
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Add celebration effect
            createConfetti();
        }, 2000);
    });
    
    // Input focus effects
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}

// Social Links
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            
            // Add bounce effect
            this.style.animation = 'bounce 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
            
            showNotification(`Opening ${platform}...`);
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

// Animations
function initAnimations() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            mirror: false
        });
    }
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.getElementById('successNotification');
    const notificationText = notification.querySelector('.notification-text');
    
    // Set message and type
    notificationText.textContent = message;
    
    if (type === 'error') {
        notification.style.background = 'rgba(220, 53, 69, 0.9)';
    } else {
        notification.style.background = 'rgba(40, 167, 69, 0.9)';
    }
    
    // Show notification
    notification.classList.add('show');
    
    // Auto hide
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Confetti Effect
function createConfetti() {
    const colors = ['#ff6b6b', '#ffd700', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            top: -10px;
            left: ${Math.random() * 100}vw;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            z-index: 10000;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Add CSS for animations
const contactAnimations = `
@keyframes ripple {
    to {
        transform: translate(-50%, -50%) scale(2);
        opacity: 0;
    }
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
}

@keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
        transform: translateY(-5px) scale(1.1);
    }
    40%, 43% {
        transform: translateY(-10px) scale(1.15);
    }
    70% {
        transform: translateY(-7px) scale(1.12);
    }
}

@keyframes confettiFall {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = contactAnimations;
document.head.appendChild(styleSheet);