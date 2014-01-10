<?php
ini_set("memory_limit","100M");
include('config.php');

function Select($sql)
{
	global $db_host,$db_user,$db_pass,$db_dbname;
	$link = mysql_connect($db_host,$db_user,$db_pass)    or die('Could not connect: ' . mysql_error());
	mysql_select_db($db_dbname) or die('Could not select database');
	// Performing SQL query
	$result = mysql_query($sql) or die('Query failed: ' . mysql_error());
	return $result;	
}
function Query($sql)
{
	global $db_host,$db_user,$db_pass,$db_dbname;
	$link = mysql_connect($db_host,$db_user,$db_pass)    or die('Could not connect: ' . mysql_error());
	mysql_select_db($db_dbname) or die('Could not select database');
	//$result = mysql_query($query) or die('Query failed: ' . mysql_error());
	$result = mysql_query($query);
	//mysql_close($link);
	return $result;
}