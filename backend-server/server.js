// Backend Server for Email Verification
// Run this separately from your frontend application

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
const users = new Map();
const verificationTokens = new Map();

// Authorized emails
const AUTHORIZED_EMAILS = [
  'ramanilakshmipriya26@gmail.com',
  'rakshanalakshmi.g.cse.2022@snsct.org',
  'ramanesh.k.cse.2022@snsct.org',
  'ravichandran.v.cse.2022@snsct.org'
];

// Configure Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password
  },
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('✅ SMTP server is ready to send emails');
  }
});

// Generate secure random token
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// POST /api/signup - User signup with email verification
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Check if email is authorized
    if (!AUTHORIZED_EMAILS.includes(email)) {
      return res.status(403).json({
        success: false,
        message: 'This email is not authorized to access the system.',
      });
    }

    // Check if user already exists
    if (users.has(email)) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered.',
      });
    }

    // Generate verification token
    const token = generateToken();
    const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    // Store user data (in production, hash the password!)
    users.set(email, {
      name,
      email,
      password, // ⚠️ IMPORTANT: Hash this in production!
      verified: false,
      createdAt: Date.now(),
    });

    // Store verification token
    verificationTokens.set(token, {
      email,
      expiry: tokenExpiry,
    });

    // Verification URL
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}`;

    // Email content
    const mailOptions = {
      from: `"AI Analytics Platform" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Verify Your Email Address - AI Analytics Platform',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; padding: 14px 28px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🧠 AI Analytics Platform</h1>
            </div>
            <div class="content">
              <h2>Hi ${name},</h2>
              <p>Thank you for signing up for the Generative AI Analytics Platform!</p>
              <p>To complete your registration and access all features, please verify your email address by clicking the button below:</p>
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </div>
              <p style="font-size: 14px; color: #666;">Or copy and paste this link into your browser:</p>
              <p style="font-size: 12px; word-break: break-all; background: #fff; padding: 10px; border-radius: 4px;">${verificationUrl}</p>
              <p style="font-size: 12px; color: #999; margin-top: 20px;">⏰ This verification link will expire in 24 hours.</p>
              <p>Best regards,<br/>AI Analytics Team</p>
            </div>
            <div class="footer">
              <p>If you didn't create an account, please ignore this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Signup successful! Please check your email to verify your account.',
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during signup. Please try again.',
    });
  }
});

// GET /api/verify-email - Verify email with token
app.get('/api/verify-email', (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification link. No token provided.',
      });
    }

    // Check if token exists
    const tokenData = verificationTokens.get(token);
    if (!tokenData) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification token.',
      });
    }

    // Check if token is expired
    if (Date.now() > tokenData.expiry) {
      verificationTokens.delete(token);
      return res.status(400).json({
        success: false,
        message: 'Verification link has expired. Please sign up again.',
      });
    }

    // Get user and mark as verified
    const user = users.get(tokenData.email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found.',
      });
    }

    user.verified = true;
    users.set(tokenData.email, user);

    // Delete used token
    verificationTokens.delete(token);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully. You can now log in.',
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during verification.',
    });
  }
});

// POST /api/login - User login
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email is authorized
    if (!AUTHORIZED_EMAILS.includes(email)) {
      return res.status(403).json({
        success: false,
        message: 'This email is not authorized to access the system.',
      });
    }

    // Check if user exists
    const user = users.get(email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'No account found with this email. Please sign up first.',
      });
    }

    // Check if email is verified
    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email before logging in.',
      });
    }

    // Check password (in production, compare hashed passwords!)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Login successful
    res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Email verification server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Email verification server running on port ${PORT}`);
  console.log(`📧 SMTP configured for: ${process.env.GMAIL_USER || 'Not configured'}`);
});