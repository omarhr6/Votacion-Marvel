var datosComic = [];
var datosPersonaje = [];
var opcion;
var marvelAPI;
var cargaDatos;

$(document).ready(function () {
    $('#contenedor-comic').hide();
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
    }).done(function() {
        cargaDatos = true;
    }).always(function() {
        comprobarDatos();
    })
}

function comprobarDatos() {
    if (cargaDatos == true) {
        $('#contenedor-spinner').hide();
        $('#contenedor-comic').show();
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
    var imagen;

    var header = document.getElementById('header');
    imagen = document.createElement('img');
    imagen.setAttribute('src', '../img/portadas/marvel.png');
    imagen.setAttribute('alt', 'Logo Marvel');
    header.appendChild(imagen);

    var cartelera = document.getElementById('cartelera');
    imagen = document.createElement('img');
    if (opcion == "comic") {
        imagen.setAttribute('src', datosComic[0].thumbnail.path + '/portrait_incredible.' + datosComic[0].thumbnail.extension);
        imagen.setAttribute('alt', datosComic[0].title);
    } else {
        imagen.setAttribute('src', datosPersonaje[0].thumbnail.path + '/portrait_incredible.' + datosPersonaje[0].thumbnail.extension);
        imagen.setAttribute('alt', datosPersonaje[0].name);
    }
    imagen.setAttribute('id', 'carteleraComic');
    cartelera.appendChild(imagen);

    var spanAño = document.getElementById('span-año');
    if (opcion == "comic") {
        spanAño.textContent = datosComic[0].dates[0].date.substr(0, 4);
    } else {
        spanAño.textContent = datosPersonaje[0].modified.substr(0, 4);
    }

    var spanDuracion = document.getElementById('span-precio');
    if (opcion == "comic") {
        spanDuracion.textContent = datosComic[0].prices[0].price + " €";
    }

    var spanCreadores = document.getElementById('span-creador');
    if (opcion == "comic") {
        for (var i = 0; i < datosComic[0].creators.items.length; i++) {
            var spanCreadores1 = document.createElement('span');

            if (datosComic[0].creators.items.length - 1 != i) {
                spanCreadores1.textContent = datosComic[0].creators.items[i].name + ', ';
            } else {
                spanCreadores1.textContent = datosComic[0].creators.items[i].name + '.';
            }
            spanCreadores.appendChild(spanCreadores1);
        }
    }

    var navder = document.getElementById('nav-der');
    var titulo = document.createElement('h2');
    if (opcion == "comic") {
        titulo.textContent = datosComic[0].title;
    } else {
        titulo.textContent = datosPersonaje[0].name;
    }
    titulo.setAttribute('id', 'tituloComic');
    navder.appendChild(titulo);

    var sinopsis = document.createElement('h3');
    sinopsis.textContent = "Sinopsis";
    navder.appendChild(sinopsis);

    var spansinopsis = document.createElement('p');
    if (opcion == "comic") {
        if(datosComic[0].description != ""){
            spansinopsis.textContent = datosComic[0].description;
        }else {
            spansinopsis.textContent = "Descripción no disponible. Disculpen las molestias";
        }
    } else {
        if(datosPersonaje[0].description != ""){
            spansinopsis.textContent = datosPersonaje[0].description;
        }else{
            spansinopsis.textContent = "Descripción no disponible. Disculpen las molestias.";
        }
    }
    navder.appendChild(spansinopsis);
}

function asignarEventos() {
    var $botones = $('button');

    $($botones[0]).on('click', function () {
        location.href = ('../index.html');
    })

    $($botones[1]).on('click', function () {
        votoAnonimo();
    })

    $($botones[2]).on('click', function () {
        location.href = ('form.html');
    })
}

function votoAnonimo() {
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

    location.href = ('puntuaciones.html');
}