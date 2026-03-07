# 🚀 Quick Start Guide - Real Gmail Email Verification

## What You Need (5 Minutes)

1. Gmail account with 2-Factor Authentication
2. Gmail App Password
3. Two terminal windows

---

## Setup in 5 Steps

### 1️⃣ Get Gmail App Password

1. Go to: https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)
3. Scroll to **App passwords**
4. Create password for "Mail" → "Other" → "AI Analytics"
5. **Copy the 16-character password**

### 2️⃣ Configure Backend

```bash
cd backend-server
npm install
cp .env.example .env
```

Edit `.env`:
```env
GMAIL_USER=ramanilakshmipriya26@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop  # Your 16-char password (no spaces)
FRONTEND_URL=http://localhost:3000
PORT=3001
```

### 3️⃣ Start Backend

```bash
npm start
```

Wait for: `✅ SMTP server is ready to send emails`

### 4️⃣ Configure Frontend

In your **frontend** directory:

```bash
cp .env.example .env
```

`.env` should contain:
```env
VITE_API_URL=http://localhost:3001/api
```

### 5️⃣ Test It!

1. Go to: http://localhost:3000/signup
2. Sign up with: `ramanilakshmipriya26@gmail.com`
3. **Check your Gmail inbox** - you'll receive a verification email!
4. Click the link in the email
5. Login and you're done! 🎉

---

## Quick Test

```bash
# Test backend is running
curl http://localhost:3001/api/health

# Should return: {"status":"OK","message":"Email verification server is running"}
```

---

## Troubleshooting

**Email not sending?**
- ✅ Check you used the App Password (not regular Gmail password)
- ✅ Remove spaces from the App Password in `.env`
- ✅ Make sure 2-Factor Authentication is enabled

**Backend won't start?**
- ✅ Run `npm install` in `backend-server` directory
- ✅ Check `.env` file exists and is configured correctly

**Frontend can't connect?**
- ✅ Backend must be running on port 3001
- ✅ Check `.env` in frontend has `VITE_API_URL=http://localhost:3001/api`

---

## Full Documentation

For detailed setup, deployment, and production guidelines, see:
- **[SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)** - Complete setup guide
- **[backend-server/README.md](./backend-server/README.md)** - Backend documentation

---

## Authorized Emails

Only these emails can sign up:
- ramanilakshmipriya26@gmail.com
- rakshanalakshmi.g.cse.2022@snsct.org
- ramanesh.k.cse.2022@snsct.org
- ravichandran.v.cse.2022@snsct.org

---

## Need Help?

See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) for detailed troubleshooting!
