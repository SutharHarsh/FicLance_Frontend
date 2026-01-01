# 🧪 Dark Mode Testing Guide

## Quick Test (30 seconds)

### Step 1: Go to Profile
```
http://localhost:3000/profile
```

### Step 2: Click "Preferences" Tab
Scroll to "Appearance" section

### Step 3: Click "Dark" Button
Watch the ENTIRE page:
- ✅ Background should turn dark blue-gray
- ✅ Cards should become darker
- ✅ Text should become light/white
- ✅ Borders should become subtle gray

### Step 4: Click "Light" Button
Watch the ENTIRE page switch back to light

### Step 5: Refresh Browser (Ctrl+R)
Dark mode should persist (saved in localStorage)

---

## Verification Checklist

### Visual Changes (Dark Mode)

- [ ] Page background is dark (not white)
- [ ] Cards are dark but slightly lighter than background
- [ ] All text is readable light gray/white
- [ ] Borders are subtle but visible
- [ ] Tab navigation styling correct
- [ ] Form inputs have dark background
- [ ] Buttons are clearly visible
- [ ] No white boxes visible on dark background

### Functionality

- [ ] Theme switches instantly (no delay)
- [ ] Theme persists after refresh
- [ ] Light mode still works perfectly
- [ ] System theme option works (if supported)
- [ ] No console errors

### Cross-Browser

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)

---

## Common Issues & Solutions

### Issue: Page background stays white in dark mode

**Cause:** Hardcoded `bg-gray-50` or `bg-white` somewhere

**Check:** Search file for these classes
```bash
grep -r "bg-white\|bg-gray-50" src/
```

**Fix:** Replace with `bg-background`

---

### Issue: Only some cards change color

**Cause:** Mix of hardcoded and semantic colors

**Solution:** Ensure all divs use `bg-card` not `bg-white`

---

### Issue: Text unreadable in dark mode

**Cause:** Still using `text-gray-900` or `text-black`

**Fix:** Replace with `text-foreground` or `text-muted-foreground`

---

### Issue: Dark mode not persisting

**Cause:** localStorage not working

**Check Console:**
```javascript
localStorage.getItem('theme')  // Should return 'dark'
```

---

## Debug Commands

### Check Current Theme Value
```javascript
localStorage.getItem('theme')
// Should output: 'dark', 'light', or 'system'
```

### Check HTML Classes
```javascript
document.documentElement.className
// Should contain: 'dark' or 'light'
```

### Check CSS Variable Values
```javascript
getComputedStyle(document.documentElement).getPropertyValue('--background')
// Light: "0 0% 100%"
// Dark: "224 71% 4%"
```

### Verify Color Applied to Element
```javascript
const card = document.querySelector('.bg-card')
getComputedStyle(card).backgroundColor
// Light: "rgb(255, 255, 255)"
// Dark: "rgb(10, 15, 28)"
```

---

## Expected CSS Values

### Light Mode
```
--background: 0 0% 100%        (rgb 255, 255, 255)  white
--foreground: 222.2 84% 4.9%   (rgb 6, 13, 28)      dark
--card: 0 0% 100%              (rgb 255, 255, 255)  white
--border: 214.3 31.8% 91.4%    (rgb 214, 219, 233)  light gray
--muted-foreground: 215.4 16.3% 46.9%  (rgb 116, 119, 149)  gray
```

### Dark Mode
```
--background: 224 71% 4%       (rgb 7, 10, 18)      very dark
--foreground: 213 31% 91%      (rgb 226, 232, 240)  light gray
--card: 224 71% 6%             (rgb 10, 15, 28)     dark gray
--border: 215 20% 15%          (rgb 41, 51, 76)     subtle gray
--muted-foreground: 217 10% 64%  (rgb 163, 163, 163)  medium gray
```

---

## Files to Test

### Priority 1 (Most Important)
- [ ] `/profile` - All profile tabs
- [ ] `/profile#preferences` - Theme switcher
- [ ] Profile cards and forms

### Priority 2
- [ ] `/dashboard` - Dashboard cards
- [ ] `/chat` - Chat interface
- [ ] Modal dialogs

### Priority 3
- [ ] Home page features
- [ ] Navigation headers
- [ ] Modals & popups

---

## After Testing

### If Everything Works ✅
1. Commit changes
2. Deploy to staging
3. Test on mobile devices
4. Get user feedback

### If Issues Found ❌
1. Check error console
2. Search for hardcoded colors
3. Refer to "Common Issues" section above
4. Replace with semantic tokens

---

## Performance Notes

- No render blocking (theme updates are instant)
- localStorage is synchronous but very fast
- CSS variable updates don't require re-render
- Theme persistence has 0 performance impact

---

**Test Dark Mode Now! 🌙**
