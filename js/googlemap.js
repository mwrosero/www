var _limit_cajeros_mapa = 15;
var _markerMe="images/marker_me.png";
var _markerCajero="images/marker_cajero.png";
var map;

function setMapCurrentPosition() {
    //alert("setMapCurrentPosition");
    $.ajax({
        url: 'http://maruridigitaldev.com/bin/bancointernacional/services/get_cajeros_cercanos.php',
        type: "POST",
        cache: false,
        dataType: "json",
        data: "lat=" + _myLatitude + "&long=" + _myLongitude + "&limit=" + _limit_cajeros_mapa,
        success: function (response) {
            if (response != null && response != '' && response != '[]') {
                //---------  display mapa -----------------
                var markers = new Array();
                $.each(response, function (key, value) {
                    markers.push({
                        'lat': value.latitud,
                        'long': value.longitud,
                        'ciudad':value.ciudad,
                        'direccion':value.direccion,
                        'distancia':value.distancia,
                        'institucion':value.institucion
                    });
                });

                displayMapa('map_canvas', _myLatitude, _myLongitude, markers);

                $.each(response, function (key, value) {
                    //$('#lista2').append('<li><a href="javascript:displayCajero(' + value.latitud + ',' + value.longitud + ',\'' + value.institucion + '\',\'' + value.direccion + '\')"><img src="images/lista_asset2.png" class="ui-li-icon ui-corner-none textolista">' + value.institucion + '<span class="ui-li-count"><div class="dist">' + value.distancia + ' km</div></span></a></li>');
                });
            }
        },
        error: function (error) {
            //$('.info_baloom').attr('src', 'images/info.png');
        }
    });
}

function getCurrentPosition() {
    //alert("getCurrentPosition");
    //$('.info_baloom').attr('src', 'images/ajax-loader.gif');

    //RICHARD
       if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    //alert('EXIIIITO '+position.coords.latitude);
                    _myLatitude = position.coords.latitude;
                    _myLongitude = position.coords.longitude;
                    setMapCurrentPosition();
                },
                function() {
                  //alert('0 polito');
                }, {
                    enableHighAccuracy: true,
                    timeout: 100000,
                    maximumAge: 0,
                    frequency:500
                });
        } else {
            //alert('no gps');
        }





    // MICHAEL
   /* navigator.geolocation.getCurrentPosition(
        function (position) {
            _myLatitude = position.coords.latitude;
            _myLongitude = position.coords.longitude;
            setMapCurrentPosition();
        },
        function (error) {
            //$('.info_baloom').attr('src', 'images/info.png');
            alert("La aplicación no pudo obtener la posición GPS exacta, es necesario activar esta función.");
            numeroPagina=99;
            goTo('#home-page');
        }
        //{timeout: 5000},
    );*/
}


function refreshMap(){
    //$('.info_baloom').attr('src','images/ajax-loader.gif');
    setTimeout(function(){
        getCurrentPosition();
    },500);
}

function displayMapa(_container, _lat, _long, _markers) {
    //var pos = new google.maps.LatLng(_lat, _long);
    //alert("displayMapa");
    var mapOptions = {
        center: new google.maps.LatLng(_lat, _long),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById(_container), mapOptions);
    //var center_ext =  new google.maps.LatLng(_lat, _long);
    //map.setCenter(center_ext);

    // MARKER ME  ----------
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(_myLatitude, _myLongitude),
        map: map,
        icon: _markerMe
    });

    // MARKERS CAJEROS --------
    setTimeout(function () {
        var marker;
        var infowindow = new google.maps.InfoWindow({
            content: ''
        });
        $.each(_markers, function (key, obj) {
            var contenido = "<div style=\"font-family:Arial;\"><span style=\"font-weight:bold;\">"+obj.institucion+"</span></br><span style=\"font-style:italic;\">"+obj.direccion+"</span></br><span style=\"font-style:italic;\">"+obj.ciudad+"</span></span></br><span style=\"font-style:italic;\">Distancia: "+obj.distancia+"km.</span>";
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(obj.lat, obj.long),
                map: map,
                animation: google.maps.Animation.DROP,
                icon: _markerCajero
            });
            (function(marker, contenido){                       
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(contenido);
                    infowindow.open(map, marker);
                });
            })(marker,contenido);
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });

    }, 1000);

    $('#map_canvas').click(function(){
        google.maps.event.trigger(map, 'resize');
    }); 

    google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
        //this part runs when the mapobject is created and rendered
        google.maps.event.trigger(map, 'resize');
        google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
            //this part runs when the mapobject shown for the first time
            google.maps.event.trigger(map, 'resize');
        });
    });
}