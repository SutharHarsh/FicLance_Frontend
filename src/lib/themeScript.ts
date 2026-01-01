/**
 * THEME INITIALIZATION SCRIPT
 * 
 * This runs BEFORE React hydration to prevent flash of wrong theme.
 * Must be inlined in <head> for immediate execution.
 * 
 * CRITICAL: This prevents the white flash on dark mode.
 */
export const themeInitScript = `
(function() {
  try {
    // Get theme from localStorage
    var theme = localStorage.getItem('theme') || 'light';
    
    // Function to get system preference
    function getSystemTheme() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Resolve theme
    var resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
    
    // Apply immediately to prevent flash
    document.documentElement.classList.add(resolvedTheme);
    
    // Also set data attribute for extra safety
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  } catch (e) {
    // Fallback to light theme on error
    document.documentElement.classList.add('light');
  }
})();
`;
