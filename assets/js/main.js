/* 麹とくらし — interactions */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Mobile navigation */
  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.getElementById("mobile-nav");
  if (toggle && drawer) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
      drawer.hidden = !open;
    };
    toggle.addEventListener("click", () =>
      setOpen(toggle.getAttribute("aria-expanded") !== "true")
    );
    drawer.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => setOpen(false))
    );
    window.addEventListener("resize", () => {
      if (window.innerWidth > 600) setOpen(false);
    });
  }

  /* Demo placeholder links — go nowhere */
  document.querySelectorAll("a[data-demo]").forEach((a) =>
    a.addEventListener("click", (e) => e.preventDefault())
  );

  /* Logo → scroll back to the very top (the sticky-header anchor alone won't) */
  document.querySelectorAll('a[href="#top"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      if (location.hash) {
        history.replaceState(null, "", location.pathname + location.search);
      }
    });
  });

  /* First View slider — auto cross-fade */
  const slides = Array.from(document.querySelectorAll(".fv-slide"));
  if (slides.length > 1 && !reduceMotion) {
    let index = 0;
    let timer = null;
    const DELAY = 6500;
    const show = (i) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle("is-active", n === index));
    };
    const start = () => {
      stop();
      timer = setInterval(() => show(index + 1), DELAY);
    };
    const stop = () => timer && clearInterval(timer);

    const media = document.querySelector(".fv-media");
    if (media) {
      media.addEventListener("mouseenter", stop);
      media.addEventListener("mouseleave", start);
    }
    start();
  }

  /* Intro logo splash — remove after the CSS animation finishes */
  const intro = document.getElementById("intro");
  if (intro) {
    if (reduceMotion) intro.remove();
    else window.setTimeout(() => intro.remove(), 3300);
  }

  /* Scroll reveal for content + pop-in for decorations */
  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.classList.contains("deco")) {
            el.classList.add("pop-in");
          } else {
            el.classList.add("is-reveal");
            el.querySelectorAll(".deco").forEach((d) => d.classList.add("pop-in"));
          }
          obs.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    const revealSelector = [
      ".fv-title", ".fv-lead", ".about-photo", ".about-text",
      ".activity > .section-label", ".act-card",
      ".contact > .section-label", ".contact-lead", ".contact-buttons",
      ".site-footer",
    ].join(",");
    document.querySelectorAll(revealSelector).forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });

    document.querySelectorAll(".act-card").forEach((el, i) => {
      el.style.transitionDelay = i * 0.22 + "s";
    });
    document.querySelectorAll(".fv-title, .fv-lead").forEach((el, i) => {
      el.style.transitionDelay = 2.4 + i * 0.25 + "s";
    });

    document.querySelectorAll(".deco").forEach((el) => {
      el.classList.add("pop-init");
      io.observe(el);
    });

    // these decos wait for their slow-revealing block to settle, then pop
    const fvBowl = document.querySelector(".deco-fv-bowl");
    if (fvBowl) fvBowl.style.animationDelay = "3.9s";
    const masu = document.querySelector(".deco-cred-corner");
    if (masu) masu.style.animationDelay = "1.5s";
  }
})();
