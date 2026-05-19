document.documentElement.classList.add("js");

const fadeElements = document.querySelectorAll(".fade-up");

function checkFade() {
  const triggerBottom = window.innerHeight * 0.85;

  fadeElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < triggerBottom) {
      element.classList.add("show");
    }
  });
}

function initFadeObserver() {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    fadeElements.forEach(element => observer.observe(element));
  } else {
    window.addEventListener("scroll", checkFade);
    window.addEventListener("resize", checkFade);
    window.addEventListener("load", checkFade);
    checkFade();
  }
}

initFadeObserver();

function showSection(sectionId) {
  const pages = document.querySelectorAll(".page");

  pages.forEach(function(page) {
    page.classList.remove("active");
  });

  document.getElementById(sectionId).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
