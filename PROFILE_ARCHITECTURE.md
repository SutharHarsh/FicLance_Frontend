# Profile System Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         FICLANCE PROFILE SYSTEM                  │
│                         Production-Ready SaaS                    │
└─────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│                          FRONTEND LAYER                                │
├───────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                    /profile (Main Page)                        │  │
│  │  • Tab-based navigation                                        │  │
│  │  • Protected route (requires auth)                             │  │
│  │  • Server-side session check                                   │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                              ↓                                         │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │ ProfileOverview  │  │ PersonalInfoForm │  │ProfessionalForm  │  │
│  │                  │  │                  │  │                  │  │
│  │ • Avatar         │  │ • Username       │  │ • Tech Stack     │  │
│  │ • Name/Email     │  │ • Bio            │  │ • Career Goal    │  │
│  │ • Badges         │  │ • Skills         │  │ • Availability   │  │
│  │ • Metadata       │  │ • Experience     │  │ • Portfolio      │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  │
│                                                                        │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │ ActivityStats    │  │SecuritySettings  │  │  Preferences     │  │
│  │                  │  │                  │  │                  │  │
│  │ • Projects Done  │  │ • Auth Provider  │  │ • Notifications  │  │
│  │ • Simulations    │  │ • Session Info   │  │ • Theme          │  │
│  │ • Deadlines %    │  │ • Logout         │  │ • Language       │  │
│  │ • Insights       │  │ • Delete Account │  │ • Auto-save      │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘
                                  ↓
                                  ↓ fetch API
                                  ↓
┌───────────────────────────────────────────────────────────────────────┐
│                          HOOKS & SERVICES                              │
├───────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                      useProfile() Hook                          │  │
│  │  • Manages profile state                                        │  │
│  │  • Provides update functions                                    │  │
│  │  • Handles loading/error states                                │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                              ↓                                         │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                   profileService.js                             │  │
│  │  • getProfile()                                                 │  │
│  │  • updateProfile()                                              │  │
│  │  • checkUsernameAvailability()                                  │  │
│  │  • deleteAccount()                                              │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘
                                  ↓
                                  ↓ HTTP Request
                                  ↓
┌───────────────────────────────────────────────────────────────────────┐
│                            API LAYER                                   │
├───────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │               GET /api/profile                                  │  │
│  │  1. getServerSession() → verify auth                            │  │
│  │  2. Find User by session.email                                  │  │
│  │  3. Find/Create Profile by userId                               │  │
│  │  4. Merge & return data                                         │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │               PUT /api/profile                                  │  │
│  │  1. getServerSession() → verify auth                            │  │
│  │  2. Validate request body (Zod)                                 │  │
│  │  3. Find User by session.email                                  │  │
│  │  4. Check username uniqueness                                   │  │
│  │  5. Update Profile (findOneAndUpdate)                           │  │
│  │  6. Return updated data                                         │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │            GET /api/profile/check-username                      │  │
│  │  1. getServerSession() → verify auth                            │  │
│  │  2. Validate username format                                    │  │
│  │  3. Query Profile collection                                    │  │
│  │  4. Return availability status                                  │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │             DELETE /api/profile                                 │  │
│  │  1. getServerSession() → verify auth                            │  │
│  │  2. Verify confirmation phrase                                  │  │
│  │  3. Find User by session.email                                  │  │
│  │  4. Delete Profile document                                     │  │
│  │  5. Delete User document                                        │  │
│  │  6. Cascade delete (TODO: sessions, messages, etc.)            │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘
                                  ↓
                                  ↓ Mongoose
                                  ↓
┌───────────────────────────────────────────────────────────────────────┐
│                         VALIDATION LAYER                               │
├───────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │              profileValidation.js (Zod Schemas)                 │  │
│  │                                                                  │  │
│  │  • personalInfoSchema                                           │  │
│  │    - username: 3-30 chars, alphanumeric + _ -                  │  │
│  │    - bio: max 250 chars                                         │  │
│  │    - skills: array, max 20 items                                │  │
│  │    - experienceLevel: enum                                      │  │
│  │                                                                  │  │
│  │  • professionalInfoSchema                                       │  │
│  │    - preferredTechStack: array, max 15 items                    │  │
│  │    - careerGoal: enum                                           │  │
│  │    - availability: 0-168 hours                                  │  │
│  │    - portfolioLinks: URL validation                             │  │
│  │                                                                  │  │
│  │  • preferencesSchema                                            │  │
│  │    - notifications: booleans                                    │  │
│  │    - theme: enum                                                │  │
│  │    - language: string                                           │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘
                                  ↓
                                  ↓ Validated Data
                                  ↓
┌───────────────────────────────────────────────────────────────────────┐
│                          DATABASE LAYER                                │
├───────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌──────────────────────────┐    ┌──────────────────────────┐        │
│  │    MongoDB Collection    │    │    MongoDB Collection    │        │
│  │         "users"          │    │       "profiles"         │        │
│  ├──────────────────────────┤    ├──────────────────────────┤        │
│  │                          │    │                          │        │
│  │ • _id (ObjectId)         │◄───┤ • userId (ref)          │        │
│  │ • name                   │    │ • username (unique)      │        │
│  │ • email (unique)         │    │ • bio                    │        │
│  │ • emailVerified          │    │ • skills []              │        │
│  │ • image                  │    │ • experienceLevel        │        │
│  │ • roles []               │    │ • preferredTechStack []  │        │
│  │ • createdAt              │    │ • careerGoal             │        │
│  │ • updatedAt              │    │ • availability {}        │        │
│  │                          │    │ • portfolioLinks {}      │        │
│  │ [Auth-focused data]      │    │ • stats {}               │        │
│  │                          │    │ • preferences {}         │        │
│  │                          │    │ • customAvatar           │        │
│  │                          │    │ • createdAt              │        │
│  │                          │    │ • updatedAt              │        │
│  │                          │    │                          │        │
│  │                          │    │ [Profile-focused data]   │        │
│  └──────────────────────────┘    └──────────────────────────┘        │
│                                                                        │
│  Indexes:                                                              │
│  • users: email (unique)                                              │
│  • profiles: userId (unique), username (unique), lastActiveDate       │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│                         SECURITY FLOW                                  │
├───────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  User Request                                                          │
│       ↓                                                                │
│  NextAuth Session                                                      │
│       ↓                                                                │
│  getServerSession(authOptions)                                         │
│       ↓                                                                │
│  ✓ Authenticated? → session.user.email                                │
│       ↓                                                                │
│  Find User by email (never trust client userId)                       │
│       ↓                                                                │
│  Use user._id for all database operations                             │
│       ↓                                                                │
│  Validate input with Zod schemas                                      │
│       ↓                                                                │
│  Execute database operation (scoped to userId)                        │
│       ↓                                                                │
│  Return result (only user's own data)                                 │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│                          DATA FLOW                                     │
├───────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  READ FLOW:                                                            │
│  ──────────                                                            │
│  Component → useProfile() → fetch(GET /api/profile)                   │
│           → API verifies session → Find User → Find/Create Profile    │
│           → Merge data → Return to component → Render UI              │
│                                                                        │
│  WRITE FLOW:                                                           │
│  ───────────                                                           │
│  Form submit → validate client-side → fetch(PUT /api/profile)         │
│           → API verifies session → validate server-side (Zod)         │
│           → Check uniqueness → Update database                        │
│           → Return updated data → Update component state               │
│           → Show success message                                       │
│                                                                        │
│  DELETE FLOW:                                                          │
│  ────────────                                                          │
│  Delete button → Show modal → User types confirmation                 │
│           → fetch(DELETE /api/profile)                                │
│           → API verifies session + confirmation                       │
│           → Delete Profile → Delete User → Cascade deletes            │
│           → Logout → Redirect to home                                 │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│                      KEY SECURITY PRINCIPLES                           │
├───────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ✓ Session-based authentication (NextAuth)                            │
│  ✓ Never trust client-provided userId                                 │
│  ✓ Always derive userId from session.user.email                       │
│  ✓ Server-side validation (Zod schemas)                               │
│  ✓ Client-side validation (UX improvement)                            │
│  ✓ Database-level unique constraints                                  │
│  ✓ Mongoose query sanitization (NoSQL injection prevention)           │
│  ✓ Confirmation flows for destructive actions                         │
│  ✓ CSRF protection (NextAuth built-in)                                │
│  ✓ XSS prevention (React automatic escaping)                          │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│                          SCALABILITY                                   │
├───────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  Current:                          Future Enhancements:                │
│  • MongoDB indexes                 • Redis caching layer              │
│  • Lean queries                    • CDN for avatars                  │
│  • Optimistic UI                   • Database sharding                │
│  • Client-side caching             • Read replicas                    │
│                                    • Rate limiting                     │
│                                    • Queue for async tasks            │
│                                                                        │
│  Performance Targets:                                                  │
│  • Profile load: <200ms                                               │
│  • Profile update: <500ms                                             │
│  • Username check: <300ms                                             │
│  • Supports: 10,000+ concurrent users                                 │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════
                         Built for Production
                         Ready for Scale
                         Secure by Design
═══════════════════════════════════════════════════════════════════════════
