const { createFormFunc } = require("./createMovie");
// Sin el bootstrap

$(document).ready(function() {
  
  const contenedor = $('#contenedorPeliculas');
  
  
  function crearTarjetaPelicula(pelicula) {
    const article = $('<article></article>').addClass('tarjeta-pelicula');
  
    const imgContainer = $('<div></div>').addClass('pelicula-imagen-container');
  
    const img = $('<img>')
      .attr('src', pelicula.poster)
      .attr('alt', pelicula.title);
  
    const rate = $('<p></p>')
      .addClass('pelicula-rate')
      .text(`⭐ ${pelicula.rate}/10`);
  
    imgContainer.append(img, rate);
  
    const info = $('<div></div>').addClass('pelicula-info');
  
    const titulo = $('<h3></h3>').text(pelicula.title);
  
    const anio = $('<p></p>')
      .addClass('pelicula-anio')
      .text(`Año: ${pelicula.year}`);
  
    const director = $('<p></p>')
      .addClass('pelicula-director')
      .text(`Director: ${pelicula.director}`);
  
    const duracion = $('<p></p>')
      .addClass('pelicula-duracion')
      .text(`Duración: ${pelicula.duration}`);
  
    const genero = $('<p></p>')
      .addClass('pelicula-genero')
      .text(`Género: ${pelicula.genre.join(', ')}`);
  
    info.append(titulo, anio, director, duracion, genero);
    article.append(imgContainer, info);
  
    return article;
  }
  
  
  function cargarPeliculas(peliculas) {
    contenedor.empty();
    
    peliculas.forEach(pelicula => {
      const tarjeta = crearTarjetaPelicula(pelicula);
      contenedor.append(tarjeta);
    });
  }
  
  // ✨ FUNCIÓN CON AXIOS Y ASYNC/AWAIT (SOLO UNA VEZ)
  async function obtenerPeliculas() {
    try {
      console.log('🚀 Haciendo petición con AXIOS...');
      const response = await axios.get('http://localhost:3000/movies');
      console.log('✅ Respuesta recibida con Axios:', response);
      console.log('📊 Data:', response.data);
      console.log('📋 Headers de la respuesta:', response.headers);
      cargarPeliculas(response.data);
    } catch (error) {
      console.error('❌ Error con Axios:', error);
      contenedor.html('<p style="color: red; text-align: center;">Error al cargar las películas. Por favor, intenta más tarde.</p>');
    }
  }
  
  if (contenedor.length > 0) {
    obtenerPeliculas();
  }
});
