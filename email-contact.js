// email-contact.js - Complete version with debug logs
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 EmailJS Contact Form Loaded');
    
    // Initialize EmailJS
    emailjs.init("Y2NWqf5Ab6pDj4UUR");
    console.log('📧 EmailJS Initialized with Public Key: Y2NWqf5Ab6pDj4UUR');

    const contactForm = document.getElementById('contactForm');
    const notification = document.getElementById('successNotification');

    // Email copy functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const email = this.getAttribute('data-text');
            console.log('📋 Copy email clicked:', email);
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copied to clipboard!', 'success');
            });
        });
    });

    // Form submission with detailed logging
    if (contactForm) {
        console.log('✅ Contact form found in DOM');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📝 Form submission started');
            
            // Get form data for logging
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData);
            console.log('📊 Form data:', formObject);

            const submitBtn = this.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const loader = submitBtn.querySelector('.btn-loader');

            // Show loading state
            btnText.textContent = 'Sending...';
            loader.style.display = 'flex';
            submitBtn.disabled = true;
            
            console.log('🔄 Sending email via EmailJS...');
            console.log('📧 Using Service ID: service_g24io4v');
            console.log('📧 Using Template ID: template_ah5qzsx');

            // Send email using EmailJS
            emailjs.sendForm('service_g24io4v', 'template_ah5qzsx', this)
                .then(function(response) {
                    console.log('✅ EMAILJS SUCCESS RESPONSE:');
                    console.log('Status:', response.status);
                    console.log('Status Text:', response.text);
                    console.log('Full Response:', response);
                    
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                    console.log('🔄 Form reset completed');
                })
                .catch(function(error) {
                    console.log('❌ EMAILJS ERROR:');
                    console.log('Error Type:', error.type || 'Unknown error type');
                    console.log('Error Text:', error.text || 'No error text');
                    console.log('Full Error:', error);
                    
                    // More specific error handling
                    if (error.text) {
                        if (error.text.includes('Service not found')) {
                            console.log('🔴 PROBLEM: Service ID is incorrect or service not setup');
                            showNotification('Service configuration error. Please check EmailJS setup.', 'error');
                        } else if (error.text.includes('Template not found')) {
                            console.log('🔴 PROBLEM: Template ID is incorrect or template not created');
                            showNotification('Template configuration error. Please check EmailJS setup.', 'error');
                        } else if (error.text.includes('Invalid public key')) {
                            console.log('🔴 PROBLEM: Public key is invalid');
                            showNotification('Authentication error. Please check EmailJS configuration.', 'error');
                        } else {
                            showNotification('Failed to send message: ' + error.text, 'error');
                        }
                    } else {
                        showNotification('Failed to send message. Please try emailing me directly.', 'error');
                    }
                })
                .finally(function() {
                    // Reset button state
                    btnText.textContent = 'Send Message';
                    loader.style.display = 'none';
                    submitBtn.disabled = false;
                    console.log('🔄 Button state reset completed');
                });
        });
    } else {
        console.log('❌ Contact form NOT found in DOM - check ID');
    }

    // Show notification function
    function showNotification(message, type = 'success') {
        console.log('🔔 Notification:', type, '-', message);
        
        const notification = document.getElementById('successNotification');
        if (!notification) {
            console.log('❌ Notification element not found');
            return;
        }
        
        const notificationText = notification.querySelector('.notification-text');
        const notificationIcon = notification.querySelector('i');
        
        notificationText.textContent = message;
        
        // Change icon and color based on type
        if (type === 'error') {
            notification.style.background = '#f44336';
            notificationIcon.className = 'fas fa-exclamation-circle';
            console.log('🔴 Error notification displayed');
        } else {
            notification.style.background = '#4CAF50';
            notificationIcon.className = 'fas fa-check-circle';
            console.log('🟢 Success notification displayed');
        }
        
        notification.classList.add('show');
        console.log('📢 Notification shown to user');

        // Hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            console.log('📢 Notification hidden');
        }, 5000);
    }

    // Floating orbs interaction
    const orbs = document.querySelectorAll('.contact-orb');
    console.log('🎯 Found floating orbs:', orbs.length);
    
    orbs.forEach(orb => {
        orb.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            console.log('🟠 Orb clicked:', type);
            let message = '';
            
            switch(type) {
                case 'email':
                    navigator.clipboard.writeText('awekebabey21@gmail.com');
                    message = 'Email copied to clipboard!';
                    console.log('📧 Email copied to clipboard');
                    break;
                case 'whatsapp':
                    message = 'Opening WhatsApp...';
                    console.log('💬 WhatsApp action triggered');
                    break;
                case 'telegram':
                    message = 'Opening Telegram...';
                    console.log('📱 Telegram action triggered');
                    break;
                case 'instagram':
                    message = 'Opening Instagram...';
                    console.log('📸 Instagram action triggered');
                    break;
            }
            
            showNotification(message, 'success');
        });
    });

    console.log('🎉 EmailJS contact form setup complete');
});

// Test EmailJS connection
function testEmailJSConnection() {
    console.log('🧪 Testing EmailJS Connection...');
    console.log('Public Key:', emailjs.init("Y2NWqf5Ab6pDj4UUR"));
    
    // Test if EmailJS is properly loaded
    if (typeof emailjs !== 'undefined') {
        console.log('✅ EmailJS library loaded successfully');
    } else {
        console.log('❌ EmailJS library not loaded - check CDN');
    }
}

// Run test when page loads
window.addEventListener('load', testEmailJSConnection);
