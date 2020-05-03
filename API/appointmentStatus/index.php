<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: GET");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    
    if(isset($_GET) && isset($_GET["matricNo"])){
        include "../../crud/connect.php";
        
        $matricNo=$_GET["matricNo"];
        $password=$_GET["password"];        
        $status=$_GET["status"];
        $id=$_GET["id"];
        $date=date("Y-M-d");
        $time=date("h:ia");

        if(strtolower($status)=="approved"){
            $query= "UPDATE `appointment` SET `status`='Approved', approvedBy='$matricNo', dateApproved='$date', timeApproved='$time'  WHERE id='$id';";
        }
        else if(strtolower($status)=="completed"){
            $query= "UPDATE `appointment` SET `status`='Completed', completedBy='$matricNo', dateCompleted='$date', timeCompleted='$time'  WHERE id='$id';";
        }
        else if(strtolower($status)=="declined"){
            $query= "UPDATE `appointment` SET `status`='Declined', declinedBy='$matricNo', dateDeclined='$date', timeDeclined='$time'  WHERE id='$id';";
        }
        else{
            echo json_encode(array("error"=>TRUE,"message"=>"Invalid Status"));
        }

        $query1="SELECT * FROM users WHERE matricNo='$matricNo';";
        $query2="SELECT (`type`) FROM userdetails WHERE matricNo='$matricNo';";
        
        if($result1=mysqli_query($link,$query1)){
            $row=mysqli_fetch_array($result1,MYSQLI_ASSOC);
            if($password==$row["password"]){
               if($result2=mysqli_query($link,$query2)){
                 $row2=mysqli_fetch_array($result2,MYSQLI_ASSOC);
                 if($row2["type"]=="admin"){
                    if($result=mysqli_query($link,$query)){
                        echo json_encode(array('error'=>FALSE,'data'=>array("success"=>TRUE)));
                       }
                       else{
                        echo json_encode(mysqli_error($link));
                       }
                 }
                 else{
                     echo json_encode(array("error"=>TRUE,"message"=>"You are not an admin user"));
                 }
               }
               else{
                echo json_encode(array("error"=>TRUE,"message"=>"Could not get type"));
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