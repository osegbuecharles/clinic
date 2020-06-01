<?php

define('DB_SERVER', 'remotemysql.com');
define('DB_NAME', '8egT4n6Ekg');
define('DB_USERNAME', '8egT4n6Ekg');
define('DB_PASSWORD', '8SqVdcbRrb');

/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($link === false){
    echo("<script>alert('nolink');</script>");
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>