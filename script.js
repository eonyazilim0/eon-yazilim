// Sayfa tamamen yüklendiğinde preloader'ı gizle
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => preloader.style.display = "none", 400);
  }
});

// Hamburger menü
const hamburgerBtn = document.getElementById("hamburgerBtn");
const menu = document.getElementById("menu");
if (hamburgerBtn && menu) {
  hamburgerBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

// Tema geçişi
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const html = document.documentElement;
    const isDark = html.getAttribute("data-theme") === "dark";
    html.setAttribute("data-theme", isDark ? "light" : "dark");
    themeToggle.textContent = isDark ? "🌙" : "☀️";
  });
}

// Reveal animasyonları
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  for (const el of reveals) {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 50) {
      el.classList.add("show");
    } else {
      el.classList.remove("show");
    }
  }
}
window.addEventListener("scroll", reveal);
reveal();

// Footer yılı
document.getElementById("y").textContent = new Date().getFullYear();
