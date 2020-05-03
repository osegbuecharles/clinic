<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: GET");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  if($_GET && isset($_GET["username"]) && isset($_GET["password"])){
    include_once "../../crud/connect.php";
    $username=$_GET["username"];
    $password=$_GET["password"];
    $date=date("Y-M-d");
    $time=date("h:ia");
    $query="SELECT * FROM users WHERE matricNo='$username';";
    $query1="UPDATE userdetails SET lastSeen='$date $time' WHERE `userdetails`.matricNo='$username';";
    $result=array();
    $result["error"]=FALSE;
    $result["data"]=array();
    if($result1=mysqli_query($link,$query)){
        mysqli_query($link,$query1);
        $row=mysqli_fetch_array($result1,MYSQLI_ASSOC);
        if($row!=null) {
          //code...
          if(md5($password)==$row["password"]){
            $result["data"]=array(
                "success"=>TRUE
            );
            echo json_encode($result);
          }
          else{
            echo json_encode(array('error'=>TRUE,'message'=>'Wrong Password or Username'));
          }
        } 
        else{
          //throw $th;
          echo json_encode(array('error'=>TRUE,'message'=>'Wrong Password or Username'));
        }
       
    }
    else{
       echo json_encode(array('error'=>TRUE,'message'=>'Could Not Connect'));
    }
  }
  else{
    echo json_encode(array('error'=>TRUE,'message'=>'Not a GET request'));
  }
?>