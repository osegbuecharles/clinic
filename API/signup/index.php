<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: GET");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
  if($_GET && isset($_GET["matricNo"]) && isset($_GET["password"])){
    include_once "../../crud/connect.php";
    $matricNo = $_GET["matricNo"];
    $password = md5($_GET["password"]);
    $lastName = $_GET["lastName"];
    $firstName = $_GET["firstName"];
    $email = $_GET["email"];
    $dob = $_GET["dob"];
    $phone = $_GET["phone"];
    $address = $_GET["address"];
    $gender = $_GET["gender"];
    $date=date("Y-M-d");
    $time=date("h:ia");
    $query1= "INSERT INTO `users` (matricNo,`password`) VALUES ('$matricNo','$password');";
    $query2= "INSERT INTO `userdetails` (matricNo,lastName,firstName,email,phone,gender,`address`,`d.o.b`,dateCreated,timeCreated,`type`,lastSeen) VALUES ('$matricNo','$lastName','$firstName','$email','$phone','$gender','$address','$dob','$date','$time','user','$date $time');";
    $query3="SELECT * FROM `users` WHERE matricNo='$matricNo'";
    $result=array();
    $result["error"]="FALSE";
    $result["data"]=array();
    if(mysqli_fetch_array(mysqli_query($link,$query3),MYSQLI_ASSOC)!=null){
      echo json_encode(array('error'=>TRUE,'message'=>"User already exists!"));
    }
    else{
      if($result1=mysqli_query($link,$query1)){
        if($result2=mysqli_query($link,$query2)){
          $result["error"]=FALSE;
          $result["data"]=array(
            "success"=>TRUE
          );
          echo json_encode($result);
        }
        else{
          echo json_encode(mysqli_error($link));
        }
      }
      else{
        echo json_encode(mysqli_error($link));
      }
    }
  }
  else{
    echo json_encode(array('error'=>TRUE,'message'=>'Not a GET request'));
  } 
?>