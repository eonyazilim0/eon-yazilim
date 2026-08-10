/**
 * Eon Yazılım - Interactive Features
 * Author: Antigravity AI
 * Description: Interactivity, animations, dynamic portfolio filtering, and form handlers.
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initTypewriter();
  initPortfolioFilter();
  initFaqAccordion();
  initScrollReveal();
  initMobileMenu();
  initContactForm();
  initStickyHeader();
});

/* Sticky Header on Scroll */
function initStickyHeader() {
  const header = document.getElementById("header");
  if (!header) return;
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/* Light / Dark Mode Toggle with Memory */
function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  // Retrieve saved theme or default to system theme (dark theme is default visually)
  const savedTheme = localStorage.getItem("eon-theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  if (savedTheme === "light" || (!savedTheme && prefersLight)) {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "☀️";
    themeToggle.setAttribute("aria-label", "Koyu temaya geç");
  } else {
    document.body.classList.remove("light-theme");
    themeToggle.textContent = "🌙";
    themeToggle.setAttribute("aria-label", "Açık temaya geç");
  }

  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    if (isLight) {
      localStorage.setItem("eon-theme", "light");
      themeToggle.textContent = "☀️";
      themeToggle.setAttribute("aria-label", "Koyu temaya geç");
    } else {
      localStorage.setItem("eon-theme", "dark");
      themeToggle.textContent = "🌙";
      themeToggle.setAttribute("aria-label", "Açık temaya geç");
    }
  });
}

/* Hero Section Typewriter Animation */
function initTypewriter() {
  const target = document.getElementById("typewriter");
  if (!target) return;

  const words = [
    "Geleceği Kodluyoruz.",
    "Güvenliği Sağlıyoruz.",
    "Oyunlar Tasarlıyoruz.",
    "Dijitali Şekillendiriyoruz."
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typingDelay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Move to next word
      wordIndex = (wordIndex + 1) % words.length;
      typingDelay = 500;
    }

    setTimeout(type, typingDelay);
  }

  // Start typing loop
  setTimeout(type, 500);
}

/* Portfolio Filters */
function initPortfolioFilter() {
  const filters = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".portfolio-item");
  
  if (filters.length === 0 || items.length === 0) return;

  filters.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active from all buttons
      filters.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      items.forEach(item => {
        // Simple scaling animation during filter
        item.style.transform = "scale(0.95)";
        item.style.opacity = "0";

        setTimeout(() => {
          if (filterValue === "all" || item.classList.contains(filterValue)) {
            item.classList.remove("hidden");
            // Trigger animation frame layout recalculation
            void item.offsetWidth;
            item.style.transform = "scale(1)";
            item.style.opacity = "1";
          } else {
            item.classList.add("hidden");
          }
        }, 300);
      });
    });
  });
}

/* FAQ Accordion Toggle */
function initFaqAccordion() {
  const triggers = document.querySelectorAll(".faq-trigger");
  
  if (triggers.length === 0) return;

  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const item = trigger.parentElement;
      const content = trigger.nextElementSibling;
      const isOpen = item.classList.contains("active");

      // Close all other items first (optional accordion behavior)
      document.querySelectorAll(".faq-item").forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
          otherItem.querySelector(".faq-content").style.maxHeight = "0px";
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove("active");
        trigger.setAttribute("aria-expanded", "false");
        content.style.maxHeight = "0px";
      } else {
        item.classList.add("active");
        trigger.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

/* Intersection Observer Scroll Reveal Animation */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length === 0) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealEls.forEach(el => el.classList.add("visible"));
  }
}

/* Mobile responsive navigation drawer */
function initMobileMenu() {
  const toggle = document.getElementById("mobileNavToggle");
  const navLinks = document.getElementById("navLinks");
  const links = document.querySelectorAll(".nav-link");

  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = toggle.classList.toggle("open");
    navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close menu when clicking links
  links.forEach(link => {
    link.addEventListener("click", () => {
      toggle.classList.remove("open");
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      
      // Update active navigation link
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
      toggle.classList.remove("open");
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* Testimonial Slider Mechanism */
let currentSlide = 0;
const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");

if (slides.length > 0) {
  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentSlide) {
        dot.classList.add("active");
        dot.setAttribute("aria-selected", "true");
      } else {
        dot.classList.remove("active");
        dot.setAttribute("aria-selected", "false");
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showSlide(currentSlide + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      showSlide(currentSlide - 1);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-index"));
      showSlide(index);
    });
  });

  // Auto-play slides every 6 seconds
  let slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 6000);

  // Pause autoplay on manual click
  const pauseAutoplay = () => {
    clearInterval(slideInterval);
  };

  [prevBtn, nextBtn].forEach(btn => {
    if (btn) btn.addEventListener("click", pauseAutoplay);
  });
  dots.forEach(dot => dot.addEventListener("click", pauseAutoplay));
}

/* Contact Form Ajax Submission Handler */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  if (!form || !note) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    note.textContent = "Gönderiliyor...";
    note.className = "form-note"; // reset color classes
    
    const data = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        note.textContent = "Mesajınız başarıyla gönderildi! Sizinle en kısa sürede iletişime geçeceğiz.";
        note.className = "form-note success";
        form.reset();
      } else {
        const result = await response.json();
        if (Object.hasOwn(result, 'errors')) {
          note.textContent = result.errors.map(error => error.message).join(", ");
        } else {
          note.textContent = "E-posta gönderilirken bir sorun oluştu. Lütfen doğrudan e-posta göndermeyi deneyin.";
        }
        note.className = "form-note error";
      }
    } catch (error) {
      note.textContent = "Ağ hatası oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin.";
      note.className = "form-note error";
    }
  });
}
