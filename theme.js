// Migrate old appearance choices: this release starts in the subtle light theme.
try { const saved = localStorage.getItem('pushpa-theme-v2'); document.documentElement.dataset.theme = saved === 'dark' ? 'dark' : 'light'; } catch { document.documentElement.dataset.theme = 'light'; }
