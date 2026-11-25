
/* ========================================
   OMOKAGE
   MAIN JAVASCRIPT
======================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ========================================
     01. MOBILE MENU
  ======================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-list a");

  if (menuToggle && nav) {

    // メニューの開閉
    menuToggle.addEventListener("click", () => {

      const isOpen = menuToggle.classList.toggle("active");

      nav.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", isOpen);

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "メニューを閉じる" : "メニューを開く"
      );

      // メニュー表示中は背景のスクロールを防ぐ
      document.body.style.overflow = isOpen ? "hidden" : "";

    });

    // メニュー内のリンクを押したら閉じる
    navLinks.forEach((link) => {

      link.addEventListener("click", () => {

        menuToggle.classList.remove("active");
        nav.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "メニューを開く");

        document.body.style.overflow = "";

      });

    });

  }


  /* ========================================
     02. SCROLL FADE IN
  ======================================== */

  const fadeTargets = document.querySelectorAll(
    ".section-label, .message-content, .product-card, .section-heading, .experience-content, .experience-image, .final-message-inner"
  );

  // JavaScriptで表示対象を設定
  fadeTargets.forEach((element) => {
    element.classList.add("fade-up");
  });

  // 動きを減らす設定がある場合は即時表示
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {

    fadeTargets.forEach((element) => {
      element.classList.add("is-visible");
    });

  } else {

    const observer = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    fadeTargets.forEach((element) => {
      observer.observe(element);
    });

  }


  /* ========================================
     03. HEADER SCROLL EFFECT
  ======================================== */

  const header = document.querySelector(".header");

  if (header) {

    const updateHeader = () => {

      if (window.scrollY > 50) {

        header.classList.add("scrolled");

      } else {

        header.classList.remove("scrolled");

      }

    };

    window.addEventListener("scroll", updateHeader, {
      passive: true
    });

    updateHeader();

  }


  /* ========================================
     04. CLOSE MENU WITH ESCAPE KEY
  ======================================== */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && menuToggle && nav) {

      menuToggle.classList.remove("active");
      nav.classList.remove("active");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "メニューを開く");

      document.body.style.overflow = "";

      menuToggle.focus();

    }

  });

});


/* =================================
   6. ACTIVE NAVIGATION
================================= */

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname
    .split("/")
    .pop() || "index.html";

  const navLinks = document.querySelectorAll(".nav a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
});
