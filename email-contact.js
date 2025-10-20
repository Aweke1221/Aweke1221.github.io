// EmailJS Contact Form with Debug Logs
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your Public Key
    emailjs.init("Y2NWqf5Ab6pDj4UUR");
    
    console.log("✅ EmailJS initialized with Public Key");
    
    const contactForm = document.querySelector('.message-form');
    
    if (contactForm) {
        console.log("✅ Contact form found");
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            console.log("📝 Form submission started");
            
            const submitBtn = this.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            
            // Show loading
            submitBtn.classList.add('loading');
            btnText.textContent = 'Sending...';
            
            console.log("🔄 Sending email via EmailJS...");
            console.log("Service ID:", 'service_g24io4v');
            console.log("Template ID:", 'template_a42mqef');
            
            // Get form data for debugging
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            console.log("📨 Form data:", data);
            
            // Send email using EmailJS
            emailjs.sendForm('service_g24io4v', 'template_a42mqef', this)
                .then(function(response) {
                    console.log("🎉 SUCCESS! Email sent:", response);
                    console.log("Status:", response.status);
                    console.log("Text:", response.text);
                    
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
                    console.log("❌ FAILED! Email error:", error);
                    console.log("Error details:", {
                        status: error.status,
                        text: error.text,
                        message: error.message
                    });
                    
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
    } else {
        console.log("❌ Contact form NOT found - check CSS selector");
    }
    
    function showNotification(message, type) {
        console.log("🔔 Showing notification:", type, message);
        
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
    
    // Test EmailJS initialization
    console.log("🧪 Testing EmailJS initialization...");
    if (typeof emailjs !== 'undefined') {
        console.log("✅ EmailJS library loaded correctly");
    } else {
        console.log("❌ EmailJS library NOT loaded - check script tag");
    }
});
