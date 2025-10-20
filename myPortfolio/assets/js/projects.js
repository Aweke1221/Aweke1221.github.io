// Projects Page JavaScript - Consistent with Other Pages
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all projects page features
    initProjectFilter();
    initProjectCards();
    initAnimatedStats();
    initSkillBars();
    initFloatingElements();
    initNavigation();
});

// Project Filter System
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    const categories = item.getAttribute('data-category').split(' ');
                    if (categories.includes(filterValue)) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 300);
                    }
                }
            });
        });
    });
}

// Project Cards Interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) rotate(0deg)';
        });
        
        // Click to show project details
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.project-link')) {
                const title = this.querySelector('.project-title').textContent;
                const description = this.querySelector('.project-description').textContent;
                showProjectModal(title, description);
            }
        });
    });
    
    // Project link interactions
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.querySelector('i').className;
            
            if (action.includes('fa-eye')) {
                // Preview project
                const card = this.closest('.project-card');
                const title = card.querySelector('.project-title').textContent;
                showProjectModal(title, 'Project preview coming soon...');
            } else if (action.includes('fa-code')) {
                // View code
                showNotification('Source code would be displayed here');
            } else if (action.includes('fa-download')) {
                // Download design
                showNotification('Design file download would start here');
            }
        });
    });
}

// Show Project Modal
function showProjectModal(title, content) {
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    document.getElementById('projectModalTitle').textContent = title;
    document.getElementById('projectModalContent').innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="https://picsum.photos/400/300?random=${Math.floor(Math.random() * 10) + 1}" alt="${title}" class="img-fluid rounded">
            </div>
            <div class="col-md-6">
                <h4>Project Overview</h4>
                <p>${content}</p>
                <div class="mt-3">
                    <strong>Technologies Used:</strong>
                    <div class="tech-tags mt-2">
                        <span class="tech-tag">HTML/CSS</span>
                        <span class="tech-tag">JavaScript</span>
                        <span class="tech-tag">Responsive Design</span>
                    </div>
                </div>
                <div class="mt-3">
                    <a href="#" class="btn btn-primary me-2"><i class="fas fa-eye me-1"></i>Live Demo</a>
                    <a href="#" class="btn btn-outline-primary"><i class="fas fa-code me-1"></i>Source Code</a>
                </div>
            </div>
        </div>
    `;
    modal.show();
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

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = level + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Floating Elements Interaction
function initFloatingElements() {
    const elements = document.querySelectorAll('.project-element');
    
    elements.forEach(elem => {
        elem.addEventListener('mouseenter', function() {
            this.style.opacity = '0.2';
            this.style.transform = 'scale(1.2)';
        });
        
        elem.addEventListener('mouseleave', function() {
            this.style.opacity = '0.1';
            this.style.transform = 'scale(1)';
        });
        
        // Click to change color
        elem.addEventListener('click', function() {
            const colors = [
                'linear-gradient(45deg, #4ecdc4, #45b7d1)',
                'linear-gradient(45deg, #ff6b6b, #ffd700)',
                'linear-gradient(45deg, #96ceb4, #feca57)',
                'linear-gradient(45deg, #e1306c, #f77737)',
                'linear-gradient(45deg, #667eea, #764ba2)'
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.style.background = randomColor;
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

// Notification System
function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = 'project-notification';
    notification.textContent = message;
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
    }, 3000);
}

// Add CSS for animations
const projectsAnimations = `
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
styleSheet.textContent = projectsAnimations;
document.head.appendChild(styleSheet);