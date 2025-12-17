function createFormFunc(){

// ACTIVIDAD 03: Función para limpiar el formulario
function limpiarFormulario() {
    // Seleccionamos todos los inputs del formulario
    const titulo = document.getElementById('titulo');
    const anio = document.getElementById('anio');
    const director = document.getElementById('director');
    const calif = document.getElementById('Calif');
    const duracion = document.getElementById('duracion');
    const genero = document.getElementById('genero');
    const imgUrl = document.getElementById('imgUrl');

    // Vaciamos el value de cada input
    titulo.value = '';
    anio.value = '';
    director.value = '';
    calif.value = '';
    duracion.value = '';
    genero.value = '';
    imgUrl.value = '';

    console.log('Formulario limpiado');
}

// ACTIVIDAD 04: Función para validar y enviar el formulario
function enviarFormulario(event) {
    // Prevenimos que el formulario se envíe y recargue la página
    event.preventDefault();

    console.log('Formulario enviado - iniciando validaciones...');

    // Seleccionamos todos los inputs
    const titulo = document.getElementById('titulo');
    const anio = document.getElementById('anio');
    const director = document.getElementById('director');
    const calif = document.getElementById('Calif');
    const duracion = document.getElementById('duracion');
    const genero = document.getElementById('genero');
    const imgUrl = document.getElementById('imgUrl');

    // Obtenemos los valores
    const tituloValue = titulo.value.trim();
    const anioValue = anio.value.trim();
    const directorValue = director.value.trim();
    const califValue = calif.value.trim();
    const duracionValue = duracion.value.trim();
    const generoValue = genero.value.trim();
    const imgUrlValue = imgUrl.value.trim();

    console.log('Valores obtenidos:', { tituloValue, anioValue, directorValue, califValue, duracionValue, generoValue, imgUrlValue });

    // Validamos que TODOS los campos estén completos
    if (!tituloValue || !anioValue || !directorValue || !califValue || 
        !duracionValue || !generoValue || !imgUrlValue) {
        alert('❌ Error: Todos los campos son obligatorios. Por favor, completa todos los datos.');
        return;
    }

    // Validación adicional: año debe ser un número válido de 4 dígitos
    const anioNum = parseInt(anioValue);
    if (isNaN(anioValue) || anioValue.length !== 4 || anioNum < 1888 || anioNum > 2026) {
        alert('❌ Error: El año debe ser un número de 4 dígitos (ej: 2024).');
        return;
    }

    // Validación adicional: calificación debe estar entre 1 y 10
    if (isNaN(califValue) || califValue < 1 || califValue > 10) {
        alert('❌ Error: La calificación debe ser un número entre 1 y 10.');
        return;
    }

    // Validación adicional: géneros deben estar separados por comas
    if (!generoValue.includes(',')) {
        console.log('Error en géneros - no contiene comas');
        alert('❌ Error: Los géneros deben estar separados por comas (ej: Acción, Drama, Suspenso).');
        return;
    }

    // Si todas las validaciones pasan, creamos el objeto película
    const nuevaPelicula = {
        title: tituloValue,
        year: parseInt(anioValue),
        director: directorValue,
        rating: parseFloat(califValue),
        duration: duracionValue,
        genre: generoValue.split(',').map(g => g.trim()), // Convertimos los géneros en array
        poster: imgUrlValue
    };

    console.log('✅ Película válida:', nuevaPelicula);
    
    // Aquí más adelante haremos la petición POST al backend
    alert('✅ Película agregada exitosamente!');
    
    // Limpiamos el formulario después de enviar
    limpiarFormulario();
}

// Esperamos a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionamos el formulario y el botón de reset
    const form = document.getElementById('formPelicula');
    const btnReset = document.getElementById('btnReset');

    // Asignamos el evento submit al formulario
    form.addEventListener('submit', enviarFormulario);

    // Asignamos el evento click al botón de limpiar
    btnReset.addEventListener('click', limpiarFormulario);

    console.log('Eventos del formulario configurados correctamente');
});

}

// createFormFunc();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createFormFunc };
}
