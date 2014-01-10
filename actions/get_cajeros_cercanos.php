<?php
	include("db.php");
	
	$condicion="";
	$se_da_condicion=false;

	$limit=100;

	if(isset($_REQUEST['lat']) && isset($_REQUEST['long'])){
		if($_REQUEST['lat']!='' && $_REQUEST['long']!=''){
			$se_da_condicion=true;
		}
	}
/*
	if(isset($_REQUEST['limit'])){
		if($_REQUEST['limit']==10){
			//$limit=$_REQUEST['limit'];	
			$limit=		1000;
		}

	}
	*/

	header("Content-Type: application/json",true);

	if($se_da_condicion){
		//$result=Select("SELECT * FROM (SELECT *,( 3959 * ACOS( COS( RADIANS( ".$_REQUEST['lat']." ) ) * COS( RADIANS( latitud ) ) * COS( RADIANS( longitud ) - RADIANS( ".$_REQUEST['long']." ) ) + SIN( RADIANS( ".$_REQUEST['lat']." ) ) * SIN( RADIANS( latitud ) ) ) ) AS distancia FROM  `cajeros`) AS distancias_table WHERE distancia <=".$distancia_cajeros." order by distancia asc limit ".$limit);	
		$result=Select("SELECT * FROM (SELECT *,( 3959 * ACOS( COS( RADIANS( ".$_REQUEST['lat']." ) ) * COS( RADIANS( latitud ) ) * COS( RADIANS( longitud ) - RADIANS( ".$_REQUEST['long']." ) ) + SIN( RADIANS( ".$_REQUEST['lat']." ) ) * SIN( RADIANS( latitud ) ) ) ) AS distancia FROM  `cajeros`) AS distancias_table order by distancia asc limit ".$limit);	
		
		$lista = array();
		
		$cnt=0;

		while($row = mysql_fetch_array($result))
		{		 
			//if($cnt<1000){
			array_push($lista,array("id"=>$row['id'],"institucion"=>utf8_encode($row['nombre']),"direccion"=>utf8_encode($row['direccion']),"latitud"=>$row['latitud'],"longitud"=>$row['longitud'],"ciudad"=>utf8_encode($row['ciudad']),"distancia"=>number_format($row['distancia'], 2, ".", " ")));
			//}
			//else{
			//	break;
			//}
			$cnt++;
		}		
		echo json_encode($lista);
	}
?>