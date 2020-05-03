<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: GET");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    
    if(isset($_GET) && isset($_GET["matricNo"])){
        include "../../crud/connect.php";
        
        $matricNo=$_GET["matricNo"];
        $password=$_GET["password"];

        $query= "SELECT * FROM clinicdata WHERE matricNo='$matricNo';";
        $query1="SELECT * FROM users WHERE matricNo='$matricNo';";
        
        if($result1=mysqli_query($link,$query1)){
            $row=mysqli_fetch_array($result1,MYSQLI_ASSOC);
            if($password==$row["password"]){
               if($result=mysqli_query($link,$query)){
                 if(mysqli_num_rows($result)){
                    $row1=mysqli_fetch_array($result,MYSQLI_ASSOC);
                    extract($row1);
                        $data=array(
                        "matricNo"=>$matricNo,
                        "bloodgroup"=>$bloodGroup,
                        "genotype"=>$genotype,
                        "pmc"=>$pmc,
                        "height"=>$height,
                        "weight"=>$weight,
                        "bmi"=>$BMI,
                        "allergies"=>$allergies,
                        "surgeries"=>$surgeries
                    );
                    echo json_encode(array("error"=>FALSE,"data"=>$data));
                    }
                    else{
                        echo json_encode(array("error"=>TRUE,"message"=>"Please visit the clinic to upload your clinic data!"));          
                    }
               }
               else{
                echo json_encode(array("error"=>TRUE,"message"=>"Please visit the clinic to upload your clinic data!"));
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