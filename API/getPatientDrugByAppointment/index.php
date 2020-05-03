<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: GET");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    
    if(isset($_GET) && isset($_GET["matricNo"])){
        include "../../crud/connect.php";
        
        $matricNo=$_GET["matricNo"];
        $password=$_GET["password"];
        $appointmentId=$_GET["appointmentId"];

        $query= "SELECT * FROM patientdrug WHERE appointmentId='$appointmentId' ORDER BY id DESC;";
        $query1="SELECT * FROM users WHERE matricNo='$matricNo';";
        
        if($result1=mysqli_query($link,$query1)){
            $row=mysqli_fetch_array($result1,MYSQLI_ASSOC);
            if($password==$row["password"]){
                if($result=mysqli_query($link,$query)){
                    $arr=array();
                    while($row1=mysqli_fetch_array($result)){
                        extract($row1);
                        $data=array(
                            "id"=>$id,
                            "drugId"=>$drugId,
                            "appointmentId"=>$appointmentId,
                            "patientId"=>$patientId,
                            "instructions"=>$instructions,
                            "status"=>$status,
                            "updatedBy"=>$updatedBy,
                            "dateCompleted"=>$dateCompleted
                        );
                        array_push($arr,$data);
                        }
                        echo json_encode(array("error"=>FALSE,"data"=>$arr));
                }
                else{
                echo json_encode(array("error"=>TRUE,"message"=>"Record does not exist"));
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