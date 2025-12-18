const axios = require('axios');

function createFormFunc(){
    console.log('🎬 createFormFunc ejecutándose...');
    console.log('📍 pathname actual:', location.pathname);

    const form = document.getElementById('formPelicula');
    if (!form) {
        console.log('❌ Formulario no encontrado - no estamos en AñadirPeliculas.html');
        return;
    }
    
    console.log('✅ Formulario encontrado!');

    function limpiarFormulario() {
        const titulo = document.getElementById('titulo');
        const anio = document.getElementById('anio');
        const director = document.getElementById('director');
        const calif = document.getElementById('Calif');
        const duracion = document.getElementById('duracion');
        const genero = document.getElementById('genero');
        const imgUrl = document.getElementById('imgUrl');

        titulo.value = '';
        anio.value = '';
        director.value = '';
        calif.value = '';
        duracion.value = '';
        genero.value = '';
        imgUrl.value = '';

        console.log('🧹 Formulario limpiado');
    }

    async function enviarFormulario(event) {
        event.preventDefault();

        console.log('📝 Formulario enviado - iniciando validaciones...');

        const titulo = document.getElementById('titulo');
        const anio = document.getElementById('anio');
        const director = document.getElementById('director');
        const calif = document.getElementById('Calif');
        const duracion = document.getElementById('duracion');
        const genero = document.getElementById('genero');
        const imgUrl = document.getElementById('imgUrl');

        const tituloValue = titulo.value.trim();
        const anioValue = anio.value.trim();
        const directorValue = director.value.trim();
        const califValue = calif.value.trim();
        const duracionValue = duracion.value.trim();
        const generoValue = genero.value.trim();
        const imgUrlValue = imgUrl.value.trim();

        console.log('📊 Valores obtenidos:', { tituloValue, anioValue, directorValue, califValue, duracionValue, generoValue, imgUrlValue });

        if (!tituloValue || !anioValue || !directorValue || !califValue || 
            !duracionValue || !generoValue || !imgUrlValue) {
            alert('❌ Error: Todos los campos son obligatorios. Por favor, completa todos los datos.');
            return;
        }

        const anioNum = parseInt(anioValue);
        if (isNaN(anioValue) || anioValue.length !== 4 || anioNum < 1888 || anioNum > 2026) {
            alert('❌ Error: El año debe ser un número de 4 dígitos (ej: 2024).');
            return;
        }

        if (isNaN(califValue) || califValue < 1 || califValue > 10) {
            alert('❌ Error: La calificación debe ser un número entre 1 y 10.');
            return;
        }

        if (!generoValue.includes(',')) {
            console.log('❌ Error en géneros - no contiene comas');
            alert('❌ Error: Los géneros deben estar separados por comas (ej: Acción, Drama, Suspenso).');
            return;
        }

        const nuevaPelicula = {
            title: tituloValue,
            year: parseInt(anioValue),
            director: directorValue,
            rate: parseFloat(califValue),
            duration: duracionValue,
            genre: generoValue.split(',').map(g => g.trim()),
            poster: imgUrlValue
        };

        console.log('✅ Película válida:', nuevaPelicula);

        try {
            const response = await axios.post('http://localhost:3000/movies', nuevaPelicula);
            console.log('🎬 Película guardada en el backend:', response.data);
            alert('✅ Película agregada exitosamente y guardada en la base de datos!');
            limpiarFormulario();
        } catch (error) {
            console.error('❌ Error al guardar película:', error);
            const mensajeError = error.response && error.response.data && error.response.data.error 
                         ? error.response.data.error 
                         : 'Error al guardar la película en el servidor.';

            alert('❌ ' + mensajeError);
            // alert('❌ Error al guardar la película en el servidor. Intenta de nuevo.');
        }
    }

    const btnReset = document.getElementById('btnReset');

    if (form && btnReset) {
        form.addEventListener('submit', enviarFormulario);
        btnReset.addEventListener('click', limpiarFormulario);
        console.log('✅ Eventos del formulario configurados correctamente');
    } else {
        console.error('❌ No se encontró el formulario o el botón reset');
    }
}

console.log('🔧 Intentando ejecutar createFormFunc...');
createFormFunc();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createFormFunc };
}