var idComics = [];
var idPersonajes = [];
var todosComics = [];
var todosPersonajes = [];

var titulosComics = [];
var titulosPersonajes = [];
var votosComics = [];
var votosPersonajes = [];

var cargaDatosPersonajes;
var cargaDatosComics;

$(document).ready(function () {
    $('#contenedor-puntuaciones').hide();
    LecturaComics();
    LecturaPersonajes();
    asignarEventos();
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
            cargarLocalStorage(results);
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
            cargarLocalStorage2(results);
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
        $('#contenedor-puntuaciones').show();
    }
    if (cargaDatosComics == false || cargaDatosPersonajes == false) {
        $('#contenedor-spinner').hide();
        $('#contenedor-error').show();
    }
}

function cargarLocalStorage(comics) {
    for (var i in comics) {
        idComics.push("comic" + i);
    }

    for (var i = 0; i < idComics.length; i++) {
        var comic = localStorage.getItem(idComics[i]);
        comic = JSON.parse(comic);

        todosComics.push(comic);

        if (comic[1] != 0) {
            titulosComics.push(comic[0]);
            votosComics.push(comic[1]);
        }
    }
}

function cargarLocalStorage2(personajes) {
    for (var i in personajes) {
        idPersonajes.push("personaje" + i);
    }

    for (var i = 0; i < idPersonajes.length; i++) {
        var personaje = localStorage.getItem(idPersonajes[i]);
        personaje = JSON.parse(personaje);

        todosPersonajes.push(personaje);

        if (personaje[1] != 0) {
            titulosPersonajes.push(personaje[0]);
            votosPersonajes.push(personaje[1]);
        }
    }
}

function cargarGrafico() {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'titulo');
        data.addColumn('number', 'Votaciones');

        for (var i = 0; i < titulosComics.length; i++) {
            data.addRow([titulosComics[i], votosComics[i]]);
        }

        var options = {
            title: 'Votaciones de los comics'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }
}

function cargarGrafico2() {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'titulo');
        data.addColumn('number', 'Votaciones');

        for (var i = 0; i < titulosComics.length; i++) {
            data.addRow([titulosComics[i], votosComics[i]]);
        }

        var options = {
            title: 'Votaciones de los comics',
            chartArea: {
                width: '50%'
            },
            hAxis: {
                title: 'Total Votos',
                minValue: 0
            },
            vAxis: {
                title: 'Titulos'
            }
        };

        var chart = new google.visualization.BarChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }
}

function cargarGrafico3() {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'titulo');
        data.addColumn('number', 'Votaciones');

        for (var i = 0; i < titulosComics.length; i++) {
            data.addRow([titulosComics[i], votosComics[i]]);
        }

        var options = {
            title: 'Votaciones de los comics',
            vAxis: {
                title: 'Votos'
            },
            hAxis: {
                title: 'Fecha'
            },
            seriesType: 'bars',
            series: {
                5: {
                    type: 'line'
                }
            }
        };

        var chart = new google.visualization.ComboChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }
}

function cargarGrafico4() {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'titulo');
        data.addColumn('number', 'Votaciones');

        for (var i = 0; i < titulosPersonajes.length; i++) {
            data.addRow([titulosPersonajes[i], votosPersonajes[i]]);
        }

        var options = {
            title: 'Votaciones de los personajes'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart2'));

        chart.draw(data, options);
    }
}

function cargarGrafico5() {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'titulo');
        data.addColumn('number', 'Votaciones');

        for (var i = 0; i < titulosPersonajes.length; i++) {
            data.addRow([titulosPersonajes[i], votosPersonajes[i]]);
        }

        var options = {
            title: 'Votaciones de los personajes',
            chartArea: {
                width: '50%'
            },
            hAxis: {
                title: 'Total Votos',
                minValue: 0
            },
            vAxis: {
                title: 'Titulos'
            }
        };

        var chart = new google.visualization.BarChart(document.getElementById('piechart2'));

        chart.draw(data, options);
    }
}

function cargarGrafico6() {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'titulo');
        data.addColumn('number', 'Votaciones');

        for (var i = 0; i < titulosPersonajes.length; i++) {
            data.addRow([titulosPersonajes[i], votosPersonajes[i]]);
        }

        var options = {
            title: 'Votaciones de los personajes',
            vAxis: {
                title: 'Votos'
            },
            hAxis: {
                title: 'Fecha'
            },
            seriesType: 'bars',
            series: {
                5: {
                    type: 'line'
                }
            }
        };

        var chart = new google.visualization.ComboChart(document.getElementById('piechart2'));
        chart.draw(data, options);
    }
}

function asignarEventos() {
    var $botones = $('button');

    $($botones[0]).on('click', function () {
        cargarGrafico();
        cargarGrafico4();
    })

    $($botones[1]).on('click', function () {
        cargarGrafico2();
        cargarGrafico5();
    })

    $($botones[2]).on('click', function () {
        cargarGrafico3();
        cargarGrafico6();
    })

    $($botones[3]).on('click', function () {
        location.href = ('../index.html');
    })
}