/* ___________________________ DOM PARA LAS GUÍAS ___________________________- */
document.addEventListener('DOMContentLoaded', () => {
    // --- REFERENCIAS ---
    // Botones
    const btnGeneral = document.getElementById('btnGuiasGenerales');
    const btnPrincipiante = document.getElementById('btnGuiasPrincipiante');
    const btnIntermedio = document.getElementById('btnGuiasIntermedio');
    const btnAvanzado = document.getElementById('btnGuiasAvanzado');
    
    // Secciones Principales
    const secPrincipiante = document.getElementById('guiasPrincipiantes');
    const secIntermedio = document.getElementById('guiasIntermedias');
    const secAvanzado = document.getElementById('guiasAvanzadas');
    
    // Buscador y Tarjetas (Artículos)
    const inputBuscador = document.getElementById('buscadorGuias');
    const todasLasGuias = document.querySelectorAll('.itemContenedorGuias');

    // Arrays auxiliares
    const todosLosBotones = [btnGeneral, btnPrincipiante, btnIntermedio, btnAvanzado];
    const todasLasSecciones = [secPrincipiante, secIntermedio, secAvanzado];


    // FUNCIÓN 1: FILTRAR POR CATEGORÍA (Botones)
    function filtrarCategoria(botonActivo, seccionVisible) {
        inputBuscador.value = ""; 
        todosLosBotones.forEach(btn => btn.classList.remove('active'));
        botonActivo.classList.add('active');
        todasLasSecciones.forEach(seccion => {
            seccion.style.display = 'none';
        });
        todasLasGuias.forEach(guia => guia.style.display = 'block');
        if (seccionVisible === 'todas') {
            todasLasSecciones.forEach(seccion => {
                seccion.style.display = 'block';
                seccion.classList.add('fade-in');
            });
        } else {
            seccionVisible.style.display = 'block';
            seccionVisible.classList.add('fade-in');
        }
    }


    // FUNCIÓN 2: BUSCADOR (Input)
    inputBuscador.addEventListener('input', (e) => {
        const textoBusqueda = e.target.value.toLowerCase();

        // CASO A: El buscador está vacío -> Restauramos la vista de categoría
        if (textoBusqueda === "") {
            const botonActivo = document.querySelector('.nav_botones button.active');
            if (botonActivo) botonActivo.click();
            return;
        }

        // CASO B: Hay texto -> Buscamos en TODO
        todasLasSecciones.forEach(seccion => seccion.style.display = 'block');
        todasLasGuias.forEach(guia => {
            // Obtenemos el título (h3)
            const titulo = guia.querySelector('h3').textContent.toLowerCase();
            
            // Obtenemos todas las etiquetas y las unimos en un solo string
            // Array.from convierte la lista de nodos en array para usar .map
            const etiquetas = Array.from(guia.querySelectorAll('.etiqueta'))
                                   .map(tag => tag.textContent.toLowerCase())
                                   .join(' ');

            // 3. Verificamos si el texto está en el título O en las etiquetas
            if (titulo.includes(textoBusqueda) || etiquetas.includes(textoBusqueda)) {
                guia.style.display = 'block';
            } else {
                guia.style.display = 'none';
            }
        });
    });

    // EVENTOS CLICK DE LOS BOTONES ---
    btnGeneral.addEventListener('click', () => filtrarCategoria(btnGeneral, 'todas'));
    btnPrincipiante.addEventListener('click', () => filtrarCategoria(btnPrincipiante, secPrincipiante));
    btnIntermedio.addEventListener('click', () => filtrarCategoria(btnIntermedio, secIntermedio));
    btnAvanzado.addEventListener('click', () => filtrarCategoria(btnAvanzado, secAvanzado));
    btnGeneral.click();
});