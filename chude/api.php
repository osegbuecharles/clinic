<?php
header("Content-Type: application/json; charset=UTF-8");


if(isset($_POST)){
    $name=$_POST["name"];
    $reply=array(
        "error"=>FALSE,
        "name"=>$name
    );
    echo json_encode(array("error"=>FALSE,"name"=>$name));
}

?>