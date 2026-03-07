# 📧 Gmail SMTP Email Verification - Complete Setup Guide

## Overview

Your AI Analytics Platform now uses **real Gmail SMTP** to send verification emails. This requires a **separate backend server** that runs independently from your frontend.

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────┐
│   Frontend      │────────▶│   Backend       │────────▶│   Gmail     │
│   (Figma Make)  │  API    │   (Node.js)     │  SMTP   │   Servers   │
│   Port 3000     │         │   Port 3001     │         │             │
└─────────────────┘         └─────────────────┘         └─────────────┘
```

---

## 📋 Prerequisites

- ✅ Node.js installed (v16 or higher)
- ✅ Gmail account with 2-Factor Authentication enabled
- ✅ Terminal/Command Prompt access

---

## 🚀 Step-by-Step Setup

### STEP 1: Enable 2-Factor Authentication on Gmail

1. Go to https://myaccount.google.com/
2. Click **Security** in the left sidebar
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the prompts to enable it

### STEP 2: Generate Gmail App Password

1. Still in **Security**, scroll down to **2-Step Verification**
2. At the bottom, click **App passwords**
3. Under "Select app", choose **Mail**
4. Under "Select device", choose **Other (Custom name)**
5. Enter: `AI Analytics Platform`
6. Click **Generate**
7. **COPY THE 16-CHARACTER PASSWORD** (spaces don't matter)
   - Example: `abcd efgh ijkl mnop`
8. Store this password safely - you won't see it again!

### STEP 3: Setup the Backend Server

#### 3.1 Navigate to Backend Directory

```bash
cd backend-server
```

#### 3.2 Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web server
- `nodemailer` - Email sending
- `cors` - Allow frontend to connect
- `dotenv` - Environment variables

#### 3.3 Create Environment File

```bash
# Copy the example file
cp .env.example .env
```

#### 3.4 Configure Environment Variables

Edit the `.env` file with your details:

```env
# Replace with your Gmail address (one of the 4 authorized emails)
GMAIL_USER=ramanilakshmipriya26@gmail.com

# Replace with your 16-character App Password (no spaces)
GMAIL_APP_PASSWORD=abcdefghijklmnop

# Frontend URL (where your frontend is running)
FRONTEND_URL=http://localhost:3000

# Backend server port
PORT=3001
```

⚠️ **CRITICAL**: 
- Use the **App Password**, NOT your regular Gmail password
- Remove all spaces from the App Password
- Never commit `.env` to Git (it's already in `.gitignore`)

### STEP 4: Start the Backend Server

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

You should see:

```
🚀 Email verification server running on port 3001
📧 SMTP configured for: ramanilakshmipriya26@gmail.com
✅ SMTP server is ready to send emails
```

### STEP 5: Test the Backend

Open a new terminal and test the health endpoint:

```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Email verification server is running"
}
```

### STEP 6: Configure Frontend

Create a `.env` file in your **frontend** directory:

```env
VITE_API_URL=http://localhost:3001/api
```

### STEP 7: Start the Frontend

In your frontend directory (Figma Make):

```bash
npm start
# or
npm run dev
```

Frontend should run on: http://localhost:3000

---

## ✅ Testing the Complete Flow

### Test 1: Signup with Real Email

1. **Open browser**: http://localhost:3000/signup
2. **Fill in the form** with one of the authorized emails:
   - Name: Your Name
   - Email: `ramanilakshmipriya26@gmail.com`
   - Password: `test123`
3. **Click "Sign Up"**
4. **Check your Gmail inbox** - you should receive a verification email!
5. **Click the verification link** in the email
6. **Login** with your credentials

### Test 2: Unauthorized Email

1. Try to signup with: `unauthorized@example.com`
2. You should see: "This email is not authorized to access the system."

### Test 3: Login Before Verification

1. Sign up with an authorized email
2. Don't click the verification link
3. Try to login
4. You should see: "Please verify your email before logging in."

---

## 🔧 Troubleshooting

### Issue: "Invalid login" or "Username and Password not accepted"

**Solution:**
- ✅ Make sure 2-Factor Authentication is enabled
- ✅ Use the **App Password**, not your regular Gmail password
- ✅ Remove all spaces from the App Password in `.env`
- ✅ Verify the email in `.env` matches your Gmail address exactly

### Issue: "SMTP connection error"

**Solution:**
- ✅ Check your internet connection
- ✅ Verify Gmail App Password is correct
- ✅ Make sure port 587 is not blocked by firewall
- ✅ Try regenerating the App Password

### Issue: "Failed to connect to server"

**Solution:**
- ✅ Make sure backend server is running on port 3001
- ✅ Check backend terminal for errors
- ✅ Verify `VITE_API_URL` in frontend `.env` is correct
- ✅ Make sure CORS is working (already configured)

### Issue: Email not received

**Solution:**
- ✅ Check spam/junk folder
- ✅ Verify the email address is correct
- ✅ Check backend terminal for errors
- ✅ Wait a few minutes (sometimes Gmail delays)
- ✅ Try with a different authorized email

### Issue: Frontend can't reach backend

**Solution:**
- ✅ Backend must be on http://localhost:3001
- ✅ Frontend must be on http://localhost:3000
- ✅ Check browser console for CORS errors
- ✅ Restart both servers

---

## 📧 Authorized Emails

Only these 4 emails can sign up:

1. `ramanilakshmipriya26@gmail.com`
2. `rakshanalakshmi.g.cse.2022@snsct.org`
3. `ramanesh.k.cse.2022@snsct.org`
4. `ravichandran.v.cse.2022@snsct.org`

---

## 🔒 Security Notes

### Current Implementation (Development)

⚠️ The current setup is for **development/testing only**:
- Passwords are stored in plain text (NOT SECURE!)
- User data is stored in memory (lost on restart)
- No rate limiting
- No HTTPS

### For Production

Before deploying to production, you MUST:

1. **Hash Passwords** using bcrypt:
   ```bash
   npm install bcrypt
   ```

2. **Use a Real Database** (MongoDB, PostgreSQL, etc.):
   ```bash
   npm install mongodb
   # or
   npm install pg
   ```

3. **Add Rate Limiting**:
   ```bash
   npm install express-rate-limit
   ```

4. **Use JWT for Authentication**:
   ```bash
   npm install jsonwebtoken
   ```

5. **Enable HTTPS** (use a reverse proxy like Nginx)

6. **Use Environment Variables** for all secrets

7. **Deploy Backend Separately** (Render, Railway, Heroku, etc.)

---

## 🌐 Deployment

### Backend Deployment Options

#### Option 1: Render.com (Recommended - Free Tier)

1. Create account: https://render.com
2. Click **New** → **Web Service**
3. Connect your GitHub repo
4. Select `backend-server` directory
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables in Render dashboard:
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `FRONTEND_URL` (your deployed frontend URL)
8. Deploy!

#### Option 2: Railway.app (Easy - Free Tier)

1. Create account: https://railway.app
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your repo
4. Add environment variables
5. Deploy!

#### Option 3: Heroku

```bash
heroku create your-backend-name
heroku config:set GMAIL_USER=ramanilakshmipriya26@gmail.com
heroku config:set GMAIL_APP_PASSWORD=your-app-password
heroku config:set FRONTEND_URL=https://your-frontend.com
git push heroku main
```

### Frontend Configuration After Deployment

Update your frontend `.env` with deployed backend URL:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## 📁 File Structure

```
backend-server/
├── server.js           # Main backend server
├── package.json        # Dependencies
├── .env               # Environment variables (DO NOT COMMIT)
├── .env.example       # Example environment file
└── README.md          # Backend documentation

frontend/
├── src/
│   ├── app/
│   │   ├── services/
│   │   │   └── api.ts          # API service for backend calls
│   │   ├── context/
│   │   │   └── AuthContext.tsx # Auth context (updated for backend)
│   │   └── pages/
│   │       ├── SignupPage.tsx  # Signup with email verification
│   │       ├── LoginPage.tsx   # Login page
│   │       └── VerifyEmailPage.tsx # Email verification page
```

---

## 🆘 Need Help?

### Common Commands

```bash
# Check if backend is running
curl http://localhost:3001/api/health

# View backend logs
# (Just check the terminal where you ran `npm start`)

# Restart backend
# Press Ctrl+C in terminal, then run `npm start` again

# Clear all test data (backend uses in-memory storage)
# Just restart the backend server
```

### Still Having Issues?

1. Check both terminal windows for error messages
2. Verify all environment variables are correct
3. Make sure Gmail App Password is valid
4. Try with a fresh Gmail App Password
5. Check firewall/antivirus settings

---

## ✨ Success!

Once everything is working, you'll have:

✅ Real Gmail SMTP email sending  
✅ Professional verification emails  
✅ Secure token-based verification  
✅ 24-hour token expiry  
✅ Restricted to 4 authorized emails  
✅ Complete authentication flow  

**Your users will receive real emails in their inbox!** 🎉

---

## 📚 Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Passwords Help](https://support.google.com/accounts/answer/185833)
- [Express.js Guide](https://expressjs.com/en/starter/installing.html)
- [Environment Variables Best Practices](https://12factor.net/config)
