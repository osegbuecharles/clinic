<?php
     header("Access-Control-Allow-Origin: *");
     header("Content-Type: application/json; charset=UTF-8");
     header("Access-Control-Allow-Methods: GET");
     header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

     if($_GET && isset($_GET["matricNo"])){
         include_once "../../crud/connect.php";
         $matricNo=$_GET["matricNo"];
         $password=$_GET["password"];
         $query= "SELECT * FROM userdetails WHERE matricNo='$matricNo'";
         $query1="SELECT * FROM users WHERE matricNo='$matricNo';";
         if($result2=mysqli_query($link,$query1)){
            $row=mysqli_fetch_array($result2,MYSQLI_ASSOC);
            if($password==$row["password"]){
                if($result1=mysqli_query($link,$query)){
                    $row=mysqli_fetch_array($result1,MYSQLI_ASSOC);
                    extract($row);
                    $result=array(
                        "matricNo"=>$matricNo,
                        "lastName"=>$lastName,
                        "firstName"=>$firstName,
                        "email"=>$email,
                        "dob"=>$row["d.o.b"],
                        "phone"=>$phone,
                        "address"=>$address,
                        "gender"=>$gender,
                        "type"=>$type
                    );
                    if($displaypicture==NULL){
                        $result["dp"]=$displaypicture;
                    }
                    else{
                        $result["dp"]="../uploads/displaypictures/".$displaypicture;
                    }
                    echo json_encode(array("error"=>FALSE,"data"=>$result));
                }
            }
            else{
                echo json_encode(array('error'=>TRUE,'message'=>'You are not authenticated to perform this operation'));
            }
        }

         else{
             echo json_encode(array("error"=>TRUE,"message"=>"User does not exist!"));
         }
     }
     else{
         echo json_encode(array("error"=>TRUE,"message"=>"Not a GET request"));
     }
?>