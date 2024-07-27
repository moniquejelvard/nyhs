document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.getElementById("burger-menu");
  const nav = document.getElementById("nav");

  burgerMenu.addEventListener("click", function () {
    nav.classList.toggle("active");
    burgerMenu.classList.toggle("toggle");
  });

  const languageLinks = document.querySelectorAll(".lang-link");
  const elementsToTranslate = document.querySelectorAll(
    "[data-lang-da], [data-lang-en]"
  );

  function applyLanguage(selectedLang) {
    elementsToTranslate.forEach((element) => {
      const langDa = element.getAttribute("data-lang-da");
      const langEn = element.getAttribute("data-lang-en");
      if (selectedLang === "da") {
        element.textContent = langDa || element.textContent;
      } else if (selectedLang === "en") {
        element.textContent = langEn || element.textContent;
      }
    });

    languageLinks.forEach((link) => {
      if (link.getAttribute("data-lang") === selectedLang) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  languageLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const selectedLang = this.getAttribute("data-lang");
      localStorage.setItem("preferredLanguage", selectedLang);
      applyLanguage(selectedLang);
    });
  });

  const savedLang = localStorage.getItem("preferredLanguage");
  const initialLang = savedLang ? savedLang : document.documentElement.lang;
  applyLanguage(initialLang);
});





document.addEventListener("DOMContentLoaded", () => {
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");
  const carouselImages = document.querySelector(".carousel-images");
  const images = carouselImages.querySelectorAll("img");
  const imageCount = images.length;

  const imageWidth =
    images[0].clientWidth +
    parseInt(getComputedStyle(images[0]).marginRight, 10);
  carouselImages.style.width = `${imageWidth * imageCount}px`;

  let currentIndex = 0;
  let startX, endX, deltaX;
  const threshold = 50; // Minimum distance to recognize as a swipe

  function updateCarousel() {
    const offset = -currentIndex * imageWidth;
    carouselImages.style.transform = `translateX(${offset}px)`;

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === imageCount - 1;
  }

  nextButton.addEventListener("click", () => {
    if (currentIndex < imageCount - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // Swipe functionality
  carouselImages.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carouselImages.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
    deltaX = startX - endX;
  });

  carouselImages.addEventListener("touchend", () => {
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        // Swipe left
        if (currentIndex < imageCount - 1) {
          currentIndex++;
        }
      } else {
        // Swipe right
        if (currentIndex > 0) {
          currentIndex--;
        }
      }
      updateCarousel();
    }
  });

  // Initialize the carousel position
  updateCarousel();
});

