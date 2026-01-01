# VISUAL GUIDE: Updating Themes from Mock Data to Real Data

## 🎯 Quick Reference: Theme Update Pattern

### BEFORE (Mock Data):
```javascript
"use client";
import React from "react";
import { Sparkles, Code } from "lucide-react";

const MOCK_DATA = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    role: "Software Engineer",
    tagline: "Building amazing things",
    yearsExperience: 5,
  },
  projects: [
    { title: "Project 1", description: "Cool project" },
    { title: "Project 2", description: "Another project" },
  ],
  skills: ["JavaScript", "React", "Node.js"],
};

export default function MyTheme() {
  const data = MOCK_DATA;
  
  return (
    <div>
      <h1>{data.user.name}</h1>
      <p>{data.user.tagline}</p>
      <p>{data.user.yearsExperience} years</p>
      
      {data.projects.map((project, idx) => (
        <div key={idx}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}
      
      {data.skills.map((skill, idx) => (
        <span key={idx}>{skill}</span>
      ))}
    </div>
  );
}
```

### AFTER (Real Data):
```javascript
"use client";
import React from "react";
import { Sparkles, Code } from "lucide-react";
import {
  getUserData,
  getContactData,
  getSkillsData,
  getProjectsData,
  getStatsData,
  getProfessionalData,
  formatDate,
  getStatusColor,
  getInitials,
  generateSampleProjects
} from '../../utils/portfolioHelpers';

export default function MyTheme({ data }) {
  const user = getUserData(data);
  const contact = getContactData(data);
  const skills = getSkillsData(data);
  const projects = getProjectsData(data);
  const stats = getStatsData(data);
  const professional = getProfessionalData(data);
  
  const displayProjects = projects.length > 0 ? projects : generateSampleProjects(2);
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.tagline || user.bio}</p>
      <p>{stats.experienceYears} years</p>
      
      {displayProjects.length > 0 ? (
        displayProjects.map((project, idx) => (
          <div key={project.id || idx}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <span className={getStatusColor(project.status)}>
              {project.status}
            </span>
          </div>
        ))
      ) : (
        <p>No projects yet</p>
      )}
      
      {skills.all && skills.all.length > 0 ? (
        skills.all.map((skill, idx) => (
          <span key={idx}>{skill}</span>
        ))
      ) : (
        <p>No skills listed</p>
      )}
    </div>
  );
}
```

---

## 📋 STEP-BY-STEP TRANSFORMATION

### Step 1: Add Imports ➕

**Add this block AFTER existing imports:**
```javascript
import {
  getUserData,
  getContactData,
  getSkillsData,
  getProjectsData,
  getStatsData,
  getProfessionalData,
  formatDate,
  getStatusColor,
  getInitials,
  generateSampleProjects
} from '../../utils/portfolioHelpers';
```

### Step 2: Change Function Signature 🔄

**FIND:**
```javascript
export default function ThemeName() {
```

**REPLACE WITH:**
```javascript
export default function ThemeName({ data }) {
```

### Step 3: Replace Data Initialization 🔄

**FIND:**
```javascript
const data = MOCK_DATA;
```

**REPLACE WITH:**
```javascript
const user = getUserData(data);
const contact = getContactData(data);
const skills = getSkillsData(data);
const projects = getProjectsData(data);
const stats = getStatsData(data);
const professional = getProfessionalData(data);

const displayProjects = projects.length > 0 ? projects : generateSampleProjects(3);
```

### Step 4: Delete MOCK_DATA ❌

**DELETE EVERYTHING BETWEEN (including these lines):**
```javascript
const MOCK_DATA = {
  // ... hundreds of lines ...
};
```

### Step 5: Update JSX References 🔄

#### User Information:
```javascript
// BEFORE → AFTER
data.user.name                → user.name
data.user.email               → contact.email
data.user.role                → user.role
data.user.tagline             → user.tagline || user.bio
data.user.avatar              → user.avatar || getInitials(user.name)
data.user.location            → user.location
data.user.bio                 → user.bio
data.user.yearsExperience     → stats.experienceYears
data.user.experienceLevel     → skills.experienceLevel
```

#### Contact Information:
```javascript
// BEFORE → AFTER
data.user.email               → contact.email
data.user.phone               → contact.phone
data.user.website             → contact.website
data.user.linkedin            → contact.linkedin
data.user.github              → contact.github
data.contact.email            → contact.email
data.contact.linkedin         → contact.linkedin
```

#### Projects:
```javascript
// BEFORE → AFTER
data.projects                 → displayProjects
data.projects.map(...)        → displayProjects.map(...)
data.showcase                 → displayProjects
data.experience               → displayProjects (repurpose as work experience)
project.year                  → formatDate(project.createdAt)
project.metrics               → project.progress + "%"
project.technologies          → project.tags
```

#### Skills:
```javascript
// BEFORE → AFTER
data.skills                   → skills.all
data.skills.expert            → skills.primary
data.skills.proficient        → skills.all
data.skills.learning          → skills.techStack
data.skills.map(...)          → skills.all.map(...)
```

#### Stats:
```javascript
// BEFORE → AFTER
data.stats.projects           → stats.totalProjects
data.stats.clients            → stats.completedProjects
data.stats.experience         → stats.experienceYears
data.user.yearsExperience     → stats.experienceYears
```

### Step 6: Add Conditional Rendering ✅

**For Projects Section:**

**BEFORE:**
```javascript
{data.projects.map((project, idx) => (
  <div key={idx}>
    <h3>{project.title}</h3>
  </div>
))}
```

**AFTER:**
```javascript
{displayProjects.length > 0 ? (
  displayProjects.map((project, idx) => (
    <div key={project.id || idx}>
      <h3>{project.title}</h3>
      <p className={getStatusColor(project.status)}>
        {project.status}
      </p>
      <div className="progress">
        {project.progress}% Complete
      </div>
    </div>
  ))
) : (
  <div className="text-center py-12 text-gray-500">
    <p>No projects to display yet.</p>
  </div>
)}
```

**For Skills Section:**

**BEFORE:**
```javascript
{data.skills.map((skill, idx) => (
  <span key={idx}>{skill}</span>
))}
```

**AFTER:**
```javascript
{skills.all && skills.all.length > 0 ? (
  skills.all.map((skill, idx) => (
    <span key={idx}>{skill}</span>
  ))
) : (
  <div className="text-center py-12 text-gray-500">
    <p>No skills listed yet.</p>
  </div>
)}
```

---

## 🔍 COMMON PATTERNS

### Pattern 1: Name Display
```javascript
// BEFORE
<h1>{data.user.name}</h1>

// AFTER
<h1>{user.name}</h1>
```

### Pattern 2: Avatar/Initials
```javascript
// BEFORE
<div>{data.user.avatar}</div>

// AFTER
<div>{user.avatar || getInitials(user.name)}</div>
```

### Pattern 3: Bio/Tagline
```javascript
// BEFORE
<p>{data.user.tagline}</p>

// AFTER
<p>{user.tagline || user.bio || 'Passionate software engineer'}</p>
```

### Pattern 4: Experience Years
```javascript
// BEFORE
<span>{data.user.yearsExperience}+ years</span>

// AFTER
<span>{stats.experienceYears}+ years</span>
```

### Pattern 5: Project List
```javascript
// BEFORE
{data.projects.map((project, idx) => (
  <div key={idx}>
    <h3>{project.title}</h3>
    <p>{project.year}</p>
  </div>
))}

// AFTER
{displayProjects.map((project, idx) => (
  <div key={project.id || idx}>
    <h3>{project.title}</h3>
    <p>{formatDate(project.createdAt)}</p>
    <span className={getStatusColor(project.status)}>
      {project.status}
    </span>
  </div>
))}
```

### Pattern 6: Skills List
```javascript
// BEFORE
{data.skills.expert.map((skill, idx) => (
  <span key={idx}>{skill}</span>
))}

// AFTER
{skills.primary.map((skill, idx) => (
  <span key={idx}>{skill}</span>
))}
```

### Pattern 7: Contact Links
```javascript
// BEFORE
<a href={`https://${data.user.linkedin}`}>
  <Linkedin />
</a>

// AFTER
{contact.linkedin && (
  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
    <Linkedin />
  </a>
)}
```

### Pattern 8: Stats/Metrics
```javascript
// BEFORE
<div>
  <span>{data.stats.totalProjects}</span>
  <span>Projects</span>
</div>

// AFTER
<div>
  <span>{stats.totalProjects}</span>
  <span>Projects</span>
</div>
```

---

## ⚠️ COMMON MISTAKES TO AVOID

### ❌ DON'T:
```javascript
// Don't access data directly
{data.user.name}  ❌

// Don't assume data exists
{projects.map(...)}  ❌

// Don't use old mock data structure
{data.about.values.map(...)}  ❌

// Don't forget key props
.map((item, idx) => <div>{item}</div>)  ❌
```

### ✅ DO:
```javascript
// Use extracted variables
{user.name}  ✅

// Check arrays before mapping
{projects.length > 0 && projects.map(...)}  ✅

// Use new data structure
{skills.primary.map(...)}  ✅

// Always add keys
.map((item, idx) => <div key={item.id || idx}>{item}</div>)  ✅
```

---

## 📊 DATA STRUCTURE MAPPING

### Theme Mock Data → Real Data Mapping

| Theme Mock Data | Real Data Source |
|----------------|------------------|
| `data.user.name` | `user.name` |
| `data.user.email` | `contact.email` |
| `data.user.role` | `user.role` |
| `data.user.tagline` | `user.tagline` or `user.bio` |
| `data.user.avatar` | `user.avatar` or `getInitials(user.name)` |
| `data.user.yearsExperience` | `stats.experienceYears` |
| `data.projects` | `displayProjects` |
| `data.skills` | `skills.all` or `skills.primary` |
| `data.about.summary` | `user.bio` |
| `data.about.highlights` | `skills.primary` |
| `data.experience` | `displayProjects` (repurpose) |
| `data.showcase` | `displayProjects` |
| `data.stats.*` | `stats.*` |
| `data.contact.*` | `contact.*` |

---

## 🎨 THEME-SPECIFIC NOTES

### Theme02 (Modern Magazine):
```javascript
// BEFORE
{data.hero.stats.map(...)}
{data.about.values.map(...)}
{data.showcase.map(...)}

// AFTER
{heroStats.map(...)}  // Create heroStats from stats
{skills.primary.slice(0, 4).map(...)}  // Use first 4 skills
{displayProjects.map(...)}  // Use real projects
```

### Theme04 (Bento Grid):
```javascript
// BEFORE
{data.bento.cards.map(...)}

// AFTER
// Create bento cards from real data
const bentoCards = [
  { type: 'stat', value: stats.totalProjects, label: 'Projects' },
  { type: 'skill', items: skills.primary },
  { type: 'project', data: displayProjects[0] },
  // ...
];
```

### Theme07 (The Journey - Chapters):
```javascript
// BEFORE
{data.chapters.map(...)}

// AFTER
const chapters = [
  { title: 'About Me', data: user },
  { title: 'My Skills', data: skills },
  { title: 'My Projects', data: displayProjects },
  { title: 'Contact', data: contact },
];
```

---

## ✅ VERIFICATION CHECKLIST

After updating each theme:

- [ ] All imports added
- [ ] Function accepts `{ data }` prop
- [ ] Data extracted using helper functions
- [ ] MOCK_DATA completely removed
- [ ] No `data.user.*` references remain
- [ ] No `data.projects.*` references remain
- [ ] No `data.skills.*` references remain
- [ ] Conditional rendering for empty states
- [ ] Keys added to all `.map()` iterations
- [ ] No console errors
- [ ] Theme displays correctly in browser
- [ ] Real user data shows when logged in
- [ ] Fallback data shows for new users
- [ ] Links work (GitHub, LinkedIn, etc.)

---

## 🚀 QUICK WINS

### Fastest Way to Update a Theme:

1. **Open theme file**
2. **Add imports** (copy from Theme01)
3. **Change function signature** to `({ data })`
4. **Add data extraction** (copy from Theme01)
5. **Delete MOCK_DATA**
6. **Find/Replace:**
   - `data.user.name` → `user.name`
   - `data.user.email` → `contact.email`
   - `data.projects` → `displayProjects`
   - `data.skills` → `skills.all`
7. **Add conditional checks**
8. **Save and test**

**Time per theme: ~30 minutes**

---

## 💡 PRO TIPS

1. **Use Theme01 as copy-paste source** - The imports and data extraction are identical for all themes
2. **Test frequently** - Don't update multiple themes before testing
3. **Watch browser console** - Errors will tell you what's wrong
4. **Keep the design** - Only change data source, not styling
5. **Use fallbacks** - Always provide default values
6. **Check arrays** - Make sure you're calling `.map()` on arrays

---

## 🎯 SUCCESS CRITERIA

Your theme update is successful when:

✅ No console errors
✅ Real user name, email, role display
✅ Real projects from dashboard appear
✅ Real skills from profile display
✅ Contact links work
✅ Theme switches smoothly
✅ Loading state works
✅ Empty state shows when no data
✅ Mobile responsive
✅ No "undefined" text anywhere

---

**YOU'RE ALL SET! Use this guide to update the remaining 12 themes. Theme01 is your working reference. Good luck! 🚀**
