# 🎨 Profile UI - CSS Classes & Design System Reference

## Color Palette

### Primary Colors
```css
/* Actions, Links, Highlights */
bg-primary          /* Blue background */
text-primary        /* Blue text */
border-primary      /* Blue border */
ring-primary        /* Blue focus ring */
hover:bg-blue-700   /* Darker blue on hover */
```

### Neutral Colors
```css
/* Dark mode aware */
bg-card              /* Card background (white/dark gray) */
bg-secondary         /* Input background (light gray/dark) */
bg-background        /* Page background */
text-foreground      /* Main text (dark/light) */
text-muted-foreground /* Secondary text (gray) */
border-border        /* Border color (subtle) */
```

### Status Colors
```css
/* Success */
bg-green-50 / dark:bg-green-950
text-green-700 / dark:text-green-400
bg-green-500 (progress bars)

/* Error */
bg-red-50 / dark:bg-red-950
text-red-600 / dark:text-red-400
text-red-500 (validation)

/* Warning */
bg-amber-50 / dark:bg-amber-950
text-amber-500 / dark:text-amber-400

/* Info */
bg-blue-50 / dark:bg-blue-950
text-blue-700 / dark:text-blue-400
```

---

## Typography Classes

### Headings
```css
/* Page title */
text-3xl font-bold text-foreground tracking-tight

/* Section heading */
text-2xl font-bold text-foreground

/* Subsection heading */
text-xl font-semibold text-foreground

/* Card header */
text-lg font-semibold text-foreground

/* Form label */
text-sm font-semibold text-foreground

/* Help text */
text-xs font-medium text-muted-foreground
```

### Body Text
```css
/* Main text */
text-base text-foreground

/* Secondary text */
text-sm text-muted-foreground

/* Small text/helper */
text-xs text-muted-foreground

/* Emphasized */
font-medium

/* Strong */
font-bold
```

---

## Spacing Classes

### Padding
```css
p-8       /* 32px - Card padding */
px-4 py-3 /* Input padding */
px-6 py-3 /* Button padding */
p-4       /* Container padding */
p-2       /* Icon padding */
```

### Margins
```css
mb-8      /* 32px margin bottom */
mb-4      /* 16px margin bottom */
mb-2      /* 8px margin bottom */
mt-2      /* 8px margin top */
mt-4      /* 16px margin top */
mt-6      /* 24px margin top */
```

### Gaps
```css
space-y-8 /* 32px vertical gap */
space-y-6 /* 24px vertical gap */
space-y-4 /* 16px vertical gap */
space-y-2 /* 8px vertical gap */
gap-2     /* 8px gap (flex) */
gap-4     /* 16px gap (flex) */
```

---

## Component Classes

### Cards
```css
bg-card rounded-xl border border-border p-8
```

### Form Inputs
```css
/* Text input */
px-4 py-3 bg-secondary border border-border rounded-lg
focus:ring-2 focus:ring-primary focus:border-primary
transition-all

/* Invalid state */
border-red-500 ring-2 ring-red-200

/* Select dropdown */
px-4 py-3 bg-secondary border border-border rounded-lg
```

### Buttons
```css
/* Primary Button */
px-6 py-3 bg-primary text-white rounded-lg
hover:bg-blue-700 transition-colors
font-medium text-sm

/* Secondary Button */
px-6 py-3 bg-secondary border border-border text-foreground
rounded-lg hover:bg-secondary/80 transition-colors
font-medium text-sm

/* Disabled */
disabled:opacity-50 disabled:cursor-not-allowed
```

### Toggle/Checkbox
```css
/* Toggle when enabled */
relative inline-flex h-7 w-12 flex-shrink-0
items-center rounded-full bg-green-500 transition-colors

/* Toggle when disabled */
bg-gray-400

/* Toggle track */
inline-block h-5 w-5 transform rounded-full bg-white
transition-transform translate-x-6 (when enabled)
translate-x-1 (when disabled)
```

### Badges
```css
/* Status badge */
inline-flex items-center gap-1 px-3 py-1.5 rounded-full
text-xs font-medium bg-[color]-50 text-[color]-700
border border-[color]-200

/* Skill pill */
inline-flex items-center gap-2 px-3 py-1.5
bg-primary/10 border border-primary/20 text-primary
rounded-full text-sm font-medium
hover:bg-primary/20 transition-colors
```

### Progress Bar
```css
/* Container */
w-full bg-secondary rounded-full h-3

/* Fill */
bg-green-500 h-3 rounded-full
transition-all duration-500
```

### Loading Spinner
```css
w-12 h-12 border-3 border-primary border-t-transparent
rounded-full animate-spin

/* Small variant */
w-6 h-6 border-2 border-primary border-t-transparent
rounded-full animate-spin
```

---

## Layout Classes

### Grid
```css
/* Stat cards */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4

/* Project grid */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4

/* Settings */
grid grid-cols-3 gap-4
```

### Flexbox
```css
/* Horizontal centering */
flex items-center gap-2

/* Vertical spacing */
flex flex-col gap-4

/* Space between */
flex items-center justify-between

/* Wrapping */
flex flex-wrap gap-2
```

### Alignment
```css
items-start
items-center
items-end
justify-start
justify-center
justify-between
```

---

## Interactive States

### Hover
```css
hover:bg-secondary/80
hover:text-primary
hover:shadow-md
hover:border-primary/50
hover:bg-primary/20
transition-all
```

### Focus
```css
focus:ring-2 focus:ring-primary
focus:border-primary
focus:outline-none
transition-all
```

### Active/Selected
```css
bg-primary/5
border-primary
text-primary
```

### Disabled
```css
disabled:opacity-50
disabled:cursor-not-allowed
opacity-60
pointer-events-none
```

---

## Responsive Classes

### Breakpoints
```css
/* Mobile first */
sm:   /* 640px */
md:   /* 768px */
lg:   /* 1024px */
xl:   /* 1280px */
2xl:  /* 1536px */
```

### Common Patterns
```css
/* Hidden on mobile */
hidden sm:inline
hidden md:flex

/* Full width on mobile, constrained on desktop */
w-full md:w-1/2 lg:w-1/3

/* Stack on mobile, grid on desktop */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3

/* Hide text on mobile */
<Icon /> <span className="hidden sm:inline">Label</span>
```

---

## Animation Classes

### Transitions
```css
transition-colors      /* Color changes */
transition-all         /* All properties */
transition-transform   /* Transform changes */
duration-300           /* 300ms duration */
duration-500           /* 500ms duration */
```

### Animations
```css
animate-spin           /* Loading spinner */
animate-pulse          /* Pulsing effect */
animate-bounce         /* Bouncing effect */
```

---

## Dark Mode

### Implementation
```css
/* In light mode: normal styling */
bg-card

/* In dark mode: darker variant */
dark:bg-slate-950

/* Text that inverts */
text-foreground
dark:text-white

/* Full dark variant */
bg-gray-100 dark:bg-gray-900
text-gray-700 dark:text-gray-300
```

### Common Dark Variants
```css
bg-card              /* Auto handles dark mode */
text-foreground      /* Auto handles dark mode */
border-border        /* Auto handles dark mode */
bg-secondary dark:bg-gray-800
text-muted-foreground dark:text-gray-400
```

---

## Icon Integration (Lucide)

### Icon Sizing
```jsx
<Icon size={14} />  /* Small - labels */
<Icon size={16} />  /* Regular - form inputs */
<Icon size={18} />  /* Medium - tab icons */
<Icon size={20} />  /* Large - stat cards */
<Icon size={24} />  /* Extra large - section headers */
<Icon size={32} />  /* Huge - empty states */
```

### Icon Styling
```jsx
<Icon className="text-primary" />
<Icon className="text-muted-foreground" />
<Icon className="text-red-500" />
<Icon className="animate-spin" />
```

---

## Common Component Patterns

### Form Group
```jsx
<div className="space-y-2">
  <label className="text-sm font-semibold text-foreground">
    Label
  </label>
  <p className="text-xs text-muted-foreground">Helper text</p>
  <input className="..." />
  {error && <p className="text-red-500 text-sm">{error}</p>}
</div>
```

### Card Section
```jsx
<div className="pb-8 border-b border-border">
  <h3 className="text-sm font-semibold text-foreground mb-4">
    Section Title
  </h3>
  {/* Content */}
</div>
```

### Button Group
```jsx
<div className="flex items-center justify-between pt-8 border-t border-border">
  <div>{/* Status message */}</div>
  <button className="...">Action</button>
</div>
```

### Empty State
```jsx
<div className="text-center py-16">
  <Icon className="mx-auto mb-4" size={48} />
  <h3 className="text-lg font-semibold text-foreground mb-2">
    Title
  </h3>
  <p className="text-muted-foreground mb-6">Description</p>
  <a href="#" className="inline-flex items-center gap-2 ...">
    CTA
  </a>
</div>
```

---

## Variable Reference

### CSS Variables
```css
/* Primary color */
--primary: #0066FF

/* Used in tailwind config */
primary: 'rgb(var(--primary))'
```

---

## Testing Checklist

- [ ] Light mode colors correct
- [ ] Dark mode colors correct
- [ ] Hover states visible
- [ ] Focus states visible
- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop layout correct
- [ ] Animations smooth
- [ ] Icons render properly
- [ ] Spacing looks balanced
- [ ] Text readable on all backgrounds
- [ ] Form inputs accessible
- [ ] Buttons have proper padding
- [ ] Empty states display correctly
- [ ] Loading states visible

---

## Quick Copy-Paste Classes

### Card Container
```css
bg-card rounded-xl border border-border p-8
```

### Input Field
```css
px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all
```

### Primary Button
```css
px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm
```

### Section Header
```css
text-2xl font-bold text-foreground mb-8
```

### Form Group Container
```css
space-y-2
```

### Form Label
```css
text-sm font-semibold text-foreground
```

### Helper Text
```css
text-xs text-muted-foreground
```

### Error Message
```css
text-red-500 text-sm mt-1
```

---

**Last Updated**: December 16, 2025  
**Version**: 2.0
