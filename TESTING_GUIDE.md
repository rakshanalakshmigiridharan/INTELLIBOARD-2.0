# Email Verification System - Testing Guide

## Overview
This is a simulated email verification system for the Generative AI Analytics Platform. It provides a realistic demonstration of email verification without requiring an actual SMTP backend.

## Authorized Emails
Only these 4 email addresses can access the system:

1. `ramanilakshmipriya26@gmail.com`
2. `rakshanalakshmi.g.cse.2022@snsct.org`
3. `ramanesh.k.cse.2022@snsct.org`
4. `ravichandran.v.cse.2022@snsct.org`

## Complete User Flow

### Test Scenario 1: Successful Signup & Verification

1. **Navigate to Signup Page** (`/signup`)
   - Click "View authorized emails" to see the list of allowed emails
   
2. **Fill in the form with an authorized email:**
   - Name: Your Name
   - Email: `ramanilakshmipriya26@gmail.com`
   - Password: `password123`
   
3. **Click "Sign Up"**
   - ✅ You should see a simulated email inbox page
   - The page displays a verification email with a "Verify Email Address" button
   - Note: The verification token is displayed for testing purposes

4. **Click "Verify Email Address"**
   - You'll be redirected to `/verify-email?token=...`
   - ✅ After 1 second loading, you should see "Email Verified!"
   - Success message: "Email verified successfully. You can now log in."

5. **Click "Continue to Login"**
   - You'll be redirected to the login page

6. **Login with your credentials:**
   - Email: `ramanilakshmipriya26@gmail.com`
   - Password: `password123`
   - ✅ You should successfully login and be redirected to the dashboard

---

### Test Scenario 2: Unauthorized Email

1. **Navigate to Signup Page** (`/signup`)

2. **Try to signup with an unauthorized email:**
   - Name: Test User
   - Email: `unauthorized@example.com`
   - Password: `password123`

3. **Click "Sign Up"**
   - ❌ Error message: "This email is not authorized to access the system."

---

### Test Scenario 3: Login Without Verification

1. **Complete Signup** (Scenario 1, steps 1-3)
   - Use email: `rakshanalakshmi.g.cse.2022@snsct.org`
   - You'll see the simulated email page

2. **Without clicking the verification link, navigate to `/login`**

3. **Try to login:**
   - Email: `rakshanalakshmi.g.cse.2022@snsct.org`
   - Password: `password123`

4. **Click "Login"**
   - ❌ Error message: "Please verify your email before logging in."

---

### Test Scenario 4: Expired Token

The verification token expires after 24 hours. To test:

1. **Signup with an authorized email**
2. In the browser developer console, run:
   ```javascript
   // Get the stored credentials
   const creds = JSON.parse(localStorage.getItem('credentials_ramanilakshmipriya26@gmail.com'));
   // Set expiry to past
   creds.tokenExpiry = Date.now() - 1000;
   localStorage.setItem('credentials_ramanilakshmipriya26@gmail.com', JSON.stringify(creds));
   ```
3. **Try to verify with the token**
   - ❌ Error message: "Verification link has expired. Please sign up again."

---

### Test Scenario 5: Invalid Token

1. **Navigate directly to:** `/verify-email?token=invalidtoken123`
2. **Result:**
   - ❌ Error message: "Invalid verification token."

---

## Data Storage

All data is stored in `localStorage`:

- **User credentials:** `credentials_{email}`
  - Contains: name, email, password, verified status, verification token, token expiry
  
- **Current user session:** `user`
  - Contains: name, email (set only after successful login)

### Clearing Test Data

To start fresh, run in browser console:
```javascript
// Clear all test data
localStorage.clear();
```

Or clear specific user:
```javascript
localStorage.removeItem('credentials_ramanilakshmipriya26@gmail.com');
```

---

## Features Implemented

✅ **Email Restriction**
- Only 4 authorized emails can sign up
- Proper error message for unauthorized emails

✅ **Verification Token Generation**
- Secure random token generated on signup
- Token expires after 24 hours

✅ **Simulated Email**
- Realistic email interface
- Professional email template
- Verification link with token

✅ **Email Verification**
- Token validation
- Expiry checking
- Mark email as verified

✅ **Login Restrictions**
- Check for authorized email
- Verify email is verified before allowing login
- Proper error messages for each case

✅ **Complete User Flow**
- Signup → Email Simulation → Verification → Login → Dashboard

---

## Routes

- `/signup` - Signup page
- `/login` - Login page
- `/verify-email?token={token}` - Email verification page
- `/dashboard` - Main dashboard (requires authentication)
- `/upload` - CSV upload page (requires authentication)
- `/chatbot` - AI chatbot page (requires authentication)

---

## Notes

- This is a **frontend-only simulation** - no actual emails are sent
- In production, you would need a backend server with SMTP integration
- All verification logic happens client-side using localStorage
- The "simulated email inbox" replaces the need for actual email delivery
- Token security is demonstrated but would need server-side validation in production
