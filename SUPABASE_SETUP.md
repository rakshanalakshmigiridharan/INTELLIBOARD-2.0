# 🚀 Supabase Email Verification Setup Guide

## Overview

Your AI Analytics Platform now uses **Supabase Authentication** with real email verification! Supabase will send verification emails to users automatically.

---

## ✨ What You Get

✅ **Real Email Sending** - Supabase sends actual emails  
✅ **Built-in Email Templates** - Professional verification emails  
✅ **Secure Authentication** - Industry-standard auth system  
✅ **4 Authorized Emails Only** - Client-side validation  
✅ **Automatic Token Management** - No manual token handling  
✅ **Session Management** - Automatic login state persistence  

---

## 🔧 Setup Instructions

### Step 1: Configure Email in Supabase Dashboard

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard/project/esdhxkpqyeyvztcigsuk

2. **Navigate to Authentication Settings**
   - Click **Authentication** in the left sidebar
   - Click **Email Templates**

3. **Customize the Email Template (Optional)**
   - You can customize the verification email template
   - Add your branding, colors, and messaging

### Step 2: Configure SMTP (Optional - For Custom Email Provider)

By default, Supabase uses their email service. To use Gmail SMTP:

1. **Go to Authentication → Email Settings**
2. **Click "Enable Custom SMTP"**
3. **Enter Gmail SMTP Details:**
   ```
   Host: smtp.gmail.com
   Port: 587
   Username: your-email@gmail.com
   Password: your-gmail-app-password
   Sender email: your-email@gmail.com
   Sender name: AI Analytics Platform
   ```

4. **Get Gmail App Password:**
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification
   - Generate App Password for "Mail"

5. **Test the configuration**

### Step 3: Configure Email Redirect URLs

1. **Go to Authentication → URL Configuration**
2. **Add Redirect URLs:**
   ```
   http://localhost:3000/verify-email
   http://localhost:3000/login
   ```
3. **For production, add:**
   ```
   https://your-domain.com/verify-email
   https://your-domain.com/login
   ```

### Step 4: Enable Email Confirmation

1. **Go to Authentication → Providers**
2. **Click on "Email"**
3. **Make sure these are enabled:**
   - ✅ Enable Email provider
   - ✅ Confirm email (Email verification required)
4. **Save changes**

---

## 📧 How It Works

### Complete Flow

```
1. User signs up with authorized email
   ↓
2. Supabase validates and creates account
   ↓
3. Supabase sends verification email automatically
   ↓
4. User receives email in their inbox
   ↓
5. User clicks verification link
   ↓
6. Supabase confirms email
   ↓
7. User can now login
```

### Authorized Emails (Client-Side Validation)

Only these 4 emails can sign up:
- `ramanilakshmipriya26@gmail.com`
- `rakshanalakshmi.g.cse.2022@snsct.org`
- `ramanesh.k.cse.2022@snsct.org`
- `ravichandran.v.cse.2022@snsct.org`

The app checks this before calling Supabase, providing immediate feedback.

---

## 🧪 Testing

### Test the Complete Flow

1. **Sign Up**
   ```
   Go to: http://localhost:3000/signup
   Enter: ramanilakshmipriya26@gmail.com
   Password: testpass123
   ```

2. **Check Email**
   - Check the inbox of the email you used
   - Look for "Confirm your signup" email from Supabase

3. **Click Verification Link**
   - Click the "Confirm your mail" button in the email
   - You'll be redirected to the verification page

4. **Login**
   - Go to the login page
   - Enter your credentials
   - Access the dashboard!

### Test Unauthorized Email

```
Try to sign up with: test@example.com
You should see: "This email is not authorized to access the system"
```

### Test Login Before Verification

```
1. Sign up with authorized email
2. Don't click verification link
3. Try to login
4. You should see: "Email not confirmed"
```

---

## 🔒 Security Features

### What's Implemented

✅ **Email Authorization Check** - Only 4 emails can sign up  
✅ **Email Verification Required** - Users must verify email before login  
✅ **Secure Password Storage** - Supabase handles password hashing  
✅ **JWT Tokens** - Industry-standard authentication  
✅ **Session Management** - Automatic token refresh  
✅ **HTTPS in Production** - Secure data transmission  

### Supabase Security Features

✅ **Rate Limiting** - Built-in protection against brute force  
✅ **Password Strength Validation** - Configurable requirements  
✅ **Account Recovery** - Password reset functionality  
✅ **OAuth Providers** - Can add Google, GitHub, etc.  

---

## 📊 Supabase Dashboard

### View Users

1. Go to **Authentication → Users**
2. See all registered users
3. Check verification status
4. Manually confirm emails if needed

### View Auth Logs

1. Go to **Authentication → Logs**
2. See all authentication events
3. Debug login/signup issues

### Email Templates

1. Go to **Authentication → Email Templates**
2. Customize these templates:
   - Confirm signup
   - Reset password
   - Email change confirmation

---

## 🔧 Troubleshooting

### Issue: Emails Not Sending

**Solution:**
- Check Supabase dashboard → Authentication → Email Settings
- Verify SMTP is configured (or using Supabase default)
- Check spam/junk folder
- Look at Authentication → Logs for errors

### Issue: "Failed to fetch" Error

**Solution:**
- ✅ Make sure Supabase credentials are correct
- ✅ Check `/utils/supabase/info.tsx` has correct projectId and key
- ✅ Verify internet connection
- ✅ Check browser console for CORS errors

### Issue: "Email not confirmed" After Clicking Link

**Solution:**
- The verification link may have expired (24 hours)
- Check Supabase dashboard if email is verified
- Try signing up again
- Check that redirect URLs are configured

### Issue: Authorized Email Check Not Working

**Solution:**
- This is client-side only for UX
- Users might bypass this check
- For production, implement server-side validation using Supabase Edge Functions or Row Level Security

---

## 🌐 Production Deployment

### Before Deploying

1. **Add Production URLs to Supabase**
   ```
   Dashboard → Authentication → URL Configuration
   Add: https://yourdomain.com/*
   ```

2. **Configure Custom Domain Email (Optional)**
   - Use your own domain for emails
   - Set up SMTP with your email provider
   - Update Supabase SMTP settings

3. **Review Email Templates**
   - Customize for your brand
   - Add company logo
   - Update support links

4. **Set Password Requirements**
   ```
   Dashboard → Authentication → Policies
   - Minimum length: 8 characters
   - Require uppercase
   - Require numbers
   - Require special characters
   ```

### Recommended: Server-Side Email Validation

For production, add server-side validation using Supabase Edge Functions:

```typescript
// supabase/functions/validate-signup/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const AUTHORIZED_EMAILS = [
  'ramanilakshmipriya26@gmail.com',
  'rakshanalakshmi.g.cse.2022@snsct.org',
  'ramanesh.k.cse.2022@snsct.org',
  'ravichandran.v.cse.2022@snsct.org'
]

serve(async (req) => {
  const { email } = await req.json()
  
  if (!AUTHORIZED_EMAILS.includes(email)) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized email' }),
      { status: 403 }
    )
  }
  
  return new Response(
    JSON.stringify({ success: true }),
    { status: 200 }
  )
})
```

---

## 🎯 Additional Features You Can Add

### 1. OAuth Providers (Google, GitHub, etc.)

```typescript
// Add to AuthContext
const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
};
```

### 2. Password Reset

```typescript
// Add to AuthContext
const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/reset-password',
  });
};
```

### 3. Update Profile

```typescript
// Add to AuthContext
const updateProfile = async (updates: { name?: string }) => {
  const { error } = await supabase.auth.updateUser({
    data: updates,
  });
};
```

---

## 📚 Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Email Templates Guide](https://supabase.com/docs/guides/auth/auth-email-templates)
- [Custom SMTP Setup](https://supabase.com/docs/guides/auth/auth-smtp)
- [Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers)

---

## ✅ Checklist

- [ ] Supabase email provider enabled
- [ ] Email confirmation required enabled
- [ ] Redirect URLs configured
- [ ] Email templates reviewed (optional)
- [ ] Custom SMTP configured (optional)
- [ ] Tested signup flow
- [ ] Tested email verification
- [ ] Tested login after verification
- [ ] Tested unauthorized email rejection

---

## 🎉 Success!

Once configured, you'll have:

✅ Professional email verification system  
✅ Real emails sent to users  
✅ Secure authentication  
✅ Automatic session management  
✅ Production-ready auth flow  

**No backend server required!** Supabase handles everything. 🚀

---

*Your Supabase Project ID: esdhxkpqyeyvztcigsuk*  
*Dashboard: https://supabase.com/dashboard/project/esdhxkpqyeyvztcigsuk*
