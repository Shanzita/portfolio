// Theme toggle (persisted, respects system pref on first load)
const root = document.documentElement;
const stored = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (stored === 'dark' || (!stored && prefersDark)) {
  root.setAttribute('data-theme', 'dark');
}

document.getElementById('themeToggle').addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  if (isDark) {
    root.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    root.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Subtle fade-in on scroll
const targets = document.querySelectorAll('.entry, .proj, .edu, .honors, .tools > div');
targets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

targets.forEach(el => io.observe(el));
