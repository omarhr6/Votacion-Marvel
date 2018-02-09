var datosComic = [];
var datosPersonaje = [];
var cargaDatosPersonajes;
var cargaDatosComics;

$(document).ready(function () {
    $('#contenedor').hide();

    LecturaComics();
    LecturaPersonajes();

    $('body').fadeIn(500);
})

function LecturaComics() {
    var marvelAPI = 'https://gateway.marvel.com:443/v1/public/comics?hasDigitalIssue=true&limit=100&apikey=87c0ace5916b863684257b003dbe6a5f';
    $.ajax({
        url: marvelAPI,
        type: 'get',
        dataType: 'json',
        success: function (response) {
            var results = response.data.results;
            crearElementos(results);
            cargarImagenes(results);
            CargarLocalStorage(results);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        cargaDatosComics = false;
    }).done(function() {
        cargaDatosComics = true;        
    }).always(function() {
        comprobarDatos();
    })
}

function LecturaPersonajes() {
    var marvelAPI = 'https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=87c0ace5916b863684257b003dbe6a5f';
    $.ajax({
        url: marvelAPI,
        type: 'get',
        dataType: 'json',
        success: function (response) {
            var results = response.data.results;
            crearElementos2(results);
            cargarImagenes2(results);
            CargarLocalStorage2(results);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        cargaDatosPersonajes = false;
    }).done(function() {
        cargaDatosPersonajes = true;        
    }).always(function() {
        comprobarDatos();
    })
}

function comprobarDatos() {
    if (cargaDatosComics == true && cargaDatosPersonajes == true) {
        $('#contenedor-spinner').hide();
        $('#contenedor').show();
    }
    if (cargaDatosComics == false || cargaDatosPersonajes == false) {
        $('#contenedor-spinner').hide();
        $('#contenedor-error').show();
    }
}

function crearElementos(comics) {
    var contadorComics = 0;
    var contenedor = document.getElementById('contenedor');

    for (var i in comics) {
        var div = document.createElement('div');
        div.setAttribute('id', 'comic' + i);
        div.setAttribute('class', 'contenedores-comics');
        contenedor.appendChild(div);
    }
}

function crearElementos2(personajes) {
    var contadorPersonajes = 0;
    var contenedor = document.getElementById('contenedor');

    for (var i in personajes) {
        var div = document.createElement('div');
        div.setAttribute('id', 'personaje' + i);
        div.setAttribute('class', 'contenedores-personajes');
        contenedor.appendChild(div);
    }
}

function cargarImagenes(comics) {
    var $item;

    for (var i in comics) {
        var contenedor = document.getElementById("comic" + i);
        $('#comic' + i).on("click", function (event) {
            $item = event.currentTarget;
            localStorage.setItem('idSeleccion', $item.id);
            location.href = 'portfolio/comic.html';
        });
        $('#comic' + i).on("keydown", function (event) {
            if (event.keyCode === 13) {
                $item = event.currentTarget;
                localStorage.setItem('idSeleccion', $item.id);
                location.href = 'portfolio/comic.html';
            }
        });
        var imagenes = document.createElement('img');
        imagenes.setAttribute('src', comics[i].thumbnail.path + '/portrait_incredible.' + comics[i].thumbnail.extension);
        imagenes.setAttribute('alt', comics[i].title);
        imagenes.setAttribute('title', comics[i].title);
        contenedor.appendChild(imagenes);

        var titulo = document.createElement('span');
        titulo.textContent = comics[i].title;
        contenedor.appendChild(titulo);
    }
}

function cargarImagenes2(personajes) {
    var $item;

    for (var i in personajes) {
        var contenedor = document.getElementById("personaje" + i);
        $('#personaje' + i).on("click", function (event) {
            $item = event.currentTarget;
            localStorage.setItem('idSeleccion', $item.id);
            location.href = 'portfolio/comic.html';
        });
        $('#personaje' + i).on("keydown", function (event) {
            if (event.keyCode === 13) {
                $item = event.currentTarget;
                localStorage.setItem('idSeleccion', $item.id);
                location.href = 'portfolio/comic.html';
            }
        });
        var imagenes = document.createElement('img');
        imagenes.setAttribute('src', personajes[i].thumbnail.path + '/portrait_incredible.' + personajes[i].thumbnail.extension);
        imagenes.setAttribute('alt', personajes[i].name);
        imagenes.setAttribute('title', personajes[i].name);
        contenedor.appendChild(imagenes);

        var titulo = document.createElement('span');
        titulo.textContent = personajes[i].name;
        contenedor.appendChild(titulo);
    }
}


function CargarLocalStorage(comics) {
    idSeleccion = localStorage.getItem('idSeleccion');

    for (var i in comics) {
        if ("comic" + i == idSeleccion) {
            datosComic.push(comics[i]);
        }

        if (localStorage.getItem("comic" + i) == null) {
            for (var i in comics) {
                var comic = [comics[i].title, 0];
                localStorage.setItem("comic" + i, JSON.stringify(comic));
            }
        }
    }
}

function CargarLocalStorage2(personajes) {
    idSeleccion = localStorage.getItem('idSeleccion');

    for (var i in personajes) {
        if ("personaje" + i == idSeleccion) {
            datosPersonaje.push(personajes[i]);
        }

        if (localStorage.getItem("personaje" + i) == null) {
            for (var i in personajes) {
                var persoanje = [personajes[i].name, 0];
                localStorage.setItem("personaje" + i, JSON.stringify(persoanje));
            }
        }
    }
}