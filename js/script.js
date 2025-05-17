document.addEventListener("DOMContentLoaded", () => {
  const moonIcon = document.querySelector(".icon:nth-of-type(1)");
  const body = document.body;
  const header = document.getElementById("main-header");

  moonIcon.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  const titulo = document.querySelector(".bienvenida h1");

if (titulo) {
  titulo.addEventListener("mouseenter", () => {
    titulo.classList.add("resaltar");
  });

  titulo.addEventListener("mouseleave", () => {
    titulo.classList.remove("resaltar");
  });

  titulo.addEventListener("click", () => {
    if (titulo.textContent.includes("Bienvenido")) {
      titulo.textContent = "¡Explora los misterios de la Física con nosotros!";
    } else {
      titulo.textContent = "¡Bienvenido a el mundo físico: Electricidad y Magnetismo!";
    }
  });

  titulo.classList.add("animar-entrada");
}

  const explorarBtn = document.getElementById("explorar-btn");

  if (explorarBtn) {
    explorarBtn.addEventListener("click", () => {
      window.location.href = "electricidad.html";
    });
  }

  const faqIcon = document.querySelector(".faq-toggle");
  const modal = document.getElementById("faqModal");
  const closeBtn = modal.querySelector(".close");

  faqIcon.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
