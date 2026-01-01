# Profile System Migration Guide

## Overview

This guide helps you integrate the new Profile System into your existing FicLance application. The Profile System is backward-compatible and will automatically create profiles for existing users.

## What's New

### New Features
- ✅ Comprehensive user profiles with personal and professional info
- ✅ Activity tracking and statistics
- ✅ Username system (unique identifiers)
- ✅ Skills and tech stack management
- ✅ Portfolio links integration
- ✅ User preferences (notifications, theme)
- ✅ Secure account management
- ✅ Profile completion tracking

### Database Changes
- **New Collection**: `profiles` - Stores extended user profile data
- **No breaking changes** to existing `users` collection
- Profiles are created on-demand (lazy initialization)

## Installation Steps

### 1. Database Setup

No manual database migrations needed! The system will:
- Automatically create the `profiles` collection
- Generate profiles for users on first access
- Create necessary indexes

However, if you want to pre-create profiles for all existing users, run this script:

```javascript
// scripts/createProfiles.js
import { connectToDatabase } from "../src/lib/mongoose.js";
import User from "../src/models/User.js";
import Profile from "../src/models/Profile.js";

async function createProfilesForExistingUsers() {
  await connectToDatabase();
  
  const users = await User.find({});
  console.log(`Found ${users.length} users`);
  
  let created = 0;
  
  for (const user of users) {
    const existingProfile = await Profile.findOne({ userId: user._id });
    
    if (!existingProfile) {
      await Profile.create({
        userId: user._id,
        stats: {
          totalProjectsCompleted: 0,
          activeSimulations: 0,
          deadlinesMetPercentage: 0,
          lastActiveDate: new Date()
        }
      });
      created++;
      console.log(`Created profile for user: ${user.email}`);
    }
  }
  
  console.log(`✓ Created ${created} new profiles`);
  process.exit(0);
}

createProfilesForExistingUsers().catch(console.error);
```

Run with: `node scripts/createProfiles.js`

### 2. Update Navigation

The profile link has been added to the Header component. If you use a custom header, add:

```jsx
<a
  href="/profile"
  className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors"
  title="Profile"
>
  <User size={18} className="text-primary" />
</a>
```

### 3. Update Dashboard (Optional)

Add a profile completion widget to encourage users to complete their profiles:

```jsx
import { useProfileCompletion } from "@/hooks/useProfile";

function ProfileCompletionWidget({ profile }) {
  const completion = useProfileCompletion(profile);
  
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h3 className="font-semibold mb-2">Profile Completion</h3>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className="bg-green-500 h-2 rounded-full"
          style={{ width: `${completion}%` }}
        />
      </div>
      <p className="text-sm text-gray-600">{completion}% complete</p>
      {completion < 100 && (
        <a href="/profile" className="text-sm text-primary hover:underline">
          Complete your profile →
        </a>
      )}
    </div>
  );
}
```

### 4. Environment Variables

No new environment variables needed! The system uses your existing:
- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- OAuth credentials (Google/GitHub)

## Using the Profile System

### Accessing Profile Data

In Server Components:
```javascript
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongoose";
import Profile from "@/models/Profile";
import User from "@/models/User";

async function MyServerComponent() {
  const session = await getServerSession(authOptions);
  const user = await User.findOne({ email: session.user.email });
  const profile = await Profile.findOne({ userId: user._id });
  
  return <div>Welcome, {profile.username || user.name}!</div>;
}
```

In Client Components:
```javascript
"use client";
import { useProfile } from "@/hooks/useProfile";

function MyClientComponent() {
  const { profile, isLoading, updatePersonalInfo } = useProfile();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>Welcome, {profile.username || profile.name}!</h1>
      <button onClick={() => updatePersonalInfo({ bio: "New bio" })}>
        Update Bio
      </button>
    </div>
  );
}
```

### API Integration

Fetch profile in any API route:
```javascript
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongoose";
import Profile from "@/models/Profile";
import User from "@/models/User";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });
  
  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email });
  const profile = await Profile.findOne({ userId: user._id });
  
  // Use profile data
  return Response.json({ profile });
}
```

## Updating Activity Stats

The profile includes activity statistics that should be updated when users complete actions:

### Update Projects Completed
```javascript
import Profile from "@/models/Profile";

async function onProjectComplete(userId) {
  await Profile.findOneAndUpdate(
    { userId },
    {
      $inc: { "stats.totalProjectsCompleted": 1 },
      $set: { "stats.lastActiveDate": new Date() }
    }
  );
}
```

### Update Active Simulations
```javascript
async function onSimulationStart(userId) {
  await Profile.findOneAndUpdate(
    { userId },
    {
      $inc: { "stats.activeSimulations": 1 },
      $set: { "stats.lastActiveDate": new Date() }
    }
  );
}

async function onSimulationEnd(userId) {
  await Profile.findOneAndUpdate(
    { userId },
    {
      $inc: { "stats.activeSimulations": -1 },
      $set: { "stats.lastActiveDate": new Date() }
    }
  );
}
```

### Update Deadline Success Rate
```javascript
async function calculateDeadlineRate(userId) {
  // Calculate from your project data
  const totalProjects = await Project.countDocuments({ userId });
  const onTimeProjects = await Project.countDocuments({
    userId,
    completedOnTime: true
  });
  
  const percentage = totalProjects > 0
    ? Math.round((onTimeProjects / totalProjects) * 100)
    : 0;
  
  await Profile.findOneAndUpdate(
    { userId },
    { $set: { "stats.deadlinesMetPercentage": percentage } }
  );
}
```

## Customization

### Add Custom Fields

To add new fields to the profile:

1. Update the Profile model:
```javascript
// In src/models/Profile.js
const ProfileSchema = new Schema({
  // ... existing fields
  
  // Add your custom fields
  customField: { type: String, default: "" },
  anotherField: { type: Number, default: 0 }
});
```

2. Update validation:
```javascript
// In src/utils/profileValidation.js
export const customFieldSchema = z.object({
  customField: z.string().max(100).optional(),
  anotherField: z.number().min(0).max(1000).optional()
});
```

3. Add to API route:
```javascript
// In src/app/api/profile/route.js PUT handler
if (body.custom) {
  if (body.custom.customField !== undefined) {
    updateData.customField = body.custom.customField;
  }
  // ... other custom fields
}
```

4. Create UI component and add to profile page

### Styling Customization

All components use Tailwind CSS. Customize by:

1. Updating Tailwind config for global styles
2. Modifying component classes directly
3. Creating wrapper components with custom styles

## Testing

### Manual Testing Checklist

- [ ] Visit `/profile` while logged out → redirects to signin
- [ ] Visit `/profile` while logged in → shows profile
- [ ] Update username → checks availability
- [ ] Add skills → displays properly
- [ ] Update preferences → saves correctly
- [ ] Upload avatar → updates image
- [ ] Delete account → shows confirmation modal
- [ ] Logout → redirects to home

### Automated Testing

Example test with Jest:

```javascript
import { GET, PUT } from "@/app/api/profile/route";

describe("Profile API", () => {
  it("should fetch profile for authenticated user", async () => {
    // Mock session
    jest.spyOn(require("next-auth"), "getServerSession")
      .mockResolvedValue({ user: { email: "test@example.com" } });
    
    const response = await GET();
    const data = await response.json();
    
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty("email");
  });
});
```

## Troubleshooting

### Issue: Profile not loading
**Solution**: Check MongoDB connection and ensure Profile model is imported

### Issue: Username uniqueness errors
**Solution**: Profile schema has unique index on username. Clear index and rebuild:
```javascript
db.profiles.dropIndex("username_1");
```

### Issue: Avatar not uploading
**Solution**: Current implementation uses data URLs. For production, integrate with a storage service:

```javascript
// Example with Cloudinary
import { v2 as cloudinary } from "cloudinary";

async function uploadAvatar(file) {
  const result = await cloudinary.uploader.upload(file, {
    folder: "avatars",
    transformation: [
      { width: 400, height: 400, crop: "fill" },
      { quality: "auto" }
    ]
  });
  return result.secure_url;
}
```

### Issue: Stats not updating
**Solution**: Ensure you're calling profile update functions when users complete actions

## Security Considerations

### Current Security Features
- ✅ Session-based authentication
- ✅ Input validation (Zod)
- ✅ SQL/NoSQL injection prevention
- ✅ XSS protection
- ✅ CSRF protection (NextAuth)
- ✅ Unique constraint enforcement

### Recommended Additions
- [ ] Rate limiting on profile updates
- [ ] Avatar file size/type validation
- [ ] Audit logging for sensitive changes
- [ ] Two-factor authentication
- [ ] Email verification for profile changes

## Performance Optimization

### Current Optimizations
- Indexed database queries
- Lean queries for read-only data
- Client-side caching (React state)

### Recommended Improvements
```javascript
// Add Redis caching
import Redis from "ioredis";
const redis = new Redis(process.env.REDIS_URL);

async function getCachedProfile(userId) {
  const cached = await redis.get(`profile:${userId}`);
  if (cached) return JSON.parse(cached);
  
  const profile = await Profile.findOne({ userId });
  await redis.setex(`profile:${userId}`, 300, JSON.stringify(profile));
  return profile;
}
```

## Migration Rollback

If you need to rollback:

1. Remove profile route: Delete `/src/app/profile/`
2. Remove API routes: Delete `/src/app/api/profile/`
3. Remove components: Delete `/src/components/Profile/`
4. Revert Header changes
5. (Optional) Drop profiles collection: `db.profiles.drop()`

The User model and authentication remain unchanged, so your app continues working.

## Support

For issues or questions:
1. Check the main [PROFILE_SYSTEM.md](./PROFILE_SYSTEM.md) documentation
2. Review component JSDoc comments
3. Check API route inline documentation
4. Create an issue in the repository

---

**Migration Version**: 1.0.0  
**Compatible with**: Next.js 14, NextAuth 4.x, MongoDB 5+
