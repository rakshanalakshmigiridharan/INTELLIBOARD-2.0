# 📧 Real Gmail SMTP Email Verification System

## Overview

Your **Generative AI Analytics Platform** now includes a complete email verification system using **real Gmail SMTP** with Nodemailer. Users will receive actual verification emails in their inbox!

---

## ✨ Features

✅ **Real Gmail SMTP Integration** - Sends actual emails via Gmail  
✅ **4 Authorized Emails** - Restricted access to specific users  
✅ **Secure Token Generation** - Cryptographically secure verification tokens  
✅ **24-Hour Token Expiry** - Tokens automatically expire after 24 hours  
✅ **Professional Email Templates** - Beautiful HTML emails with your branding  
✅ **Complete Auth Flow** - Signup → Email → Verification → Login  
✅ **Error Handling** - Comprehensive error messages for all scenarios  

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     Complete Flow                             │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  1. User signs up on frontend (React)                        │
│           ↓                                                   │
│  2. Frontend → Backend API (Express)                         │
│           ↓                                                   │
│  3. Backend validates email (must be authorized)             │
│           ↓                                                   │
│  4. Backend generates secure token                           │
│           ↓                                                   │
│  5. Backend sends email via Gmail SMTP (Nodemailer)          │
│           ↓                                                   │
│  6. User receives email in real Gmail inbox                  │
│           ↓                                                   │
│  7. User clicks verification link in email                   │
│           ↓                                                   │
│  8. Frontend → Backend to verify token                       │
│           ↓                                                   │
│  9. Backend marks email as verified                          │
│           ↓                                                   │
│  10. User can now login                                      │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 📋 Authorized Emails

Only these 4 emails can sign up:

1. **ramanilakshmipriya26@gmail.com**
2. **rakshanalakshmi.g.cse.2022@snsct.org**
3. **ramanesh.k.cse.2022@snsct.org**
4. **ravichandran.v.cse.2022@snsct.org**

Any other email will receive: *"This email is not authorized to access the system."*

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Gmail account with 2-Factor Authentication
- Gmail App Password

### Setup (5 minutes)

1. **Get Gmail App Password**
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification
   - Generate App Password for "Mail"

2. **Setup Backend**
   ```bash
   cd backend-server
   npm install
   cp .env.example .env
   # Edit .env with your Gmail credentials
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cp .env.example .env
   # .env should have: VITE_API_URL=http://localhost:3001/api
   ```

4. **Test!**
   - Sign up with an authorized email
   - Check your Gmail inbox
   - Click the verification link
   - Login successfully! 🎉

📖 **Detailed Instructions**: See [QUICK_START.md](./QUICK_START.md)

---

## 📁 Project Structure

```
/
├── backend-server/              # Backend server (Node.js/Express)
│   ├── server.js               # Main server file with SMTP config
│   ├── package.json            # Backend dependencies
│   ├── .env.example            # Environment variables template
│   └── README.md               # Backend documentation
│
├── src/
│   └── app/
│       ├── services/
│       │   └── api.ts          # Frontend API service
│       ├── context/
│       │   └── AuthContext.tsx # Authentication context
│       └── pages/
│           ├── SignupPage.tsx          # Signup page
│           ├── LoginPage.tsx           # Login page
│           └── VerifyEmailPage.tsx     # Verification page
│
├── QUICK_START.md              # Quick setup guide (START HERE!)
├── SETUP_INSTRUCTIONS.md       # Complete setup documentation
├── README_EMAIL_VERIFICATION.md # This file
└── .env.example                # Frontend environment template
```

---

## 🔒 Security Features

### Current Implementation
- ✅ Authorized email restriction (4 emails only)
- ✅ Cryptographically secure tokens
- ✅ Token expiry (24 hours)
- ✅ Email verification required before login
- ✅ SMTP over TLS (port 587)

### Production Recommendations
For production deployment, you should add:
- 🔐 Password hashing (bcrypt)
- 🗄️ Real database (MongoDB/PostgreSQL)
- 🚦 Rate limiting
- 🔑 JWT authentication
- 🔒 HTTPS only
- 🛡️ CSRF protection

See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) for production guidelines.

---

## 🌐 API Endpoints

### POST /api/signup
Sign up a new user and send verification email.

**Request:**
```json
{
  "name": "John Doe",
  "email": "ramanilakshmipriya26@gmail.com",
  "password": "securepass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Signup successful! Please check your email to verify your account."
}
```

### GET /api/verify-email?token={token}
Verify email with token from email link.

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully. You can now log in."
}
```

### POST /api/login
Login (only after email verification).

**Request:**
```json
{
  "email": "ramanilakshmipriya26@gmail.com",
  "password": "securepass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful!",
  "user": {
    "name": "John Doe",
    "email": "ramanilakshmipriya26@gmail.com"
  }
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Email verification server is running"
}
```

---

## ✅ Testing Scenarios

### ✓ Successful Flow
1. Sign up with `ramanilakshmipriya26@gmail.com`
2. Receive email in Gmail inbox
3. Click verification link
4. See success message
5. Login successfully

### ✗ Unauthorized Email
1. Try to sign up with `test@example.com`
2. See error: "This email is not authorized to access the system."

### ✗ Login Before Verification
1. Sign up with authorized email
2. Don't click verification link
3. Try to login
4. See error: "Please verify your email before logging in."

### ✗ Expired Token
1. Sign up (token generated)
2. Wait 24+ hours
3. Click verification link
4. See error: "Verification link has expired. Please sign up again."

### ✗ Invalid Token
1. Manually create URL: `/verify-email?token=invalid123`
2. See error: "Invalid verification token."

---

## 🔧 Troubleshooting

### Email Not Sending?
- ✅ Check Gmail App Password is correct (16 characters, no spaces)
- ✅ Verify 2-Factor Authentication is enabled on Gmail
- ✅ Check backend logs for SMTP errors
- ✅ Make sure port 587 isn't blocked by firewall

### Frontend Can't Connect to Backend?
- ✅ Backend must be running on port 3001
- ✅ Frontend must have correct `VITE_API_URL` in `.env`
- ✅ Check browser console for CORS errors
- ✅ Verify both servers are running

### Email in Spam Folder?
- ✅ Check spam/junk folder
- ✅ Mark as "Not Spam" to whitelist
- ✅ This is normal for newly created email senders

📖 **Full Troubleshooting Guide**: See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)

---

## 🌐 Deployment

### Backend Deployment

**Recommended:** Render.com (Free tier available)

1. Create account on https://render.com
2. Deploy backend as Web Service
3. Set environment variables
4. Get deployment URL

**Other Options:**
- Railway.app (Easy, free tier)
- Heroku (Classic, paid)
- AWS/GCP/Azure (Advanced)

### Frontend Configuration

Update frontend `.env` with deployed backend URL:
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

📖 **Deployment Guide**: See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)

---

## 📧 Email Template

Your users will receive a beautiful HTML email:

```
┌─────────────────────────────────────┐
│     🧠 AI Analytics Platform        │
├─────────────────────────────────────┤
│                                     │
│  Hi John,                          │
│                                     │
│  Thank you for signing up!         │
│                                     │
│  Please verify your email:         │
│                                     │
│  ┌─────────────────────────┐      │
│  │  Verify Email Address   │      │
│  └─────────────────────────┘      │
│                                     │
│  ⏰ Link expires in 24 hours       │
│                                     │
│  Best regards,                     │
│  AI Analytics Team                 │
│                                     │
└─────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Nodemailer** - Email sending
- **Gmail SMTP** - Email service
- **Crypto** - Secure token generation
- **dotenv** - Environment variables

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

---

## 📚 Documentation Files

1. **[QUICK_START.md](./QUICK_START.md)** ⭐ START HERE
   - 5-minute setup guide
   - Essential steps only

2. **[SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)**
   - Complete setup guide
   - Deployment instructions
   - Production guidelines
   - Troubleshooting

3. **[backend-server/README.md](./backend-server/README.md)**
   - Backend-specific documentation
   - API documentation
   - SMTP configuration

4. **[README_EMAIL_VERIFICATION.md](./README_EMAIL_VERIFICATION.md)** (This file)
   - System overview
   - Architecture
   - Features

---

## 💡 Important Notes

### Development vs Production

**Development (Current)**
- ⚠️ Passwords stored in plain text
- ⚠️ Data in memory (lost on restart)
- ⚠️ No rate limiting
- ⚠️ HTTP allowed

**Production (Required)**
- ✅ Hash passwords with bcrypt
- ✅ Use real database
- ✅ Add rate limiting
- ✅ HTTPS only
- ✅ JWT tokens
- ✅ Proper error logging

### Gmail Limits

Gmail App Passwords have sending limits:
- **Personal Gmail**: ~500 emails/day
- **Google Workspace**: ~2000 emails/day

For high-volume production:
- Use SendGrid, Mailgun, or AWS SES
- Same Nodemailer code, just different config

---

## 🎯 Next Steps

After setting up email verification, you can:

1. ✅ Test the complete signup → verify → login flow
2. ✅ Upload CSV files and explore analytics
3. ✅ Use the AI chatbot for data insights
4. ✅ Deploy to production (see deployment guide)
5. ✅ Add additional security features

---

## 🆘 Support

### Getting Help

1. **Quick Issues**: See [QUICK_START.md](./QUICK_START.md)
2. **Setup Problems**: See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)
3. **Backend Issues**: See [backend-server/README.md](./backend-server/README.md)

### Common Commands

```bash
# Test backend health
curl http://localhost:3001/api/health

# View backend logs
# Check terminal where backend is running

# Restart backend
# Press Ctrl+C, then run: npm start

# Clear test data
# Restart backend server (in-memory storage)
```

---

## ✨ Success Checklist

- [ ] Gmail 2-Factor Authentication enabled
- [ ] Gmail App Password generated
- [ ] Backend `.env` configured
- [ ] Backend running on port 3001
- [ ] Frontend `.env` configured
- [ ] Can sign up with authorized email
- [ ] Receive email in Gmail inbox
- [ ] Click verification link works
- [ ] Can login after verification
- [ ] Unauthorized emails are blocked
- [ ] Unverified logins are blocked

---

## 🎉 Congratulations!

You now have a fully functional email verification system with real Gmail SMTP integration! Users can sign up, receive verification emails in their actual inbox, and access your AI Analytics Platform.

**Happy coding!** 🚀

---

*Last updated: March 6, 2026*
