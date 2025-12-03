
const swiper = new Swiper(".swiper", {
  // Grundlegende Einstellungen
  direction: "vertical",
  loop: true,
  effect: "fade",
  speed: 100, 
  
  // Wichtig: Loop-Puffer deutlich erhöhen (z.B. 15), da viele Slides und 'fade'
  loopAdditionalSlides: 15, 
  
  // Hash-Navigation
  hashNavigation: {
    watchState: true,
  },

  // Mausrad-Steuerung optimiert
  mousewheel: {
    forceToAxis: true,
    thresholdDelta: 10,
    sensitivity: 1, 
  },
  
  // Observers (zwingt Swiper zur Neuberechnung bei Layout-Änderungen)
  observer: true, 
  observeParents: true,
  observeSlideChildren: true,
});

// --- KLICK-FUNKTIONALITÄT HINZUFÜGEN ---
const swiperContainer = document.querySelector(".swiper");
if (swiperContainer) {
  swiperContainer.addEventListener("click", () => {
    swiper.slideNext();
  });
}