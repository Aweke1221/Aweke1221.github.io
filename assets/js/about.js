// About Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all about page features
    initProfileCard();
    initAnimatedStats();
    initFloatingOrbs();
    initInterestCards();
    initSkillBars();
});

// Select main elements
const profileCard = document.getElementById('profileCard');
const flipBackButton = document.querySelector('.flip-back');
const skillBars = document.querySelectorAll('.skill-progress');

// Flip card when clicked
profileCard.addEventListener('click', () => {
  profileCard.classList.toggle('flipped');

  // Animate skill bars when showing the back
  if (profileCard.classList.contains('flipped')) {
    skillBars.forEach(bar => {
      bar.style.width = bar.getAttribute('data-width');
    });
  }
});

// Flip back when back button clicked
flipBackButton.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent triggering the main flip again
  profileCard.classList.remove('flipped');
  skillBars.forEach(bar => bar.style.width = '0');
});


// Animated Stats Counter
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

// Floating Orbs Interaction
function initFloatingOrbs() {
    const orbs = document.querySelectorAll('.contact-orb');
    
    orbs.forEach(orb => {
        orb.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
            this.style.transform = 'scale(1.3)';
        });
        
        orb.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Click to change color
        orb.addEventListener('click', function() {
            const colors = [
                'linear-gradient(45deg, #667eea, #764ba2)',
                'linear-gradient(45deg, #f093fb, #f5576c)',
                'linear-gradient(45deg, #4facfe, #00f2fe)',
                'linear-gradient(45deg, #43e97b, #38f9d7)',
                'linear-gradient(45deg, #ff9a9e, #fecfef)'
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.style.background = randomColor;
        });
    });
}

// Interest Cards Animation
function initInterestCards() {
    const interestCards = document.querySelectorAll('.interest-card');
    
    interestCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.interest-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.interest-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Animate Skill Bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}