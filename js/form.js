var idComic;
var contadorVotos = 0;
var datosComic = [];
var datosPersonaje = [];
var opcion;
var marvelAPI;
var cargaDatos;

$(document).ready(function () {
    $('#contenedor-formulario').hide();
    LecturaComics();
    asignarEventos();
    $('body').fadeIn(500);
})

function LecturaComics() {
    opcion = localStorage.getItem('idSeleccion');
    opcion = opcion.replace(/[0-9]+/g, "");

    if (opcion == 'comic') {
        marvelAPI = 'https://gateway.marvel.com:443/v1/public/comics?hasDigitalIssue=true&limit=100&apikey=87c0ace5916b863684257b003dbe6a5f';
    } else {
        marvelAPI = 'https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=87c0ace5916b863684257b003dbe6a5f';
    }
    $.ajax({
        url: marvelAPI,
        type: 'get',
        dataType: 'json',
        success: function (response) {
            var results = response.data.results;

            infoComic(results);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        cargaDatos == false;
    }).done(function () {
        cargaDatos = true;
    }).always(function () {
        comprobarDatos();
    })

}

function comprobarDatos() {
    if (cargaDatos == true) {
        $('#contenedor-spinner').hide();
        $('#contenedor-formulario').show();
    } else {
        $('#contenedor-spinner').hide();
        $('#contenedor-error').show();
    }
}

function infoComic(results) {
    var idSeleccion = localStorage.getItem('idSeleccion');

    for (var i in results) {
        if (opcion == 'comic') {
            if ("comic" + i == idSeleccion) {
                datosComic.push(results[i]);
            }
        } else {
            if ("personaje" + i == idSeleccion) {
                datosPersonaje.push(results[i]);
            }
        }
    }
    infoPagina();
}

function infoPagina() {
    var contenedor = document.getElementById('form-comic');
    var imagen = document.createElement('img');
    if (opcion == "comic") {
        imagen.setAttribute('src', datosComic[0].thumbnail.path + '/portrait_incredible.' + datosComic[0].thumbnail.extension);
        imagen.setAttribute('alt', datosComic[0].title);
    } else {
        imagen.setAttribute('src', datosPersonaje[0].thumbnail.path + '/portrait_incredible.' + datosPersonaje[0].thumbnail.extension);
        imagen.setAttribute('alt', datosPersonaje[0].name);
    }
    imagen.setAttribute('id', 'comic-form');
    contenedor.appendChild(imagen);

    var span = document.createElement('span');
    if (opcion == "comic") {
        span.textContent = datosComic[0].title;
    } else {
        span.textContent = datosPersonaje[0].name;
    }
    contenedor.appendChild(span);
}

function asignarEventos() {
    var $botones = $('button');

    $($botones[0]).on('click', function () {
        location.href = ('comic.html');
    })

    $('form').on('submit', function () {
        sumarPuntuaciones();
    })
}

function sumarPuntuaciones() {
    contadorVotos = localStorage.getItem('idVotos');

    if (contadorVotos == null) {
        contadorVotos = 1;
        localStorage.setItem('idVotos', contadorVotos);
    } else {
        contadorVotos++;
        localStorage.setItem('idVotos', contadorVotos);
    }

    var idSeleccion = localStorage.getItem('idSeleccion');
    var seleccionado = localStorage.getItem(idSeleccion);
    seleccionado = JSON.parse(seleccionado);
    seleccionado[1] = seleccionado[1] + 1;

    if (opcion == "comic") {
        var comic = [seleccionado[0], seleccionado[1]];
        localStorage.setItem(idSeleccion, JSON.stringify(comic));
    } else {
        var personaje = [seleccionado[0], seleccionado[1]];
        localStorage.setItem(idSeleccion, JSON.stringify(personaje));
    }

    var votante = [$('#txtNombre').val(), $('#txtApellido').val(), $('#txtTelefono').val(), $('#txtCorreo').val(), $('#txtFecha').val(), "Pelicula: " + seleccionado[0]];
    localStorage.setItem('Votante-' + contadorVotos, JSON.stringify(votante));

}