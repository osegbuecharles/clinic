<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: GET");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    
    if(isset($_GET) && isset($_GET["matricNo"])){
        include "../../crud/connect.php";
        
        $matricNo=$_GET["matricNo"];
        $password=$_GET["password"];
        $id=$_GET["id"];
        $status=$_GET["status"];
        $date=date("Y-M-d");


        $query= "UPDATE patientdrug SET  `status`='$status', updatedBy='$matricNo', dateCompleted='$date' WHERE id='$id';";
        $query1="SELECT * FROM users WHERE matricNo='$matricNo';";
        
        if($result1=mysqli_query($link,$query1)){
            $row1=mysqli_fetch_array($result1,MYSQLI_ASSOC);
            if($password==$row1["password"]){    
                if($result=mysqli_query($link,$query)){
                    echo json_encode(array("error"=>FALSE,"data"=>array("success"=>TRUE)));
                }
                else{
                    echo json_encode(array("error"=>TRUE,"message"=>"Clinic Data does not exists"));
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
        echo json_encode(array('error'=>TRUE,'message'=>'Not a GET request'));
    }

?>