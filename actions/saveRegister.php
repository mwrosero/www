<?php
	include("db.php");
	$nombres = $_REQUEST['nombres'];
	$apellidos = $_REQUEST['apellidos'];
	$identificacion = $_REQUEST['identificacion'];
	$ciudad = $_REQUEST['ciudad'];
	$direccion = $_REQUEST['direccion'];
	$telefono = $_REQUEST['telefono'];
	$cc = $_REQUEST['cc'];
	$ca = $_REQUEST['ca'];
	$in = $_REQUEST['in'];
	$pr = $_REQUEST['pr'];
	$tc = $_REQUEST['tc'];


	$result=Select("INSERT INTO registro_movil(nombres,apellidos,identificacion,ciudad,direccion,telefono,cuenta_corriente,cuenta_ahorro,inversiones,prestamos,tarjeta_credito) values('".$nombres."','".$apellidos."','".$identificacion."','".$ciudad."','".$direccion."','".$telefono."','".$cc."','".$ca."','".$in."','".$pr."','".$tc."')");	
	
	echo "Registro enviado."
	
?>