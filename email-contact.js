// EmailJS Contact Form
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your Public Key
    emailjs.init("Y2NWqf5Ab6pDj4UUR");
    
    const contactForm = document.querySelector('.message-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            
            // Show loading
            submitBtn.classList.add('loading');
            btnText.textContent = 'Sending...';
            
            // Send email using EmailJS
            emailjs.sendForm('service_g24io4v', 'template_vigxevo', this)
                .then(function() {
                    // Success
                    submitBtn.classList.remove('loading');
                    btnText.textContent = 'Message Sent!';
                    submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                    contactForm.reset();
                    
                    showNotification('Message sent successfully! I will reply soon.', 'success');
                    
                    setTimeout(() => {
                        btnText.textContent = 'Send Message';
                        submitBtn.style.background = '';
                    }, 3000);
                }, function(error) {
                    // Error
                    submitBtn.classList.remove('loading');
                    btnText.textContent = 'Failed - Try Again';
                    submitBtn.style.background = 'linear-gradient(135deg, #dc3545, #e83e8c)';
                    
                    showNotification('Failed to send. Please email me directly at awekebabey21@gmail.com', 'error');
                    
                    setTimeout(() => {
                        btnText.textContent = 'Send Message';
                        submitBtn.style.background = '';
                    }, 3000);
                });
        });
    }
    
    function showNotification(message, type) {
        // Remove existing notifications
        const existing = document.querySelectorAll('.notification');
        existing.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification show ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <div class="notification-text">${message}</div>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }
});
