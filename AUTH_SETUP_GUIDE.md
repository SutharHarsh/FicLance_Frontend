# 🚀 Authentication System - Setup & Testing Guide

## ⚡ Quick Start (5 Minutes)

### Step 1: Environment Variables

Create/update `.env.local` in your project root:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl

# MongoDB
MONGODB_URI=your-mongodb-connection-string

# Google OAuth (Get from Google Cloud Console)
GOOGLE_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_SECRET=your-google-client-secret

# GitHub OAuth (Get from GitHub Developer Settings)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# JWT (Optional - for custom tokens)
JWT_SECRET=your-jwt-secret
```

### Step 2: Generate Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate JWT_SECRET (if needed)
openssl rand -base64 32
```

### Step 3: Dependencies (Already Installed)

The system uses these packages (already in package.json):
- ✅ `next-auth` - Authentication framework
- ✅ `bcryptjs` - Password hashing
- ✅ `mongodb` - Database
- ✅ `mongoose` - ODM
- ✅ `lucide-react` - Icons
- ✅ `react-icons` - Social icons

### Step 4: Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

---

## 🔑 OAuth Setup

### Google OAuth

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create Project** (if needed)
   - Click "Select a project" → "New Project"
   - Enter project name → "Create"

3. **Enable Google+ API**
   - Navigation menu → "APIs & Services" → "Library"
   - Search "Google+ API" → Enable

4. **Create OAuth Credentials**
   - "APIs & Services" → "Credentials"
   - "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "FicLance Auth"

5. **Configure OAuth Consent Screen**
   - User type: "External"
   - App name: "FicLance"
   - User support email: your-email@example.com
   - Developer contact: your-email@example.com

6. **Set Authorized Redirect URIs**
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google
   ```

7. **Copy Credentials**
   - Copy "Client ID" → `GOOGLE_ID`
   - Copy "Client Secret" → `GOOGLE_SECRET`

### GitHub OAuth

1. **Go to GitHub Settings**
   - Visit: https://github.com/settings/developers

2. **Create OAuth App**
   - Click "New OAuth App"
   - Application name: "FicLance"
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

3. **Generate Client Secret**
   - After creation, click "Generate a new client secret"

4. **Copy Credentials**
   - Copy "Client ID" → `GITHUB_ID`
   - Copy "Client secret" → `GITHUB_SECRET`

5. **For Production**
   - Create another OAuth app with production URLs
   - Homepage: `https://yourdomain.com`
   - Callback: `https://yourdomain.com/api/auth/callback/github`

---

## 🧪 Testing the System

### 1. Test Landing Page Popup

1. Open http://localhost:3000
2. Wait 30 seconds (or modify the delay in code)
3. Signup popup should appear
4. Test:
   - [ ] Popup appears after 30s
   - [ ] Can close with X button
   - [ ] Can close with ESC key
   - [ ] Can close by clicking backdrop
   - [ ] Doesn't appear again in same session
   - [ ] Form fields work
   - [ ] OAuth buttons work

### 2. Test Sign Up Page

1. Visit http://localhost:3000/auth/signup
2. Test:
   - [ ] Page loads correctly
   - [ ] OAuth buttons visible
   - [ ] Form fields work
   - [ ] Validation shows errors
   - [ ] Password toggle works
   - [ ] Submit button disables during loading
   - [ ] Success message appears
   - [ ] Redirects to login

**Test Cases:**
```
✓ Empty form → Shows "required" errors
✓ Invalid email → Shows "valid email" error
✓ Short password → Shows "8 characters" error
✓ Mismatched passwords → Shows "do not match" error
✓ Valid data → Creates account → Redirects
```

### 3. Test Login Page

1. Visit http://localhost:3000/auth/login
2. Test:
   - [ ] Page loads correctly
   - [ ] OAuth buttons visible
   - [ ] Form fields work
   - [ ] "Forgot password?" link works
   - [ ] Validation works
   - [ ] Login succeeds with correct credentials
   - [ ] Error shows with wrong credentials
   - [ ] Redirects to dashboard on success

**Test Cases:**
```
✓ Empty form → Shows errors
✓ Wrong password → Shows "Invalid email or password"
✓ Correct credentials → Logs in → Redirects
✓ From signup → Shows success message
```

### 4. Test Forgot Password

1. Visit http://localhost:3000/auth/forgot-password
2. Test:
   - [ ] Page loads correctly
   - [ ] Email field works
   - [ ] Back to login link works
   - [ ] Submit sends request
   - [ ] Success message appears
   - [ ] Can try another email

**Test Cases:**
```
✓ Empty email → Shows error
✓ Invalid email → Shows error
✓ Valid email → Shows success
✓ "Try another email" → Returns to form
```

### 5. Test OAuth Flows

#### Google OAuth:
1. Click "Continue with Google" button
2. Should redirect to Google login
3. Select account
4. Should redirect back to dashboard
5. Check session is created

#### GitHub OAuth:
1. Click "Continue with GitHub" button
2. Should redirect to GitHub login
3. Authorize app
4. Should redirect back to dashboard
5. Check session is created

### 6. Test Responsive Design

#### Mobile (≤640px):
```
✓ Cards full width
✓ Text readable
✓ Buttons easy to tap
✓ No horizontal scroll
✓ Popup works properly
```

#### Tablet (641-1024px):
```
✓ Cards centered
✓ Comfortable spacing
✓ Landscape/portrait both work
```

#### Desktop (≥1025px):
```
✓ Cards max-width 448px
✓ Centered layout
✓ Branding visible
✓ Professional appearance
```

**Test Devices:**
- [ ] iPhone (Safari, Chrome)
- [ ] Android (Chrome)
- [ ] iPad (Safari)
- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Desktop Safari

### 7. Test Dark Mode

1. Toggle system/browser dark mode
2. Test:
   - [ ] All pages adapt
   - [ ] Colors readable
   - [ ] Contrast sufficient
   - [ ] No white flashes
   - [ ] Popup works in dark mode

### 8. Test Accessibility

**Keyboard Navigation:**
```
✓ Tab through all fields
✓ Enter submits form
✓ ESC closes popup
✓ Focus visible
✓ Tab order logical
```

**Screen Reader:**
```
✓ Labels announced
✓ Errors announced
✓ Buttons have names
✓ Links descriptive
```

---

## 🐛 Common Issues & Fixes

### Issue: "signIn is not defined"
**Fix:** Make sure `next-auth/react` is imported:
```javascript
import { signIn } from "next-auth/react";
```

### Issue: OAuth not working
**Fix:**
1. Check environment variables are set
2. Verify callback URLs match exactly
3. Check OAuth app is enabled
4. Clear browser cache and cookies

### Issue: "CSRF token missing"
**Fix:**
1. Check NEXTAUTH_SECRET is set
2. Clear cookies
3. Restart dev server

### Issue: Popup not appearing
**Fix:**
1. Check console for errors
2. Clear sessionStorage: `sessionStorage.clear()`
3. Make sure you're not authenticated
4. Wait full 30 seconds

### Issue: "Cannot find module 'bcryptjs'"
**Fix:**
```bash
npm install bcryptjs --legacy-peer-deps
```

### Issue: Dark mode not working
**Fix:**
1. Check ThemeProvider is in layout
2. Verify CSS variables in globals.css
3. Check html/body has theme class

### Issue: Database connection error
**Fix:**
1. Check MONGODB_URI is correct
2. Verify IP whitelist in MongoDB Atlas
3. Check database user permissions

---

## 📋 Pre-Production Checklist

### Environment
- [ ] Production NEXTAUTH_URL set
- [ ] Strong NEXTAUTH_SECRET generated
- [ ] Production OAuth credentials configured
- [ ] MongoDB production database ready
- [ ] All secrets secured (not in git)

### OAuth
- [ ] Production callback URLs configured
- [ ] OAuth apps verified and published
- [ ] Consent screens completed
- [ ] Scopes properly set

### Security
- [ ] Passwords hashed (bcrypt)
- [ ] CSRF protection enabled
- [ ] Secure cookies in production
- [ ] Rate limiting considered
- [ ] Input validation complete

### Testing
- [ ] All auth flows tested
- [ ] Mobile devices tested
- [ ] Cross-browser tested
- [ ] Dark mode tested
- [ ] Accessibility checked
- [ ] Error states verified

### Documentation
- [ ] .env.example created
- [ ] Setup guide reviewed
- [ ] API endpoints documented
- [ ] Component usage documented

### Performance
- [ ] Bundle size optimized
- [ ] Images optimized
- [ ] Lazy loading where appropriate
- [ ] No console warnings

---

## 🚀 Deployment Steps

### 1. Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

**Environment Variables in Vercel:**
1. Go to project settings
2. Environment Variables section
3. Add all variables from .env.local
4. Deploy again

### 2. Update OAuth Redirect URLs

**Google:**
- Add: `https://your-domain.vercel.app/api/auth/callback/google`

**GitHub:**
- Add: `https://your-domain.vercel.app/api/auth/callback/github`

### 3. Update Environment Variables

```bash
# In Vercel dashboard or .env.production
NEXTAUTH_URL=https://your-domain.vercel.app
```

### 4. Test Production

1. Visit your deployed URL
2. Test all auth flows
3. Check console for errors
4. Verify OAuth works
5. Test on mobile devices

---

## 📊 Monitoring & Analytics

### Add Analytics (Optional)

Track authentication events:

```javascript
// In your auth pages
const handleSignup = async () => {
  // Your signup logic
  
  // Track event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'sign_up', {
      method: 'email'
    });
  }
};
```

### Monitor Errors

Add error logging:

```javascript
// In API routes
catch (error) {
  console.error('Auth error:', error);
  
  // Send to logging service
  // Sentry, LogRocket, etc.
}
```

---

## 🎯 Success Metrics to Track

1. **Conversion Rate**
   - Landing page → Signup completion
   - Popup appearance → Signup

2. **Auth Method Preference**
   - OAuth vs Email/Password ratio
   - Google vs GitHub usage

3. **Drop-off Points**
   - Where users abandon signup
   - Form field with most errors

4. **Performance**
   - Time to first paint
   - Time to interactive
   - API response times

5. **Errors**
   - Failed login attempts
   - Validation errors
   - OAuth failures

---

## 🔧 Advanced Configuration

### Customize Popup Timing

```javascript
// In SignupPopup.jsx, line ~30
const POPUP_DELAY = 30000; // Change this value (milliseconds)
```

### Customize Password Requirements

```javascript
// In signup/login pages, update validation
if (password.length < 12) { // Change from 8 to 12
  errors.password = "Password must be at least 12 characters";
}
```

### Add Custom OAuth Provider

```javascript
// In [...nextauth]/route.js
import CustomProvider from "next-auth/providers/custom";

providers: [
  CustomProvider({
    clientId: process.env.CUSTOM_ID,
    clientSecret: process.env.CUSTOM_SECRET,
  }),
  // ... other providers
]
```

---

## 📞 Support & Help

### Documentation
- Main docs: `AUTH_SYSTEM_DOCUMENTATION.md`
- Quick reference: `AUTH_QUICK_REFERENCE.md`
- This guide: `AUTH_SETUP_GUIDE.md`

### External Resources
- NextAuth.js: https://next-auth.js.org
- MongoDB: https://docs.mongodb.com
- Tailwind CSS: https://tailwindcss.com/docs

### Common Questions

**Q: Can I add more OAuth providers?**
A: Yes! Add more providers to the NextAuth configuration.

**Q: How do I customize the email templates?**
A: Implement email service in `/api/auth/forgot-password/route.js`

**Q: Can I change the popup timing?**
A: Yes! Edit the POPUP_DELAY constant in SignupPopup.jsx

**Q: Is two-factor authentication supported?**
A: Not yet, but it's in the roadmap. You can add it via NextAuth callbacks.

---

## ✅ You're All Set!

Your authentication system is now ready. Here's what you have:

✅ **Premium UI** - Modern, minimal, trustworthy design  
✅ **Multiple Auth Methods** - OAuth + Email/Password  
✅ **Fully Responsive** - Works on all devices  
✅ **Secure** - Password hashing, validation, CSRF protection  
✅ **Accessible** - Keyboard nav, screen reader support  
✅ **Production Ready** - Error handling, loading states  
✅ **Well Documented** - Comprehensive guides  

**Next Steps:**
1. Configure OAuth credentials
2. Test all flows
3. Deploy to production
4. Monitor and optimize

**Happy building! 🚀**
