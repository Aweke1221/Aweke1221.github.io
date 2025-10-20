// Initialize EmailJS
(function() {
    emailjs.init("Y2NWqf5Ab6pDj4UUR"); // Your public key
})();

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const notification = document.getElementById('successNotification');
    
    // Email copy functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const email = this.getAttribute('data-text');
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copied to clipboard!', 'success');
            });
        });
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const loader = submitBtn.querySelector('.btn-loader');
            
            // Show loading state
            btnText.textContent = 'Sending...';
            loader.style.display = 'flex';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            emailjs.sendForm('service_g24io4v', 'template_ah5qzsx', this)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    showNotification('Failed to send message. Please try emailing me directly.', 'error');
                })
                .finally(function() {
                    // Reset button state
                    btnText.textContent = 'Send Message';
                    loader.style.display = 'none';
                    submitBtn.disabled = false;
                });
        });
    }
    
    // Show notification function
    function showNotification(message, type = 'success') {
        const notification = document.getElementById('successNotification');
        const notificationText = notification.querySelector('.notification-text');
        const notificationIcon = notification.querySelector('i');
        
        notificationText.textContent = message;
        
        // Change icon and color based on type
        if (type === 'error') {
            notification.style.background = '#f44336';
            notificationIcon.className = 'fas fa-exclamation-circle';
        } else {
            notification.style.background = '#4CAF50';
            notificationIcon.className = 'fas fa-check-circle';
        }
        
        notification.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
    
    // Floating orbs interaction
    const orbs = document.querySelectorAll('.contact-orb');
    orbs.forEach(orb => {
        orb.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            let message = '';
            
            switch(type) {
                case 'email':
                    navigator.clipboard.writeText('awekebabey21@gmail.com');
                    message = 'Email copied to clipboard!';
                    break;
                case 'whatsapp':
                    message = 'Opening WhatsApp...';
                    break;
                case 'telegram':
                    message = 'Opening Telegram...';
                    break;
                case 'instagram':
                    message = 'Opening Instagram...';
                    break;
            }
            
            showNotification(message, 'success');
        });
    });
});
