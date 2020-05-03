<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: GET");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    
    if(isset($_GET) && isset($_GET["matricNo"])){
        include "../../crud/connect.php";
        
        $id=$_GET["id"];
        $matricNo=$_GET["matricNo"];
        $password=$_GET["password"];
        $name=$_GET["name"];
        $function=$_GET["function"];
        $type=$_GET["type"];
        $quantity=$_GET["quantity"];
        $unit=$_GET["unit"];
        $lastModified=date("Y-M-d");


        $query= "UPDATE inventory set `name`='$name', `function`='$function', `type`='$type', quantity='$quantity',unit='$unit', lastModified='$lastModified', modifiedBy='$matricNo' WHERE id='$id';";
        $query1="SELECT * FROM users WHERE matricNo='$matricNo';";
        $query2="SELECT (`type`) FROM userdetails WHERE matricNo='$matricNo';";
        
        if($result1=mysqli_query($link,$query1)){
            $row1=mysqli_fetch_array($result1,MYSQLI_ASSOC);
            if($password==$row1["password"]){
                    if($result2=mysqli_query($link,$query2)){
                        $row2=mysqli_fetch_array($result2,MYSQLI_ASSOC);
                        if($row2["type"]=="admin"){
                            if($result=mysqli_query($link,$query)){
                                echo json_encode(array("error"=>FALSE,"data"=>array("success"=>TRUE)));
                            }
                            else{
                                echo json_encode(array("error"=>TRUE,"message"=>"Clinic Data already exists"));
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