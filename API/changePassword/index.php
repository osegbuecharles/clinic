<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: GET");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  if($_GET && isset($_GET["matricNo"]) && isset($_GET["oldpassword"]) && isset($_GET["newpassword"])){
    include_once "../../crud/connect.php";
    $matricNo=$_GET["matricNo"];
    $oldpassword=md5($_GET["oldpassword"]);
    $newpassword=md5($_GET["newpassword"]);
    $query="SELECT * FROM users WHERE matricNo='$matricNo';";
    $query1="UPDATE users SET `password`='$newpassword' WHERE matricNo='$matricNo';";
    if($result=mysqli_query($link,$query)){
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        if($oldpassword===$row['password']){
            if(mysqli_query($link,$query1)){
                echo json_encode(array("error"=>FALSE,"data"=>array("success"=>TRUE)));
            }
            else{
                echo json_encode(array("error"=>TRUE,"message"=>mysqli_error($link)));
            }
        }
        else{
            echo json_encode(array("error"=>TRUE,"message"=>"Wrong old password"));    
        }
    }
    else{
        echo json_encode(array("error"=>TRUE,"message"=>"User does not exist!"));
    }
  }
  else{
      echo json_encode(array("error"=>TRUE,"message"=>"Not a GET request!"));
  }

?>