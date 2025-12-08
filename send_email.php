<?php
// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = htmlspecialchars(trim($_POST['from_name']));
    $email = filter_var(trim($_POST['from_email']), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message']));
    
    // Validate
    $errors = [];
    if (empty($name)) $errors[] = "Name is required";
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid email is required";
    if (empty($message)) $errors[] = "Message is required";
    
    if (empty($errors)) {
        // Email details
        $to = "awekebabey21@gmail.com";
        $subject = "New Contact Form Message from $name";
        
        // Email headers
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        
        // Email body
        $email_body = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #007bff; color: white; padding: 15px; border-radius: 5px 5px 0 0; }
                .content { padding: 20px; background: #f8f9fa; border: 1px solid #dee2e6; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #495057; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>New Contact Form Message</h2>
                </div>
                <div class='content'>
                    <div class='field'>
                        <div class='label'>Name:</div>
                        <div>$name</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Email:</div>
                        <div>$email</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Message:</div>
                        <div>" . nl2br($message) . "</div>
                    </div>
                </div>
            </div>
        </body>
        </html>
        ";
        
        // Send email
        if (mail($to, $subject, $email_body, $headers)) {
            // Success - redirect back with success message
            header('Location: contact.php?status=success&message=' . urlencode('Message sent successfully! I will get back to you soon.'));
        } else {
            // Failed to send
            header('Location: contact.php?status=error&message=' . urlencode('Failed to send message. Please try again or email me directly.'));
        }
        exit;
    } else {
        // Validation errors
        $error_message = implode(', ', $errors);
        header('Location: contact.php?status=error&message=' . urlencode($error_message));
        exit;
    }
} else {
    // If not POST request, redirect to contact page
    header('Location: contact.php');
    exit;
}
?>
