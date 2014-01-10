/*
=============================  CHAT ====================================================
*/
var _first_chat_load=true;
var _meId=0;
var _ci="000";

function startChatDaemon(){
    displayMessages();
    setInterval(displayMessages,10000);
}

function displayMessages(){
	if(_first_chat_load){
		$('#chat-wrapp').empty();
	}
    chat.getMessages(_first_chat_load,_meId,1,function(response1){
         _first_chat_load=false;
         var flagMensajeAgregado=false;
            //var i=0;
                     /*$.each(response1,function(key,obj){
                            i++;
                            });
                            alert(i);*/
                            //alert("dentro de chat.getMessages each 1");
         $.each(response1,function(key,obj){
          //alert("dentro de chat.getMessages each 2");
            //busca si ya no está el mensaje agregado con su id y lo agrega si no es asi
                //alert(key+": "+obj);
            var message_id_found=false;
            $('.message-id').each(function(indice,div){
                //alert($(div).html());
                if($(div).html()==obj.id){
                    message_id_found=true;
                }
            });
            if(!message_id_found){
                var clase_mensaje="me";
                var tipo_emisor = "Usuario";
                if(obj.sender_user_id!=_meId){
                    //var raw=response.split('|');                
                    clase_mensaje="other";
                    tipo_emisor = "Asesor";
                }
                /*MR
                $("#messages").append("<div class='message-id'>"+obj.id+"</div><div class='message "+clase_mensaje+"' >"+obj.mensaje.toString()+"</div>");
                $(".fix-chat").remove();
                $("#messages").prepend("<div class='fix-chat'></div>  ");                
                $("#messages").append("<div class='fix-chat'></div>  ");
                */

                //var txt_mensaje = $('#txt_mensaje_chat').val();
                $('#chat-bottom').remove();
                $('#chat-wrapp').append('<div class="message-id">'+obj.id+'</div>');
                $('#chat-wrapp').append('<div class="titulo_usuario_chat"><h2>'+tipo_emisor+'</h2></div><p>' + obj.mensaje.toString() + '</p>');
                $('#chat-wrapp').append('<p id="chat-bottom"></p>');
                $('#txt_mensaje_chat').val("");
                $('#txt_mensaje_chat').css("height","20%");
                document.getElementById("chat-bottom").scrollIntoView();

                flagMensajeAgregado=true;
            }				
        });   
        if(flagMensajeAgregado){
             //----------pendiente el scroll hay un pequeno error que solucionar de caption
             //$("body").animate({ scrollTop: $(document).height() }, "fast");
             //$("body").animate({ scrollTop: "+=1px" }, "fast");
             //$("#chat-area .header").css("top","10px");
             //$("#chat-area .header").css("top","0px");
        }
     },null);
}

function send_m(){
	if($('#txt_mensaje_chat').val()!=""){
		chat.sendMessage(_meId,1,$('#txt_mensaje_chat').val(),function(response){
                         //alert("dio click a enviar mensaje...");
        },null);
		$('#txt_mensaje_chat').val('');
		//getsMessagesPanelHeight();
		//scrollUpAllMensajes();
	}
	else{
		navigator.notification.alert("debe escribir un mensaje.");
	}
}

/*
============================  AUTENTICACION Y DATOS DE USUARIO =========================
*/
var _primer_uso=true;

function compruebaUsuario(){
    _primer_uso=false;
    $.ajax({
       type: "POST",
       url: "http://maruridigitaldev.com/bin/bancointernacional/CMS/admin/scripts/getUserIDByPin.php",
       data: "pin="+device.uuid,
       cache: false,
       dataType: "json",
       error:function(data){
           
           if(data.responseText!='' && data.responseText!=0){  //s'i existe
               //alert(data.responseText);
               _primer_uso=false;
               var raw=data.responseText.split('|');
               _meId=raw[0];
               _ci=raw[1];               
               /*MR
               $('#lbl_cedula').html(_ci);
               $('#lbl_nombre').html(raw[2]);
               $('#lbl_apellido').html(raw[3]);
               $('#lbl_celular').html(raw[4]);
               $('#txt_cedula').val(_ci);
               $('#txt_nombre').val(raw[2]);
               $('#txt_apellido').val(raw[3]);
               $('#txt_celular').val(raw[4]);
               */
               //$('#guia_nombre_title').html("Bienvenido, "+raw[2]+" "+raw[3]);
               //$('$loading').hide();
               startChatDaemon();
           
           /*MR
           $('.nombre > span').html(raw[2]);
           $('#txt_nombre_mostrado').html(raw[2]);
           */
               //first_time=false;
               //givesButtonEvents1();
               //no hay ajax aqui por lo pronto sino ponerlo en la cadena de carga
               //MostrarContenidoGeo();	
           }else{//no existe              
               _primer_uso=true;
               guardarDatosUsuario();
               //gotoPage("#perfil-edit",false);
           }        
       },
       //beforeSend:_beforeSend,
       success:function(response){            
             if(response!='' && response!=0){  //s'i existe
                //alert(raw[0]);
               _primer_uso=false;
               var raw=response.split('|');
               _meId=raw[0];
               _ci=raw[1];               
               /*MR
               $('#lbl_cedula').html(_ci);
               $('#lbl_nombre').html(raw[2]);
               $('#lbl_apellido').html(raw[3]);
               $('#lbl_celular').html(raw[4]);
               $('#txt_cedula').val(_ci);
               $('#txt_nombre').val(raw[2]);
               $('#txt_apellido').val(raw[3]);
               $('#txt_celular').val(raw[4]);
            */
           /*MR
           $('.nombre > span').html(raw[2]);
           $('#txt_nombre_mostrado').html(raw[2]);
           */
               //$('#guia_nombre_title').html("Bienvenido, "+raw[2]+" "+raw[3]);
               //$('$loading').hide();
               startChatDaemon();
               //first_time=false;
               //givesButtonEvents1();
               //no hay ajax aqui por lo pronto sino ponerlo en la cadena de carga
               //MostrarContenidoGeo();	
             }else{//no existe              
              _primer_uso=true;
              guardarDatosUsuario();
              //gotoPage("#perfil-edit",false);
             }
        }              
   });
}

function guardarDatosUsuario(){
    //$.mobile.showPageLoadingMsg();
    if(_primer_uso){
        $.ajax({
           type: "POST",
           url: "http://maruridigitaldev.com/bin/bancointernacional/CMS/admin/scripts/createUser.php",
           data: "pin="+deviceID,
           cache: false,
           dataType: "json",
           //beforeSend:_beforeSend,
           error:function(response){
               //navigator.notification.alert("0");
               //$.mobile.hidePageLoadingMsg();
           },
               success:function(response){  
               //navigator.notification.alert("1");
               //$.mobile.hidePageLoadingMsg();
               _meId=response; 
               /*MR
               _ci=$('#txt_cedula').val();
               $('#lbl_cedula').html($('#txt_cedula').val());
               $('#lbl_nombre').html($('#txt_nombre').val());
               $('#lbl_apellido').html($('#txt_apellido').val());
               $('#lbl_celular').html($('#txt_celular').val());
               
               $('.nombre > span').html($('#txt_nombre').val());
               $('#txt_nombre_mostrado').html($('#txt_nombre').val());
               */
               //$('#perfil').hide();
               //$('#guia_nombre_title').html("Bienvenido, "+$('#txt_nombre').val()+" "+$('#txt_apellido').val());
               //gotoPage("#perfil-view",false);
               startChatDaemon();
           }              
        });
    }else{
      alert("Usuario ya creado.");
    }
}

