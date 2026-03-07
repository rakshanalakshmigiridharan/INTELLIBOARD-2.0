# 📊 Email Verification Flow Diagram

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER SIGNUP FLOW                             │
└─────────────────────────────────────────────────────────────────────┘

Step 1: User Visits Signup Page
┌──────────────────┐
│  Frontend:       │
│  /signup         │
│                  │
│  Enter:          │
│  • Name          │
│  • Email         │
│  • Password      │
└────────┬─────────┘
         │
         │ Click "Sign Up"
         ↓
Step 2: Validation & Email Check
┌──────────────────┐
│  Backend API:    │
│  POST /signup    │
│                  │
│  Checks:         │
│  ✓ Email in      │
│    authorized    │
│    list?         │
│  ✓ Not already   │
│    registered?   │
└────────┬─────────┘
         │
    ┌────┴────┐
    │         │
    NO       YES
    │         │
    ↓         ↓
┌─────────┐  ┌──────────────────┐
│ ERROR   │  │ Generate Token   │
│ Return  │  │ Store User Data  │
│ 403     │  │ (verified: false)│
└─────────┘  └────────┬─────────┘
                      │
Step 3: Send Email via Gmail SMTP
                      ↓
┌──────────────────────────────────┐
│  Nodemailer → Gmail SMTP         │
│                                  │
│  Send HTML email with:           │
│  • Welcome message               │
│  • Verification button/link      │
│  • Token in URL                  │
│  • 24hr expiry notice            │
└────────┬─────────────────────────┘
         │
         │ SMTP (Port 587)
         ↓
Step 4: User Receives Email
┌──────────────────────────────────┐
│  📧 User's Gmail Inbox           │
│                                  │
│  ┌────────────────────────────┐ │
│  │ AI Analytics Platform      │ │
│  │                            │ │
│  │ Hi John,                   │ │
│  │                            │ │
│  │ Click to verify:           │ │
│  │ [Verify Email Address]     │ │
│  │                            │ │
│  │ Link expires in 24 hours   │ │
│  └────────────────────────────┘ │
└────────┬─────────────────────────┘
         │
         │ User clicks link
         ↓
Step 5: Verification Page
┌──────────────────────────────────┐
│  Frontend:                       │
│  /verify-email?token=abc123...   │
│                                  │
│  Shows: Loading...               │
└────────┬─────────────────────────┘
         │
         │ GET /verify-email?token=...
         ↓
Step 6: Token Validation
┌──────────────────────────────────┐
│  Backend API:                    │
│  GET /verify-email               │
│                                  │
│  Checks:                         │
│  ✓ Token exists?                 │
│  ✓ Not expired? (<24hrs)         │
│  ✓ User exists?                  │
└────────┬─────────────────────────┘
         │
    ┌────┴────┐
    │         │
    NO       YES
    │         │
    ↓         ↓
┌─────────┐  ┌──────────────────┐
│ ERROR   │  │ Mark as Verified │
│ Invalid │  │ verified: true   │
│ or      │  │ Delete token     │
│ Expired │  │ Return success   │
└─────────┘  └────────┬─────────┘
                      │
Step 7: Success Confirmation
                      ↓
┌──────────────────────────────────┐
│  Frontend:                       │
│  /verify-email                   │
│                                  │
│  Shows: ✅ Email Verified!       │
│  Message: "You can now login"    │
│  Button: [Continue to Login]     │
└────────┬─────────────────────────┘
         │
         │ User clicks button
         ↓
Step 8: Login Page
┌──────────────────────────────────┐
│  Frontend:                       │
│  /login                          │
│                                  │
│  Enter:                          │
│  • Email                         │
│  • Password                      │
└────────┬─────────────────────────┘
         │
         │ Click "Login"
         ↓
Step 9: Login Validation
┌──────────────────────────────────┐
│  Backend API:                    │
│  POST /login                     │
│                                  │
│  Checks:                         │
│  ✓ Email authorized?             │
│  ✓ User exists?                  │
│  ✓ Email verified?               │
│  ✓ Password correct?             │
└────────┬─────────────────────────┘
         │
    ┌────┴────┐
    │         │
    NO       YES
    │         │
    ↓         ↓
┌─────────┐  ┌──────────────────┐
│ ERROR   │  │ Return user data │
│ 401/403 │  │ Set session      │
└─────────┘  └────────┬─────────┘
                      │
Step 10: Dashboard Access
                      ↓
┌──────────────────────────────────┐
│  Frontend:                       │
│  /dashboard                      │
│                                  │
│  ✅ User is authenticated        │
│  ✅ Can access all features      │
│                                  │
│  Available:                      │
│  • Upload CSV                    │
│  • View Analytics                │
│  • Use AI Chatbot                │
└──────────────────────────────────┘

```

---

## Error Scenarios

### Scenario A: Unauthorized Email
```
User enters: test@example.com
         ↓
Backend checks: NOT in authorized list
         ↓
Return Error: "This email is not authorized to access the system."
         ↓
User sees error, cannot proceed
```

### Scenario B: Login Before Verification
```
User signs up → Email sent → User ignores email
         ↓
User tries to login
         ↓
Backend checks: verified = false
         ↓
Return Error: "Please verify your email before logging in."
         ↓
User must check email and verify first
```

### Scenario C: Expired Token
```
User signs up → Email sent → User waits 25 hours
         ↓
User clicks verification link
         ↓
Backend checks: Date.now() > tokenExpiry
         ↓
Return Error: "Verification link has expired. Please sign up again."
         ↓
User must sign up again (new token generated)
```

---

## Data Flow Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                         │
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐        │
│  │ SignupPage  │  │ VerifyPage  │  │  LoginPage   │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬───────┘        │
│         │                 │                 │                │
└─────────┼─────────────────┼─────────────────┼────────────────┘
          │                 │                 │
          │  HTTP/API       │                 │
          │                 │                 │
          ↓                 ↓                 ↓
┌──────────────────────────────────────────────────────────────┐
│                   API SERVICE (api.ts)                        │
│                                                               │
│  • signup(name, email, password)                             │
│  • verifyEmail(token)                                        │
│  • login(email, password)                                    │
└─────────┬────────────────────────────────────────────────────┘
          │
          │  fetch() to http://localhost:3001/api
          │
          ↓
┌──────────────────────────────────────────────────────────────┐
│                  BACKEND SERVER (Express)                     │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ POST /signup │  │ GET /verify  │  │ POST /login  │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│  ┌──────▼──────────────────▼──────────────────▼──────────┐  │
│  │          In-Memory Storage (Map)                      │  │
│  │  • users: Map<email, userData>                        │  │
│  │  • verificationTokens: Map<token, tokenData>          │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │          Nodemailer (SMTP Client)                      │ │
│  │  • Connect to Gmail SMTP (smtp.gmail.com:587)         │ │
│  │  • Authenticate with App Password                     │ │
│  │  • Send HTML emails                                    │ │
│  └──────┬─────────────────────────────────────────────────┘ │
└─────────┼────────────────────────────────────────────────────┘
          │
          │  SMTP/TLS
          │
          ↓
┌──────────────────────────────────────────────────────────────┐
│                  GMAIL SMTP SERVERS                           │
│                  smtp.gmail.com:587                           │
│                                                               │
│  • Receive email from backend                                │
│  • Deliver to recipient's inbox                              │
│  • Handle bounces/failures                                   │
└──────────────────────────────────────────────────────────────┘
```

---

## Token Lifecycle

```
┌────────────────────────────────────────────────────────┐
│               TOKEN LIFECYCLE                           │
└────────────────────────────────────────────────────────┘

1. GENERATION (Signup)
   ┌─────────────────────────────┐
   │ crypto.randomBytes(32)      │
   │        ↓                    │
   │ Convert to hex string       │
   │        ↓                    │
   │ Example:                    │
   │ "a1b2c3d4e5f6..."          │
   │ (64 characters)             │
   └─────────────────────────────┘
            ↓
2. STORAGE
   ┌─────────────────────────────┐
   │ verificationTokens.set()    │
   │                             │
   │ token → {                   │
   │   email: "user@email.com"   │
   │   expiry: Date.now() + 24h  │
   │ }                           │
   └─────────────────────────────┘
            ↓
3. EMBEDDING IN EMAIL
   ┌─────────────────────────────┐
   │ URL:                        │
   │ http://localhost:3000/      │
   │ verify-email?token=a1b2c3..│
   └─────────────────────────────┘
            ↓
4. VERIFICATION
   ┌─────────────────────────────┐
   │ Extract token from URL      │
   │        ↓                    │
   │ Look up in Map              │
   │        ↓                    │
   │ Check expiry                │
   │        ↓                    │
   │ Mark user as verified       │
   └─────────────────────────────┘
            ↓
5. DELETION
   ┌─────────────────────────────┐
   │ verificationTokens.delete() │
   │                             │
   │ Token can only be used once │
   └─────────────────────────────┘
```

---

## Email Authorization Check

```
┌────────────────────────────────────────────────────────┐
│           EMAIL AUTHORIZATION FLOW                      │
└────────────────────────────────────────────────────────┘

User enters email
        ↓
┌───────────────────────────────────────────┐
│ const AUTHORIZED_EMAILS = [               │
│   'ramanilakshmipriya26@gmail.com',       │
│   'rakshanalakshmi.g.cse.2022@snsct.org', │
│   'ramanesh.k.cse.2022@snsct.org',        │
│   'ravichandran.v.cse.2022@snsct.org'     │
│ ]                                         │
└───────────────────────────────────────────┘
        ↓
┌───────────────────────────────────────────┐
│ if (AUTHORIZED_EMAILS.includes(email)) {  │
│   ✅ PROCEED                              │
│ } else {                                  │
│   ❌ ERROR                                │
│ }                                         │
└───────────────────────────────────────────┘
```

---

## State Management

```
┌────────────────────────────────────────────────────────┐
│              USER STATE TRANSITIONS                     │
└────────────────────────────────────────────────────────┘

INITIAL STATE
┌─────────────┐
│ Not Exists  │
└──────┬──────┘
       │ POST /signup
       ↓
┌─────────────────────────┐
│ Registered              │
│ • verified: false       │
│ • Token generated       │
│ • Email sent            │
└──────┬──────────────────┘
       │ GET /verify-email
       ↓
┌─────────────────────────┐
│ Verified                │
│ • verified: true        │
│ • Token deleted         │
│ • Can login             │
└──────┬──────────────────┘
       │ POST /login
       ↓
┌─────────────────────────┐
│ Authenticated           │
│ • Session active        │
│ • Access granted        │
│ • User data in frontend │
└─────────────────────────┘
```

---

## Security Layers

```
┌────────────────────────────────────────────────────────┐
│                 SECURITY LAYERS                         │
└────────────────────────────────────────────────────────┘

Layer 1: Email Whitelist
┌─────────────────────────────┐
│ Only 4 authorized emails    │
│ ✓ Prevents mass signup      │
│ ✓ Controlled access         │
└─────────────────────────────┘
         ↓
Layer 2: Email Verification
┌─────────────────────────────┐
│ User must verify email      │
│ ✓ Confirms email ownership  │
│ ✓ Prevents fake signups     │
└─────────────────────────────┘
         ↓
Layer 3: Secure Tokens
┌─────────────────────────────┐
│ Crypto-secure random tokens │
│ ✓ 64-char hex string        │
│ ✓ Impossible to guess       │
└─────────────────────────────┘
         ↓
Layer 4: Token Expiry
┌─────────────────────────────┐
│ 24-hour time limit          │
│ ✓ Prevents old token reuse  │
│ ✓ Time-bound security       │
└─────────────────────────────┘
         ↓
Layer 5: Single-Use Tokens
┌─────────────────────────────┐
│ Token deleted after use     │
│ ✓ Cannot reuse same token   │
│ ✓ One verification per token│
└─────────────────────────────┘
```

---

## Summary

This email verification system provides:

✅ **Multi-layered security** with email whitelist, verification, and secure tokens  
✅ **Real email delivery** via Gmail SMTP  
✅ **Professional UX** with clear messaging and beautiful emails  
✅ **Token expiry** for time-bound security  
✅ **Error handling** for all edge cases  
✅ **Production-ready** architecture (with recommended enhancements)  

**Start using it now!** See [QUICK_START.md](./QUICK_START.md) 🚀
