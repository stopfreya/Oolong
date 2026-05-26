document.documentElement.classList.add("js"); // lägger till en "js" class på sidan så CSS vet att JavaScript fungerar

const fadeElements = document.querySelectorAll(".fade-up"); // hämtar alla element som har classen "fade-up"

function checkFade() {
  const triggerBottom = window.innerHeight * 0.85;  // punkt på skärmen där animationen ska börja

  fadeElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top; // hämtar elementets position på sidan

    if (elementTop < triggerBottom) {  // om elementet kommit långt nog upp på skärmen
      element.classList.add("show");  // lägger till "show" class som startar animationen i CSS
    }
  });
}

function initFadeObserver() {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {   // kollar om browsern stödjer IntersectionObserver
      entries.forEach(entry => { // skapar observer som ser när element kommer in på skärmen
        if (entry.isIntersecting) {  // om elementet syns på skärmen
          entry.target.classList.add("show");  // startar animationen
          observer.unobserve(entry.target);  // slutar observera elementet efter animationen
        }
      });
    }, { threshold: 0.2 }); // hur mycket av elementet som måste synas

    fadeElements.forEach(element => observer.observe(element));  // börjar observera alla fade-up element
  } else {   // fallback för äldre browsers
    window.addEventListener("scroll", checkFade);
    window.addEventListener("resize", checkFade);
    window.addEventListener("load", checkFade);
    checkFade();
  }
}

initFadeObserver(); // startar fade-systemet

function showSection(sectionId) {
  const pages = document.querySelectorAll(".page"); // hämtar alla "sidor"

  pages.forEach(function(page) {
    page.classList.remove("active");  // gömmer alla sidor
  });

  document.getElementById(sectionId).classList.add("active");   // visar den sida man klickat på

  window.scrollTo({  // scrollar mjukt upp till toppen
    top: 0,
    behavior: "smooth"
  });
}
