# 🚀 Profile System Quick Start

## Instant Setup (5 Minutes)

### 1. Start Your Dev Server
```bash
npm run dev
```

### 2. Test the Profile System

1. **Login** to your application (if not already logged in)
2. **Navigate** to http://localhost:3000/profile
3. **You should see** your profile page automatically!

That's it! The system is fully functional out of the box.

---

## 📱 User Flow

```
1. User logs in with Google/GitHub
   ↓
2. Clicks profile icon in header
   ↓
3. Lands on /profile page
   ↓
4. Profile is auto-created if doesn't exist
   ↓
5. User edits information
   ↓
6. Changes save automatically to MongoDB
```

---

## 🎯 Quick Test Checklist

Open `/profile` and try these:

- [ ] **Personal Tab**: Add username, bio, skills
- [ ] **Professional Tab**: Add tech stack, portfolio links
- [ ] **Activity Tab**: View your stats (will be 0 initially)
- [ ] **Security Tab**: View your account info
- [ ] **Preferences Tab**: Toggle notifications, change theme
- [ ] Click "Save" on any form - should see success message
- [ ] Refresh page - changes should persist

---

## 🔑 Key URLs

| URL | Purpose |
|-----|---------|
| `/profile` | Main profile page |
| `/api/profile` | Profile API endpoint |
| `/api/profile/check-username` | Username availability |

---

## 💡 Quick Code Examples

### Get Profile Data (Client)
```javascript
"use client";
import { useProfile } from "@/hooks/useProfile";

export default function MyComponent() {
  const { profile, isLoading } = useProfile();
  
  if (isLoading) return <div>Loading...</div>;
  
  return <div>Hello, {profile.username || profile.name}!</div>;
}
```

### Get Profile Data (Server)
```javascript
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongoose";
import Profile from "@/models/Profile";
import User from "@/models/User";

export default async function MyServerComponent() {
  const session = await getServerSession(authOptions);
  await connectToDatabase();
  
  const user = await User.findOne({ email: session.user.email });
  const profile = await Profile.findOne({ userId: user._id });
  
  return <div>Welcome, @{profile.username}!</div>;
}
```

### Update Profile
```javascript
const response = await fetch("/api/profile", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    personal: {
      username: "johndoe",
      bio: "I'm a developer",
      skills: ["React", "Node.js"]
    }
  })
});
```

---

## 🐛 Quick Troubleshooting

### Profile page redirects to login
**Cause**: Not authenticated  
**Fix**: Make sure you're logged in first

### Username not available
**Cause**: Already taken by another user  
**Fix**: Try a different username

### Changes not saving
**Cause**: Validation error or network issue  
**Fix**: Check browser console for errors

### MongoDB connection error
**Cause**: MONGODB_URI not set or invalid  
**Fix**: Check your `.env.local` file

---

## 📖 Full Documentation

For complete details, see:

- **[PROFILE_IMPLEMENTATION_SUMMARY.md](./PROFILE_IMPLEMENTATION_SUMMARY.md)** - Overview
- **[PROFILE_SYSTEM.md](./PROFILE_SYSTEM.md)** - Full documentation
- **[PROFILE_MIGRATION.md](./PROFILE_MIGRATION.md)** - Integration guide

---

## 🎨 Customization Examples

### Change Theme Colors
Edit the components to use your brand colors:
```javascript
// Replace bg-primary with your color
className="bg-blue-600 text-white"
```

### Add Custom Fields
1. Update `src/models/Profile.js`
2. Update `src/utils/profileValidation.js`
3. Update API route `src/app/api/profile/route.js`
4. Add to your form component

### Hide Sections
Remove tabs you don't need from `src/app/profile/page.jsx`:
```javascript
const tabs = [
  { id: "personal", label: "Personal Info", icon: User },
  // Comment out unwanted tabs
  // { id: "professional", label: "Professional", icon: Briefcase },
];
```

---

## 🚀 Deploy to Production

### Before Deploying

1. **Set up avatar storage** (S3, Cloudinary, etc.)
2. **Add rate limiting** to API routes
3. **Test with real users**
4. **Monitor error logs**

### Environment Variables (Production)
```env
MONGODB_URI=your_production_mongodb_uri
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your_secure_random_string
GOOGLE_ID=your_google_oauth_id
GOOGLE_SECRET=your_google_oauth_secret
```

### Vercel Deployment
```bash
# Push to GitHub
git add .
git commit -m "Add profile system"
git push

# Deploy on Vercel (auto-deploys from GitHub)
# Add environment variables in Vercel dashboard
```

---

## 💬 Need Help?

1. Check the error in browser console
2. Review the API response in Network tab
3. Check MongoDB connection
4. Verify environment variables
5. Review the full documentation files

---

## ✅ What's Working Right Now

✅ User can view profile  
✅ User can edit all fields  
✅ Username uniqueness checking  
✅ Form validation  
✅ Avatar upload (data URL)  
✅ Stats display  
✅ Preferences management  
✅ Account deletion  
✅ Session security  

---

**That's it! Your profile system is ready to use! 🎉**

Start exploring at: http://localhost:3000/profile
