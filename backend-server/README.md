# Email Verification Backend Server

This is a Node.js/Express backend server that handles email verification using Gmail SMTP and Nodemailer.

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd backend-server
npm install
```

### 2. Configure Gmail SMTP

#### Step 2.1: Enable 2-Factor Authentication on Gmail
1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification**

#### Step 2.2: Generate App Password
1. Still in **Security**, scroll to **2-Step Verification**
2. Scroll down to **App passwords**
3. Click **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Enter "AI Analytics Platform"
6. Click **Generate**
7. **Copy the 16-character password** (you won't see it again!)

### 3. Create Environment File

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your credentials
```

Edit `.env` file:
```env
GMAIL_USER=ramanilakshmipriya26@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
FRONTEND_URL=http://localhost:3000
PORT=3001
```

⚠️ **IMPORTANT**: 
- Use the **App Password** (16 characters), NOT your regular Gmail password
- Never commit `.env` to version control

### 4. Run the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on http://localhost:3001

### 5. Verify Server is Running

Open your browser and go to:
```
http://localhost:3001/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Email verification server is running"
}
```

## 📧 API Endpoints

### POST /api/signup
Sign up a new user and send verification email.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "ramanilakshmipriya26@gmail.com",
  "password": "password123"
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
Verify email with token.

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully. You can now log in."
}
```

### POST /api/login
Login user (only after email verification).

**Request Body:**
```json
{
  "email": "ramanilakshmipriya26@gmail.com",
  "password": "password123"
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

## 🔒 Authorized Emails

Only these 4 emails can sign up:
- ramanilakshmipriya26@gmail.com
- rakshanalakshmi.g.cse.2022@snsct.org
- ramanesh.k.cse.2022@snsct.org
- ravichandran.v.cse.2022@snsct.org

## 🛠️ Testing

### Test Email Sending

```bash
# Install a tool to test SMTP (optional)
npm install -g nodemailer-smtp-test

# Or test directly through the API
curl -X POST http://localhost:3001/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "ramanilakshmipriya26@gmail.com",
    "password": "test123"
  }'
```

Check your Gmail inbox for the verification email!

## 📝 Important Notes

### Security Improvements for Production

1. **Hash Passwords**: Use bcrypt to hash passwords
   ```bash
   npm install bcrypt
   ```

2. **Use a Real Database**: Replace Map() with MongoDB, PostgreSQL, etc.

3. **Add Rate Limiting**: Prevent spam
   ```bash
   npm install express-rate-limit
   ```

4. **Add JWT Authentication**: For secure API access
   ```bash
   npm install jsonwebtoken
   ```

5. **Environment Variables**: Never expose `.env` file

6. **HTTPS**: Use HTTPS in production

### Common Issues

**Issue 1: "Invalid login" or "Username and Password not accepted"**
- ✅ Make sure you're using an **App Password**, not your regular Gmail password
- ✅ Enable 2-Factor Authentication first
- ✅ Check that the email in `.env` matches your Gmail address

**Issue 2: Emails not sending**
- ✅ Check your Gmail App Password is correct
- ✅ Verify 2-Factor Authentication is enabled
- ✅ Check server logs for errors
- ✅ Make sure port 587 is not blocked by firewall

**Issue 3: CORS errors from frontend**
- ✅ Backend server must be running on port 3001
- ✅ Frontend should call http://localhost:3001/api/...
- ✅ CORS is already configured in server.js

## 🚀 Deployment

### Deploy to Render.com (Free)

1. Create account on https://render.com
2. Connect your GitHub repository
3. Create new **Web Service**
4. Set environment variables in Render dashboard
5. Deploy!

### Deploy to Railway.app (Free)

1. Create account on https://railway.app
2. Create new project from GitHub
3. Add environment variables
4. Deploy!

### Deploy to Heroku

```bash
heroku create your-app-name
heroku config:set GMAIL_USER=your-email@gmail.com
heroku config:set GMAIL_APP_PASSWORD=your-app-password
heroku config:set FRONTEND_URL=https://your-frontend-url.com
git push heroku main
```

## 📚 Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Passwords Guide](https://support.google.com/accounts/answer/185833)
- [Express.js Documentation](https://expressjs.com/)

## 🆘 Support

If you encounter issues:
1. Check server logs for error messages
2. Verify Gmail App Password setup
3. Test SMTP connection manually
4. Check firewall/antivirus settings
