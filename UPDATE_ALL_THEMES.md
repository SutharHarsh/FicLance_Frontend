# Batch Theme Update Guide

## STATUS: Theme01 ✅ COMPLETE

All remaining themes (02-13) need the same updates. Follow this pattern for each:

## Update Pattern for Each Theme

### 1. Add Imports (Top of file, after existing imports)
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

### 2. Change Function Signature
**FROM:**
```javascript
export default function ThemeName() {
  const data = MOCK_DATA;
```

**TO:**
```javascript
export default function ThemeName({ data }) {
  const user = getUserData(data);
  const contact = getContactData(data);
  const skills = getSkillsData(data);
  const projects = getProjectsData(data);
  const stats = getStatsData(data);
  const professional = getProfessionalData(data);
  
  const displayProjects = projects.length > 0 ? projects.slice(0, 3) : generateSampleProjects(3);
```

### 3. Delete Entire MOCK_DATA Object
Remove all lines of MOCK_DATA declaration (usually 50-150 lines)

### 4. Update JSX References

| Old Reference | New Reference |
|--------------|---------------|
| `data.user.name` | `user.name` |
| `data.user.email` | `contact.email` |
| `data.user.role` | `user.role` |
| `data.user.tagline` | `user.tagline` |
| `data.user.bio` | `user.bio` |
| `data.user.location` | `user.location` |
| `data.user.yearsExperience` | `stats.experienceYears` |
| `data.user.avatar` | `user.avatar` |
| `data.projects` | `displayProjects` |
| `data.skills` | `skills.all` or `skills.primary` |
| `data.contact.*` | `contact.*` |
| `data.stats.*` | `stats.*` |

### 5. Add Conditional Rendering
Wrap sections that depend on data with checks:

```javascript
{displayProjects.length > 0 ? (
  // Your project rendering
) : (
  <div className="text-center py-12 text-gray-500">
    <p>No projects to display yet.</p>
  </div>
)}
```

```javascript
{skills.all && skills.all.length > 0 ? (
  // Your skills rendering
) : (
  <div className="text-center py-12 text-gray-500">
    <p>No skills listed yet.</p>
  </div>
)}
```

## Themes Remaining to Update

- [ ] Theme02_ModernMagazine.jsx
- [ ] Theme03_PureMinimalism.jsx
- [ ] Theme04_BentoIntelligence.jsx
- [ ] Theme05_EditorialNarrative.jsx
- [ ] Theme06_CreativeStudio.jsx
- [ ] Theme07_TheJourney.jsx
- [ ] Theme08_ProofOfWork.jsx
- [ ] Theme09_TechShowcase.jsx
- [ ] Theme10_UltraModern.jsx
- [ ] Theme11_CorporateExecutive.jsx
- [ ] Theme12_ArtisticSoul.jsx
- [ ] Theme13_StartupFounder.jsx

## Quick Reference: Data Structure

```javascript
// Available from helpers:
user = {
  name: string,
  email: string,
  avatar: string,
  role: string,
  bio: string,
  tagline: string,
  location: string,
  experienceLevel: string,
  yearsOfExperience: number
}

contact = {
  email: string,
  phone: string,
  website: string,
  github: string,
  linkedin: string
}

skills = {
  primary: string[],
  all: string[],
  techStack: string[],
  experienceLevel: string
}

projects = [{
  id: string,
  title: string,
  description: string,
  status: string,
  priority: string,
  progress: number,
  createdAt: Date,
  tags: string[]
}]

stats = {
  totalProjects: number,
  completedProjects: number,
  activeProjects: number,
  skillsCount: number,
  experienceYears: number
}

professional = {
  availability: string,
  careerGoal: string,
  currentRole: string,
  company: string,
  yearsExperience: number
}
```

## Testing Checklist (After All Updates)

- [ ] All themes accept `data` prop
- [ ] No MOCK_DATA remains in any theme
- [ ] All themes render with real user data
- [ ] Fallback UI shows when data is empty
- [ ] No console errors
- [ ] Theme picker still works
- [ ] Mobile responsive
- [ ] Loading states work
