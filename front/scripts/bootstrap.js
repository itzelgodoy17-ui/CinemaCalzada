
  $(document).ready(function() {
  const contenedor = $('#contenedorPeliculas');
  
  function crearTarjetaPelicula(pelicula) {
    const col = $('<div></div>').addClass('col-md-4 col-sm-6 mb-4');
    
    const card = $('<div></div>').addClass('card h-100');
    
    const imgContainer = $('<div></div>').css('position', 'relative');
    
    const img = $('<img>')
      .addClass('card-img-top')
      .attr('src', pelicula.poster)
      .attr('alt', pelicula.title)
      .css({
        'height': 'auto',
        'object-fit': 'contain',
        'cursor': 'pointer'
      });
    
    const badge = $('<span></span>')
      .addClass('badge bg-warning text-dark position-absolute')
      .css({
        'top': '10px',
        'right': '10px',
        'font-size': '1rem',
        'padding': '0.5rem 0.8rem'
      })
      .text(`⭐ ${pelicula.rate}/10`);
    
    imgContainer.append(img, badge);
    
    const cardBody = $('<div></div>').addClass('card-body');
    
    const titulo = $('<h5></h5>')
      .addClass('card-title')
      .text(pelicula.title);
    
    const anio = $('<p></p>')
      .addClass('card-text mb-1')
      .html(`<small class="text-muted">Año: ${pelicula.year}</small>`);
    
    const director = $('<p></p>')
      .addClass('card-text mb-1')
      .html(`<small class="text-muted">Director: ${pelicula.director}</small>`);
    
    const duracion = $('<p></p>')
      .addClass('card-text mb-2')
      .html(`<small class="text-muted">Duración: ${pelicula.duration}</small>`);
    
    const generoContainer = $('<div></div>').addClass('mb-2');
    pelicula.genre.forEach(gen => {
      const generoBadge = $('<span></span>')
        .addClass('badge bg-secondary me-1')
        .text(gen);
      generoContainer.append(generoBadge);
    });
    
    const btnDetalles = $('<button></button>')
      .addClass('btn btn-primary btn-sm w-100')
      .attr('data-bs-toggle', 'modal')
      .attr('data-bs-target', '#modalPelicula')
      .text('Ver Detalles')
      .on('click', function() {
        mostrarModal(pelicula);
      });
    
    cardBody.append(titulo, anio, director, duracion, generoContainer, btnDetalles);
    card.append(imgContainer, cardBody);
    col.append(card);
    
    return col;
  }
  
  function mostrarModal(pelicula) {
    $('#modalTitulo').text(pelicula.title);
    $('#modalImagen').attr('src', pelicula.poster).attr('alt', pelicula.title);
    $('#modalAnio').text(pelicula.year);
    $('#modalDirector').text(pelicula.director);
    $('#modalDuracion').text(pelicula.duration);
    $('#modalRate').text(`⭐ ${pelicula.rate}/10`);
    $('#modalGenero').text(pelicula.genre.join(', '));
  }
  
  function cargarPeliculas(peliculas) {
    contenedor.empty();
    
    const row = $('<div></div>').addClass('row');
    
    peliculas.forEach(pelicula => {
      const tarjeta = crearTarjetaPelicula(pelicula);
      row.append(tarjeta);
    });
    
    contenedor.append(row);
  }
  
  // function obtenerPeliculas() {
  //   $.ajax({
  //     url: 'https://students-api.up.railway.app/movies',
  //     method: 'GET',
  //     success: function(data) {
  //       console.log('Películas obtenidas:', data);
  //       cargarPeliculas(data);
  //     },
  //     error: function(error) {
  //       console.error('Error al obtener películas:', error);
  //       contenedor.html('<div class="alert alert-danger" role="alert">Error al cargar las películas. Por favor, intenta más tarde.</div>');
  //     }
  //   });
  // }

   // ✨ NUEVA FUNCIÓN CON AXIOS Y ASYNC/AWAIT
  async function obtenerPeliculas() {
    try {
      // await espera a que la promesa se resuelva
      const response = await axios.get('https://students-api.up.railway.app/movies');
      
      // Si llegamos aquí, la petición fue exitosa
      console.log('Películas obtenidas:', response.data);
      cargarPeliculas(response.data);
      
    } catch (error) {
      // Si hay un error, se captura aquí
      console.error('Error al obtener películas:', error);
      contenedor.html('<div class="alert alert-danger" role="alert">Error al cargar las películas. Por favor, intenta más tarde.</div>');
    }
  }
  
  obtenerPeliculas();
});