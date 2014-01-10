/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 /*
$(window).height();   // returns height of browser viewport
$(document).height(); // returns height of HTML document
$(window).width();   // returns width of browser viewport
$(document).width(); // returns width of HTML document
 */

var numeroPagina = 0;
var alto = $(window).height()*0.58;
var alto_chat = $(window).height()*0.40;
var ancho = $(window).width()*0.9;
var deviceID;
    
//alert("window:"+$(window).height()+"document:"+$(document).height());

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        run();
        /*setTimeout(function () {
            getCurrentPosition();
        }, 1000);*/
        //alert(deviceID);

        $('#map_canvas').css("height",alto+"px");
        $('#map_canvas').css("width",ancho+"px");
        
        $('#chat-wrapp').css("height",alto_chat+"px");
        
        $('.img-back').click(function(){
            numeroPagina=99;            
        });

        $('#btn_enviar_quiero').click(function(){
            validarRegistro();            
        });

        $('#btn_enviar_chat').click(function(){
            setTimeout(function () {
                enviarMensajeChat();
            }, 500);
        });
        
        $('.b_i').click(function(){
            opcionIngresos();            
        });

        $('.back-btn-reg').click(function(){
            setTimeout(function () {
                resetFormulario();                
            }, 1000);
        });
        
        $('.b_g').click(function(){
            opcionGastos();            
        });

        $('#btn_asesor').click(function(){
            opcionAsesor(1);            
        });

        $('#btn_asesor_2').click(function(){
            opcionAsesor(2);            
        });
        
        $('#btn_asesor_3').click(function(){
            opcionAsesor(3);            
        });

        $('#btn_asesor_4').click(function(){
            opcionAsesor(4);            
        });

        $('#map_canvas').click(function(){
            //alert('aja');
            $('#map_canvas').css("display","inline-table");            
            google.maps.event.trigger(map, 'resize');
        });

        $(".ingresos_txt").change(function(){
            sumarIngresos();
        });

        $(".txt_gastos").change(function(){
            sumarGastos();
        });

        $('.link').live('tap', function() {
            url = $(this).attr("rel");   
            loadURL(url);
        });

        $('.izq-tw').click(function(){
            
        });

        setTimeout(function () {
            obtenerTuit();
        },500);
        llenarPublicidad();

        setTimeout(function () {
            //alert("setTimeout");
            google.maps.event.trigger(map, 'resize');
        }, 1500);


    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        document.addEventListener("backbutton", backKeyDown, true);
        app.receivedEvent('deviceready');
        //document.addEventListener("backbutton", app.backKeyDown, true);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        deviceID = device.uuid;
        //alert(deviceID);
        compruebaUsuario();
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }/*,
    backKeyDown: function(){
    	alert("prueba");
    }*/
    
};

function goTo(_pageid) {
    $.mobile.changePage(_pageid, {
        transition: "fade",
        reverse: true,
        changeHash: false
    });
}

function run(){
    //alert('hola mundo');
    setTimeout(function () {
        numeroPagina=99;
        goTo('#menu-page');
        $('#map_canvas').trigger('click');
    }, 1500);
}

function direccionar(pagina){
    if(pagina==1){
        getCurrentPosition();
        numeroPagina=1;
        goTo('#cerca-page');
        $('#map_canvas').trigger('click');
        setTimeout(function () {
            $('#map_canvas').css("display","inline-table");
            google.maps.event.trigger(map, 'resize');
        }, 1000);
    }
    if(pagina==2){
        numeroPagina=2;
        goTo('#quiero-page');
    }
    if(pagina==3){
        numeroPagina=3;
        goTo('#bancontrol-page');
    }
    if(pagina==4){
        numeroPagina=4;
        goTo('#beneficios-page');
    }
    if(pagina==5){
        numeroPagina=5;
        goTo('#servicios-page');
    }
    if(pagina==6){
        numeroPagina=6;
        goTo('#interbox-page');
    }
}

function validarRegistro(){
    var nombre = $('#txt_nombre').val();
    var apellido = $('#txt_apellido').val();
    var cedula = $('#txt_cedula').val();
    var ciudad = $('#txt_ciudad').val();
    var direccion = $('#txt_direccion').val();
    var telefono = $('#txt_telefono').val();
    var cc = "";
    var ca = "";
    var inv = "";
    var pr = "";
    var tc = "";

    var status = $('input[type="checkbox"]').filter('.custom').map(function(){
        var name = $(this).attr('name'); 
        if($(this).is(':checked'))
            return { 'name':name, 'status' : '1'}; 
        else
            return { 'name':name, 'status' : '0'};
    });

    $.each(status, function( key, value ) {
        if(value.name=="checkbox-v-2a")
            cc = value.status;
        if(value.name=="checkbox-v-2b")
            ca = value.status;
        if(value.name=="checkbox-v-2c")
            inv = value.status;
        if(value.name=="checkbox-v-2d")
            pr = value.status;
        if(value.name=="checkbox-v-2e")
            tc = value.status;
    });
    //alert("CC:"+cc+"TC:"+tc);
    if(nombre.length<5){
        $('#txt_nombre').css("border","2px solid red");
                
    }else{
        $('#txt_nombre').css("border","1px solid #aaa");
    }

    if(apellido.length<5){
        $('#txt_apellido').css("border","2px solid red");        
    }else{
        $('#txt_apellido').css("border","1px solid #aaa");
    }

    if(!esCedulaValida(cedula)){
        $('#txt_cedula').css("border","2px solid red");        
    }else{
        $('#txt_cedula').css("border","1px solid #aaa");
    }

    if(ciudad.length<5){
        $('#txt_ciudad').css("border","2px solid red");        
    }else{
        $('#txt_ciudad').css("border","1px solid #aaa");
    }

    if(direccion.length<5){
        $('#txt_direccion').css("border","2px solid red");        
    }else{
        $('#txt_direccion').css("border","1px solid #aaa");
    }

    if(telefono.length<7){
        $('#txt_telefono').css("border","2px solid red");        
    }else{
        $('#txt_telefono').css("border","1px solid #aaa");
    }

    if(nombre.length<5 || apellido.length<5 || telefono.length<7 || !esCedulaValida(cedula) || direccion.length<3 || ciudad.length<5){
        $('#mensaje_error').css("display","inline-table");
    }else{
        $('#mensaje_error').css("display","none");
        $.ajax({
            url: 'http://maruridigitaldev.com/bin/bancointernacional/services/saveRegister.php',
            type: "POST",
            cache: false,
            //dataType: "json",
            data: "nombres="+nombre+"&apellidos="+apellido+"&identificacion="+cedula+"&ciudad="+ciudad+"&direccion="+direccion+"&telefono="+telefono+"&cc="+cc+"&ca="+ca+"&in="+inv+"&pr="+pr+"&tc="+tc,
            success: function (response) {
                alert(response);
                resetFormulario();
            },
            error: function (error) {
                
            }
        });
    }

}

function opcionIngresos(){
    $('.ing_').css("display","inline-table");
    $('.gas_').css("display","none");
}

function opcionGastos(){
    $('.gas_').css("display","inline-table");
    $('.ing_').css("display","none");    
}

function opcionAsesor(indice){
    
    if(indice==1){
        var total_ing = $('#txt_total_ing').val();
        var total_gas = $('#txt_total_gas').val();
        var total = parseFloat(('0' + total_ing).replace(/[^0-9-\.]/g,''),10)-parseFloat(('0' + total_gas).replace(/[^0-9-\.]/g,''),10);
        var total_var = total.toFixed(2);
    }
    if(indice==2){
        var total_ing = $('#txt_total_ing_2').val();
        var total_gas = $('#txt_total_gas_2').val();
        var total = parseFloat(('0' + total_ing).replace(/[^0-9-\.]/g,''),10)-parseFloat(('0' + total_gas).replace(/[^0-9-\.]/g,''),10);
        var total_var = total.toFixed(2);
    }
    if(indice==3){
        var total_ing = $('#txt_total_ing_3').val();
        var total_gas = $('#txt_total_gas_3').val();
        var total = parseFloat(('0' + total_ing).replace(/[^0-9-\.]/g,''),10)-parseFloat(('0' + total_gas).replace(/[^0-9-\.]/g,''),10);
        var total_var = total.toFixed(2);
    }
    if(indice==4){
        var total_ing = $('#txt_total_ing_4').val();
        var total_gas = $('#txt_total_gas_4').val();
        var total = parseFloat(('0' + total_ing).replace(/[^0-9-\.]/g,''),10)-parseFloat(('0' + total_gas).replace(/[^0-9-\.]/g,''),10);
        var total_var = total.toFixed(2);
    }
    analizar(total_var);
    //alert(total.toFixed(2));

}

function analizar(total_var){
    $.ajax({
        url: 'http://maruridigitaldev.com/bin/bancointernacional/services/analizar_bancontrol.php',
        type: "POST",
        cache: false,
        dataType: "json",
        data: "valor=" + total_var,
        success: function (response) {
            if (response != null && response != '' && response != '[]') {
                $.each(response, function (key, value) {
                    //id_accion: 1 -> Beneficios, 2 -> Interbox
                    alert("Total: "+total_var+"\n"+value.mensaje);
                });
            }
        },
        error: function (error) {
            
        }
    });
}

function sumarIngresos(){
    var num1 = $('#txt_sueldo_ing').val();
    var num2 = $('#txt_ahorros_ing').val();
    var num3 = $('#txt_otro_ing').val();
    var total = parseFloat(('0' + num1).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num2).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num3).replace(/[^0-9-\.]/g,''),10);;

    $('#txt_total_ing').val(total.toFixed(2));

    var num4 = $('#txt_sueldo_ing_2').val();
    var num5 = $('#txt_ahorros_ing_2').val();
    var num6 = $('#txt_otro_ing_2').val();
    var total2 = parseFloat(('0' + num4).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num5).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num6).replace(/[^0-9-\.]/g,''),10);;

    $('#txt_total_ing_2').val(total2.toFixed(2));

    var num7 = $('#txt_sueldo_ing_3').val();
    var num8 = $('#txt_ahorros_ing_3').val();
    var num9 = $('#txt_otro_ing_3').val();
    var total3 = parseFloat(('0' + num7).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num8).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num9).replace(/[^0-9-\.]/g,''),10);;

    $('#txt_total_ing_3').val(total3.toFixed(2));

    var num10 = $('#txt_sueldo_ing_4').val();
    var num11 = $('#txt_ahorros_ing_4').val();
    var num12 = $('#txt_otro_ing_4').val();
    var total4 = parseFloat(('0' + num10).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num11).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num12).replace(/[^0-9-\.]/g,''),10);;

    $('#txt_total_ing_4').val(total4.toFixed(2));
}

function sumarGastos(){
    var num1 = $('#txt_alimentacion_gas').val();
    var num2 = $('#txt_educacion_gas').val();
    var num3 = $('#txt_transporte_gas').val();
    var num4 = $('#txt_servicios_gas').val();
    var num5 = $('#txt_arriendo_gas').val();
    var num6 = $('#txt_vestimenta_gas').val();
    var total = parseFloat(('0' + num1).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num2).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num3).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num4).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num5).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num6).replace(/[^0-9-\.]/g,''),10);

    $('#txt_total_gas').val(total.toFixed(2));

    var num7 = $('#txt_alimentacion_gas').val();
    var num8 = $('#txt_educacion_gas').val();
    var num9 = $('#txt_transporte_gas').val();
    var num10 = $('#txt_servicios_gas').val();
    var num11 = $('#txt_arriendo_gas').val();
    var num12 = $('#txt_vestimenta_gas').val();
    var total2 = parseFloat(('0' + num7).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num8).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num9).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num10).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num11).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num12).replace(/[^0-9-\.]/g,''),10);

    $('#txt_total_gas').val(total2.toFixed(2));

    var num13 = $('#txt_alimentacion_gas').val();
    var num14 = $('#txt_educacion_gas').val();
    var num15 = $('#txt_transporte_gas').val();
    var num16 = $('#txt_servicios_gas').val();
    var num17 = $('#txt_arriendo_gas').val();
    var num18 = $('#txt_vestimenta_gas').val();
    var total3 = parseFloat(('0' + num13).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num14).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num15).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num16).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num17).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num18).replace(/[^0-9-\.]/g,''),10);

    $('#txt_total_gas').val(total3.toFixed(2));

    var num19 = $('#txt_alimentacion_gas').val();
    var num20 = $('#txt_educacion_gas').val();
    var num21 = $('#txt_transporte_gas').val();
    var num22 = $('#txt_servicios_gas').val();
    var num23 = $('#txt_arriendo_gas').val();
    var num24 = $('#txt_vestimenta_gas').val();
    var total4 = parseFloat(('0' + num19).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num20).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num21).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num22).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num23).replace(/[^0-9-\.]/g,''),10)+parseFloat(('0' + num24).replace(/[^0-9-\.]/g,''),10);

    $('#txt_total_gas').val(total4.toFixed(2));
}

function backKeyDown() {
    /*alert('exit');
    navigator.app.exitApp();*/
    if(numeroPagina==99){
        navigator.app.exitApp();
    }else{
        numeroPagina=99;
        goTo('#menu-page');
        setTimeout(function () {
            resetFormulario();                
        }, 1000);
    }
}

function loadURL(url){
    navigator.app.loadUrl(url, { openExternal:true });
    return false;
}

//Cedula ecuatoriana
function esCedulaValida(cedula){
    var array = cedula.split("");
    var num = array.length;
    if(num == 10){
        total = 0;
        digito = (array[9]*1);
        for(i=0; i < (num-1); i++){
            mult = 0;
            if ((i%2) != 0) {
                total = total + (array[i] * 1);
            }else{
                mult = array[i] * 2;
                if(mult > 9)
                    total = total + ( mult - 9 );
                else
                    total = total + mult;
            }
        }
        decena = total / 10;
        decena = Math.floor(decena);
        decena = (decena + 1) * 10;
        final = (decena - total);
        if((final == 10 && digito == 0) || (final == digito)){
            //alert( "La c\xe9dula ES v\xe1lida!!!" );
            return true;
        }
        else{
          //alert( "La c\xe9dula NO es v\xe1lida!!!" );
          //$('#txt_cedula').css("border-color","red");
          return false;
        }
    }else{
        //alert("La c\xe9dula debe tener 10 d\xedgitos");
        //$('#txt_cedula').css("border-color","red");
        return false;
    }
}

function resetFormulario(){
    $('#txt_nombre').css("border","1px solid #aaa");
    $('#txt_apellido').css("border","1px solid #aaa");
    $('#txt_cedula').css("border","1px solid #aaa");
    $('#txt_ciudad').css("border","1px solid #aaa");
    $('#txt_direccion').css("border","1px solid #aaa");
    $('#txt_telefono').css("border","1px solid #aaa");
    $('#mensaje_error').css("display","none");

    $('#txt_nombre').val("");
    $('#txt_apellido').val("");
    $('#txt_cedula').val("");
    $('#txt_ciudad').val("");
    $('#txt_direccion').val("");
    $('#txt_telefono').val("");

    $.each($("input[type=checkbox]"), function(){
        $(this).attr("checked",false).checkboxradio("refresh");
    });

}

function llenarPublicidad(){
    $.ajax({
        url: 'http://maruridigitaldev.com/bin/bancointernacional/services/get_publicidad.php',
        type: "POST",
        cache: false,
        dataType: "json",
        //data: "id_homologacion_app=" + param,
        success: function (response) {
            if (response != null && response != '' && response != '[]') {
                $.each(response, function (key, value) {
                    //id_accion: 1 -> Beneficios, 2 -> Interbox
                    if(value.id_seccion==1){
                        $('#anun_ben').append('<a href="#"" class="link" rel="' + value.link + '"><img class="propaganda" src="' + value.ruta + '"></a></br>');
                    }
                    if(value.id_seccion==2){
                        $('#anun_int a').empty();
                        $('#anun_int').append('<a href="#"" class="link" rel="' + value.link + '"><img class="propaganda" src="' + value.ruta + '"></a>');
                    }
                });
            }
        },
        error: function (error) {
            
        }
    });
}

function obtenerTuit(){
    $.ajax({
        url: 'http://maruridigitaldev.com/bin/bancointernacional/services/get_tuit.php',
        type: "POST",
        cache: false,
        dataType: "json",
        //data: "id_homologacion_app=" + param,
        success: function (response) {
            if (response != null && response != '' && response != '[]') {
                $.each(response, function (key, value) {
                    $('.der-tw').append('<a href="#" class="link" rel="https://twitter.com/home?status='+value.tuit+'"><p>' + value.tuit + '"</p></a>');
                });
            }
        },
        error: function (error) {
            
        }
    });
}

function enviarMensajeChat(){
    send_m();
    /*var txt_mensaje = $('#txt_mensaje_chat').val();
    $('#chat-bottom').remove();
    $('#chat-wrapp').append('<div class="titulo_usuario_chat"><h2>Baninter</h2></div><p>' + txt_mensaje + '</p>');
    $('#chat-wrapp').append('<p id="chat-bottom"></p>');
    $('#txt_mensaje_chat').val("");
    $('#txt_mensaje_chat').css("height","20%");
    document.getElementById("chat-bottom").scrollIntoView();*/
}

function scrollIntoView(eleID) {
   var e = document.getElementById(eleID);
   if (!!e && e.scrollIntoView) {
       e.scrollIntoView();
   }
}