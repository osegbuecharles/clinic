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

        $query= "SELECT * FROM appointment WHERE (matricNo,id)=('$matricNo','$id');";
        $query1="SELECT * FROM users WHERE matricNo='$matricNo';";
        
        if($result1=mysqli_query($link,$query1)){
            $row=mysqli_fetch_array($result1,MYSQLI_ASSOC);
            if($password==$row["password"]){
                        if($result=mysqli_query($link,$query)){
                            if(mysqli_num_rows($result)>0){
                              $row1=mysqli_fetch_array($result,MYSQLI_ASSOC);
                                extract($row1);
                                $data=array(
                                    "id"=>$id,
                                   "matricNo"=>$matricNo,
                                   "reason"=>$reason,
                                   "date"=>$date,
                                   "time"=>$time,
                                   "status"=>$status
                                );
                               echo json_encode(array("error"=>FALSE,"data"=>$data));
                            }
                            else{
                                echo json_encode(array("error"=>FALSE,"data"=>array()));
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