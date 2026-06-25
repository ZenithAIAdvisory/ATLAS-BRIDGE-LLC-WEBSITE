/* ============================================================
   Atlas Bridge LLC — script.js
   Vanilla JS, no dependencies.
   - Mobile menu (accessible)
   - Sticky header scrolled state
   - Scrollspy active nav link
   - Reveal-on-scroll animations (reduced-motion aware)
   - Auto copyright year
   ============================================================ */
(function () {
  "use strict";

  var header = document.querySelector("[data-header]");
  var navToggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav-link]"));
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile menu ---------- */
  function openMenu() {
    header.classList.add("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Close menu");
    }
  }
  function closeMenu() {
    header.classList.remove("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    }
  }
  function toggleMenu() {
    if (header.classList.contains("nav-open")) { closeMenu(); }
    else { openMenu(); }
  }

  if (navToggle) {
    navToggle.addEventListener("click", toggleMenu);
  }

  // Close when a nav link is tapped (mobile)
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (header.classList.contains("nav-open")) { closeMenu(); }
    });
  });

  // Close the CTA inside the mobile panel too
  var headerCta = document.querySelector(".header-cta");
  if (headerCta) {
    headerCta.addEventListener("click", function () {
      if (header.classList.contains("nav-open")) { closeMenu(); }
    });
  }

  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && header.classList.contains("nav-open")) {
      closeMenu();
      if (navToggle) { navToggle.focus(); }
    }
  });

  // Close when clicking outside the header
  document.addEventListener("click", function (e) {
    if (!header.classList.contains("nav-open")) { return; }
    if (!header.contains(e.target)) { closeMenu(); }
  });

  // Reset menu state if resized up to desktop
  var resizeTimer;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      if (window.innerWidth > 900) { closeMenu(); }
    }, 150);
  });

  /* ---------- Sticky header scrolled state ---------- */
  function onScroll() {
    if (window.scrollY > 8) { header.classList.add("scrolled"); }
    else { header.classList.remove("scrolled"); }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Scrollspy (active nav link) ---------- */
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href");
      if (!id || id.charAt(0) !== "#") { return null; }
      if (id === "#top") { return { link: link, el: document.body, id: id, top: true }; }
      var el = document.querySelector(id);
      return el ? { link: link, el: el, id: id } : null;
    })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      var match = link.getAttribute("href") === id;
      link.classList.toggle("active", match);
      if (match) { link.setAttribute("aria-current", "true"); }
      else { link.removeAttribute("aria-current"); }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var match = sections.filter(function (s) { return s.el === entry.target; })[0];
            if (match) { setActive(match.id); }
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      if (!s.top) { spy.observe(s.el); }
    });

    // Highlight Home when scrolled to very top
    window.addEventListener("scroll", function () {
      if (window.scrollY < 120) { setActive("#top"); }
    }, { passive: true });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Auto copyright year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }
})();
