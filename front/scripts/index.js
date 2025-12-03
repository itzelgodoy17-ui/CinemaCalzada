document.addEventListener('DOMContentLoaded', () => {
  
  const contenedor = document.getElementById('contenedorPeliculas');
  
  
  function crearTarjetaPelicula(pelicula) {
    
    const article = document.createElement('article');
    article.classList.add('tarjeta-pelicula');
    
    
    const img = document.createElement('img');
    img.src = pelicula.imagen;
    img.alt = pelicula.nombre;
    
    
    const info = document.createElement('div');
    info.classList.add('pelicula-info');
    
    
    const nombre = document.createElement('h3');
    nombre.textContent = pelicula.nombre;
    
    // Año
    const anio = document.createElement('p');
    anio.classList.add('pelicula-anio');
    anio.textContent = `Año: ${pelicula.anio}`;
    
    // Descripción
    const descripcion = document.createElement('p');
    descripcion.classList.add('pelicula-descripcion');
    descripcion.textContent = pelicula.descripcion;
    
    // tarjeta
    info.appendChild(nombre);
    info.appendChild(anio);
    info.appendChild(descripcion);
    
    article.appendChild(img);
    article.appendChild(info);
    
    return article;
  }
  
  // Función para cargar todas las películas
  function cargarPeliculas(arrayPeliculas) {
    // Limpiar el contenedor
    contenedor.innerHTML = '';
    
    // Crear y agregar cada tarjeta
    arrayPeliculas.forEach(pelicula => {
      const tarjeta = crearTarjetaPelicula(pelicula);
      contenedor.appendChild(tarjeta);
    });
  }
  
  // Cargar películas inicialmente
  if (typeof peliculas !== 'undefined') {
    cargarPeliculas(peliculas);
  }
});
