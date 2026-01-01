# Complete Theme Update Instructions

## ✅ COMPLETED
- **Theme01_QuietProfessional.jsx** - Fully updated with real data

## 📋 TO UPDATE (12 Themes)

### Universal Changes for ALL Remaining Themes

#### Step 1: Add Imports (After existing imports, before MOCK_DATA)
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

#### Step 2: Replace Function Definition

**FIND:** `export default function ThemeName() {`
**REPLACE WITH:** `export default function ThemeName({ data }) {`

#### Step 3: Replace Data Initialization

**FIND:** `const data = MOCK_DATA;`
**REPLACE WITH:**
```javascript
const user = getUserData(data);
const contact = getContactData(data);
const skills = getSkillsData(data);
const projects = getProjectsData(data);
const stats = getStatsData(data);
const professional = getProfessionalData(data);

// Use real projects if available, otherwise generate samples
const displayProjects = projects.length > 0 ? projects : generateSampleProjects(3);
```

#### Step 4: Delete Entire MOCK_DATA Object
- Delete from `const MOCK_DATA = {` to the closing `};` before the export default line

#### Step 5: Update JSX References Throughout

| Find Pattern | Replace With |
|-------------|--------------|
| `data.user.name` | `user.name` |
| `data.user.email` | `contact.email` |  
| `data.user.role` | `user.role` |
| `data.user.tagline` | `user.tagline` or `user.bio` |
| `data.user.avatar` | `user.avatar` or `getInitials(user.name)` |
| `data.user.location` | `user.location` |
| `data.user.yearsExperience` | `stats.experienceYears` |
| `data.user.linkedin` | `contact.linkedin` |
| `data.user.github` | `contact.github` |
| `data.user.website` | `contact.website` |
| `data.projects` | `displayProjects` |
| `data.projects.map` | `displayProjects.map` |
| `data.skills` | `skills.all` or `skills.primary` |
| `data.skills.expert` | `skills.primary` |
| `data.skills.proficient` | `skills.all` |
| `data.experience` | `displayProjects` (repurpose as experience) |
| `data.about.summary` | `user.bio` |
| `data.stats.` | `stats.` |

#### Step 6: Add Conditional Rendering

**For Projects Section:**
```javascript
{displayProjects.length > 0 ? (
  displayProjects.map((project, idx) => (
    // existing project JSX
  ))
) : (
  <div className="text-center py-12 text-gray-500">
    <p>No projects to display yet.</p>
  </div>
)}
```

**For Skills Section:**
```javascript
{skills.all && skills.all.length > 0 ? (
  skills.all.map((skill, idx) => (
    // existing skill JSX
  ))
) : (
  <div className="text-center py-12 text-gray-500">
    <p>No skills listed yet.</p>
  </div>
)}
```

### Theme-Specific Notes:

**Theme02_ModernMagazine.jsx:**
- Hero stats: Use `stats.experienceYears`, `stats.totalProjects`
- About values: Convert to using `skills.primary` array
- Showcase: Use `displayProjects`
- Replace `data.hero.statement` with `user.bio`

**Theme03_PureMinimalism.jsx:**
- Ultra minimal design - focus on name, role, bio
- Projects section: Use `displayProjects.slice(0, 4)`
- Skills: Use `skills.primary.slice(0, 5)`

**Theme04_BentoIntelligence.jsx:**
- Bento grid cards: Use stats for metric cards
- Projects in bento blocks: `displayProjects.slice(0, 6)`
- Skills grid: Split `skills.all` into categories

**Theme05_EditorialNarrative.jsx:**
- Story-driven layout - use `user.bio` prominently
- Timeline: Use `displayProjects` as timeline events
- Chapter sections: Map to different data sections

**Theme06_CreativeStudio.jsx:**
- Portfolio focus: `displayProjects` as main content
- Creative stats: Use `stats` object
- Skills showcase: `skills.techStack` and `skills.primary`

**Theme07_TheJourney.jsx:**
- Interactive chapters - map chapters to:
  - Chapter 1: User info (`user`, `professional`)
  - Chapter 2: Skills (`skills`)
  - Chapter 3: Projects (`displayProjects`)
  - Chapter 4: Contact (`contact`)

**Theme08_ProofOfWork.jsx:**
- Case study format: Each `displayProject` as detailed case study
- Metrics: Use `project.progress`, `project.status`
- Tech stack: Use `project.tags` or `skills.techStack`

**Theme09_TechShowcase.jsx:**
- Technical focus: Emphasize `skills.techStack`
- Project details: Show `project.tags`, `project.progress`
- Stats dashboard: Use all `stats` properties

**Theme10_UltraModern.jsx:**
- Gradient heavy design - keep visual style
- Data cards: Use `stats` for animated numbers
- Project showcase: `displayProjects.map()`

**Theme11_CorporateExecutive.jsx:**
- Professional tone - use `professional` object
- Experience: `displayProjects` as work experience
- Skills: `skills.all` in professional categories

**Theme12_ArtisticSoul.jsx:**
- Creative expression - use `user.bio` for artistic statement
- Portfolio gallery: `displayProjects` as art pieces
- Color palette: Based on `user.tagline` or skills

**Theme13_StartupFounder.jsx:**
- Metrics focused: Emphasize `stats` prominently
- Growth story: `user.bio` and `professional.careerGoal`
- Projects: `displayProjects` as product launches

### Data Mapping Reference

```javascript
// What's available from helpers:

user = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://...",
  role: "Software Engineer",
  bio: "Full bio text...",
  tagline: "Short tagline",
  location: "San Francisco, CA",
  experienceLevel: "Senior",
  yearsOfExperience: 5
}

contact = {
  email: "john@example.com",
  phone: "+1234567890",
  website: "https://...",
  github: "https://github.com/...",
  linkedin: "https://linkedin.com/in/..."
}

skills = {
  primary: ["JavaScript", "React", "Node.js"],
  all: ["JavaScript", "React", "Node.js", "Python", "AWS"],
  techStack: ["React", "Next.js", "PostgreSQL"],
  experienceLevel: "Senior"
}

projects = [
  {
    id: "123",
    title: "Project Name",
    description: "Description...",
    status: "completed",
    priority: "high",
    progress: 85,
    createdAt: Date,
    tags: ["React", "Node.js"]
  }
]

stats = {
  totalProjects: 15,
  completedProjects: 10,
  activeProjects: 5,
  skillsCount: 20,
  experienceYears: 5
}

professional = {
  availability: "Available for hire",
  careerGoal: "Build impactful products",
  currentRole: "Senior Engineer",
  company: "Tech Corp",
  yearsExperience: 5
}
```

### Helper Functions Available

```javascript
formatDate(date) // Returns "Jan 2024"
getStatusColor(status) // Returns Tailwind color class
getInitials(name) // Returns "JD" from "John Doe"
generateSampleProjects(count) // Returns sample projects if user has none
```

### Testing Each Theme After Update

1. Import the theme in v2/page.jsx
2. Pass data prop: `<ThemeName data={portfolioData} />`
3. Check browser for:
   - [ ] No console errors
   - [ ] All data displays correctly
   - [ ] Fallbacks work when data is empty
   - [ ] Links work (GitHub, LinkedIn)
   - [ ] Responsive on mobile
   - [ ] No "undefined" or "[object Object]" text

### Priority Order for Updates

1. **HIGH**: Themes 02, 03, 04 (commonly used)
2. **MEDIUM**: Themes 05, 06, 07, 08
3. **LOW**: Themes 09, 10, 11, 12, 13 (newer themes)

---

## Quick Command Reference

### Find MOCK_DATA blocks:
```bash
# Search for MOCK_DATA in all themes
grep -n "const MOCK_DATA" Theme*.jsx
```

### Verify all imports added:
```bash
# Check for portfolioHelpers import
grep -n "portfolioHelpers" Theme*.jsx
```

### Check data prop acceptance:
```bash
# Look for function signature
grep -n "export default function" Theme*.jsx
```

---

## VERIFICATION CHECKLIST

After completing ALL theme updates:

- [ ] All 13 themes import portfolioHelpers
- [ ] All 13 themes accept `{ data }` prop
- [ ] All 13 themes use extracted data variables
- [ ] No MOCK_DATA remains in any file
- [ ] All themes have conditional rendering for empty states
- [ ] Tested each theme with real user data
- [ ] Tested each theme with empty/minimal data
- [ ] No console warnings or errors
- [ ] Mobile responsive check on all themes
- [ ] Theme picker works smoothly
- [ ] V2 page correctly passes data to all themes

---

## DONE! 🎉

When all themes are updated, the portfolio system will be fully dynamic, pulling real user data from the database through the AuthContext and API endpoints!
