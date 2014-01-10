<?php
	include("db.php");
	
	header("Content-Type: application/json",true);

	$result=Select("SELECT * FROM publicidad WHERE estado=1 ");	
	$lista = array();
	
	while($row = mysql_fetch_array($result)){
		array_push($lista,array("id_seccion"=>$row['id_seccion'],"ruta"=>utf8_encode($row['ruta']),"link"=>$row['link']));
	}		
	
	echo json_encode($lista);
	
?>