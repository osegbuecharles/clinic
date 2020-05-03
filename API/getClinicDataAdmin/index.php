<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: GET");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    
    if(isset($_GET) && isset($_GET["matricNo"])){
        include "../../crud/connect.php";
        
        $matricNo=$_GET["matricNo"];
        $password=$_GET["password"];

        $query= "SELECT * FROM clinicdata ORDER BY matricNo ASC;";
        $query1="SELECT * FROM users WHERE matricNo='$matricNo';";
        $query2="SELECT (`type`) FROM userdetails WHERE matricNo='$matricNo' ;";
        if(isset($_GET["patientId"])){
            $patientId=$_GET["patientId"];
            $query= "SELECT * FROM clinicdata WHERE matricNo='$patientId';";
        }
        
        if($result1=mysqli_query($link,$query1)){
            $row=mysqli_fetch_array($result1,MYSQLI_ASSOC);
            if($password==$row["password"]){
               if(isset($_GET["patientId"])){
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
                           echo json_encode(array("error"=>TRUE,"message"=>"This patient data does not exist!"));          
                       }
                  }
                  else{
                   echo json_encode(array("error"=>TRUE,"message"=>"This patient data does not exist!"));
                  }
               }
               else{
                   $arr=array();
                   if($result=mysqli_query($link,$query)){
                    if(mysqli_num_rows($result)){
                       while($row1=mysqli_fetch_array($result,MYSQLI_ASSOC)){
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
                         array_push($arr,$data);
                      }
                       echo json_encode(array("error"=>FALSE,"data"=>$arr));
                       }
                       else{
                           echo json_encode(array("error"=>TRUE,"message"=>"This patient data does not exist!"));          
                       }
                   }
                  else{
                   echo json_encode(array("error"=>TRUE,"message"=>"This patient data does not exist!"));
                  }
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