var ruta="http://maruridigitaldev.com/bin/bancointernacional/CMS/";
var chat = {
	ini:function(){

	},
	getMessages:function(first_load,me_id,other_id,_callback_get,_beforeSend){
        $.ajax({
           type: "POST",
           url: ruta+"admin/scripts/getMessagesMovil.php",
           data: "first_load="+first_load+"&me_id="+me_id+"&other_id="+other_id,
           cache: false,
           dataType: "json",
           //beforeSend:_beforeSend,
           success:function(data_getMessage){               
               _callback_get(data_getMessage);
           }           
           
        });
	},	
	sendMessage:function(me_id,other_id,message,_callback_send,_beforeSend){		
        $.ajax({
               type: "POST",
               url: ruta+"admin/scripts/sendMessage.php",
               data: "message="+message+"&me_id="+me_id+"&other_id="+other_id,
               cache: false,
               dataType: "json",
               //beforeSend:_beforeSend,
               success:function(data_send){               
                    _callback_send(data_send);
               }           
               
        });    
	}
};