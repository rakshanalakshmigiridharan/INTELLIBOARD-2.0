# 🎯 Quick Reference - Supabase Email Verification

## ⚡ Instant Setup (2 Minutes)

### 1. Enable Email Confirmation
```
Dashboard URL: https://supabase.com/dashboard/project/esdhxkpqyeyvztcigsuk

Navigate: Authentication → Providers → Email
Enable: "Confirm email" checkbox ✅
Save changes
```

### 2. Add Redirect URL
```
Navigate: Authentication → URL Configuration
Add: http://localhost:3000/verify-email
Save
```

### 3. Test
```
1. Go to: http://localhost:3000/signup
2. Sign up with: ramanilakshmipriya26@gmail.com
3. Check email and click verification link
4. Login and done! ✅
```

---

## 📋 Authorized Emails

```typescript
ramanilakshmipriya26@gmail.com
rakshanalakshmi.g.cse.2022@snsct.org
ramanesh.k.cse.2022@snsct.org
ravichandran.v.cse.2022@snsct.org
```

---

## 🔧 Common Tasks

### View All Users
```
Dashboard → Authentication → Users
```

### Check Email Settings
```
Dashboard → Authentication → Providers → Email
Make sure "Confirm email" is enabled
```

### View Auth Logs
```
Dashboard → Authentication → Logs
See all signup/login events
```

### Manually Verify User
```
Dashboard → Authentication → Users
Click user → Click "Confirm email"
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Emails not sending | Check Authentication → Email Settings |
| "Failed to fetch" | Check internet connection & Supabase status |
| Email not confirmed | Check spam folder, or manually verify in dashboard |
| Unauthorized email | Only 4 specific emails allowed (see above) |

---

## 📁 Key Files

```
/src/app/lib/supabase.ts          # Supabase client setup
/src/app/context/AuthContext.tsx  # Auth logic with Supabase
/src/app/pages/SignupPage.tsx     # Signup page
/src/app/pages/LoginPage.tsx      # Login page
/src/app/pages/VerifyEmailPage.tsx # Verification page
```

---

## 🔗 Quick Links

- **Supabase Dashboard**: https://supabase.com/dashboard/project/esdhxkpqyeyvztcigsuk
- **Auth Settings**: [Dashboard → Authentication](https://supabase.com/dashboard/project/esdhxkpqyeyvztcigsuk/auth/users)
- **Full Guide**: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

---

## ✅ Checklist

- [ ] Email confirmation enabled in Supabase
- [ ] Redirect URL added
- [ ] Tested signup flow
- [ ] Received verification email
- [ ] Clicked verification link
- [ ] Successfully logged in

---

**That's it!** Your email verification is ready to use. 🚀
