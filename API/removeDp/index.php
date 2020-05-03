<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: GET");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    
    if(isset($_GET) && isset($_GET["matricNo"])){
        include "../../crud/connect.php";
        
        $matricNo=$_GET["matricNo"];
        $password=$_GET["password"];
        $query= "UPDATE userdetails SET displaypicture=NULL WHERE matricNo='$matricNo';";
        $query1="SELECT * FROM users WHERE matricNo='$matricNo';";        
        $query2="SELECT (displaypicture) FROM userdetails WHERE matricNo='$matricNo';";
        if($result1=mysqli_query($link,$query1)){
            $row=mysqli_fetch_array($result1,MYSQLI_ASSOC);
            if($password==$row["password"]){
                if($result2=mysqli_query($link,$query2)){
                    $row2=mysqli_fetch_array($result2,MYSQLI_ASSOC);
                    extract($row2);
                    $target_dir="../../uploads/displaypictures/";
                    if($displaypicture!=NULL){
                        unlink($target_dir.$displaypicture);
                    }
                    if($result=mysqli_query($link,$query)){
                        echo json_encode(array('error'=>FALSE,'data'=>array("success"=>TRUE)));    
                    }
                    
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
        echo json_encode(array('error'=>TRUE,'message'=>'Not a GET request'));
    }

?>