document.addEventListener('DOMContentLoaded', () => {
    // --- NAVEGACIÓN INTERNA (SLIDES) ---
    const slides = document.querySelectorAll('.slide');
    const slidePrevBtn = document.getElementById('slide-prev-btn');
    const slideNextBtn = document.getElementById('slide-next-btn');
    
    // --- NAVEGACIÓN EXTERNA (PÁGINAS) ---
    const pagePrevBtn = document.getElementById('page-prev-btn');
    const pageNextBtn = document.getElementById('page-next-btn');

    let currentSlide = 0;
    const totalSlides = slides.length;

    /**
     * Muestra la diapositiva en el índice dado y actualiza los botones.
     * @param {number} index - El índice de la diapositiva a mostrar.
     */
    function showSlide(index) {
        // Ocultar todas las diapositivas
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        // Actualizar el estado de los botones de navegación
        updateNavButtons(index);
    }

    /**
     * Habilita o deshabilita los botones de navegación INTERNA y EXTERNA.
     */
    function updateNavButtons(index) {
        // Lógica del botón de retroceso interno
        slidePrevBtn.disabled = (index === 0);
        slidePrevBtn.classList.toggle('hidden', index === 0);
        
        // Lógica del botón de avance interno
        // Se oculta si estamos en el último slide
        slideNextBtn.disabled = (index === totalSlides - 1);
        slideNextBtn.classList.toggle('hidden', index === totalSlides - 1);
        
        // Lógica del botón de avance EXTERNO
        // Solo se muestra si estamos en el último slide
        if (pageNextBtn) {
            pageNextBtn.classList.toggle('hidden', index !== totalSlides - 1);
        }

        // Lógica del botón de retroceso EXTERNO
        // Solo se muestra si estamos en el primer slide Y el botón existe
        if (pagePrevBtn) {
            pagePrevBtn.classList.toggle('hidden', index !== 0);
        }
    }

    // --- Event Listeners para los botones INTERNOS ---

    // Ir a la diapositiva siguiente
    slideNextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    });

    // Ir a la diapositiva anterior
    slidePrevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    });
    
    // --- Navegación con Teclado ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            // Si el botón de "siguiente" interno está visible, hazle clic
            if (!slideNextBtn.classList.contains('hidden')) {
                slideNextBtn.click();
            } else if (pageNextBtn && !pageNextBtn.classList.contains('hidden')) {
                // Si no, y el botón de "página siguiente" está visible, navega
                window.location.href = pageNextBtn.href;
            }
        } else if (e.key === 'ArrowLeft') {
            // Si el botón "anterior" interno está visible, hazle clic
            if (!slidePrevBtn.classList.contains('hidden')) {
                slidePrevBtn.click();
            } else if (pagePrevBtn && !pagePrevBtn.classList.contains('hidden')) {
                // Si no, y el botón de "página anterior" está visible, navega
                window.location.href = pagePrevBtn.href;
            }
        }
    });
    
    // --- Inicialización ---
    // Mostrar la primera diapositiva al cargar la página
    showSlide(currentSlide);
});