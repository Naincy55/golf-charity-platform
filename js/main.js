// // js/main.js

// Animate progress when visible
window.addEventListener("scroll", () => {
  const progress = document.querySelector(".progress-fill");
  const section = document.querySelector("#impact");

  const sectionTop = section.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight - 100) {
    progress.style.width = "50%";
  }
});


const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      sec.classList.add("show");
    }
  });
});


