/* ============================================================
   pharmaand GmbH — main JS
   - Sticky header on scroll
   - Mobile nav toggle
   - Reveal-on-scroll
   - Animated stat counters
   - Contact form handler
   ============================================================ */

(function () {
  "use strict";

  // ---------- Sticky header ----------
  const header = document.getElementById("siteHeader");
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 60) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---------- Mobile nav ----------
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("primaryNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        toggle.classList.remove("open");
        nav.classList.remove("open");
      });
    });
  }

  // ---------- Reveal on scroll ----------
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  // ---------- Animated counters ----------
  const counters = document.querySelectorAll(".stat-num[data-count]");
  if (counters.length) {
    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const duration = 1600;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * eased).toString();
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toString();
      };
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
      const co = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate(entry.target);
              co.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((el) => co.observe(el));
    } else {
      counters.forEach(animate);
    }
  }

  // ---------- Contact form ----------
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = document.getElementById("formStatus");
      if (status) {
        status.textContent =
          "Thank you — your message has been received. We'll get back to you shortly.";
        status.style.color = "#3f1561";
      }
      form.reset();
    });
  }

  // ---------- Year in footer ----------
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
