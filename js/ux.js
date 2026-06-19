export const $ = (s, c) => (c || document).querySelector(s);

export const $$ = (s, c) => [...(c || document).querySelectorAll(s)];

export const reduceMotion =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initTilt() {
  if (reduceMotion) return;

  $$("[data-tilt]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();

      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;

      el.style.transform =
        "perspective(1000px) rotateY(" +
        x * 12 +
        "deg) rotateX(" +
        -y * 12 +
        "deg) translateZ(24px)";
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

export function initReveal() {
  const reveals = $$(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  reveals.forEach((el) => io.observe(el));
}

export function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("is-open");
    links.classList.toggle("is-open");
  });

  links.querySelectorAll("a:not(.bag)").forEach((a) => {
    a.addEventListener("click", () => {
      toggle.classList.remove("is-open");
      links.classList.remove("is-open");
    });
  });
}
