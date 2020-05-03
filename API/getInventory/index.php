<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: GET");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    
    if(isset($_GET) && isset($_GET["matricNo"])){
        include "../../crud/connect.php";
        
        $matricNo=$_GET["matricNo"];
        $password=$_GET["password"];
        $pageNum=$_GET["pageNum"];
        $pageSize=$_GET["pageSize"];

        $resultarr=array();
        $resultarr["error"]="";
        $resultarr["length"]="";
        $resultarr["data"]=array();

        if(isset($_GET["type"]) && !isset($_GET["name"])){
            $type=$_GET["type"];
            $query= "SELECT * FROM inventory WHERE `type`='$type' ORDER BY `name` ASC";
        }
        else if(!isset($_GET["type"]) && isset($_GET["name"])){
            $name=$_GET["name"];
            $query= "SELECT * FROM inventory WHERE `name`='$name' ORDER BY `name` ASC";
        }
        else if(isset($_GET["type"]) && isset($_GET["name"])){
            $type=$_GET["type"];
            $name=$_GET["name"];
            $query= "SELECT * FROM inventory WHERE (`name`,`type`)=('$name','$type') ORDER BY `name` ASC";
        }
        else{
            $query= "SELECT * FROM inventory ORDER BY `name` ASC";
        }
        $query1="SELECT * FROM users WHERE matricNo='$matricNo';";
        $query2="SELECT (`type`) FROM userdetails WHERE matricNo='$matricNo';";
        
        if($result1=mysqli_query($link,$query1)){
            $row1=mysqli_fetch_array($result1,MYSQLI_ASSOC);
            if($password==$row1["password"]){
                    if($result2=mysqli_query($link,$query2)){
                        $row2=mysqli_fetch_array($result2,MYSQLI_ASSOC);
                        if($row2["type"]=="admin"){
                            if($result=mysqli_query($link,$query)){
                                $resultarr["error"]=FALSE;
                                $resultarr["length"]=mysqli_num_rows($result);
                                $count=0;
                                $dataCount=0;
                                if($pageNum==1){
                                    $start=0;    
                                }
                                else{
                                    $start=($pageNum-1)*$pageSize;
                                }
                                while($row=mysqli_fetch_array($result)){
                                    if($dataCount>=$start){
                                        if($count<$pageSize){
                                            extract($row);
                                            $reply=array(
                                                "id"=>$id,
                                                "name"=>$name,
                                                "function"=>$function,
                                                "type"=>$type,
                                                "quantity"=>$quantity,
                                                "unit"=>$unit
                                            );
                                            if($unit==""){
                                                $reply["unit"]="-";
                                            }
                                            array_push($resultarr["data"],$reply);
                                            $count++;
                                        }  
                                    } 
                                    $dataCount++;  
                                }
                                echo json_encode($resultarr);
                            }
                            else{
                                echo json_encode(array("error"=>TRUE,"message"=>mysqli_error($link)));
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