<?php
	include("db.php");
	
	header("Content-Type: application/json",true);

	$result=Select("SELECT * FROM tuit ORDER BY id_tuit DESC LIMIT 1");	
	$lista = array();
	
	while($row = mysql_fetch_array($result)){
		array_push($lista,array("tuit"=>utf8_encode($row['tuit'])));
	}		
	
	echo json_encode($lista);
	
?>