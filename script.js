document.getElementById('y').textContent = new Date().getFullYear();
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => { const t = document.querySelector(a.getAttribute('href')); if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }});
});
const io = new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target);} }); },{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme'); if (savedTheme) html.setAttribute('data-theme', savedTheme);
const themeBtn = document.getElementById('themeToggle'); const applyIcon = () => themeBtn.textContent = html.getAttribute('data-theme') === 'light' ? '🌙' : '☀️'; applyIcon();
themeBtn.addEventListener('click', () => { const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light'; html.setAttribute('data-theme', next); localStorage.setItem('theme', next); applyIcon(); });
const menu = document.getElementById('menu'); document.getElementById('hamburgerBtn').addEventListener('click', ()=>{ menu.classList.toggle('open'); });
const form = document.getElementById('contactForm'); form.addEventListener('submit', (e)=>{ const action = form.getAttribute('action'); if (!action || action.includes('your-id')) { e.preventDefault(); const name = form.querySelector('input[name="name"]').value; const email = form.querySelector('input[name="email"]').value; const msg = form.querySelector('textarea[name="message"]').value; const mailto = `mailto:eonyazilim0@gmail.com?subject=İletişim%20Formu%20-%20${encodeURIComponent(name)}&body=${encodeURIComponent(msg)}%0A%0AGönderen:%20${encodeURIComponent(email)}`; window.location.href = mailto; }});
window.addEventListener('load', ()=>{ const pre = document.getElementById('preloader'); pre.style.opacity = '0'; setTimeout(()=> pre.style.display = 'none', 300); });
