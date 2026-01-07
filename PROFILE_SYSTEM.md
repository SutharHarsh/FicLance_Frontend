# Profile System Documentation

## Overview

The Profile System is a production-ready, scalable user profile management solution for the FicLance SaaS platform. It provides comprehensive profile management capabilities with a focus on security, user experience, and extensibility.

## Architecture

### Frontend Components (`src/components/Profile/`)

1. **ProfileOverview.jsx** - Top-level profile display

   - Shows user avatar, name, email, and badges
   - Supports custom avatar upload
   - Displays key profile metadata

2. **PersonalInfoForm.jsx** - Personal information editor

   - Username with real-time availability checking
   - Bio (250 characters max)
   - Skills management (up to 20 skills)
   - Experience level selector
   - Optimistic UI updates with validation

3. **ProfessionalInfoForm.jsx** - Career and tech details

   - Preferred tech stack (up to 15 items)
   - Career goals selector
   - Availability hours per week
   - Portfolio links (GitHub, Website, LinkedIn)
   - URL validation

4. **ActivityStats.jsx** - Read-only performance metrics

   - Projects completed counter
   - Active simulations tracker
   - Deadline success percentage
   - Last active timestamp
   - Performance breakdown with visualizations
   - Personalized insights

5. **SecuritySettings.jsx** - Account security management

   - Authentication provider display
   - Session information
   - Logout functionality
   - Account deletion with confirmation modal
   - Security warnings for destructive actions

6. **Preferences.jsx** - User preferences
   - Notification toggles (deadlines, messages, updates)
   - Theme selector (Light/Dark/System)
   - Language preference (future-ready)
   - Auto-save with feedback

### Backend API Routes (`src/app/api/profile/`)

#### GET /api/profile

- Fetches current user's complete profile
- Merges User and Profile collections
- Creates default profile if none exists
- **Security**: Session-scoped, uses email from session

#### PUT /api/profile

- Updates profile fields
- Validates all inputs with Zod schemas
- Checks username uniqueness
- Supports partial updates
- **Security**: All updates are scoped to session user

#### DELETE /api/profile

- Permanently deletes user account
- Requires explicit confirmation: "DELETE_MY_ACCOUNT"
- Cascades to profile deletion
- **Security**: Requires valid session and confirmation

#### GET /api/profile/check-username

- Real-time username availability checker
- Validates username format
- Returns availability status
- **Security**: Authenticated users only

### Data Models (`src/models/`)

#### Profile Model

```javascript
{
  userId: ObjectId (ref: User, unique, indexed),

  // Personal
  username: String (unique, 3-30 chars, alphanumeric+_-),
  bio: String (max 250 chars),
  skills: [String],
  experienceLevel: enum("beginner", "intermediate", "advanced"),

  // Professional
  preferredTechStack: [String],
  careerGoal: enum("job", "freelancing", "learning", "other"),
  availability: { hoursPerWeek: Number (0-168) },
  portfolioLinks: {
    github: String,
    website: String,
    linkedin: String
  },

  // Stats (system-updated)
  stats: {
    totalProjectsCompleted: Number,
    activeSimulations: Number,
    deadlinesMetPercentage: Number (0-100),
    lastActiveDate: Date
  },

  // Preferences
  preferences: {
    notifications: {
      deadlines: Boolean,
      messages: Boolean,
      projectUpdates: Boolean
    },
    theme: enum("light", "dark", "system"),
    language: String
  },

  customAvatar: String (URL)
}
```

### Validation (`src/utils/profileValidation.js`)

Uses **Zod** for schema validation:

- `personalInfoSchema` - Validates personal info updates
- `professionalInfoSchema` - Validates professional info
- `preferencesSchema` - Validates preferences
- `usernameSchema` - Validates username format
- `updateProfileSchema` - Top-level update validator

## Security Features

### 1. Session-Based Authentication

- All API routes use `getServerSession()`
- Never trusts client-provided userId
- Always derives userId from session email

### 2. Input Validation

- Server-side validation with Zod
- Client-side validation for UX
- SQL/NoSQL injection prevention
- XSS protection through sanitization

### 3. Data Access Control

- Users can only access/modify their own profile
- Profile queries are scoped to session user
- No direct ObjectId exposure in URLs

### 4. Destructive Action Protection

- Account deletion requires typed confirmation
- Modal warnings for irreversible actions
- Double-confirmation flow

## User Experience Features

### 1. Optimistic UI

- Instant feedback on form changes
- Loading states during async operations
- Success/error notifications

### 2. Real-Time Validation

- Username availability checking (debounced)
- Character counters for text fields
- URL format validation
- Visual feedback (checkmarks, warnings)

### 3. Responsive Design

- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly controls

### 4. Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus states on all interactive elements

## Integration Points

### Authentication

- Uses NextAuth with MongoDB adapter
- Supports Google and GitHub OAuth
- Session management via NextAuth

### Database

- MongoDB via Mongoose
- Indexed queries for performance
- Virtual population for related data

### Frontend State

- React hooks for local state
- API calls via fetch
- Manual refetch after mutations

## Usage Examples

### Fetching Profile

```javascript
import { getProfile } from "@/services/profileService";

const profile = await getProfile();
console.log(profile.username, profile.stats);
```

### Updating Personal Info

```javascript
import { updatePersonalInfo } from "@/services/profileService";

await updatePersonalInfo({
  username: "johndoe",
  bio: "Aspiring developer",
  skills: ["React", "Node.js"],
  experienceLevel: "intermediate",
});
```

### Checking Username

```javascript
import { checkUsernameAvailability } from "@/services/profileService";

const isAvailable = await checkUsernameAvailability("john_doe");
if (isAvailable) {
  // Username can be used
}
```

## Future Extensions

### Recommended Additions

1. **Avatar Upload Service**

   - Current: Data URLs (not production-ready)
   - Recommended: AWS S3, Cloudinary, or similar
   - Add image compression and resizing

2. **Profile Visibility Settings**

   - Public/Private profile toggle
   - Custom privacy controls per field

3. **Profile Completeness Indicator**

   - Calculate % completion
   - Show progress bar
   - Suggest missing fields

4. **Social Features**

   - Follow/followers system
   - Profile views counter
   - Public profile URL

5. **Advanced Stats**

   - Time-series activity graphs
   - Skill endorsements
   - Project success metrics

6. **Audit Log**

   - Track profile changes
   - Show edit history
   - Revert capabilities

7. **Export Data**
   - GDPR compliance
   - Download profile data
   - Export to JSON/PDF

## Performance Considerations

### Database Indexes

- `userId` (unique, for lookups)
- `username` (unique, for availability checks)
- `stats.lastActiveDate` (for activity sorting)

### Caching Strategy (Future)

- Cache profile data in Redis
- Invalidate on updates
- Short TTL (5-10 minutes)

### Query Optimization

- Use `.lean()` for read-only queries
- Limit populated fields
- Project only needed fields

## Testing Recommendations

### Unit Tests

- Validation schemas
- API route handlers
- Service functions

### Integration Tests

- Profile CRUD operations
- Username uniqueness
- Session-based access control

### E2E Tests

- Complete profile setup flow
- Form validation
- Avatar upload
- Account deletion flow

## Deployment Checklist

- [ ] Set up MongoDB indexes
- [ ] Configure environment variables
- [ ] Test avatar upload service
- [ ] Verify OAuth providers
- [ ] Test session management
- [ ] Validate all form inputs
- [ ] Test mobile responsiveness
- [ ] Security audit
- [ ] Performance testing
- [ ] Error monitoring setup

## Support & Maintenance

### Monitoring

- Track API response times
- Monitor error rates
- Log failed validations
- Alert on unusual patterns

### Common Issues

1. **Username conflicts** - Handled with unique index
2. **Session expiry** - Redirect to login
3. **Validation errors** - Show user-friendly messages
4. **Avatar upload failures** - Graceful fallback

## API Reference

See inline JSDoc comments in:

- `/src/app/api/profile/route.js`
- `/src/services/profileService.js`

## Component Props

### ProfileOverview

```typescript
{
  profile: ProfileData,
  onAvatarUpdate: (url: string) => Promise<void>
}
```

### PersonalInfoForm

```typescript
{
  profile: ProfileData,
  onSave: (data: any) => void
}
```

### ProfessionalInfoForm

```typescript
{
  profile: ProfileData,
  onSave: (data: any) => void
}
```

### ActivityStats

```typescript
{
  stats: {
    totalProjectsCompleted: number,
    activeSimulations: number,
    deadlinesMetPercentage: number,
    lastActiveDate: Date
  }
}
```

### SecuritySettings

```typescript
{
  profile: ProfileData;
}
```

### Preferences

```typescript
{
  profile: ProfileData,
  onSave: (data: any) => void
}
```

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Maintainer**: FicLance Engineering Team
