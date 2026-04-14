import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact';

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('POST /api/contact received');
  try {
    const { name, email, subject, message } = req.body;
    console.log('Request body:', { name, email, subject, message });
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // 1. Save to Database (if connected)
    if (mongoose.connection.readyState === 1) {
      const newContact = new Contact({ name, email, subject, message });
      await newContact.save();
      console.log('Message saved to MongoDB');
    } else {
      console.log('MongoDB not connected, skipping database save');
    }

    // 2. Send Email Notification
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, RECEIVER_EMAIL } = process.env;

    if (SMTP_HOST && SMTP_USER && SMTP_PASS && RECEIVER_EMAIL) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"${name}" <${SMTP_USER}>`, // Use SMTP_USER as sender to avoid spoofing filters
        replyTo: email,
        to: RECEIVER_EMAIL,
        subject: `New Portfolio Message: ${subject}`,
        text: `You have a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #0A4A3C;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email notification sent successfully');
    } else {
      console.log('Email configuration missing, skipping email notification');
      console.log('--- LOCAL DATA MODE: Contact Message Received ---');
      console.log(`From: ${name} (${email})`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log('------------------------------------------------');
    }

    res.status(201).json({ success: true, message: 'Message received!' });
  } catch (error: any) {
    console.error('Contact route error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
