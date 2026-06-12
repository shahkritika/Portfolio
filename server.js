// ============================================
//  Portfolio Contact Form Backend
//  Built with Express + Nodemailer
// ============================================

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Middleware ----
app.use(cors());                 // allow requests from your frontend
app.use(express.json());         // parse JSON request bodies
app.use(express.static('.'));    // serve index.html and other static files

// ---- Email transporter (uses your Gmail account) ----
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // your gmail address
    pass: process.env.EMAIL_PASS   // your Gmail "App Password" (NOT your normal password)
  }
});

// ---- Contact form endpoint ----
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // 1. Validate input
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Please fill in all fields.'
    });
  }

  // 2. Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid email address.'
    });
  }

  // 3. Send the email
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,     // <-- messages land in YOUR inbox
      replyTo: email,                 // lets you hit "Reply" to respond to the sender directly
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New message from your portfolio</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    console.log(`✅ Email sent successfully from ${email}`);
    res.json({ success: true });

  } catch (err) {
    console.error('❌ Email sending failed:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.'
    });
  }
});

// ---- Start server ----
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📩 Contact form messages will be sent to: ${process.env.EMAIL_USER}`);
});
