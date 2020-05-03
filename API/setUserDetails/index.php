<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    if($_GET && isset($_GET["matricNo"])){
        include "../../crud/connect.php";

        $matricNo=$_GET["matricNo"];
        $password=$_GET["password"];
        $lastName=$_GET["lastName"];
        $firstName=$_GET["firstName"];
        $email=$_GET["email"];
        $phone=$_GET["phone"];
        $address=$_GET["address"];
        $date=date("Y-M-d");

        $query="UPDATE userdetails SET lastName ='$lastName', firstName='$firstName', email='$email', phone='$phone', `address`='$address', lastModified='$date' WHERE matricNo='$matricNo' ;";
        $query1="SELECT * FROM users WHERE matricNo='$matricNo';";        

        if($result1=mysqli_query($link,$query1)){
            $row=mysqli_fetch_array($result1,MYSQLI_ASSOC);
            if($password==$row["password"]){
                if($result=mysqli_query($link,$query)){
                    echo json_encode(array('error'=>FALSE,'data'=>array("success"=>TRUE)));    
                }
                else{
                    echo json_encode(mysqli_error($link));
                }
            }
            else{
                echo json_encode(array('error'=>TRUE,'message'=>'You are not authenticated to perform this operation'));
            }

        }
        else{
            echo json_encode(array('error'=>TRUE,'message'=>'User does not exist'));
        }
    }
    else{
        echo json_encode(array("error"=>TRUE,"message"=>"Not a GET request"));
    }
