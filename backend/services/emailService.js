// backend/services/emailService.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // We're using Gmail SMTP
  auth: {
    user: process.env.EMAIL_USER,     // Your Gmail address
    pass: process.env.EMAIL_PASS,     // Your App Password (not regular Gmail password!)
  },
});

const sendOrderConfirmationEmail = async (to, orderId) => {
  const mailOptions = {
    from: `"Utopique Crafts" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: 'Thank you for your order!',
    text: `Thank you for your order! Your order ID is ${orderId}. We appreciate your business!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent successfully!');
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error);
  }
};

module.exports = { sendOrderConfirmationEmail };
