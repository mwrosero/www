<?php
	include("db.php");
	
	header("Content-Type: application/json",true);

	$valor = $_REQUEST['valor'];

	$result=Select("SELECT * FROM rango_bancontrol WHERE '".$valor."' between min and max");	
	$lista = array();
	
	while($row = mysql_fetch_array($result)){
		array_push($lista,array("mensaje"=>utf8_encode($row['mensaje'])));
	}		
	
	echo json_encode($lista);
	
?>