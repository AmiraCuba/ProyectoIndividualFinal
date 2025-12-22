document.addEventListener('DOMContentLoaded', () => {
    /*______________________________________ LÓGICA DE GUÍAS ______________________________________ */
    const inputBuscador = document.getElementById('buscadorGuias');

    if (inputBuscador) { 
        // --- REFERENCIAS DE GUÍAS ---
        const btnGeneral = document.getElementById('btnGuiasGenerales');
        const btnPrincipiante = document.getElementById('btnGuiasPrincipiante');
        const btnIntermedio = document.getElementById('btnGuiasIntermedio');
        const btnAvanzado = document.getElementById('btnGuiasAvanzado');
        
        const secPrincipiante = document.getElementById('guiasPrincipiantes');
        const secIntermedio = document.getElementById('guiasIntermedias');
        const secAvanzado = document.getElementById('guiasAvanzadas');
        
        const todasLasGuias = document.querySelectorAll('.itemContenedorGuias');
        const todosLosBotones = [btnGeneral, btnPrincipiante, btnIntermedio, btnAvanzado];
        const todasLasSecciones = [secPrincipiante, secIntermedio, secAvanzado];

        // --- FUNCIÓN FILTRAR ---
        function filtrarCategoria(botonActivo, seccionVisible) {
            inputBuscador.value = ""; 
            todosLosBotones.forEach(btn => { if(btn) btn.classList.remove('active'); });
            if(botonActivo) botonActivo.classList.add('active');

            todasLasSecciones.forEach(seccion => { if(seccion) seccion.style.display = 'none'; });
            todasLasGuias.forEach(guia => guia.style.display = 'block');

            if (seccionVisible === 'todas') {
                todasLasSecciones.forEach(seccion => {
                    if(seccion) { seccion.style.display = 'block'; seccion.classList.add('fade-in'); }
                });
            } else if (seccionVisible) {
                seccionVisible.style.display = 'block';
                seccionVisible.classList.add('fade-in');
            }
        }

        // --- BUSCADOR ---
        inputBuscador.addEventListener('input', (e) => {
            const texto = e.target.value.toLowerCase();
            if (texto === "") {
                const btnActivo = document.querySelector('.nav_botones button.active');
                if (btnActivo) btnActivo.click();
                return;
            }
            todasLasSecciones.forEach(sec => { if(sec) sec.style.display = 'block'; });
            todasLasGuias.forEach(guia => {
                const titulo = guia.querySelector('h3').textContent.toLowerCase();
                const etiquetas = Array.from(guia.querySelectorAll('.etiqueta'))
                                       .map(t => t.textContent.toLowerCase()).join(' ');
                guia.style.display = (titulo.includes(texto) || etiquetas.includes(texto)) ? 'block' : 'none';
            });
        });

        // Eventos Click
        if(btnGeneral) btnGeneral.addEventListener('click', () => filtrarCategoria(btnGeneral, 'todas'));
        if(btnPrincipiante) btnPrincipiante.addEventListener('click', () => filtrarCategoria(btnPrincipiante, secPrincipiante));
        if(btnIntermedio) btnIntermedio.addEventListener('click', () => filtrarCategoria(btnIntermedio, secIntermedio));
        if(btnAvanzado) btnAvanzado.addEventListener('click', () => filtrarCategoria(btnAvanzado, secAvanzado));
        
        // Iniciar
        if(btnGeneral) btnGeneral.click();
    }


    /*______________________________________ LÓGICA DE REGISTRO ______________________________________ */
    const formularioRegistro = document.querySelector('form.contenedor');
    if (formularioRegistro) {
        // --- SLIDER DE TIEMPO ---
        const sliderTiempo = document.getElementById('tiempojuego');
        const textoTiempo = document.getElementById('playtime-value');
        if (sliderTiempo && textoTiempo) {
            textoTiempo.textContent = `${sliderTiempo.value} horas`;
            sliderTiempo.addEventListener('input', (e) => {
                textoTiempo.textContent = `${e.target.value} horas`;
            });
        }

        // --- VALIDACIÓN DEL FORMULARIO ---
        formularioRegistro.addEventListener('submit', (e) => {
            let esValido = true;
            let mensajesError = [];

            // Limpiar bordes rojos previos
            formularioRegistro.querySelectorAll('input, select, textarea').forEach(i => i.style.borderColor = "rgba(255, 255, 255, 0.1)");

            // Obtener valores (usamos || "" para evitar errores si algo no existe)
            const usuario = (document.getElementById('usuario') || {}).value || "";
            const clave = (document.getElementById('clave') || {}).value || "";
            const confirmarClave = (document.getElementById('confirmarClave') || {}).value || "";
            const correo = (document.getElementById('correo') || {}).value || "";
            const nivel = (document.getElementById('nivel') || {}).value || "";
            const pais = (document.getElementById('pais') || {}).value || "";
            const terminos = document.querySelector('input[name="terminos"]');

            // 1. Usuario
            const usuarioRegex = /^[a-zA-Z0-9_]+$/;
            if (usuario.length < 3 || !usuarioRegex.test(usuario)) {
                mensajesError.push("Usuario: Mínimo 3 caracteres (letras, números, guión bajo).");
                const el = document.getElementById('usuario'); if(el) el.style.borderColor = "red";
                esValido = false;
            }

            // 2. Correo
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo)) {
                mensajesError.push("Correo electrónico inválido.");
                const el = document.getElementById('correo'); if(el) el.style.borderColor = "red";
                esValido = false;
            }

            // 3. Contraseñas
            if (clave.length < 6) {
                mensajesError.push("La contraseña debe tener al menos 6 caracteres.");
                const el = document.getElementById('clave'); if(el) el.style.borderColor = "red";
                esValido = false;
            }
            if (clave !== confirmarClave) {
                mensajesError.push("Las contraseñas no coinciden.");
                const el = document.getElementById('confirmarClave'); if(el) el.style.borderColor = "red";
                esValido = false;
            }

            // 4. País y Nivel
            if (pais === "" || pais === "Selecciona tu país") {
                mensajesError.push("Selecciona tu país.");
                const el = document.getElementById('pais'); if(el) el.style.borderColor = "red";
                esValido = false;
            }
            if (nivel === "" || nivel === "Selecciona tu nivel") {
                mensajesError.push("Selecciona tu nivel de experiencia.");
                const el = document.getElementById('nivel'); if(el) el.style.borderColor = "red";
                esValido = false;
            }

            // 5. Términos
            if (terminos && !terminos.checked) {
                mensajesError.push("Debes aceptar los términos y condiciones.");
                esValido = false;
            }

            // Si hay errores, detener el envío
            if (!esValido) {
                e.preventDefault();
                alert("Corrige los siguientes errores:\n\n- " + mensajesError.join("\n- "));
            }
        });


        // --- BOTÓN RESETEAR ---
        const btnReset = document.querySelector('button[type="reset"]');
        if(btnReset) {
            btnReset.addEventListener('click', () => {
                setTimeout(() => {
                    formularioRegistro.querySelectorAll('input, select').forEach(i => i.style.borderColor = "rgba(255, 255, 255, 0.1)");
                    if(textoTiempo) textoTiempo.textContent = "10 horas"; // Valor por defecto
                    if(btnPersonal) btnPersonal.click();
                }, 10);
            });
        }
    }
});