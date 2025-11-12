// preloader
window.addEventListener("load",()=>{const p=document.getElementById("preloader");if(p){p.style.opacity="0";setTimeout(()=>p.style.display="none",400);}});
// hamburger
const h=document.getElementById("hamburgerBtn"), m=document.getElementById("menu");
if(h&&m){h.addEventListener("click",()=>m.classList.toggle("open"));}
// theme
const t=document.getElementById("themeToggle");
if(t){t.addEventListener("click",()=>{const html=document.documentElement;const isDark=html.getAttribute("data-theme")==="dark";html.setAttribute("data-theme",isDark?"light":"dark");t.textContent=isDark?"🌙":"☀️";});}
// reveal
function reveal(){document.querySelectorAll(".reveal").forEach(el=>{const wh=window.innerHeight;const top=el.getBoundingClientRect().top;if(top<wh-50){el.classList.add("show");}});}
window.addEventListener("scroll",reveal);reveal();
// year
document.getElementById("y").textContent=(new Date()).getFullYear();
