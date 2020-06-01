<?php
define('DB_SERVER', '127.0.0.1');
define('DB_USERNAME', 'charles');
define('DB_PASSWORD', 'ase2016_378002');
define('DB_NAME', 'clinic');

//define('DB_SERVER', 'remotemysql.com');
//define('DB_NAME', '8egT4n6Ekg');
//define('DB_USERNAME', '8egT4n6Ekg');
//define('DB_PASSWORD', '8SqVdcbRrb');

/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($link === false){
    echo("<script>alert('nolink');</script>");
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>