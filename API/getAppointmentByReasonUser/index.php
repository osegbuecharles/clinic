<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: GET");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    
    if(isset($_GET) && isset($_GET["matricNo"])){
        include "../../crud/connect.php";
        
        $matricNo=$_GET["matricNo"];
        $password=$_GET["password"];
        $reason=$_GET["reason"];

        $query= "SELECT * FROM appointment WHERE (matricNo,reason)=('$matricNo','$reason') ORDER BY id DESC;";
        $query1="SELECT * FROM users WHERE matricNo='$matricNo';";
        
        if($result1=mysqli_query($link,$query1)){
            $row=mysqli_fetch_array($result1,MYSQLI_ASSOC);
            if($password==$row["password"]){
                        if($result=mysqli_query($link,$query)){
                            $res=array();
                            while($row1=mysqli_fetch_array($result)){
                                extract($row1);
                                $data=array(
                                    "id"=>$id,
                                   "matricNo"=>$matricNo,
                                   "reason"=>$reason,
                                   "date"=>$date,
                                   "time"=>$time,
                                   "status"=>$status
                                );
                                array_push($res,$data);
                            }                                    
                            echo json_encode(array("error"=>FALSE,"data"=>$res));
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