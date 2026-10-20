// Apply a saved preference before painting. A fresh visit defaults to light.
try { const saved = localStorage.getItem('pushpa-theme'); document.documentElement.dataset.theme = saved === 'dark' ? 'dark' : 'light'; } catch { document.documentElement.dataset.theme = 'light'; }
