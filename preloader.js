// Ruft die notwendigen Elemente ab, sobald das DOM geladen ist
document.addEventListener("DOMContentLoaded", () => {
    console.log("PRELOADER: Datei wurde erfolgreich geladen!");

    // Elemente aus dem HTML abrufen
    const preloader = document.getElementById("preloader");
    const currentCount = document.getElementById("current-count"); 

    // Alle <img>-Elemente auf der Seite finden
    const images = document.querySelectorAll("img");
    let totalImages = images.length;
    let loadedImages = 0;

    /**
     * Aktualisiert den Zähler (Prozentwert) auf dem Bildschirm.
     */
    function updateCounter() {
        let percent = Math.round((loadedImages / totalImages) * 100);
        currentCount.textContent = percent;
    }

    // Wenn keine Bilder vorhanden sind, sofort ausblenden
    if (totalImages === 0) {
        currentCount.textContent = "100";
        hidePreloader();
        return;
    }

    // Für jedes Bild einen Klon erstellen, um den Ladezustand zu überwachen
    images.forEach(img => {
        const imageClone = new Image();
        imageClone.src = img.src;

        // Callback-Funktion, die bei Erfolg und Fehler zählt und den Zähler aktualisiert
        const handleLoadComplete = () => {
            loadedImages++;
            updateCounter();
            if (loadedImages === totalImages) {
                hidePreloader();
            }
        };

        // Event-Listener zuweisen
        imageClone.onload = handleLoadComplete;
        imageClone.onerror = handleLoadComplete;
    });

    function hidePreloader() {
        const fadeDuration = 500; // Dauer der CSS-Transition in ms
        const delayBeforeFade = 300; // Verzögerung vor dem Ausfaden in ms
        
        setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.transition = `opacity ${fadeDuration / 1000}s ease-out`;
            
            setTimeout(() => {
                preloader.style.display = "none";
            }, fadeDuration);
        }, delayBeforeFade);
    }
});