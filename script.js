// Variable, um die Auslösung des Slides zu drosseln (Throttle)
let isScrolling = false;
const throttleTime = 600; // 600ms Cooldown zwischen zwei Slidesprüngen
const scrollThreshold = 10; // Nur Scroll-Bewegungen über 10 Einheiten auslösen

// --- 1. MAPPING: SLIDE-INDEX ZU LINK-INDEX ---------------------------------
// Dieses Array ordnet JEDEM Slide-Index (Position) den Index des ZIEL-Links (Sidebar-Eintrag) zu.
// Sidebar-Links: 0 bis 13.
const linkMap = [
  // L-Index | Slides
  0, // [0]: A-000/Portfolio (1 Slide)

  1, // [1]: A-001/Project 1 (Start)
  1, // [2]: A-001/Project 1

  2, // [3]: A-002/Project 2 (Start)
  2,
  2,
  2,
  2, // [4-7]

  3, // [8]: A-003/Project 3 (Start)
  3,
  3, // [9-10]

  4, // [11]: A-004/Project 4 (Start)
  4,
  4,
  4, // [12-14]

  5, // [15]: A-005/Project 5 (Start)
  5,
  5,
  5, // [17-18]

  6, // [19]: A-006/Project 6 (Start)
  6,
  6,
  6,
  6,
  6, // [21-24]

  7, // [25]: A-007/Project 7 (Start)
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7, // [27-36]

  8, // [37]: A-008/Project 8 (Start) (ACHTUNG: DATA-HASH WERT IST HIER NUR A-008)
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8, // [37-46]

  9, // [47]: B-009/Project 9 (Start)
  9,
  9,
  9,
  9,
  9, // [47-52] (Inklusive Video-Slide)

  10, // [53]: C-010/Project 10 (Start)
  10,
  10,
  10,
  10, // [53-57]

  11, // [58]: A-011/Project 11 (Start)
  11,
  11,
  11,
  11,
  11, // [58-63] (Inklusive Video-Slide)

  12, // [64]: A-012/Project 12 (Start)
  12,
  12,
  12,
  12,
  12,
  12, // [69-70]

  13, // [71]: A-013/About me (Start)
  13,
  13, // [71-73] (letzte Slides)

  // Das Array hat hier 79 Einträge, da Ihre Slides von 0 bis 78 gehen (insgesamt 79 Slides).
];
// -----------------------------------------------------------------------------------

// --- 2. SWIPER INITIALISIERUNG ---
const swiper = new Swiper(".swiper", {
  loop: true,
  //   effect: "fade",
  speed: 0, // Sofortiger Bildwechsel
  keyboard: {
    enabled: true,
    observer: true,
    observeParents: true,
  },

  hashNavigation: {
    watchState: true,
 },

  mousewheel: {
    thresholdTime: 20,
    thresholdDelta: 20,
    sensitivity: 0.5,
  },

  lazy: {
 loadPrevNext: true,        // Aktiviert das Vorladen
  loadPrevNextAmount: 3,     // Erhöht auf 3 Bilder (lädt also 3 vor und 3 zurück)
  loadOnTransitionStart: true
  },
  
  // Deine restlichen Einstellungen (Navigation, Pagination etc.)
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  
});

// Hole das DOM-Element des Swiper-Containers
const swiperContainer = document.querySelector(".swiper");

// Füge einen Event Listener für das 'click' Event hinzu
swiperContainer.addEventListener("click", function () {
  // Rufe die slideNext() Methode der Swiper-Instanz auf,
  // um zum nächsten Slide zu wechseln
  swiper.slideNext();
});

// --- 3. INDEX-BASIERTE LOGIK ZUR LINK-MARKIERUNG (Verbessert) ---
swiper.on("slideChange", function () {
  const navLinks = document.querySelectorAll(".sidebar ul li a");
  const currentSlideIndex = swiper.realIndex;

  // 1. Hole den Ziel-Link-Index aus der Mapping-Tabelle
  // Fallback auf 0, falls der Index im Array nicht existiert (sollte nicht passieren)
  const targetLinkIndex =
    linkMap[currentSlideIndex] !== undefined ? linkMap[currentSlideIndex] : 0;

  // 2. Klasse von allen Links entfernen
  navLinks.forEach((link) => {
    link.classList.remove("active-link");
  });

  // 3. Klasse zum Ziel-Link hinzufügen
  if (navLinks[targetLinkIndex]) {
    navLinks[targetLinkIndex].classList.add("active-link");
  }
});
// -----------------------------------------------------------------------

// --- 5. INITIALISIERUNG BEIM LADEN ---
document.addEventListener("DOMContentLoaded", () => {
  // Abstände berechnen und Swiper updaten
  setMargins();
  swiper.update();
  swiper.slideTo(0, 0); // Springt zum ersten Slide (Index 0)

  // Manuelles Markieren des ersten Links (Index 0) beim Laden
  const navLinks = document.querySelectorAll(".sidebar ul li a");
  if (navLinks.length > 0) {
    navLinks.forEach((link) => link.classList.remove("active-link"));
    navLinks[0].classList.add("active-link");
  }
});

window.addEventListener("resize", setMargins);
// -----------------------------------------------------------------------

// --- ZUSÄTZLICHE FUNKTIONEN ---

// Funktion zur dynamischen Abstandsbestimmung (Unverändert)
function setMargins() {
  const links = document.querySelectorAll(".nav-link");
  const marginBuffer = 30;

  links.forEach((link) => {
    const listItem = link.closest("li");
    if (!listItem) return;

    const contentWidth = link.offsetWidth;
    const requiredSpace = contentWidth + marginBuffer;
  });
}
